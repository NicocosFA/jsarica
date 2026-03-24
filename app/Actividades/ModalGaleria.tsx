"use client";
import { useEffect, useState } from "react";

export default function ModalGaleria({ actividad, onClose }: { actividad: any; onClose: () => void }) {
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cargarImagenes = async () => {
      try {
        setIsLoading(true);
        // Convertir el título a un formato de carpeta (eliminar espacios y caracteres especiales)
        const nombreCarpeta = actividad.title
          .toLowerCase()
          .replace(/\s+/g, "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        // Intentar cargar las imágenes de la carpeta pública
        const basePath = `/images/Actividades/${nombreCarpeta}/`;
        
        // Cargar lista de imágenes desde la API o metadata
        const response = await fetch(`/api/imagenes?carpeta=${nombreCarpeta}`);
        
        if (response.ok) {
          const data = await response.json();
          setImagenes(data.imagenes || []);
        } else {
          // Fallback: usar las imágenes del objeto actividad
          setImagenes(
            (actividad.images || []).map((img: any) => img.src)
          );
        }
      } catch (error) {
        console.error("Error cargando imágenes:", error);
        // Fallback: usar las imágenes del objeto actividad
        setImagenes(
          (actividad.images || []).map((img: any) => img.src)
        );
      } finally {
        setIsLoading(false);
      }
    };

    cargarImagenes();
  }, [actividad]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imagenes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative bg-red-900 rounded-lg shadow-2xl max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-red-800">
          <h3 className="text-white font-bold text-lg">{actividad.title}</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-red-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Imagen principal */}
        <div className="relative bg-black/50 aspect-video overflow-hidden">
          {imagenes.length > 0 ? (
            <img
              src={imagenes[currentIndex]}
              alt={`Imagen ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              No hay imágenes disponibles
            </div>
          )}
        </div>

        {/* Controles */}
        {imagenes.length > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-red-800">
            <button
              onClick={handlePrev}
              className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              ← Anterior
            </button>
            <span className="text-white font-medium">
              {currentIndex + 1} / {imagenes.length}
            </span>
            <button
              onClick={handleNext}
              className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Siguiente →
            </button>
          </div>
        )}

        {/* Thumbnail strip */}
        {imagenes.length > 1 && (
          <div className="border-t border-red-800 p-3 bg-red-950 overflow-x-auto">
            <div className="flex gap-2">
              {imagenes.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded border-2 transition-all ${
                    idx === currentIndex ? "border-white" : "border-red-700 hover:border-red-500"
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover rounded" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
