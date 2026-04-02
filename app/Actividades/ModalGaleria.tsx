"use client";
import { useEffect, useState } from "react";

type Props = {
  actividad: { title: string; carpeta: string };
  onClose: () => void;
};

export default function ModalGaleria({ actividad, onClose }: Props) {
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentIndex(0);
    setLoading(true);
    fetch(`/api/imagenes?carpeta=${actividad.carpeta}`)
      .then((r) => r.json())
      .then((data) => setImagenes(data.imagenes || []))
      .catch(() => setImagenes([]))
      .finally(() => setLoading(false));
  }, [actividad.carpeta]);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrentIndex((i) => (i + 1) % imagenes.length);
      if (e.key === "ArrowLeft") setCurrentIndex((i) => (i - 1 + imagenes.length) % imagenes.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [imagenes.length, onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-red-900 w-full max-w-4xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-800">
          <div>
            <h3 className="text-white font-black uppercase tracking-wide">{actividad.title}</h3>
            {!loading && (
              <p className="text-red-400 text-xs mt-0.5">{imagenes.length} {imagenes.length === 1 ? "foto" : "fotos"}</p>
            )}
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Imagen principal */}
        <div className="relative bg-black aspect-video flex items-center justify-center">
          {loading && <p className="text-white/50 text-sm">Cargando...</p>}

          {!loading && imagenes.length === 0 && (
            <p className="text-white/50 text-sm">No hay imágenes disponibles</p>
          )}

          {!loading && imagenes.length > 0 && (
            <>
              <img
                src={imagenes[currentIndex]}
                alt={`${actividad.title} — foto ${currentIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {/* Flechas */}
              {imagenes.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentIndex((i) => (i - 1 + imagenes.length) % imagenes.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 transition-colors"
                    aria-label="Anterior"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentIndex((i) => (i + 1) % imagenes.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 transition-colors"
                    aria-label="Siguiente"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Contador */}
                  <span className="absolute bottom-3 right-4 bg-black/60 text-white text-xs px-2 py-1 font-mono">
                    {currentIndex + 1} / {imagenes.length}
                  </span>
                </>
              )}
            </>
          )}
        </div>

        {/* Thumbnails */}
        {!loading && imagenes.length > 1 && (
          <div className="border-t border-red-800 bg-red-950 p-3 overflow-x-auto">
            <div className="flex gap-2">
              {imagenes.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-shrink-0 w-16 h-16 border-2 transition-all overflow-hidden ${
                    idx === currentIndex ? "border-white" : "border-red-700 hover:border-red-400"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
