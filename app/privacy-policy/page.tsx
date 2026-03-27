import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ParticlesBackground from "@/components/ParticlesBackground";

export const metadata: Metadata = {
  title: "Politica de privacidad | Kor4Soft",
  description: "Informacion sobre recoleccion de datos, cookies y privacidad en Kor4Soft.",
};

export default function PrivacyPolicyPage() {
  const updatedAt = "26 de marzo de 2026";

  const sections = [
    {
      title: "1. Responsable del tratamiento",
      body: [
        "Kor4Soft S.A.S. es responsable del tratamiento de datos personales recolectados en este sitio web.",
        "Para solicitudes sobre privacidad, puedes escribir a kor4softsas@gmail.com.",
      ],
    },
    {
      title: "2. Datos que recopilamos",
      body: [
        "Cuando usas nuestro formulario de contacto podemos recopilar: nombre completo, correo electronico, telefono (opcional), asunto y mensaje.",
        "Tambien recopilamos datos tecnicos basicos como direccion IP y agente de usuario para seguridad y prevencion de abuso.",
      ],
    },
    {
      title: "3. Finalidad del tratamiento",
      body: [
        "Responder solicitudes comerciales y de soporte.",
        "Gestionar seguimiento de oportunidades y comunicaciones.",
        "Proteger el sitio contra spam, abuso y actividad maliciosa.",
        "Medir rendimiento del sitio y monetizacion publicitaria conforme a consentimiento.",
      ],
    },
    {
      title: "4. Cookies, Google AdSense y terceros",
      body: [
        "Este sitio usa cookies y tecnologias similares. Google y otros proveedores pueden colocar y leer cookies, web beacons o identificadores para mostrar anuncios, medir rendimiento y prevenir fraude.",
        "Si aceptas cookies no esenciales, autorizas el uso de almacenamiento para personalizacion y medicion. Si rechazas, limitamos el uso a funciones necesarias y consentimiento denegado para ads personalizados.",
        "Puedes consultar como Google usa la informacion en policies.google.com/technologies/partner-sites.",
      ],
    },
    {
      title: "5. Base legal y conservacion",
      body: [
        "Tratamos datos por consentimiento del titular y por interes legitimo para seguridad operativa.",
        "Conservamos datos por el tiempo necesario para atender la solicitud, cumplir obligaciones legales y mantener trazabilidad comercial razonable.",
      ],
    },
    {
      title: "6. Derechos del titular",
      body: [
        "Puedes solicitar acceso, actualizacion, rectificacion o eliminacion de tus datos personales, asi como revocar consentimiento cuando aplique, escribiendo a kor4softsas@gmail.com.",
      ],
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-55">
        <ParticlesBackground />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/90 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-blue-100/80 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-slate-100/80 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl backdrop-blur-sm sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 sm:gap-5">
              <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <Image
                  src="/Logo.png"
                  alt="Kor4Soft Logo"
                  width={44}
                  height={44}
                  className="rounded-lg bg-white object-contain"
                  priority
                />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Kor4Soft</p>
                  <p className="text-sm font-bold text-slate-800 sm:text-base">Centro legal</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Legal
                </span>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  Privacy Policy
                </span>
              </div>
            </div>

            <h1 className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Politica de privacidad
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              En Kor4Soft protegemos la informacion personal de nuestros usuarios y clientes.
              Aqui explicamos de forma clara que datos tratamos, con que objetivo y como puedes ejercer tus derechos.
            </p>

            <div className="mt-5 inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
              Ultima actualizacion: <span className="ml-1 font-semibold">{updatedAt}</span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contacto privacidad</p>
                <p className="mt-1 text-sm font-medium text-slate-800">kor4softsas@gmail.com</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Google y cookies</p>
                <a
                  className="mt-1 inline-block text-sm font-medium text-slate-800 underline underline-offset-2"
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver como Google usa la informacion
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-slate-300"
              >
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{section.title}</h2>
                <div className="mt-4 space-y-3">
                  {section.body.map((paragraph, index) => (
                    <p key={index} className="text-sm leading-relaxed text-slate-700 sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-lg">
            <p className="text-sm leading-relaxed sm:text-base">
              Si tienes preguntas sobre esta politica o deseas ejercer tus derechos, puedes escribirnos a
              <span className="ml-1 font-semibold">kor4softsas@gmail.com</span>.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                Volver al inicio
              </Link>
              <Link
                href="/terms-of-service"
                className="rounded-xl border border-slate-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-slate-300"
              >
                Ver terminos de servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
