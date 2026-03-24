"use client";
import { useEffect, useState } from "react";
import ModalGaleria from "./ModalGaleria";

export default function ImagenesActividades() {
  const [actividades, setActividades] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [actividadSeleccionada, setActividadSeleccionada] = useState<any>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("siteContent");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setActividades(parsed.actividades || []);
    } catch (e) {
      // ignore
    }
  }, []);

  const fallback = [
    { title: "Donación de útiles escolares", images: [{ src: "/images/Actividades/ActividadUtiles/ActividadUtiles.jpg" }] },
  ];

  const list = actividades.length ? actividades : fallback;

  const handleImageClick = (actividad: any) => {
    setActividadSeleccionada(actividad);
    setModalOpen(true);
  };

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

          <div className="space-y-8">
            {list.map((act, ai) => (
              <div key={ai}>
                <h3 className="text-white font-bold mb-3">{act.title || `Actividad ${ai + 1}`}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-red-800">
                  {(act.images || [{ src: act.src }]).map((img: any, i: number) => (
                    <article 
                      key={i} 
                      className="group overflow-hidden bg-red-900 relative cursor-pointer"
                      onClick={() => handleImageClick(act)}
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={img.src} 
                          alt={img.alt || act.title || ""} 
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 to-transparent" />
                        <p className="absolute bottom-3 left-4 text-white font-bold text-sm uppercase tracking-wide">
                          {img.alt || act.title || "Imagen"}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-red-300 mt-6">
            Más imágenes se irán agregando con cada actividad.
          </p>
        </div>
      </section>
      
      {modalOpen && (
        <ModalGaleria 
          actividad={actividadSeleccionada} 
          onClose={() => setModalOpen(false)} 
        />
      )}
    </>
  );
}
