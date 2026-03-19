import { queHacemos } from "./quehacemoscontent";

export default function QueHacemos() {
  return (
    <section aria-label="que-hacemos" className="w-full bg-transparent relative">
      <div className="mx-auto max-w-6xl px-6 py-16">

        <div className="flex items-center gap-3 mb-10">
          <span className="block w-1 h-8 bg-red-800" />
          <h2 className="text-2xl font-black text-red-900 tracking-tight uppercase">
            Qué hacemos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {queHacemos.map((q, i) => (
            <div
              key={i}
              className="bg-white border border-red-200 p-6 hover:border-red-600 transition-colors duration-300 shadow-sm"
            >
              <div className="w-8 h-8 bg-red-800 flex items-center justify-center mb-4">
                <span className="text-white font-bold text-sm">{i + 1}</span>
              </div>
              <h3 className="font-bold text-red-900 mb-2 uppercase text-sm tracking-wide">{q.title}</h3>
              <p className="text-sm text-red-900/60 leading-relaxed">{q.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* sin fade */}
    </section>
  );
}
