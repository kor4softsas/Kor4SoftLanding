"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "¿Cuánto tiempo toma desarrollar un proyecto?",
      answer: "El tiempo varía según la complejidad del proyecto. Un sitio web básico puede tomar 2-4 semanas, mientras que una aplicación móvil compleja puede requerir 2-4 meses. Siempre proporcionamos un cronograma detallado en la etapa de consulta inicial.",
    },
    {
      question: "¿Trabajan con empresas pequeñas o solo con grandes corporaciones?",
      answer: "Trabajamos con empresas de todos los tamaños. Desde startups y pequeños negocios hasta medianas y grandes empresas. Adaptamos nuestros servicios y precios a las necesidades específicas de cada cliente.",
    },
    {
      question: "¿Ofrecen soporte y mantenimiento después del lanzamiento?",
      answer: "Sí, ofrecemos diferentes planes de soporte post-lanzamiento que incluyen actualizaciones, corrección de errores, optimización y nuevas funcionalidades. También proporcionamos capacitación para que tu equipo pueda gestionar el sistema.",
    },
    {
      question: "¿Qué tecnologías utilizan?",
      answer: "Utilizamos tecnologías modernas y probadas como React, Next.js, Node.js, Python, Laravel, y bases de datos como MongoDB y MySQL. Seleccionamos la mejor tecnología según las necesidades específicas de cada proyecto.",
    },
    {
      question: "¿Cómo es el proceso de trabajo?",
      answer: "Nuestro proceso tiene 4 etapas: 1) Consulta inicial para entender tus necesidades, 2) Diseño y planificación de la solución, 3) Desarrollo con entregas incrementales, y 4) Lanzamiento con soporte continuo. Mantenemos comunicación constante durante todo el proceso.",
    },
    {
      question: "¿Ofrecen garantía en sus desarrollos?",
      answer: "Sí, todos nuestros proyectos incluyen garantía de 3 meses contra defectos de programación. Además, realizamos pruebas exhaustivas antes de cada entrega para asegurar la calidad del producto final.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
          Preguntas frecuentes
        </h2>
        <div className="w-24 h-1 bg-slate-700 mx-auto mb-5"></div>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Resolvemos tus dudas más comunes
        </p>
      </div>

      {/* Accordion de preguntas */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Pregunta */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-slate-800 text-base sm:text-lg pr-4">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <svg
                  className="w-5 h-5 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </button>

            {/* Respuesta */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-slate-600 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

    </section>
  );
}
