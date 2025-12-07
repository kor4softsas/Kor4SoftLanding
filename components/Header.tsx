"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Declarar el tipo para el custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'glass-element': any;
    }
  }
}

export default function Header() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fallback navbar mientras carga el glass-element
  const NavContent = () => (
    <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-8 lg:gap-12">
      <nav className="flex items-center gap-3 sm:gap-3 md:gap-4 lg:gap-6">
        <a href="#sobre-nosotros" className="text-sm sm:text-sm lg:text-base text-slate-700 hover:text-slate-900 font-medium transition-colors whitespace-nowrap">
          <span className="hidden md:inline">Sobre nosotros</span>
          <span className="md:hidden">Info</span>
        </a>
        <a href="#servicios" className="text-sm sm:text-sm lg:text-base text-slate-700 hover:text-slate-900 font-medium transition-colors whitespace-nowrap">
          Servicios
        </a>
      </nav>
      <div className="flex items-center flex-shrink-0">
        <Image src="/Logo.png" alt="Kor4Soft Logo" width={48} height={48} priority className="object-contain mix-blend-multiply w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12" />
      </div>
      <nav className="flex items-center gap-3 sm:gap-3 md:gap-4 lg:gap-6">
        <a href="#portfolio" className="text-sm sm:text-sm lg:text-base text-slate-700 hover:text-slate-900 font-medium transition-colors whitespace-nowrap">
          Proyectos
        </a>
        <a href="#contacto" className="text-sm sm:text-sm lg:text-base text-slate-700 hover:text-slate-900 font-medium transition-colors whitespace-nowrap">
          Contacto
        </a>
      </nav>
    </div>
  );

  return (
    <header className="fixed top-4 md:top-6 left-0 right-0 z-[60] pointer-events-none">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex justify-center">
          {!isClient ? (
            // Fallback inmediato - idéntico visualmente al glass-element
            <div className="bg-white/55 backdrop-blur-sm rounded-3xl px-6 py-4 pointer-events-auto" style={{ boxShadow: '1px 1px 1px 0px rgba(255,255,255, 0.60) inset, -1px -1px 1px 0px rgba(255,255,255, 0.60) inset' }}>
              <NavContent />
            </div>
          ) : (
          <glass-element
            auto-size="true"
            radius="24"
            depth="8"
            blur="5"
            strength="60"
            background-color="rgba(255, 255, 255, 0.55)"
            chromatic-aberration="1"
            min-width="300"
            min-height="60"
            style={{
              '--glass-padding': '16px 24px',
              pointerEvents: 'auto',
            } as any}
          >
            <NavContent />
          </glass-element>
          )}
        </div>
      </div>
    </header>
  );
}

