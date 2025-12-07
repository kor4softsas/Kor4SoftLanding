"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafCallback: ((time: number) => void) | null = null;
    let handleAnchorClick: ((e: MouseEvent) => void) | null = null;

    // Inicializar Lenis después del primer paint para no bloquear LCP
    const timeoutId = setTimeout(() => {
      lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;
      (window as any).__lenis = lenis;

      // Integrar con GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // Sincronizar ticker de GSAP con Lenis
      rafCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);

      // Manejar anchor links
      handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');

        if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
          const href = anchor.getAttribute('href');
          if (href && href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element && lenis) {
              lenis.scrollTo(element as HTMLElement, {
                offset: -100,
                duration: 1.2,
              });
            }
          }
        }
      };

      document.addEventListener('click', handleAnchorClick);
    }, 100); // Pequeño delay para priorizar el render inicial

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      if (handleAnchorClick) {
        document.removeEventListener('click', handleAnchorClick);
      }
      if (rafCallback) {
        gsap.ticker.remove(rafCallback);
      }
      if (lenis) {
        lenis.destroy();
      }
      delete (window as any).__lenis;
    };
  }, []);

  return <>{children}</>;
}

// Hook para acceder a Lenis desde otros componentes
export function useLenis() {
  return {
    scrollTo: (target: string | number | HTMLElement, options?: object) => {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(target, {
          offset: -100,
          duration: 1.2,
          ...options,
        });
      }
    },
    stop: () => {
      const lenis = (window as any).__lenis;
      if (lenis) lenis.stop();
    },
    start: () => {
      const lenis = (window as any).__lenis;
      if (lenis) lenis.start();
    },
  };
}
