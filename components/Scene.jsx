"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Suspense, useRef, useEffect } from "react"
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing"
import { useGLTF, Center, Stars, Sparkles } from "@react-three/drei"
import * as THREE from "three"

// 🔥 CORE (STAR)
function Core() {
  const coronaRef = useRef()

  useFrame(({ clock }) => {
    const time = clock.elapsedTime
    // Energy Surge Corona Effect (still surges to simulate flares on the surface, but no global blinking)
    if (coronaRef.current) {
      const surgeScale = 1.0 + Math.sin(time * 12) * 0.05 + Math.sin(time * 4) * 0.05
      coronaRef.current.scale.set(surgeScale, surgeScale, surgeScale)
      coronaRef.current.material.opacity = 0.4 + Math.sin(time * 8) * 0.2
    }
  })

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.35, 64, 64]} />
        <meshStandardMaterial
          color="#ffb347"
          emissive="#ff8c00"
          emissiveIntensity={5} // Constantly high and blinding
        />
      </mesh>
      
      {/* Surging Energy Corona */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshBasicMaterial 
          color="#ffaa00" 
          transparent 
          opacity={0.4} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Dynamic core light, constantly bright */}
      <pointLight position={[0, 0, 0]} intensity={12} color="#ff8c00" distance={20} />
    </group>
  )
}

// 🌐 DYSON STRUCTURE (ATOM-STYLE WITH NEW GLB)
function DysonStructure() {
  const ring = useGLTF("/models/ring.glb")

  const group = useRef()
  const innerGroup = useRef()
  const ringRefs = useRef([])

  useEffect(() => {
    // Inject a clean, matte sci-fi material instead of highly reflective metal
    ring.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.color.set("#333333") // Lighter gray base color
        child.material.metalness = 0.2      // Low metalness to stop it from acting like a mirror
        child.material.roughness = 0.9      // High roughness for a smooth, matte finish
      }
    })
  }, [ring])

  useFrame(() => {
    // Increased baseline rotation speed for a livelier feel
    group.current.rotation.y += 0.001
    group.current.rotation.z += 0.0006
    
    if (innerGroup.current) innerGroup.current.rotation.x -= 0.0015

    // Add independent, clockwork-style spinning to each individual ring!
    ringRefs.current.forEach((r, index) => {
      if (r) {
        // Each ring spins at a slightly different speed to look like a complex mechanism
        const spinSpeed = 0.002 + (index * 0.0015)
        // We rotate on the local X axis so they tumble within their preset 60-degree orientations
        r.rotation.x += spinSpeed 
      }
    })
  })

  // 3 intersecting rings spaced evenly. 
  // We removed the X-axis tilt so they cross at the poles, leaving the center wide open to see the core!
  const ringRotations = [
    [0, 0, 0],                                 // Ring 1
    [0, Math.PI * (1/3), 0],                   // Ring 2
    [0, Math.PI * (2/3), 0]                    // Ring 3
  ]

  return (
    <group ref={group}>
      <group ref={innerGroup}>
        {ringRotations.map((rot, i) => (
          <group key={`ring-${i}`} rotation={rot}>
            {/* We apply the continuous spin to an inner group so it doesn't fight the base rotation */}
            <group ref={(el) => (ringRefs.current[i] = el)}>
              <Center>
                {/* Scaled up slightly to 1.2 to create more open space inside the sphere */}
                <primitive object={ring.scene.clone()} scale={1.2} />
              </Center>
            </group>
          </group>
        ))}
      </group>
    </group>
  )
}

// 🪨 DEBRIS (OUTER LAYER)
function Debris() {
  const { scene } = useGLTF("/models/space_debris.glb")
  const group = useRef()

  useFrame(() => {
    group.current.rotation.y += 0.0005 // Faster debris orbit
  })

  return (
    <group ref={group}>
      {[...Array(10)].map((_, i) => {
        const phi = Math.random() * Math.PI
        const theta = Math.random() * Math.PI * 2
        const r = 2.6

        return (
          <group
            key={i}
            position={[
              r * Math.sin(phi) * Math.cos(theta),
              r * Math.sin(phi) * Math.sin(theta),
              r * Math.cos(phi)
            ]}
          >
            <Center>
              <primitive object={scene.clone()} scale={0.008} />
            </Center>
          </group>
        )
      })}
    </group>
  )
}

