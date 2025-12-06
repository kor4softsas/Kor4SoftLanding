"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

// Variantes de animación para el modal
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn", delay: 0.1 }
  }
};

const modalVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: 30
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.8,
      staggerChildren: 0.07,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.97,
    y: 15,
    transition: { 
      duration: 0.2,
      ease: [0.4, 0, 1, 1]
    }
  }
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
};

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: ""
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isSelectOpen, setIsSelectOpen] = useState(false);

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

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto" style={{ minHeight: '-webkit-fill-available' }}>
          {/* Overlay con animación de fade suave */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 -z-10"
            style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            onClick={onClose}
          />

          {/* Modal Container con animación spring suave */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-5xl overflow-hidden my-auto"
          >
        
        {/* Botón de cerrar - Posición adaptativa */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-colors shadow-md"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contenido compacto */}
        <div className="p-4 sm:p-5 lg:p-6">
          
          {/* Header compacto con animación */}
          <motion.div variants={contentVariants} className="text-center mb-4 sm:mb-5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              Contáctanos
            </h2>
            <div className="w-16 h-0.5 bg-slate-700 mx-auto mb-2"></div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              ¿Tienes un proyecto en mente? Completa el formulario.
            </p>
          </motion.div>

          {/* Grid compacto con animación */}
          <motion.div variants={contentVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
            
            {/* INFO DE CONTACTO - Compacta */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-4 sm:p-5 text-white shadow-xl order-2 lg:order-1">
              <h3 className="text-base sm:text-lg font-bold mb-3">Información</h3>
              
              {/* Grid de información compacto */}
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

              {/* Redes sociales compactas */}
              <div className="hidden lg:block mt-3 pt-3 border-t border-white/20">
                <h4 className="font-semibold mb-2 text-xs">Síguenos</h4>
                <div className="flex gap-2 flex-wrap">
                  {/* Facebook */}
                  <a href="https://www.facebook.com/profile.php?viewas=100000686899395&id=61584353451934" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/kor4soft/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.567 5.784 2.296 7.15 2.234 8.416 2.176 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.417 3.757 1.319c-.902.902-1.188 2.014-1.247 3.295C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.059 1.281.345 2.393 1.247 3.295.902.902 2.014 1.188 3.295 1.247C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.345 3.295-1.247.902-.902 1.188-2.014 1.247-3.295.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.059-1.281-.345-2.393-1.247-3.295-.902-.902-2.014-1.188-3.295-1.247C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* FORMULARIO compacto */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-lg order-1 lg:order-2">
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
                  className="w-full px-4 py-2 text-sm bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
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
          </motion.div>
        </div>
      </motion.div>
    </div>
      )}
    </AnimatePresence>
  );
}
