"use client";

import { useEffect, useMemo, useState, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

function ParticlesBackgroundComponent() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 30, // Reducido para mejor rendimiento
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.4,
            },
          },
        },
      },
      particles: {
        color: {
          value: "#94a3b8", // slate-400
        },
        links: {
          color: "#cbd5e1", // slate-300
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1.2,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 0.8,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            width: 1400,
            height: 900,
          },
          value: 40, // Reducido para mejor rendimiento
        },
        opacity: {
          value: 0.5, // Valor fijo para mejor rendimiento
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 2, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <>
      {/* Fondo estático visible inmediatamente mientras cargan las partículas */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${init ? 'opacity-0' : 'opacity-100'}`}
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(148, 163, 184, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(148, 163, 184, 0.1) 0%, transparent 50%)',
        }}
      >
        {/* Puntos estáticos simulando partículas */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(148, 163, 184, 0.4) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>
      {init && (
        <Particles
          id="tsparticles"
          options={options}
          className="absolute inset-0 pointer-events-none animate-fade-in"
        />
      )}
    </>
  );
}

// Memoizar para evitar re-renders innecesarios
export default memo(ParticlesBackgroundComponent);
