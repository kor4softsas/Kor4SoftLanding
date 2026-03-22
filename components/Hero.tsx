"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticlesBackground from "./ParticlesBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const techData = {
  react: {
    name: "React",
    color: "bg-blue-500",
    description: "Biblioteca de JavaScript para construir interfaces interactivas y reactivas.",
    highlight: "Usada por Facebook, Netflix y Airbnb.",
  },
  nextjs: {
    name: "Next.js",
    color: "bg-slate-900",
    description: "El framework de React para producción con renderizado híbrido.",
    highlight: "Potencia TikTok, Twitch y esta página.",
  },
  laravel: {
    name: "Laravel",
    color: "bg-red-500",
    description: "Framework PHP elegante para desarrollo web rápido.",
    highlight: "Backend robusto con ecosistema completo.",
  },
  nodejs: {
    name: "Node.js",
    color: "bg-green-600",
    description: "Entorno JavaScript del lado del servidor, rápido y escalable.",
    highlight: "Impulsa LinkedIn, Uber y PayPal.",
  }
};

type TechKey = keyof typeof techData;

const tooltipVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  visible: { 
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring" as const, bounce: 0.35, duration: 0.5 }
  },
  exit: { opacity: 0, y: 4, scale: 0.97, transition: { duration: 0.15 } }
};

