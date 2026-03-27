import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ParticlesBackground from "@/components/ParticlesBackground";

export const metadata: Metadata = {
  title: "Terminos de servicio | Kor4Soft",
  description: "Condiciones de uso del sitio web de Kor4Soft.",
};

export default function TermsOfServicePage() {
  const updatedAt = "26 de marzo de 2026";

  const sections = [
    {
      title: "1. Aceptacion",
      body: [
        "Al acceder o usar este sitio aceptas estos terminos. Si no estas de acuerdo, no debes usar el sitio.",
      ],
    },
    {
      title: "2. Uso permitido",
      body: [
        "El contenido de este sitio tiene fines informativos y comerciales de Kor4Soft S.A.S.",
        "No esta permitido usarlo para actividades ilegales, fraude, suplantacion o afectacion de terceros.",
      ],
    },
    {
      title: "3. Propiedad intelectual",
      body: [
        "Marcas, logotipos, textos, diseno y activos del sitio son propiedad de Kor4Soft S.A.S. o de sus titulares.",
        "Queda prohibida su reproduccion no autorizada.",
      ],
    },
    {
      title: "4. Limitacion de responsabilidad",
      body: [
        "Kor4Soft no garantiza disponibilidad ininterrumpida del sitio ni ausencia total de errores.",
        "En ningun caso sera responsable por danos indirectos derivados del uso del sitio.",
      ],
    },
    {
      title: "5. Enlaces de terceros",
      body: [
        "Este sitio puede contener enlaces a servicios externos. Kor4Soft no controla ni asume responsabilidad sobre contenido, disponibilidad o politicas de esos terceros.",
      ],
    },
    {
      title: "6. Modificaciones",
      body: [
        "Podemos actualizar estos terminos en cualquier momento. La version vigente sera la publicada en esta ruta.",
      ],
    },
    {
      title: "7. Contacto y jurisdiccion",
      body: [
        "Para temas legales escribe a kor4softsas@gmail.com.",
        "Este sitio opera desde Colombia y se rige por la normativa aplicable en dicha jurisdiccion.",
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
                  Terms of Service
                </span>
              </div>
            </div>

            <h1 className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Terminos de servicio
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Estas condiciones regulan el uso del sitio web de Kor4Soft y establecen derechos, obligaciones y
              limites aplicables para usuarios y visitantes.
            </p>

            <div className="mt-5 inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
              Ultima actualizacion: <span className="ml-1 font-semibold">{updatedAt}</span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contacto legal</p>
                <p className="mt-1 text-sm font-medium text-slate-800">kor4softsas@gmail.com</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Documento relacionado</p>
                <Link href="/privacy-policy" className="mt-1 inline-block text-sm font-medium text-slate-800 underline underline-offset-2">
                  Ver politica de privacidad
                </Link>
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
              Si necesitas aclaraciones legales sobre el uso del sitio, puedes escribirnos a
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
                href="/privacy-policy"
                className="rounded-xl border border-slate-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-slate-300"
              >
                Ver politica de privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
