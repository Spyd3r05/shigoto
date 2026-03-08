import React from 'react'
import { Zap } from 'lucide-react'
const Hero = () => {
  return (
     <main className="pt-28 px-4 max-w-6xl mx-auto flex flex-col items-center">
        {/* Hero Section */}
        <div className="flex bg-[#e6f2f2] text-[#4b9b9b] px-4 py-1.5 rounded-full text-xs font-semibold mb-6 items-center space-x-1.5 uppercase tracking-wider">
          <Zap size={14} className="fill-current" />
          <span>Live Attachment Feed</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-slate-800 tracking-tight leading-tight mb-4">
          Find Your Next<br />
          <span className="text-[#4b9b9b]">Internship</span> in Tech
        </h1>

        <p className="text-slate-500 text-center max-w-2xl text-lg mb-10">
          Real-time opportunities for Computer Science students in Kenya.
          We scrape the web so you don't have to.
        </p>
        </main>
  )
}

export default Hero