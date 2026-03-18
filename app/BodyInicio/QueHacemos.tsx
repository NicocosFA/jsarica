import { queHacemos } from "./quehacemoscontent";

export default function QueHacemos() {
  return (
    <section aria-label="que-hacemos" className="w-full bg-zinc-50 border-t border-zinc-100">
      <div className="mx-auto max-w-6xl px-6 py-16">

        <div className="flex items-center gap-3 mb-10">
          <span className="block w-1 h-8 bg-red-600 rounded-sm" />
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Qué hacemos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {queHacemos.map((q, i) => (
            <div
              key={i}
              className="bg-white rounded-sm border border-zinc-100 shadow-sm p-6 hover:border-red-200 transition-colors"
            >
              <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center mb-4">
                <span className="text-white font-bold text-sm">{i + 1}</span>
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2">{q.title}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{q.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
