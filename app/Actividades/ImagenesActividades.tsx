"use client";
import { useEffect, useState } from "react";
import ModalGaleria from "./ModalGaleria";

type Actividad = { nombre: string; portada: string; total: number };

export default function ImagenesActividades() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(true);
  const [seleccionada, setSeleccionada] = useState<Actividad | null>(null);

  useEffect(() => {
    fetch("/api/imagenes")
      .then((r) => r.json())
      .then((data) => setActividades(data.actividades || []))
      .catch(() => setActividades([]))
      .finally(() => setLoading(false));
  }, []);

  // Convierte nombre de carpeta a título legible: "ActividadUtiles" → "Actividad Utiles"
  function toTitulo(nombre: string) {
    return nombre.replace(/([A-Z])/g, " $1").trim();
  }

  return (
    <>
      <section className="w-full bg-red-900 relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-16">

          <div className="flex items-center gap-3 mb-10">
            <span className="block w-1 h-8 bg-white" />
            <h2 className="text-2xl font-black text-white tracking-tight uppercase">
              Galería de actividades
            </h2>
          </div>

          {loading && (
            <p className="text-red-300 text-sm">Cargando actividades...</p>
          )}

          {!loading && actividades.length === 0 && (
            <p className="text-red-300 text-sm">No hay actividades disponibles aún.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-red-800">
            {actividades.map((act) => (
              <article
                key={act.nombre}
                className="group overflow-hidden bg-red-900 relative cursor-pointer"
                onClick={() => setSeleccionada(act)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={act.portada}
                    alt={toTitulo(act.nombre)}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 to-transparent" />

                  {/* Título */}
                  <p className="absolute bottom-3 left-4 text-white font-black text-sm uppercase tracking-wide">
                    {toTitulo(act.nombre)}
                  </p>

                  {/* Contador de fotos */}
                  <span className="absolute top-3 right-3 bg-red-800/80 text-white text-xs font-bold px-2 py-1 uppercase tracking-wide">
                    {act.total} {act.total === 1 ? "foto" : "fotos"}
                  </span>

                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-red-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-black text-xs uppercase tracking-widest border border-white px-4 py-2">
                      Ver galería
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="text-sm text-red-300 mt-6">
            Más imágenes se irán agregando con cada actividad.
          </p>
        </div>
      </section>

      {seleccionada && (
        <ModalGaleria
          actividad={{ title: toTitulo(seleccionada.nombre), carpeta: seleccionada.nombre }}
          onClose={() => setSeleccionada(null)}
        />
      )}
    </>
  );
}
