import { actividades } from "./quehacemoscontent";

export default function Actividades() {
  return (
    <section aria-label="actividades-recientes" className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">

        <div className="flex items-center gap-3 mb-10">
          <span className="block w-1 h-8 bg-red-800" />
          <h2 className="text-2xl font-black text-red-900 tracking-tight uppercase">
            Actividades recientes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {actividades.map((a) => (
            <article
              key={a.id}
              className="group overflow-hidden border border-red-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative h-44 bg-red-100 overflow-hidden">
                <img
                  src={a.src}
                  alt={a.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 to-transparent" />
              </div>
              <div className="p-4 border-t-2 border-red-800">
                <h3 className="font-bold text-red-900 uppercase text-sm tracking-wide">{a.title}</h3>
                <p className="text-sm text-red-900/50 mt-1">
                  Descripción breve de la actividad.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
