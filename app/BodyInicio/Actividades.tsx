import { actividades } from "./quehacemoscontent";

export default function Actividades() {
  return (
    <section aria-label="actividades-recientes" className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">

        {/* Encabezado con acento rojo */}
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-1 h-8 bg-red-600 rounded-sm" />
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Actividades recientes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {actividades.map((a) => (
            <article
              key={a.id}
              className="group overflow-hidden rounded-sm border border-zinc-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-44 bg-zinc-200 overflow-hidden">
                <img
                  src={a.src}
                  alt={a.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-4 border-t-2 border-red-600">
                <h3 className="font-semibold text-zinc-900">{a.title}</h3>
                <p className="text-sm text-zinc-500 mt-1">
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
