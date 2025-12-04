"use client";

import { InView } from "./InView";

export default function Portfolio() {
  const proyectos = [
    {
      id: 1,
      nombre: "Fitovida",
      categoria: "Desarrollo web",
      descripcion: "Plataforma web completa para la venta, y gestión de prodcutos de  medicina natural con pasarelas de apgo integradas y autenticación.",
      tecnologias: ["Next.js ", "Node.js", "MySQL"],
      imagen: "/fitovida-products.png",
      href: "https://fitovida.k4soft.com",
      resultados: "Aumento del 40% en productividad",
    },
    {
      id: 2,
      nombre: "App Móvil de E-commerce",
      categoria: "Aplicación móvil",
      descripcion: "Aplicación nativa para iOS y Android con pasarela de pagos integrada y sistema de notificaciones.",
      tecnologias: ["React Native", "Firebase", "Stripe"],
      imagen: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      resultados: "10,000+ descargas en 3 meses",
    },
    {
      id: 3,
      nombre: "Sistema de Automatización",
      categoria: "Automatización",
      descripcion: "Herramienta de automatización de procesos empresariales que reduce tareas manuales en un 70%.",
      tecnologias: ["Python", "Laravel", "MySQL"],
      imagen: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      resultados: "Ahorro de 20 horas semanales",
    },
  ];

  return (
    <section id="portfolio" className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 max-w-7xl">
      {/* Header - Sistema de cajas */}
      <div className="text-center mb-10 sm:mb-14 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
          Proyectos destacados
        </h2>
        <div className="w-24 h-1 bg-slate-700 mx-auto mb-5"></div>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Casos de éxito que demuestran nuestra experiencia y compromiso con la excelencia
        </p>
      </div>

      {/* Grid de proyectos - Rearreglo con propósito */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {proyectos.map((proyecto, index) => (
          <InView
            key={proyecto.id}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
          <a href={proyecto.href} target="_blank">

            <div
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-2xl hover:border-slate-300 transition-all duration-300 flex flex-col h-full"
              >
              {/* Imagen del proyecto */}
              <div className="relative h-48 sm:h-56 bg-slate-200 overflow-hidden">
                <img
                  src={proyecto.imagen}
                  alt={proyecto.nombre}
                  className="w-full h-full object-cover"
                />
                {/* Badge de categoría */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-slate-700 text-white text-xs font-semibold rounded-full">
                    {proyecto.categoria}
                  </span>
                </div>
              </div>

            {/* Contenido */}
            <div className="p-5 sm:p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
                {proyecto.nombre}
              </h3>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
                {proyecto.descripcion}
              </p>

              {/* Tecnologías */}
              <div className="flex flex-wrap gap-2 mb-4">
                {proyecto.tecnologias.map((tech, index) => (
                  <span
                  key={index}
                  className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Resultados */}
              <div className="pt-4 border-t border-slate-200 mt-auto">
                <div className="flex items-center gap-2 text-slate-600">
                  <svg className="w-4 h-4 text-slate-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">{proyecto.resultados}</span>
                </div>
              </div>
            </div>
          </div>
                </a>
          </InView>
        ))}
      </div>
    </section>
  );
}
