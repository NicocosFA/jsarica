"use client";
import { useEffect, useState } from "react";
import {
  heroTitle, heroSubtitle, presidente, actividades, carousel, queHacemos,
} from "../BodyInicio/quehacemoscontent";
import { misionVision, historia, hitos, conmemoraciones } from "../SobreNosotros/sobrenosotroscontent";
import { comoTrabajamos, infoParticipacion } from "../Actividades/actividadescontent";
import { contactoInfo, redesSociales, llamarMilitar } from "../Contacto/contactocontent";

function readStored(key: string) {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : null; } catch { return null; }
}

const TABS = [
  { id: "Inicio",        icon: "🏠", label: "Inicio"        },
  { id: "Actividades",   icon: "📅", label: "Actividades"   },
  { id: "Sobre Nosotros",icon: "📖", label: "Sobre Nosotros"},
  { id: "Contacto",      icon: "📬", label: "Contacto"      },
] as const;
type Tab = typeof TABS[number]["id"];

/* ── Componentes de UI reutilizables ── */
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</label>
      {hint && <p className="text-xs text-slate-500 mb-2">{hint}</p>}
      {children}
    </div>
  );
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full bg-slate-800 text-white border border-slate-600 focus:border-red-500 focus:outline-none px-3 py-2 rounded-lg text-sm transition-colors placeholder-slate-500" />;
}

function Textarea({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="w-full bg-slate-800 text-white border border-slate-600 focus:border-red-500 focus:outline-none px-3 py-2 rounded-lg text-sm transition-colors placeholder-slate-500 resize-none" />;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-slate-800/50 border border-slate-700 rounded-xl p-4 ${className}`}>{children}</div>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4 mt-6">
      <span className="block w-1 h-5 bg-red-600 rounded-full" />
      <h3 className="text-sm font-bold text-white uppercase tracking-widest">{children}</h3>
    </div>
  );
}

function SaveBar({ onSave, onReset }: { onSave: () => void; onReset: () => void }) {
  const [saved, setSaved] = useState(false);
  function handleSave() { onSave(); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700">
      <button onClick={onReset} className="text-xs text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-2">
        Restablecer valores por defecto
      </button>
      <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-widest transition-all ${saved ? "bg-green-600 text-white" : "bg-red-700 hover:bg-red-600 text-white"}`}>
        {saved ? "✓ Guardado" : "Guardar cambios"}
      </button>
    </div>
  );
}

function DeleteBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="text-xs text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1 mt-2">
      <span>✕</span> Eliminar
    </button>
  );
}

function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick}
      className="mt-3 flex items-center gap-2 text-sm text-red-400 hover:text-red-300 border border-dashed border-red-800 hover:border-red-600 px-4 py-2 rounded-lg w-full justify-center transition-colors">
      + {label}
    </button>
  );
}

