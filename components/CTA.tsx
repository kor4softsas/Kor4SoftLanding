"use client";

import { useRef } from "react";
import { InView } from "./InView";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registrar plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  // Efectos Parallax para CTA
  useGSAP(() => {
    // Parallax en los círculos decorativos
    gsap.to(".cta-blob-1", {
      y: -100,
      x: -60,
      scale: 1.3,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    gsap.to(".cta-blob-2", {
      y: 80,
      x: 40,
      scale: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="contacto" className="relative w-full py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900">
        {/* Abstract Pattern */}
        <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
        <div className="cta-blob-1 absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="cta-blob-2 absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              ¿Listo para impulsar tu negocio?
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Transformamos tus ideas en soluciones digitales de alto impacto. 
              Agenda una consulta gratuita hoy mismo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => (window as any).openContactModal()}
                className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1 flex items-center gap-2 group"
              >
                Iniciar Proyecto
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </InView>
      </div>
      
      {/* Gradiente de transición al footer */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-slate-900 z-0"></div>
    </section>
  );
}