export default function Hero() {
  const [selectedTech, setSelectedTech] = useState<TechKey | null>(null);
  const handleTechClick = (tech: TechKey) => setSelectedTech(selectedTech === tech ? null : tech);
  
  // Refs para la animación GSAP
  const sectionRef = useRef<HTMLElement>(null);
  const logoMaskRef = useRef<HTMLDivElement>(null);
  const heroKeyRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 0.5,
          pin: true,
        },
      });

      // Todas las animaciones empiezan simultáneamente
      
      // Animación del mask: de grande a pequeño
      tl.to(logoMaskRef.current, {
        maskSize: "50vh",
        WebkitMaskSize: "50vh",
        duration: 1.0,
      }, 0);

      // Solo el fondo cambia de escala
      tl.to(heroKeyRef.current, {
        scale: 1,
        duration: 0.8,
      }, 0);

      // Fade out del contenido (logo, texto, badge)
      tl.to(heroContentRef.current, {
        opacity: 0,
        duration: 0.8,
      }, 0.2);

      // Fade out del indicador de scroll
      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 0.3,
      }, 0);

      // Fade out final del fondo
      tl.to(heroKeyRef.current, {
        opacity: 0,
        duration: 0.4,
      }, 0.8);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ===== LOGO MASK SECTION - Efecto cinematográfico ===== */}
      <section 
        ref={sectionRef}
        className="relative w-full h-screen"
      >
        {/* Fondo de partículas detrás de todo */}
        <div className="absolute inset-0 z-0">
          <ParticlesBackground />
        </div>

        {/* Botones e iconos DETRÁS del mask - aparecen debajo del logo SVG cuando se encoge */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-[35vh]">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
              <button
                onClick={() => (window as any).openContactModal()}
                className="px-8 py-4 bg-slate-900 text-white rounded-full font-semibold text-lg hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-slate-900/25 hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                Iniciar Proyecto
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <a
                href="#servicios"
                className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center"
              >
                Ver Servicios
              </a>
            </div>

            {/* Tech Stack Floating Icons */}
            <div className="relative w-full max-w-3xl mx-auto flex items-center justify-center gap-3 xs:gap-4 sm:gap-10 px-2 sm:px-0">

              {/* React */}
              <div className="relative flex flex-col items-center">
                <AnimatePresence>
                  {selectedTech === 'react' && (
                    <motion.div variants={tooltipVariants} initial="hidden" animate="visible" exit="exit" className="absolute bottom-full mb-3 w-52 sm:w-64 z-40 left-0 sm:left-1/2 sm:-translate-x-1/2">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-3 relative">
                        <div className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 -bottom-2 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45"></div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className={`w-6 h-6 ${techData.react.color} rounded-md flex items-center justify-center`}><span className="text-white text-xs font-bold">R</span></div>
                          <h4 className="font-bold text-slate-900 text-sm">{techData.react.name}</h4>
                        </div>
                        <p className="text-xs text-slate-600 mb-1">{techData.react.description}</p>
                        <p className="text-xs text-blue-600 font-medium">{techData.react.highlight}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className={`absolute -inset-2 bg-blue-50 rounded-full blur-md transition-opacity duration-300 ${selectedTech === 'react' ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}></div>
                <button onClick={() => handleTechClick('react')} className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl shadow-lg border flex items-center justify-center transition-all duration-300 cursor-pointer ${selectedTech === 'react' ? 'scale-110 border-blue-300 ring-2 ring-blue-200' : 'border-slate-100 hover:scale-110'}`}>
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="React" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10 object-contain animate-spin-slow" unoptimized />
                </button>
              </div>

              {/* Next.js */}
              <div className="relative flex flex-col items-center">
                <AnimatePresence>
                  {selectedTech === 'nextjs' && (
                    <motion.div variants={tooltipVariants} initial="hidden" animate="visible" exit="exit" className="absolute bottom-full mb-3 w-52 sm:w-64 z-40 -left-6 sm:left-1/2 sm:-translate-x-1/2">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-3 relative">
                        <div className="absolute left-12 sm:left-1/2 sm:-translate-x-1/2 -bottom-2 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45"></div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className={`w-6 h-6 ${techData.nextjs.color} rounded-md flex items-center justify-center`}><span className="text-white text-xs font-bold">N</span></div>
                          <h4 className="font-bold text-slate-900 text-sm">{techData.nextjs.name}</h4>
                        </div>
                        <p className="text-xs text-slate-600 mb-1">{techData.nextjs.description}</p>
                        <p className="text-xs text-slate-700 font-medium">{techData.nextjs.highlight}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className={`absolute -inset-2 bg-slate-200 rounded-full blur-md transition-opacity duration-300 ${selectedTech === 'nextjs' ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}></div>
                <button onClick={() => handleTechClick('nextjs')} className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl shadow-lg border flex items-center justify-center transition-all duration-300 cursor-pointer ${selectedTech === 'nextjs' ? 'scale-110 border-slate-400 ring-2 ring-slate-300' : 'border-slate-100 hover:scale-110'}`}>
                  <Image src="https://www.svgrepo.com/show/354113/nextjs-icon.svg" alt="Next.js" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" unoptimized />
                </button>
              </div>

              {/* Central Security/Core Icon */}
              <div className="relative z-10">
                <div className="absolute -inset-3 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full blur-lg opacity-20"></div>
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-slate-900 rounded-2xl shadow-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>

              {/* Laravel */}
              <div className="relative flex flex-col items-center">
                <AnimatePresence>
                  {selectedTech === 'laravel' && (
                    <motion.div variants={tooltipVariants} initial="hidden" animate="visible" exit="exit" className="absolute bottom-full mb-3 w-52 sm:w-64 z-40 -right-6 sm:right-auto sm:left-1/2 sm:-translate-x-1/2">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-3 relative">
                        <div className="absolute right-12 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 -bottom-2 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45"></div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className={`w-6 h-6 ${techData.laravel.color} rounded-md flex items-center justify-center`}><span className="text-white text-xs font-bold">L</span></div>
                          <h4 className="font-bold text-slate-900 text-sm">{techData.laravel.name}</h4>
                        </div>
                        <p className="text-xs text-slate-600 mb-1">{techData.laravel.description}</p>
                        <p className="text-xs text-red-600 font-medium">{techData.laravel.highlight}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className={`absolute -inset-2 bg-red-50 rounded-full blur-md transition-opacity duration-300 ${selectedTech === 'laravel' ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}></div>
                <button onClick={() => handleTechClick('laravel')} className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl shadow-lg border flex items-center justify-center transition-all duration-300 cursor-pointer ${selectedTech === 'laravel' ? 'scale-110 border-red-300 ring-2 ring-red-200' : 'border-slate-100 hover:scale-110'}`}>
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1969px-Laravel.svg.png" alt="Laravel" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" unoptimized />
                </button>
              </div>

              {/* Node.js */}
              <div className="relative flex flex-col items-center">
                <AnimatePresence>
                  {selectedTech === 'nodejs' && (
                    <motion.div variants={tooltipVariants} initial="hidden" animate="visible" exit="exit" className="absolute bottom-full mb-3 w-52 sm:w-64 z-40 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-3 relative">
                        <div className="absolute right-6 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 -bottom-2 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45"></div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className={`w-6 h-6 ${techData.nodejs.color} rounded-md flex items-center justify-center`}><span className="text-white text-xs font-bold">N</span></div>
                          <h4 className="font-bold text-slate-900 text-sm">{techData.nodejs.name}</h4>
                        </div>
                        <p className="text-xs text-slate-600 mb-1">{techData.nodejs.description}</p>
                        <p className="text-xs text-green-600 font-medium">{techData.nodejs.highlight}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className={`absolute -inset-2 bg-green-50 rounded-full blur-md transition-opacity duration-300 ${selectedTech === 'nodejs' ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}></div>
                <button onClick={() => handleTechClick('nodejs')} className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl shadow-lg border flex items-center justify-center transition-all duration-300 cursor-pointer ${selectedTech === 'nodejs' ? 'scale-110 border-green-300 ring-2 ring-green-200' : 'border-slate-100 hover:scale-110'}`}>
                  <Image src="https://www.svgrepo.com/show/354119/nodejs-icon.svg" alt="Node.js" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" unoptimized />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Logo Mask Container - cubre toda la pantalla inicialmente */}
        <div
          ref={logoMaskRef}
          className="w-full h-screen fixed top-0 left-0 z-40 pointer-events-none"
          style={{
            maskImage: "url('/logo-mask.svg')",
            WebkitMaskImage: "url('/logo-mask.svg')",
            maskPosition: "center 35%",
            WebkitMaskPosition: "center 35%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskSize: "200000vh",
            WebkitMaskSize: "200000vh",
            background: "#0f172a", // bg-slate-900 - consistente con el footer
          }}
        >
          {/* Hero Key - Solo el fondo con escala */}
          <div 
            ref={heroKeyRef}
            className="absolute inset-0 overflow-hidden"
            style={{ transform: "scale(1.25)" }}
          >
            {/* Background igual a la sección CTA */}
            <div className="absolute inset-0 bg-slate-900">
              {/* Abstract Pattern - puntos con opacidad */}
              <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
              {/* Gradientes azules en esquinas */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>
          </div>

          {/* Contenido fijo (no escala, solo fade out) */}
          <div 
            ref={heroContentRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
          >
            {/* Logo - tamaño fijo */}
            <div className="relative mb-4 sm:mb-6">
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 bg-slate-800/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-slate-700/50 shadow-2xl">
                <Image
                  src="/Logocircular.png"
                  alt="Kor4Soft Logo"
                  width={140}
                  height={140}
                  className="object-contain w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
                  priority
                />
              </div>
            </div>

            {/* Título - tamaño fijo */}
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white mb-2 sm:mb-4 text-center">
              Kor4Soft
            </h1>

            {/* Subtítulo - tamaño fijo */}
            <p className="text-sm sm:text-lg lg:text-xl text-slate-300 text-center max-w-md px-4 mb-4 sm:mb-6">
              Transformamos ideas en experiencias digitales excepcionales
            </p>

            {/* Badge */}
            <div className="px-4 sm:px-6 py-2 bg-violet-500/20 backdrop-blur-sm rounded-full border border-violet-500/30">
              <span className="text-violet-200 text-[10px] sm:text-xs font-medium tracking-wider uppercase">
                Desarrollo Web & Mobile
              </span>
            </div>
          </div>
        </div>

        {/* Indicador de scroll con flecha */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 sm:gap-4"
        >
          <span className="text-slate-300 text-xs sm:text-sm font-medium tracking-widest uppercase">
            Scroll
          </span>
          <div className="flex flex-col items-center gap-1">
            <svg 
              className="w-6 h-6 sm:w-8 sm:h-8 text-violet-400 animate-bounce"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

      </section>
    </>
  );
}
