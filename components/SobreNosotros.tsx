"use client";

import { InView } from "./InView";

export default function SobreNosotros() {
  return (
    <section id="sobre-nosotros" className="container mx-auto px-4 py-16 sm:py-20 lg:py-24 max-w-7xl">
      {/* Header - Sistema de cajas con jerarquía clara */}
      <div className="text-center mb-10 sm:mb-14 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
          Sobre nosotros
        </h2>
        <div className="w-24 h-1 bg-slate-700 mx-auto mb-5"></div>
        <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto font-medium">
          Conoce más sobre nuestra empresa y nuestra misión
        </p>
      </div>

      {/* Rearreglo con propósito: Mobile apilado, Desktop lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* Caja de Texto - Prioridad en mobile */}
        <InView
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.6 }}
          className="space-y-5 sm:space-y-6 order-1 lg:order-1"
        >
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Tu socio tecnológico de confianza
          </h3>
          
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Somos un equipo apasionado por la tecnología y comprometido con el éxito de nuestros clientes. 
            En <strong className="text-slate-900">Kor4Soft</strong>, creemos que cada proyecto es único y merece una solución personalizada 
            que se adapte perfectamente a las necesidades específicas de tu negocio.
          </p>
          
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Nuestra metodología de trabajo se basa en la comunicación constante, la transparencia y la entrega 
            de resultados de calidad. Trabajamos con un enfoque ágil que nos permite adaptarnos rápidamente a los 
            cambios y garantizar que cada línea de código cumpla con los más altos estándares de calidad y seguridad.
          </p>
          
          {/* Tags - Fluyen y se reorganizan */}
          <div className="flex flex-wrap gap-3 pt-4">
            <div className="px-4 py-2 bg-slate-100 text-slate-700 border border-slate-300 rounded-full text-sm font-semibold">
              Desarrollo Web
            </div>
            <div className="px-4 py-2 bg-slate-100 text-slate-700 border border-slate-300 rounded-full text-sm font-semibold">
              Aplicaciones Móviles
            </div>
            <div className="px-4 py-2 bg-slate-100 text-slate-700 border border-slate-300 rounded-full text-sm font-semibold">
              Automatización
            </div>
            <div className="px-4 py-2 bg-slate-100 text-slate-700 border border-slate-300 rounded-full text-sm font-semibold">
              Consultoría Tecnológica
            </div>
          </div>
        </div>
        </InView>

        {/* Caja de Características - Orden 2 en mobile, 2 en desktop */}
        <InView
          variants={{
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-2 lg:order-2"
        >
        <div>
          <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200">
            <div className="space-y-4">
              
              {/* Experiencia Comprobada */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-base mb-1">Experiencia Comprobada</h4>
                    <p className="text-slate-700 text-sm mb-1.5">
                      Años de experiencia en desarrollo de software de alta calidad
                    </p>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Proyectos exitosos entregados</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Equipo Profesional */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-base mb-1">Equipo Profesional</h4>
                    <p className="text-slate-700 text-sm mb-1.5">
                      Desarrolladores altamente capacitados y certificados en tecnologías modernas
                    </p>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Certificaciones y formación continua</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soluciones Innovadoras */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-base mb-1">Soluciones Innovadoras</h4>
                    <p className="text-slate-700 text-sm mb-1.5">
                      Tecnología de vanguardia y mejores prácticas de la industria
                    </p>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>Stack tecnológico actualizado</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soporte Continuo */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-base mb-1">Soporte Continuo</h4>
                    <p className="text-slate-700 text-sm mb-1.5">
                      Acompañamiento y mantenimiento post-entrega para garantizar el éxito
                    </p>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Disponibilidad 24/7 para tu proyecto</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </InView>
      </div>
    </section>
  );
}
