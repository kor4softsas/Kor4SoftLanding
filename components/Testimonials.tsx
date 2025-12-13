"use client";

import { InView } from "./InView";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "María González",
      position: "CEO",
      company: "Tech Solutions S.A.",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      text: "Kor4Soft transformó completamente nuestra operación. El sistema que desarrollaron aumentó nuestra productividad en un 40% y redujo errores significativamente. Altamente recomendados.",
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      position: "Director de TI",
      company: "Innovatech",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      text: "Profesionales, puntuales y con un conocimiento técnico excepcional. La app móvil que crearon superó todas nuestras expectativas. Un equipo con el que definitivamente trabajaremos de nuevo.",
    },
    {
      id: 3,
      name: "Laura Ramírez",
      position: "Gerente General",
      company: "Comercial Delta",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: "La automatización de procesos que implementaron nos ahorró más de 20 horas semanales. ROI inmediato. El soporte post-lanzamiento es excelente.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
          Lo que dicen nuestros clientes
        </h2>
        <div className="w-24 h-1 bg-slate-700 mx-auto mb-5"></div>
        <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto font-medium">
          La satisfacción de nuestros clientes es nuestra mejor carta de presentación
        </p>
      </div>

      {/* Grid de testimonios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {testimonials.map((testimonial, index) => (
          <InView
            key={testimonial.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-100 hover:shadow-2xl hover:border-slate-200 transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
              {/* Decoración superior */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Rating stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Texto del testimonio */}
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 flex-1">
                "{testimonial.text}"
              </p>

              {/* Información del cliente */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {testimonial.position}
                  </p>
                  <p className="text-xs text-slate-500">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </InView>
        ))}
      </div>
    </section>
  );
}
