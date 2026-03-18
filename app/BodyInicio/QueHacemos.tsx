import { queHacemos } from "./quehacemoscontent";

export default function QueHacemos() {
  return (
    <section aria-label="que-hacemos" className="w-full bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h3 className="text-2xl font-semibold mb-4">Qué hacemos</h3>
        <div className="space-y-4">
          {queHacemos.map((q, i) => (
            <div key={i}>
              <h4 className="font-medium">{q.title}</h4>
              <p className="text-sm text-zinc-700">{q.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
