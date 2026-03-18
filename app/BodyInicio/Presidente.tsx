import { presidente } from "./quehacemoscontent";

export default function Presidente() {
  return (
    <section aria-label="presidente" className="w-full bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h3 className="text-2xl font-semibold mb-4">Presidente</h3>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="h-28 w-28 rounded-full overflow-hidden bg-zinc-200">
            {presidente.foto ? (
              <img
                src={presidente.foto}
                alt={presidente.nombre}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>

          <div>
            <p className="font-medium">{presidente.nombre}</p>
            <p className="text-sm text-zinc-700">{presidente.rol}</p>
            <p className="mt-2 text-sm text-zinc-700">{presidente.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
