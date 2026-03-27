import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de privacidad | Kor4Soft",
  description: "Informacion sobre recoleccion de datos, cookies y privacidad en Kor4Soft.",
};

export default function PrivacyPolicyPage() {
  const updatedAt = "26 de marzo de 2026";

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-bold text-slate-900">Politica de privacidad</h1>
        <p className="mt-2 text-sm text-slate-500">Ultima actualizacion: {updatedAt}</p>

        <section className="mt-8 space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">1. Responsable del tratamiento</h2>
          <p>
            Kor4Soft S.A.S. es responsable del tratamiento de datos personales recolectados en este sitio web.
            Para solicitudes sobre privacidad, puedes escribir a kor4softsas@gmail.com.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">2. Datos que recopilamos</h2>
          <p>Cuando usas nuestro formulario de contacto podemos recopilar:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Nombre completo.</li>
            <li>Correo electronico.</li>
            <li>Telefono (opcional).</li>
            <li>Asunto y mensaje.</li>
            <li>Datos tecnicos basicos como direccion IP y agente de usuario para seguridad y prevencion de abuso.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">3. Finalidad del tratamiento</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Responder solicitudes comerciales y de soporte.</li>
            <li>Gestionar seguimiento de oportunidades y comunicaciones.</li>
            <li>Proteger el sitio contra spam, abuso y actividad maliciosa.</li>
            <li>Medir rendimiento del sitio y monetizacion publicitaria conforme a consentimiento.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">4. Cookies, Google AdSense y terceros</h2>
          <p>
            Este sitio usa cookies y tecnologias similares. Google y otros proveedores pueden colocar y leer cookies,
            web beacons o identificadores para mostrar anuncios, medir su rendimiento y prevenir fraude.
          </p>
          <p>
            Si aceptas cookies no esenciales, autorizas el uso de almacenamiento para personalizacion y medicion.
            Si rechazas, limitamos el uso a funciones necesarias y consentimiento denegado para ads personalizados.
          </p>
          <p>
            Puedes consultar como Google usa la informacion en:
            <a
              className="ml-1 font-semibold text-slate-900 underline underline-offset-2"
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
            >
              policies.google.com/technologies/partner-sites
            </a>
            .
          </p>
        </section>

        <section className="mt-8 space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">5. Base legal y conservacion</h2>
          <p>
            Tratamos datos por consentimiento del titular y por interes legitimo para seguridad operativa.
            Conservamos datos por el tiempo necesario para atender la solicitud, cumplir obligaciones legales
            y mantener trazabilidad comercial razonable.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">6. Derechos del titular</h2>
          <p>
            Puedes solicitar acceso, actualizacion, rectificacion o eliminacion de tus datos personales,
            asi como revocar consentimiento cuando aplique, escribiendo a kor4softsas@gmail.com.
          </p>
        </section>
      </div>
    </main>
  );
}
