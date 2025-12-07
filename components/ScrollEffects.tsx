"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registrar plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 0.5 = más lento, 1.5 = más rápido
  direction?: "up" | "down";
  id?: string;
}

// Componente para secciones con efecto parallax en el fondo
export function ParallaxSection({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
  id,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const yMovement = direction === "up" ? -100 * speed : 100 * speed;

    gsap.to(sectionRef.current.querySelector(".parallax-bg"), {
      y: yMovement,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`} id={id}>
      {children}
    </div>
  );
}

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

// Componente para elementos que aparecen con fade al hacer scroll
export function FadeInOnScroll({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  y = 50,
  once = true,
}: FadeInOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        y: y,
      },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 85%",
          end: "top 60%",
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      }
    );
  }, { scope: elementRef });

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

interface ParallaxElementProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "vertical" | "horizontal";
}

// Componente para elementos individuales con parallax
export function ParallaxElement({
  children,
  className = "",
  speed = 0.3,
  direction = "vertical",
}: ParallaxElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    const movement = 100 * speed;
    const animProps = direction === "vertical" 
      ? { y: movement } 
      : { x: movement };

    gsap.fromTo(
      elementRef.current,
      direction === "vertical" ? { y: -movement } : { x: -movement },
      {
        ...animProps,
        ease: "none",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, { scope: elementRef });

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
  scaleFrom?: number;
  scaleTo?: number;
}

// Componente para elementos que escalan al hacer scroll
export function ScaleOnScroll({
  children,
  className = "",
  scaleFrom = 0.8,
  scaleTo = 1,
}: ScaleOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      { scale: scaleFrom, opacity: 0.5 },
      {
        scale: scaleTo,
        opacity: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 90%",
          end: "top 50%",
          scrub: 1,
        },
      }
    );
  }, { scope: elementRef });

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

// Hook para usar ScrollTrigger de forma manual
export function useScrollTrigger() {
  const registerTrigger = (
    element: HTMLElement,
    animation: gsap.TweenVars,
    triggerConfig?: ScrollTrigger.Vars
  ) => {
    return gsap.to(element, {
      ...animation,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        ...triggerConfig,
      },
    });
  };

  return { registerTrigger, gsap, ScrollTrigger };
}