// 🪨 ASTEROID BELT (Inner Chaos)
function AsteroidBelt() {
  const { scene } = useGLTF("/models/rock.glb")
  const group = useRef()
  
  useFrame(() => {
    group.current.rotation.y -= 0.002 // Orbiting the sun fast
    group.current.rotation.x += 0.0002
  })
  
  return (
    <group ref={group} rotation={[0.2, 0, -0.15]}> {/* Tilted the belt for a dynamic Saturn-ring look */}
      {/* Increased count to 150 because the belt is much larger now */}
      {[...Array(150)].map((_, i) => {
        const theta = Math.random() * Math.PI * 2
        // Radius pushed way out (1.8 to 2.4) so it orbits OUTSIDE the Dyson rings
        const r = 1.8 + Math.random() * 0.6 
        
        // Drastically reduced scale because the rock.glb is massive
        const scale = 0.0001 + Math.random() * 0.0002

        return (
          <group 
            key={`asteroid-${i}`}
            // Tightened the Y spread to form a flat belt rather than a cloud
            position={[r * Math.cos(theta), (Math.random() - 0.5) * 0.15, r * Math.sin(theta)]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            <primitive object={scene.clone()} scale={scale} />
          </group>
        )
      })}
    </group>
  )
}

// 🛰️ MEGASTRUCTURE SATELLITES
function Satellites() {
  const { scene } = useGLTF("/models/satellite.glb")
  const group = useRef()

  useEffect(() => {
    // The native model has bright blue solar panels. 
    // We override them here to be a realistic, neutral grey metal.
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.color.set("#555555") // Realistic grey
        child.material.metalness = 0.7      // Realistic metallic sheen
        child.material.roughness = 0.4      // Slight roughness so it catches light naturally
        child.material.emissive.set("#000000") // Ensure NO glowing blue
      }
    })
  }, [scene])

  useFrame(() => {
    group.current.rotation.y += 0.0005
    group.current.rotation.z += 0.0002
  })

  return (
    <group ref={group}>
      {/* Brought closer to the center because the camera FOV is tight! */}
      <group position={[1.4, 0.8, -1.5]} rotation={[0.5, 0.2, 0]}>
        <Center>
          {/* Scaled back slightly to look realistic instead of like a giant toy */}
          <primitive object={scene.clone()} scale={0.08} />
        </Center>
      </group>
      <group position={[-1.2, -1.0, 1.5]} rotation={[-0.2, 1.5, 0.5]}>
        <Center>
          <primitive object={scene.clone()} scale={0.06} />
        </Center>
      </group>
    </group>
  )
}

// 🚀 DYNAMIC MOUSE INTERACTION
function MouseDynamicsGroup({ children }) {
  const group = useRef()
  const { mouse } = useThree()

  useFrame(() => {
    // 1. Position Parallax (Sphere physically shifts left/right/up/down)
    const targetPosX = mouse.x * 0.8
    const targetPosY = mouse.y * 0.8

    // 2. Rotation Parallax (Sphere physically tilts towards the mouse)
    const targetRotX = -mouse.y * 0.5
    const targetRotY = mouse.x * 0.5

    // Fast, snappy interpolation for highly dynamic movement
    group.current.position.x += (targetPosX - group.current.position.x) * 0.1
    group.current.position.y += (targetPosY - group.current.position.y) * 0.1

    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.1
    group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.1
  })

  return <group ref={group}>{children}</group>
}

// 📜 SCROLL ANIMATION MANAGER
function ScrollManager() {
  const group = useRef()

  useFrame((state, delta) => {
    // Safely calculate scroll offset based on standard DOM scroll
    const scrollY = window.scrollY || 0
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const offset = maxScroll > 0 ? scrollY / maxScroll : 0
    
    // Target Parallax movement based on scroll
    const targetZ = offset * 2.5 
    const targetY = offset * 0.8
    const targetRotY = offset * Math.PI * 0.4
    const targetRotX = offset * -0.15

    // Buttery smooth interpolation (dampening)
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 4, delta)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 4, delta)
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetRotY, 4, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetRotX, 4, delta)
  })

  return <group ref={group}>
    <MouseDynamicsGroup>
      {/* Layered Volumetric Cosmic Nebula - Optimized counts for FPS */}
      <Sparkles count={400} scale={16} size={10} speed={0.05} opacity={0.08} color="#1e4d8c" />
      <Sparkles count={200} scale={12} size={6} speed={0.1} opacity={0.1} color="#5588ff" />
      <Sparkles count={50} scale={10} size={2} speed={0.2} opacity={0.12} color="#aaddff" />
      <Core />
      <AsteroidBelt />
      <DysonStructure />
      <Debris />
      <Satellites />
    </MouseDynamicsGroup>
  </group>
}

// 🌌 MAIN SCENE
export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.8], fov: 40 }} dpr={[1, 1.5]}>

      {/* Deep Space Cosmic Background & Stars */}
      <color attach="background" args={["#081020"]} /> {/* Deep cosmic blue */}
      <Stars radius={100} depth={50} count={3000} factor={7} saturation={0.8} fade speed={1} />

      {/* Cinematic Dual-Tone Lighting */}
      {/* Dropped ambient light extremely low to force pitch-black, cinematic shadows */}
      <ambientLight intensity={0.05} />
      
      {/* Primary Rim Light (Cool Teal) to catch metallic edges from the top-left rear */}
      <directionalLight position={[-5, 5, -8]} intensity={4} color="#2dd4bf" />
      
      {/* Secondary Rim Light (Deep Magenta) from the bottom-right rear to create stunning sci-fi contrast */}
      <directionalLight position={[5, -5, -8]} intensity={3} color="#a21caf" />
      
      {/* Reduced fill light to maintain deep cinematic shadows while keeping details visible */}
      <directionalLight position={[3, -2, 4]} intensity={0.2} color="#ffffff" />

      <Suspense fallback={null}>
        <ScrollManager />
      </Suspense>

      {/* Cinematic Post-Processing */}
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.9} // Very high threshold so ONLY the highly emissive core blooms
          luminanceSmoothing={0.4}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>

    </Canvas>
  )
}