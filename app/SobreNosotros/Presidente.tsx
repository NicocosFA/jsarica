export default function PresidenteSection() {
  return (
    <section className="w-full bg-red-900">
      <div className="mx-auto max-w-6xl px-6 py-16">

        <div className="flex items-center gap-3 mb-10">
          <span className="block w-1 h-8 bg-white" />
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">Presidente Regional</h2>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-red-900 p-8 border border-white/20">
          <div className="shrink-0 h-36 w-36 overflow-hidden bg-red-300 border-2 border-red-400">
            <img
              src="/images/presidente/Allende_1970-1973_(cropped).jpg"
              alt="Presidente"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1">
            <p className="text-2xl font-black text-white uppercase">Juan Pérez</p>
            <p className="text-xs text-white/60 uppercase tracking-[0.3em] mt-1 mb-6">
              Presidente · JS Arica y Parinacota
            </p>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Juan coordina las actividades y representa a la organización en eventos públicos. Tiene amplia experiencia en trabajo comunitario y militancia política desde temprana edad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-red-800">
              {[
                { label: "Cargo",    value: "Presidente Regional" },
                { label: "Región",   value: "Arica y Parinacota"  },
                { label: "Militante desde", value: "2018"         },
              ].map((item) => (
                <div key={item.label} className="bg-red-900 px-4 py-3">
                  <p className="text-white/40 text-xs uppercase tracking-widest">{item.label}</p>
                  <p className="text-white font-bold text-sm mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
