"use client"

import { useProgress } from "@react-three/drei"
import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const { progress, active } = useProgress()
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    // When progress hits 100%, wait a tiny bit for the scene to render, then hide
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setIsHidden(true)
      }, 800) // 800ms delay to ensure everything is smooth before fading
      return () => clearTimeout(timeout)
    }
  }, [progress])

  if (isHidden) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ease-in-out ${
        progress === 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center w-full max-w-md px-8">
        
        {/* Loading Text */}
        <h2 className="font-cinzel text-2xl tracking-[0.4em] text-white/80 mb-8 animate-pulse">
          INITIALIZING
        </h2>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full">
          {/* Animated Glow Bar */}
          <div 
            className="absolute top-0 left-0 h-full bg-teal-400/80 shadow-[0_0_15px_rgba(45,212,191,0.8)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Details */}
        <div className="flex justify-between w-full mt-4 text-xs font-mono text-zinc-500 tracking-widest">
          <span>SYSTEM.BOOT</span>
          <span>{Math.round(progress)}%</span>
        </div>
        
      </div>
    </div>
  )
}