/* ── Panel principal ── */
export default function PanelAdmin() {
  const [tab, setTab] = useState<Tab>("Inicio");

  const [content, setContent] = useState<any>(() => ({
    heroTitle: heroTitle ?? "", heroSubtitle: heroSubtitle ?? "",
    presidente: presidente ?? {}, actividades: actividades ?? [],
    carousel: carousel ?? [], queHacemos: queHacemos ?? [],
  }));
  const [sobre, setSobre] = useState(() => ({
    misionVision: { ...misionVision }, historia: { ...historia },
    hitos: [...hitos], conmemoraciones: [...conmemoraciones],
  }));
  const [actividadesTab, setActividadesTab] = useState(() => ({
    comoTrabajamos: [...comoTrabajamos], infoParticipacion: { ...infoParticipacion },
  }));
  const [contacto, setContacto] = useState(() => ({
    contactoInfo: { ...contactoInfo }, redesSociales: [...redesSociales],
    llamarMilitar: { ...llamarMilitar, razones: [...llamarMilitar.razones] },
  }));

  const defaultMotivacion = { titulo: "El cambio lo hacemos juntos", subtitulo: "La Juventud Socialista te necesita", cuerpo: "No importa de dónde vengas ni cuánto sabes de política. Lo que importa es que quieres un mundo más justo.", cta: "Quiero ser parte", ctaUrl: "/Contacto" };
  const [motivacion, setMotivacion] = useState<any>(() => ({ ...defaultMotivacion }));

  useEffect(() => {
    const s = readStored("siteContent"); if (s) setContent((c: any) => ({ ...c, ...s }));
    const sn = readStored("sobreNosotrosContent"); if (sn) setSobre((c: any) => ({ ...c, ...sn }));
    const ct = readStored("contactoContent"); if (ct) setContacto((c: any) => ({ ...c, ...ct }));
    const at = readStored("actividadesContent"); if (at) setActividadesTab((c: any) => ({ ...c, ...at }));
    const mv = readStored("motivacionContent"); if (mv) setMotivacion((c: any) => ({ ...c, ...mv }));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* ── Sidebar ── */}
      <aside className="w-56 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="px-6 py-6 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="block w-1 h-6 bg-red-600 rounded-full" />
            <span className="text-white font-black text-sm uppercase tracking-widest">Admin</span>
          </div>
          <p className="text-slate-500 text-xs pl-3">Panel de control</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                tab === t.id
                  ? "bg-red-700 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}>
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-slate-800">
          <a href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">← Ver sitio</a>
        </div>
      </aside>

      {/* ── Contenido ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-8">

          {/* Header de sección */}
          <div className="mb-8">
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">
              {TABS.find((t) => t.id === tab)?.label}
            </h1>
            <p className="text-slate-500 text-sm mt-1">Edita el contenido de esta sección del sitio.</p>
          </div>

          {/* ── INICIO ── */}
          {tab === "Inicio" && (
            <>
              <SectionTitle>Carousel</SectionTitle>
              <Field label="Subtítulo" hint="Texto que aparece bajo el título principal del hero.">
                <Textarea rows={3} value={content.heroSubtitle} onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })} />
              </Field>

              <SectionTitle>Presidente</SectionTitle>
              <Field label="Nombre"><Input value={content.presidente?.nombre ?? ""} onChange={(e) => setContent({ ...content, presidente: { ...content.presidente, nombre: e.target.value } })} placeholder="Nombre completo" /></Field>
              <Field label="Rol"><Input value={content.presidente?.rol ?? ""} onChange={(e) => setContent({ ...content, presidente: { ...content.presidente, rol: e.target.value } })} placeholder="Cargo o rol" /></Field>
              <Field label="Biografía"><Textarea rows={4} value={content.presidente?.bio ?? ""} onChange={(e) => setContent({ ...content, presidente: { ...content.presidente, bio: e.target.value } })} placeholder="Descripción breve..." /></Field>

              <SectionTitle>Qué hacemos</SectionTitle>
              <div className="space-y-3">
                {content.queHacemos.map((q: any, idx: number) => (
                  <Card key={idx}>
                    <Field label={`Ítem ${idx + 1} — Título`}><Input value={q.title ?? ""} onChange={(e) => { const arr = [...content.queHacemos]; arr[idx] = { ...arr[idx], title: e.target.value }; setContent({ ...content, queHacemos: arr }); }} placeholder="Título" /></Field>
                    <Field label="Descripción"><Textarea rows={2} value={q.description ?? ""} onChange={(e) => { const arr = [...content.queHacemos]; arr[idx] = { ...arr[idx], description: e.target.value }; setContent({ ...content, queHacemos: arr }); }} placeholder="Descripción..." /></Field>
                    <DeleteBtn onClick={() => { const arr = [...content.queHacemos]; arr.splice(idx, 1); setContent({ ...content, queHacemos: arr }); }} />
                  </Card>
                ))}
                <AddBtn label="Añadir ítem" onClick={() => setContent({ ...content, queHacemos: [...content.queHacemos, { title: "", description: "" }] })} />
              </div>

              <SectionTitle>Actividades recientes</SectionTitle>
              <div className="space-y-3">
                {content.actividades.map((a: any, idx: number) => (
                  <Card key={idx}>
                    <Field label={`Actividad ${idx + 1} — Título`}><Input value={a.title ?? ""} onChange={(e) => { const arr = [...content.actividades]; arr[idx] = { ...arr[idx], title: e.target.value }; setContent({ ...content, actividades: arr }); }} placeholder="Título" /></Field>
                    <Field label="Tipo de contenido">
                      <div className="flex gap-4">
                        {["imagen", "video"].map((tipo) => (
                          <label key={tipo} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" checked={(a.tipo ?? "imagen") === tipo}
                              onChange={() => { const arr = [...content.actividades]; arr[idx] = { ...arr[idx], tipo }; setContent({ ...content, actividades: arr }); }}
                              className="accent-red-600" />
                            <span className="text-sm text-slate-300 capitalize">{tipo}</span>
                          </label>
                        ))}
                      </div>
                    </Field>
                    <Field label={a.tipo === "video" ? "URL del video" : "Ruta de imagen"}
                      hint={a.tipo === "video" ? "YouTube, Vimeo o .mp4 directo" : "Ej: /images/actividades/foto.jpg"}>
                      <Input value={a.src ?? ""} onChange={(e) => { const arr = [...content.actividades]; arr[idx] = { ...arr[idx], src: e.target.value }; setContent({ ...content, actividades: arr }); }} placeholder={a.tipo === "video" ? "https://youtube.com/watch?v=..." : "/images/..."} />
                    </Field>
                    <Field label="Descripción (opcional)"><Input value={a.descripcion ?? ""} onChange={(e) => { const arr = [...content.actividades]; arr[idx] = { ...arr[idx], descripcion: e.target.value }; setContent({ ...content, actividades: arr }); }} placeholder="Descripción breve..." /></Field>
                    <DeleteBtn onClick={() => { const arr = [...content.actividades]; arr.splice(idx, 1); setContent({ ...content, actividades: arr }); }} />
                  </Card>
                ))}
                <AddBtn label="Añadir actividad" onClick={() => setContent({ ...content, actividades: [...content.actividades, { id: Date.now(), title: "", tipo: "imagen", src: "", descripcion: "" }] })} />
              </div>

              <SectionTitle>Sección motivacional</SectionTitle>
              <Field label="Título"><Input value={motivacion.titulo} onChange={(e) => setMotivacion({ ...motivacion, titulo: e.target.value })} /></Field>
              <Field label="Subtítulo"><Input value={motivacion.subtitulo} onChange={(e) => setMotivacion({ ...motivacion, subtitulo: e.target.value })} /></Field>
              <Field label="Cuerpo del texto"><Textarea rows={3} value={motivacion.cuerpo} onChange={(e) => setMotivacion({ ...motivacion, cuerpo: e.target.value })} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Texto del botón"><Input value={motivacion.cta} onChange={(e) => setMotivacion({ ...motivacion, cta: e.target.value })} /></Field>
                <Field label="URL del botón"><Input value={motivacion.ctaUrl} onChange={(e) => setMotivacion({ ...motivacion, ctaUrl: e.target.value })} /></Field>
              </div>

              <SaveBar onSave={() => { localStorage.setItem("siteContent", JSON.stringify(content)); localStorage.setItem("motivacionContent", JSON.stringify(motivacion)); }}
                onReset={() => { localStorage.removeItem("siteContent"); setContent({ heroTitle, heroSubtitle, presidente, actividades, carousel, queHacemos }); }} />
            </>
          )}

          {/* ── ACTIVIDADES ── */}
          {tab === "Actividades" && (
            <>
              <SectionTitle>Cómo trabajamos</SectionTitle>
              <div className="space-y-3">
                {actividadesTab.comoTrabajamos.map((item, idx) => (
                  <Card key={idx}>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Número"><Input value={item.num} onChange={(e) => { const arr = [...actividadesTab.comoTrabajamos]; arr[idx] = { ...arr[idx], num: e.target.value }; setActividadesTab({ ...actividadesTab, comoTrabajamos: arr }); }} placeholder="01" /></Field>
                      <Field label="Título"><Input value={item.title} onChange={(e) => { const arr = [...actividadesTab.comoTrabajamos]; arr[idx] = { ...arr[idx], title: e.target.value }; setActividadesTab({ ...actividadesTab, comoTrabajamos: arr }); }} placeholder="Título" /></Field>
                    </div>
                    <Field label="Descripción"><Textarea rows={2} value={item.desc} onChange={(e) => { const arr = [...actividadesTab.comoTrabajamos]; arr[idx] = { ...arr[idx], desc: e.target.value }; setActividadesTab({ ...actividadesTab, comoTrabajamos: arr }); }} placeholder="Descripción..." /></Field>
                    <DeleteBtn onClick={() => { const arr = [...actividadesTab.comoTrabajamos]; arr.splice(idx, 1); setActividadesTab({ ...actividadesTab, comoTrabajamos: arr }); }} />
                  </Card>
                ))}
                <AddBtn label="Añadir ítem" onClick={() => setActividadesTab({ ...actividadesTab, comoTrabajamos: [...actividadesTab.comoTrabajamos, { num: `0${actividadesTab.comoTrabajamos.length + 1}`, title: "", desc: "" }] })} />
              </div>

              <SectionTitle>Información y participación</SectionTitle>
              <Field label="¿Cómo participar?"><Textarea rows={3} value={actividadesTab.infoParticipacion.comoParticipar} onChange={(e) => setActividadesTab({ ...actividadesTab, infoParticipacion: { ...actividadesTab.infoParticipacion, comoParticipar: e.target.value } })} /></Field>
              <Field label="Próximas actividades"><Textarea rows={3} value={actividadesTab.infoParticipacion.proximasActividades} onChange={(e) => setActividadesTab({ ...actividadesTab, infoParticipacion: { ...actividadesTab.infoParticipacion, proximasActividades: e.target.value } })} /></Field>

              <SaveBar onSave={() => localStorage.setItem("actividadesContent", JSON.stringify(actividadesTab))}
                onReset={() => { localStorage.removeItem("actividadesContent"); setActividadesTab({ comoTrabajamos: [...comoTrabajamos], infoParticipacion: { ...infoParticipacion } }); }} />
            </>
          )}

          {/* ── SOBRE NOSOTROS ── */}
          {tab === "Sobre Nosotros" && (
            <>
              <SectionTitle>Misión y Visión</SectionTitle>
              <Field label="Misión"><Textarea rows={4} value={sobre.misionVision.mision} onChange={(e) => setSobre({ ...sobre, misionVision: { ...sobre.misionVision, mision: e.target.value } })} /></Field>
              <Field label="Visión"><Textarea rows={4} value={sobre.misionVision.vision} onChange={(e) => setSobre({ ...sobre, misionVision: { ...sobre.misionVision, vision: e.target.value } })} /></Field>

              <SectionTitle>Historia</SectionTitle>
              {["texto1", "texto2", "texto3"].map((key, i) => (
                <Field key={key} label={`Párrafo ${i + 1}`}>
                  <Textarea rows={3} value={(sobre.historia as any)[key]} onChange={(e) => setSobre({ ...sobre, historia: { ...sobre.historia, [key]: e.target.value } })} />
                </Field>
              ))}

              <SectionTitle>Hitos históricos</SectionTitle>
              <div className="space-y-3">
                {sobre.hitos.map((h, idx) => (
                  <Card key={idx}>
                    <div className="grid grid-cols-3 gap-3">
                      <Field label="Año"><Input value={h.año} onChange={(e) => { const arr = [...sobre.hitos]; arr[idx] = { ...arr[idx], año: e.target.value }; setSobre({ ...sobre, hitos: arr }); }} placeholder="1970" /></Field>
                      <div className="col-span-2"><Field label="Descripción"><Input value={h.hito} onChange={(e) => { const arr = [...sobre.hitos]; arr[idx] = { ...arr[idx], hito: e.target.value }; setSobre({ ...sobre, hitos: arr }); }} placeholder="Descripción del hito" /></Field></div>
                    </div>
                    <DeleteBtn onClick={() => { const arr = [...sobre.hitos]; arr.splice(idx, 1); setSobre({ ...sobre, hitos: arr }); }} />
                  </Card>
                ))}
                <AddBtn label="Añadir hito" onClick={() => setSobre({ ...sobre, hitos: [...sobre.hitos, { año: "", hito: "" }] })} />
              </div>

              <SectionTitle>Fechas que conmemoramos</SectionTitle>
              <div className="space-y-3">
                {sobre.conmemoraciones.map((c, idx) => (
                  <Card key={idx}>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Fecha"><Input value={c.fecha} onChange={(e) => { const arr = [...sobre.conmemoraciones]; arr[idx] = { ...arr[idx], fecha: e.target.value }; setSobre({ ...sobre, conmemoraciones: arr }); }} placeholder="19 Abril" /></Field>
                      <Field label="Título"><Input value={c.titulo} onChange={(e) => { const arr = [...sobre.conmemoraciones]; arr[idx] = { ...arr[idx], titulo: e.target.value }; setSobre({ ...sobre, conmemoraciones: arr }); }} placeholder="Nombre de la fecha" /></Field>
                    </div>
                    <Field label="Descripción"><Textarea rows={2} value={c.desc} onChange={(e) => { const arr = [...sobre.conmemoraciones]; arr[idx] = { ...arr[idx], desc: e.target.value }; setSobre({ ...sobre, conmemoraciones: arr }); }} placeholder="Descripción..." /></Field>
                    <DeleteBtn onClick={() => { const arr = [...sobre.conmemoraciones]; arr.splice(idx, 1); setSobre({ ...sobre, conmemoraciones: arr }); }} />
                  </Card>
                ))}
                <AddBtn label="Añadir fecha" onClick={() => setSobre({ ...sobre, conmemoraciones: [...sobre.conmemoraciones, { fecha: "", titulo: "", desc: "" }] })} />
              </div>

              <SaveBar onSave={() => localStorage.setItem("sobreNosotrosContent", JSON.stringify(sobre))}
                onReset={() => { localStorage.removeItem("sobreNosotrosContent"); setSobre({ misionVision: { ...misionVision }, historia: { ...historia }, hitos: [...hitos], conmemoraciones: [...conmemoraciones] }); }} />
            </>
          )}

          {/* ── CONTACTO ── */}
          {tab === "Contacto" && (
            <>
              <SectionTitle>Información de contacto</SectionTitle>
              <Field label="Correo electrónico"><Input value={contacto.contactoInfo.email} onChange={(e) => setContacto({ ...contacto, contactoInfo: { ...contacto.contactoInfo, email: e.target.value } })} placeholder="contacto@jschile.cl" /></Field>
              <Field label="Teléfono"><Input value={contacto.contactoInfo.telefono} onChange={(e) => setContacto({ ...contacto, contactoInfo: { ...contacto.contactoInfo, telefono: e.target.value } })} placeholder="+56 9 ..." /></Field>
              <Field label="Dirección"><Input value={contacto.contactoInfo.direccion} onChange={(e) => setContacto({ ...contacto, contactoInfo: { ...contacto.contactoInfo, direccion: e.target.value } })} placeholder="Ciudad, Región" /></Field>
              <Field label="Horario de atención"><Input value={contacto.contactoInfo.horario} onChange={(e) => setContacto({ ...contacto, contactoInfo: { ...contacto.contactoInfo, horario: e.target.value } })} placeholder="Lunes a Viernes, 10:00 - 18:00" /></Field>

              <SectionTitle>Redes sociales</SectionTitle>
              <div className="space-y-3">
                {contacto.redesSociales.map((r, idx) => (
                  <Card key={idx}>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Red social"><Input value={r.nombre} onChange={(e) => { const arr = [...contacto.redesSociales]; arr[idx] = { ...arr[idx], nombre: e.target.value }; setContacto({ ...contacto, redesSociales: arr }); }} placeholder="Instagram" /></Field>
                      <Field label="Handle"><Input value={r.handle} onChange={(e) => { const arr = [...contacto.redesSociales]; arr[idx] = { ...arr[idx], handle: e.target.value }; setContacto({ ...contacto, redesSociales: arr }); }} placeholder="@usuario" /></Field>
                    </div>
                    <Field label="URL"><Input value={r.url} onChange={(e) => { const arr = [...contacto.redesSociales]; arr[idx] = { ...arr[idx], url: e.target.value }; setContacto({ ...contacto, redesSociales: arr }); }} placeholder="https://..." /></Field>
                    <DeleteBtn onClick={() => { const arr = [...contacto.redesSociales]; arr.splice(idx, 1); setContacto({ ...contacto, redesSociales: arr }); }} />
                  </Card>
                ))}
                <AddBtn label="Añadir red social" onClick={() => setContacto({ ...contacto, redesSociales: [...contacto.redesSociales, { nombre: "", url: "", handle: "" }] })} />
              </div>

              <SectionTitle>Llamar a militar</SectionTitle>
              <Field label="Título principal"><Input value={contacto.llamarMilitar.titulo} onChange={(e) => setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, titulo: e.target.value } })} /></Field>
              <Field label="Subtítulo"><Input value={contacto.llamarMilitar.subtitulo} onChange={(e) => setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, subtitulo: e.target.value } })} /></Field>
              <Field label="Cuerpo del texto"><Textarea rows={4} value={contacto.llamarMilitar.cuerpo} onChange={(e) => setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, cuerpo: e.target.value } })} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Texto del botón"><Input value={contacto.llamarMilitar.cta} onChange={(e) => setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, cta: e.target.value } })} /></Field>
                <Field label="URL del botón"><Input value={contacto.llamarMilitar.ctaUrl} onChange={(e) => setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, ctaUrl: e.target.value } })} /></Field>
              </div>

              <Field label="Razones para militar">
                <div className="space-y-3 mt-1">
                  {contacto.llamarMilitar.razones.map((r, idx) => (
                    <Card key={idx}>
                      <Field label={`Razón ${idx + 1} — Título`}><Input value={r.titulo} onChange={(e) => { const arr = [...contacto.llamarMilitar.razones]; arr[idx] = { ...arr[idx], titulo: e.target.value }; setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, razones: arr } }); }} /></Field>
                      <Field label="Descripción"><Textarea rows={2} value={r.desc} onChange={(e) => { const arr = [...contacto.llamarMilitar.razones]; arr[idx] = { ...arr[idx], desc: e.target.value }; setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, razones: arr } }); }} /></Field>
                      <DeleteBtn onClick={() => { const arr = [...contacto.llamarMilitar.razones]; arr.splice(idx, 1); setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, razones: arr } }); }} />
                    </Card>
                  ))}
                  <AddBtn label="Añadir razón" onClick={() => setContacto({ ...contacto, llamarMilitar: { ...contacto.llamarMilitar, razones: [...contacto.llamarMilitar.razones, { titulo: "", desc: "" }] } })} />
                </div>
              </Field>

              <SaveBar onSave={() => localStorage.setItem("contactoContent", JSON.stringify(contacto))}
                onReset={() => { localStorage.removeItem("contactoContent"); setContacto({ contactoInfo: { ...contactoInfo }, redesSociales: [...redesSociales], llamarMilitar: { ...llamarMilitar, razones: [...llamarMilitar.razones] } }); }} />
            </>
          )}

        </div>
      </main>
    </div>
  );
}
