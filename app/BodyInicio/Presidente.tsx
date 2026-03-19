import { presidente } from "./quehacemoscontent";

export default function Presidente() {
  return (
    <section aria-label="presidente" className="w-full bg-red-800">
      <div className="mx-auto max-w-6xl px-6 py-16">

        <div className="flex items-center gap-3 mb-10">
          <span className="block w-1 h-8 bg-white" />
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">
            Presidente
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-red-900 p-8 border border-white/20">
          <div className="shrink-0 h-32 w-32 overflow-hidden bg-white/20 border-2 border-white/40">
            {presidente.foto ? (
              <img
                src={presidente.foto}
                alt={presidente.nombre}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-white/60 text-4xl font-bold">
                {presidente.nombre.charAt(0)}
              </div>
            )}
          </div>

          <div>
            <p className="text-xl font-black text-white uppercase">{presidente.nombre}</p>
            <p className="text-sm text-white/70 uppercase tracking-widest mt-1 mb-4">
              {presidente.rol}
            </p>
            <p className="text-white/90 leading-relaxed max-w-xl">{presidente.bio}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
