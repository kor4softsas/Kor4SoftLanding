import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminos de servicio | Kor4Soft",
  description: "Condiciones de uso del sitio web de Kor4Soft.",
};

export default function TermsOfServicePage() {
  const updatedAt = "26 de marzo de 2026";

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-bold text-slate-900">Terminos de servicio</h1>
        <p className="mt-2 text-sm text-slate-500">Ultima actualizacion: {updatedAt}</p>

        <section className="mt-8 space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">1. Aceptacion</h2>
          <p>
            Al acceder o usar este sitio aceptas estos terminos. Si no estas de acuerdo, no debes usar el sitio.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">2. Uso permitido</h2>
          <p>
            El contenido de este sitio tiene fines informativos y comerciales de Kor4Soft S.A.S. No esta permitido
            usarlo para actividades ilegales, fraude, suplantacion o afectacion de terceros.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">3. Propiedad intelectual</h2>
          <p>
            Marcas, logotipos, textos, diseno y activos del sitio son propiedad de Kor4Soft S.A.S. o de sus titulares.
            Queda prohibida su reproduccion no autorizada.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">4. Limitacion de responsabilidad</h2>
          <p>
            Kor4Soft no garantiza disponibilidad ininterrumpida del sitio ni ausencia total de errores.
            En ningun caso sera responsable por danos indirectos derivados del uso del sitio.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">5. Enlaces de terceros</h2>
          <p>
            Este sitio puede contener enlaces a servicios externos. Kor4Soft no controla ni asume responsabilidad
            sobre contenido, disponibilidad o politicas de esos terceros.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">6. Modificaciones</h2>
          <p>
            Podemos actualizar estos terminos en cualquier momento. La version vigente sera la publicada en esta ruta.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">7. Contacto y jurisdiccion</h2>
          <p>
            Para temas legales escribe a kor4softsas@gmail.com. Este sitio opera desde Colombia y se rige por la
            normativa aplicable en dicha jurisdiccion.
          </p>
        </section>
      </div>
    </main>
  );
}
