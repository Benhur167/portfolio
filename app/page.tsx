"use client"

import Scene from "@/components/Scene"
import PortfolioUI from "@/components/PortfolioUI"
import LoadingScreen from "@/components/LoadingScreen"
import { ReactLenis } from 'lenis/react'

export default function Home() {
  return (
    <ReactLenis root options={{
        duration: 0.6,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        smoothWheel: true,
      }}>
      <main className="relative text-white font-sans bg-black selection:bg-teal-500/30">
        <LoadingScreen />
        
        {/* 🎥 3D Scene (Fixed Background) */}
        <div className="fixed inset-0 z-10 w-full h-full">
          <Scene />
        </div>

        {/* 💻 Scrollable UI Layer */}
        <div className="relative z-20 pointer-events-none">
          <PortfolioUI />
        </div>
      </main>
    </ReactLenis>
  )
}