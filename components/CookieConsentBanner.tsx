"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ConsentChoice = "granted" | "denied";

const CONSENT_KEY = "k4_cookie_consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function applyConsent(choice: ConsentChoice) {
  const granted = choice === "granted";
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
  });
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [decisionMade, setDecisionMade] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved === "granted" || saved === "denied") {
      applyConsent(saved);
      setDecisionMade(true);
      return;
    }

    setVisible(true);
    setDecisionMade(false);
  }, []);

  const handleConsent = (choice: ConsentChoice) => {
    localStorage.setItem(CONSENT_KEY, choice);
    applyConsent(choice);
    setDecisionMade(true);
    setVisible(false);
  };

  const handleOpenPreferences = () => {
    setVisible(true);
  };

  return (
    <>
      {visible && (
        <div className="fixed bottom-4 left-4 right-4 z-[120] mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
          <p className="text-sm text-slate-700">
            Usamos cookies y tecnologias similares para medir trafico y monetizar con Google AdSense.
            Puedes aceptar o rechazar cookies no esenciales. Revisa nuestra{" "}
            <Link href="/privacy-policy" className="font-semibold text-slate-900 underline underline-offset-2">
              politica de privacidad
            </Link>{" "}
            y como Google usa datos en{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-900 underline underline-offset-2"
            >
              sitios de partners
            </a>
            .
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => handleConsent("denied")}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => handleConsent("granted")}
              className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {decisionMade && !visible && (
        <button
          type="button"
          onClick={handleOpenPreferences}
          className="fixed bottom-4 right-4 z-[110] rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-lg hover:bg-slate-50"
          aria-label="Abrir preferencias de cookies"
        >
          Cookies
        </button>
      )}
    </>
  );
}
