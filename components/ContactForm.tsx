"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  triggerButton?: HTMLButtonElement | null;
}

export default function ContactForm({ isOpen, onClose, triggerButton }: ContactFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: ""
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const subjectOptions = [
    { value: "desarrollo-web", label: "Desarrollo Web" },
    { value: "app-movil", label: "Aplicación Móvil" },
    { value: "automatizacion", label: "Automatización" },
    { value: "consultoria", label: "Consultoría" },
    { value: "otro", label: "Otro" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      setStatus("success");
      
      setTimeout(() => {
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          asunto: "",
          mensaje: ""
        });
        setStatus("idle");
        onClose();
      }, 2500);
    } catch (error) {
      console.error('Error:', error);
      setStatus("error");
      
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }
  };

  // Animación de apertura con GSAP
  useEffect(() => {
    if (isOpen && modalRef.current && overlayRef.current) {
      const modal = modalRef.current;
      const overlay = overlayRef.current;
      
      // Obtener posición del botón trigger
      let startX = window.innerWidth / 2;
      let startY = window.innerHeight / 2;
      
      if (triggerButton) {
        const buttonRect = triggerButton.getBoundingClientRect();
        startX = buttonRect.left + buttonRect.width / 2;
        startY = buttonRect.top + buttonRect.height / 2;
      }

      // Timeline de animación
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      // Estado inicial del modal
      gsap.set(modal, {
        scale: 0,
        x: startX - window.innerWidth / 2,
        y: startY - window.innerHeight / 2,
        opacity: 0,
        borderRadius: "50%",
        rotation: -15,
      });

      // Animación del overlay
      tl.to(overlay, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      }, 0);

      // Animación del modal - efecto de explosión suave desde el botón
      tl.to(modal, {
        scale: 1,
        x: 0,
        y: 0,
        opacity: 1,
        borderRadius: "16px",
        rotation: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.75)",
      }, 0.1);

      // Animación de los elementos internos
      const elements = modal.querySelectorAll('.animate-in');
      tl.fromTo(elements,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.7)",
        },
        0.4
      );

      // Efecto de brillo/glow al final
      tl.fromTo(modal,
        {
          boxShadow: "0 0 0 0 rgba(71, 85, 105, 0)",
        },
        {
          boxShadow: "0 25px 50px -12px rgba(71, 85, 105, 0.25)",
          duration: 0.3,
        },
        0.6
      );
    }
  }, [isOpen, triggerButton]);

  // Animación de cierre
  const handleClose = () => {
    if (modalRef.current && overlayRef.current) {
      const modal = modalRef.current;
      const overlay = overlayRef.current;
      
      // Obtener posición del botón trigger para cerrar hacia él
      let endX = 0;
      let endY = 0;
      
      if (triggerButton) {
        const buttonRect = triggerButton.getBoundingClientRect();
        endX = buttonRect.left + buttonRect.width / 2 - window.innerWidth / 2;
        endY = buttonRect.top + buttonRect.height / 2 - window.innerHeight / 2;
      }

      const tl = gsap.timeline({
        onComplete: () => onClose()
      });

      // Animar elementos internos primero
      const elements = modal.querySelectorAll('.animate-in');
      tl.to(elements, {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.2,
        stagger: 0.02,
        ease: "power2.in"
      });

      // Contraer el modal hacia el botón
      tl.to(modal, {
        scale: 0,
        x: endX,
        y: endY,
        opacity: 0,
        borderRadius: "50%",
        rotation: 15,
        duration: 0.5,
        ease: "back.in(1.7)",
      }, 0.15);

      // Fade out del overlay
      tl.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      }, 0.2);
    } else {
      onClose();
    }
  };

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto" style={{ minHeight: '-webkit-fill-available' }}>
      {/* Overlay con blur */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 -z-10 opacity-0"
        style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-5xl overflow-hidden my-auto"
      >
        
        {/* Botón de cerrar */}
        <button
          onClick={handleClose}
          className="animate-in absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-all hover:scale-110 hover:rotate-90"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contenido */}
        <div className="p-4 sm:p-5 lg:p-6">
          
          {/* Header */}
          <div className="animate-in text-center mb-4 sm:mb-5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              Contáctanos
            </h2>
            <div className="w-16 h-0.5 bg-slate-700 mx-auto mb-2"></div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              ¿Tienes un proyecto en mente? Completa el formulario.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
            
            {/* INFO DE CONTACTO */}
            <div className="animate-in bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-4 sm:p-5 text-white shadow-xl order-2 lg:order-1">
              <h3 className="text-base sm:text-lg font-bold mb-3">Información</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3">
                
                <div className="flex items-start gap-2 sm:gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-0.5 text-xs sm:text-sm">Email</h4>
                    <p className="text-slate-200 text-xs sm:text-sm break-words">kor4softsas@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-0.5 text-xs sm:text-sm">Teléfono</h4>
                    <p className="text-slate-200 text-xs sm:text-sm">+57 (318) 188-3915</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-0.5 text-xs sm:text-sm">Ubicación</h4>
                    <p className="text-slate-200 text-xs sm:text-sm">Cali, Colombia</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-0.5 text-xs sm:text-sm">Horario de Atención</h4>
                    <p className="text-slate-200 text-xs sm:text-sm">Lun - Vie: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Redes sociales */}
              <div className="hidden lg:block mt-3 pt-3 border-t border-white/20">
                <h4 className="font-semibold mb-2 text-xs">Síguenos</h4>
                <div className="flex gap-2 flex-wrap">
                  <a href="https://www.facebook.com/share/p/17k94rcDJb/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all hover:scale-110">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/kor4soft?igsh=MXRqeXNlZ3YycHc0dw==" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all hover:scale-110">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all hover:scale-110">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://github.com/kor4softsas" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all hover:scale-110">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* FORMULARIO */}
            <div className="animate-in bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-lg order-1 lg:order-2">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-xs font-semibold text-slate-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-700 focus:border-transparent outline-none transition-all"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-700 focus:border-transparent outline-none transition-all"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="telefono" className="block text-xs font-semibold text-slate-700 mb-1">
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-700 focus:border-transparent outline-none transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Asunto */}
                <div>
                  <label htmlFor="asunto" className="block text-xs font-semibold text-slate-700 mb-1">
                    Asunto *
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsSelectOpen(!isSelectOpen)}
                      className={`w-full px-3 py-2 text-sm text-left border rounded-xl focus:ring-2 focus:ring-slate-700 focus:border-transparent outline-none transition-all flex items-center justify-between bg-white ${
                        formData.asunto ? "text-slate-900" : "text-slate-400"
                      } ${isSelectOpen ? "border-slate-700 ring-2 ring-slate-700" : "border-slate-300"}`}
                    >
                      <span>
                        {formData.asunto 
                          ? subjectOptions.find(opt => opt.value === formData.asunto)?.label 
                          : "Selecciona un asunto"}
                      </span>
                      <svg 
                        className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isSelectOpen ? "rotate-180" : ""}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {isSelectOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setIsSelectOpen(false)} />
                          <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-auto py-1"
                          >
                            {subjectOptions.map((option) => (
                              <li
                                key={option.value}
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, asunto: option.value }));
                                  setIsSelectOpen(false);
                                }}
                                className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer transition-colors flex items-center justify-between"
                              >
                                {option.label}
                                {formData.asunto === option.value && (
                                  <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </li>
                            ))}
                          </motion.ul>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="mensaje" className="block text-xs font-semibold text-slate-700 mb-1">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 text-sm text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-700 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  />
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full px-4 py-2 text-sm bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all disabled:bg-slate-400 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                >
                  {status === "sending" ? "Enviando..." : status === "success" ? "¡Mensaje enviado!" : "Enviar mensaje"}
                </button>

                {/* Mensajes de estado */}
                {status === "success" && (
                  <div className="p-2.5 bg-green-50 border border-green-200 rounded-xl text-green-700 text-xs text-center">
                    ¡Gracias por contactarnos! Te responderemos pronto.
                  </div>
                )}

                {status === "error" && (
                  <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs text-center">
                    Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}