"use client"

import { useState } from "react"
import { webProjects, androidProjects, cinematicVideos } from "@/lib/data"
import { Play, ArrowRight, Code, ExternalLink, X, FileText, Mail } from "lucide-react"
import { motion, Variants, AnimatePresence } from "framer-motion"

export default function PortfolioUI() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  return (
    <div className="w-full relative pointer-events-none">
      
      {/* SECTION 1: HERO (Page 1) */}
      <section className="w-full h-screen flex flex-col justify-between p-8 md:p-12">
        {/* HEADER */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-between items-center w-full pointer-events-auto"
        >
          <div className="text-sm font-bold tracking-[0.3em] uppercase text-white/80 hover:text-white transition-colors cursor-pointer">
            BEN.
          </div>
          <nav className="hidden md:flex gap-10 text-xs font-semibold tracking-[0.2em] uppercase text-white/50">
            <a href="#work" className="hover:text-white transition-colors duration-300">Work</a>
            <a href="#about" className="hover:text-white transition-colors duration-300">About</a>
            <a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a>
          </nav>
        </motion.header>

        {/* HERO TEXT */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center translate-y-[-5vh]"
        >
          <h1 className="font-cinzel text-6xl md:text-8xl lg:text-9xl tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            BENHUR
          </h1>
          <p className="mt-8 text-zinc-400 text-xs md:text-sm font-medium tracking-[0.5em] uppercase">
            Developer <span className="mx-4 text-zinc-600 font-light">|</span> Cinematographer
          </p>
        </motion.div>

        {/* SCROLL INDICATOR */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col items-center justify-end w-full"
        >
          <p className="text-[9px] text-zinc-500 tracking-[0.4em] uppercase mb-6">Scroll to explore</p>
          <div className="w-[1px] h-16 bg-gradient-to-b from-zinc-500 to-transparent" />
        </motion.div>
      </section>

      {/* SECTION 1.5: ABOUT ME */}
      <section id="about" className="w-full min-h-screen flex flex-col justify-center px-8 md:px-24 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="max-w-5xl"
        >
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">About Me</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mt-4 mb-12">
            I engineer <span className="text-zinc-500">immersive digital experiences</span> bridging the gap between <span className="text-teal-400/80">code</span> and <span className="text-fuchsia-400/80">cinematography</span>.
          </h2>
          
          <div className="flex flex-col md:flex-row gap-12 pointer-events-auto">
            <p className="text-zinc-400 leading-relaxed font-light text-sm md:text-base flex-1">
              With a foundation in both software engineering and visual arts, I approach development with a cinematographer's eye. Whether I'm building high-performance Next.js web applications, crafting native Android ecosystems, or grading cinematic footage, my goal is always to deliver pixel-perfect, highly optimized experiences that leave a lasting impression.
            </p>
            
            <div className="flex-1 flex flex-col gap-6">
              <div>
                <h3 className="text-xs font-mono tracking-[0.2em] text-white/50 uppercase mb-3">Core Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {['React / Next.js', 'TypeScript', 'JavaScript', 'Python', 'Flutter / Dart', 'OpenCV / CV', 'Node.js', 'REST APIs', 'Three.js / WebGL', 'React Three Fiber', 'Framer Motion', 'TailwindCSS', 'Lenis'].map(skill => (
                    <span key={skill} className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <a
                href="/Resume_Benhur!.pdf"
                download="Benhur_Resume.pdf"
                className="group w-fit mt-4 flex items-center gap-3 px-6 py-3 bg-white text-black text-xs font-bold tracking-widest uppercase rounded-full hover:bg-zinc-200 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: WEB PROJECTS (Page 2) */}
      <section id="work" className="w-full min-h-screen flex flex-col justify-center px-8 md:px-24 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="flex flex-col gap-4 mb-16 max-w-4xl">
            <span className="text-sm font-bold tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">Digital Architecture</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.1]">
              Creating high-end and beautiful websites built to <span className="text-zinc-500">perform and convert.</span>
            </h2>
          </div>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar pointer-events-auto"
          data-lenis-prevent
        >
          {webProjects.map((project) => (
            <motion.div 
              variants={fadeInUp}
              key={project.id} 
              className="snap-center min-w-[300px] md:min-w-[400px] flex-shrink-0 group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-8 transition-colors duration-500 hover:bg-white/5 hover:border-teal-400/50"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-mono text-teal-400/80">{project.year}</span>
                <div className="flex gap-3">
                  {project.githubUrl && project.githubUrl !== "#" && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                      <Code className="w-4 h-4 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                    </a>
                  )}
                  {project.demoUrl && project.demoUrl !== "#" && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                    </a>
                  )}
                </div>
              </div>
              
              <h3 className="text-2xl font-light tracking-wide text-white mb-3 group-hover:text-teal-300 transition-colors">{project.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-8">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        <p className="text-zinc-600 text-xs tracking-widest mt-4 pointer-events-none">swipe left to explore more</p>
      </section>

      {/* SECTION 3: ANDROID PROJECTS (Page 3) */}
      <section className="w-full min-h-screen flex flex-col justify-center items-end px-8 md:px-24 py-24 text-right">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="flex flex-col gap-4 mb-16 max-w-4xl text-right ml-auto">
            <span className="text-sm font-bold tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">Mobile Ecosystems</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.1]">
              Architecting fluid and robust native applications prioritizing <span className="text-zinc-500">uncompromised performance.</span>
            </h2>
          </div>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-6 w-full max-w-2xl pointer-events-auto"
        >
          {androidProjects.map((project, i) => (
            <motion.div 
              variants={fadeInUp}
              key={project.id} 
              className={`flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md transition-colors duration-500 hover:bg-white/5 hover:border-fuchsia-400/50 ${i % 2 === 0 ? 'md:flex-row-reverse text-left' : 'text-right'}`}
            >
              <div className="flex-1">
                <div className={`flex items-center gap-4 mb-2 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <h3 className="text-xl font-light tracking-wide text-white">{project.title}</h3>
                  <div className="flex gap-2">
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">
                        <Code className="w-4 h-4 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                      </a>
                    )}
                    {project.demoUrl && project.demoUrl !== "#" && (
                      <a href={project.demoUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="w-4 h-4 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">{project.description}</p>
                <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 4: CINEMATOGRAPHY (Page 4) */}
      <section className="w-full min-h-screen flex flex-col justify-center px-8 md:px-24 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center"
        >
          <div className="flex flex-col gap-4 mb-20 max-w-5xl mx-auto text-center">
            <span className="text-sm font-bold tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">Visual Narratives</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.1]">
              Telling stories through light, shadow, and <span className="text-zinc-600">precise color science.</span>
            </h2>
            <p className="text-zinc-600 text-xs tracking-widest pointer-events-none">for better visuals, adjust quality via the ⚙ icon inside the player</p>
          </div>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto w-full pointer-events-auto"
        >
          {cinematicVideos.map((video) => (
            <motion.div 
              variants={fadeInUp}
              key={video.id} 
              onClick={() => setActiveVideo(video.videoUrl)}
              className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer border border-white/10"
            >
              {/* Thumbnail Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url(${video.thumbnail})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <h3 className="text-xl font-light tracking-wide text-white">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 5: CONTACT */}
      <section id="contact" className="w-full min-h-[70vh] flex flex-col items-center justify-center px-8 py-24 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="pointer-events-auto"
        >
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] mb-6 block">Ready to collaborate?</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.1] mb-12">
            Let's build something <span className="text-zinc-500">extraordinary.</span>
          </h2>
          
          <div className="flex gap-6 justify-center">
            <a href="mailto:benhurbenny.byteforge@gmail.com" className="w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com/Benhur167" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" stroke="none"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/benhur-maruthi-25054432a" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" stroke="none"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <motion.footer 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="w-full py-12 flex flex-col items-center justify-center border-t border-white/5 bg-black/50 backdrop-blur-lg"
      >
        <h2 className="font-cinzel text-2xl text-white/50 tracking-[0.3em] mb-4">BENHUR</h2>
        <p className="text-xs text-zinc-600 uppercase tracking-widest">© 2026 All Rights Reserved.</p>
      </motion.footer>

      {/* VIDEO LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl pointer-events-auto p-4 md:p-12"
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)]"
            >
              {activeVideo !== "#" ? (
                <iframe 
                  src={activeVideo} 
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500">
                  <Play className="w-12 h-12 mb-4 opacity-50" />
                  <p className="uppercase tracking-widest text-xs">Video URL not provided</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STYLES */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  )
}
