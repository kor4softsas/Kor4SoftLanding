"use client";

import { InView } from "./InView";

export default function MisionVision() {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
          Nuestra esencia
        </h2>
        <div className="w-24 h-1 bg-slate-700 mx-auto mb-5"></div>
        <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto font-medium">
          Los principios que guían nuestro camino y definen nuestro propósito
        </p>
      </div>

      {/* Grid de Misión y Visión */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Misión */}
        <InView
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
            {/* Icono y título */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">Misión</h3>
            </div>

            {/* Contenido */}
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed flex-1">
              Kor4soft se caracteriza por <strong className="text-slate-900">diseñar y desarrollar soluciones digitales eficientes, seguras y accesibles</strong> que impulsen la productividad, automatización y transformación tecnológica de las empresas y emprendedores del país.
            </p>
            
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4">
              Combinamos talento técnico, diseño centrado en el usuario y asesoría especializada para ofrecer <strong className="text-slate-900">herramientas innovadoras</strong> que respondan a necesidades reales y generen impacto sostenible en el territorio.
            </p>
          </div>
        </InView>

        {/* Visión */}
        <InView
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-6 sm:p-8 shadow-lg text-white hover:shadow-xl transition-all duration-300 h-full flex flex-col">
            {/* Icono y título */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold">Visión</h3>
            </div>

            {/* Contenido */}
            <p className="text-slate-100 text-sm sm:text-base leading-relaxed flex-1">
              Ser para <strong className="text-white">2030 el principal referente en tecnología y desarrollo digital en Colombia</strong>, reconocido por crear software de alta calidad, integrar servicios inteligentes y acompañar a las organizaciones del país en su transición hacia ecosistemas digitales modernos, competitivos y sostenibles.
            </p>
            
            <p className="text-slate-100 text-sm sm:text-base leading-relaxed mt-4">
              Aspiramos a convertirnos en un <strong className="text-white">referente nacional de innovación, excelencia y confianza</strong> para empresas de todos los tamaños.
            </p>
          </div>
        </InView>

      </div>
    </section>
  );
}
