const imagenes = [
  { src: "/images/Actividades/ActividadUtiles.jpg", title: "Donación de útiles escolares" },
  { src: "/images/Actividades/07-01-1904-JS-Bilbao.webp", title: "Actividad JS Bilbao" },
  { src: "/images/juventud-socialista-conce-1024x698-1-1.jpg", title: "Juventud Socialista Concepción" },
];

export default function ImagenesActividades() {
  return (
    <section className="w-full bg-red-900 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-16">

        <div className="flex items-center gap-3 mb-10">
          <span className="block w-1 h-8 bg-white" />
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">
            Galería de actividades
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-red-800">
          {imagenes.map((img, i) => (
            <article key={i} className="group overflow-hidden bg-red-900 relative">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={img.src}
                  alt={img.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 to-transparent" />
                <p className="absolute bottom-3 left-4 text-white font-bold text-sm uppercase tracking-wide">
                  {img.title}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="text-sm text-red-300 mt-6">
          Más imágenes se irán agregando con cada actividad.
        </p>
      </div>
    </section>
  );
}
