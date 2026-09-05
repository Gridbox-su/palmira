import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "../components/Reveal";
import ClubLogo from "../components/ClubLogo";
import { IconArrow, IconCheck, IconClose, IconMail, IconPhone, IconShield, IconWhistle } from "../components/icons";
import {
  IMG, cleanSheets, coaches, management, players, standings, topScorers,
  type Player, type PositionGroup, type StaffMember,
} from "../data/club";

const tabs = [
  { id: "staff", label: "Тренерский штаб" },
  { id: "mgmt", label: "Руководство" },
  { id: "roster", label: "Состав" },
  { id: "stats", label: "Статистика" },
  { id: "tryout", label: "Просмотр в клуб" },
];

/* ---------- шапка страницы ---------- */
function PageHeader() {
  const reduce = useReducedMotion();
  return (
    <section className="relative pt-36 md:pt-44 pb-14 overflow-hidden border-b border-white/10 bg-coal">
      {/* фоновое изображение + тёмный overlay для читаемости */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img src={IMG.hero} alt="" className="w-full h-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/90 via-void/75 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-void/50 to-void/75" />
      </div>
      <div className="floodlight" style={{ top: "-30vh", left: "30%", zIndex: 1 }} />
      <div className="absolute right-[-4rem] top-6 opacity-[0.08] pointer-events-none select-none z-0" aria-hidden="true">
        <ClubLogo className="w-[380px] h-[380px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="line-mask">
          <motion.span
            initial={reduce ? undefined : { y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display uppercase tracking-[0.4em] text-[11px] text-steel flex items-center gap-4"
          >
            <span className="h-px w-10 bg-neon" /> Суперлига · сезон 2025/26
          </motion.span>
        </span>
        <h1 className="mt-4 font-display uppercase font-bold text-6xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight">
          <span className="line-mask">
            <motion.span initial={reduce ? undefined : { y: "112%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
              О команде
            </motion.span>
          </span>
        </h1>
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-6 max-w-xl text-sm md:text-base text-steel leading-relaxed"
        >
          Люди, которые делают «Северную Пальмиру» сильнее каждый день: штаб, руководство,
          12 футболисток основного состава и статистика сезона.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------- якорная панель ---------- */
function AnchorBar() {
  const [active, setActive] = useState("staff");
  const reduce = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    tabs.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="sticky top-28 z-30 bg-void/95 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto py-3 -mx-1 px-1">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => go(t.id)}
              className={`relative shrink-0 font-display uppercase tracking-[0.14em] text-[12px] px-4 py-2.5 transition-colors duration-300 ${
                active === t.id ? "text-neon" : "text-steel hover:text-white"
              }`}
            >
              <span className="text-neon/50 mr-2">0{i + 1}</span>
              {t.label}
              {active === t.id && (
                <motion.span layoutId="anchor-line" className="absolute left-4 right-4 -bottom-0.5 h-px bg-neon" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- карточка штаба ---------- */
function StaffCard({ s, delay = 0 }: { s: StaffMember; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="group bg-coal border border-white/10 overflow-hidden h-full transition-colors duration-300 hover:border-neon">
        <div className="relative overflow-hidden aspect-[4/3.4]">
          <img src={s.photo} alt={s.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent" />
          {s.license && (
            <span className="absolute top-3 right-3 bg-neon text-white text-[9px] uppercase tracking-[0.12em] px-2 py-1">{s.license}</span>
          )}
        </div>
        <div className="p-5">
          <div className="font-display uppercase font-semibold text-lg leading-tight">{s.name}</div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-neon mt-1.5">{s.role}</div>
          <p className="text-xs text-steel mt-3 leading-relaxed">{s.bio}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- состав ---------- */
const groups: ("Все" | PositionGroup)[] = ["Все", "Вратари", "Защита", "Полузащита", "Нападение"];

function Roster() {
  const [filter, setFilter] = useState<(typeof groups)[number]>("Все");
  const [selected, setSelected] = useState<Player | null>(null);
  const list = useMemo(() => (filter === "Все" ? players : players.filter((p) => p.position === filter)), [filter]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    if (selected) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div>
      <div className="mt-8 flex flex-wrap gap-2.5">
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className={`font-display uppercase tracking-[0.14em] text-[12px] px-4.5 py-2.5 transition-colors duration-300 ${
              filter === g ? "bg-neon text-white" : "bg-white/5 text-steel hover:bg-white/10 hover:text-white"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-7 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.button
              layout
              key={p.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.38, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelected(p)}
              className="group relative text-left overflow-hidden bg-coal border border-white/10 transition-colors duration-300 hover:border-neon"
            >
              <div className="relative aspect-[3/3.6] overflow-hidden">
                <img src={p.photo} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
                <span className="absolute top-2 right-3 font-display font-bold text-6xl sm:text-7xl leading-none text-white/15 group-hover:text-neon/40 transition-colors duration-500 select-none">
                  {p.number}
                </span>
                <span className="absolute top-2.5 left-2.5 bg-white/10 text-white/85 text-[9px] uppercase tracking-[0.14em] px-2 py-1">{p.pos}</span>
              </div>
              <div className="p-4">
                <div className="font-display uppercase font-semibold text-[15px] leading-tight group-hover:text-neon transition-colors duration-300">{p.name}</div>
                <div className="flex items-center gap-3 mt-2 text-[10px] uppercase tracking-[0.14em] text-steel">
                  <span>{p.stats.matches} игр</span>
                  {p.stats.goals > 0 && <span className="text-neon">{p.stats.goals} голов</span>}
                  {p.stats.cleanSheets ? <span>{p.stats.cleanSheets} «на ноль»</span> : <span>{p.stats.assists} передач</span>}
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* модалка игрока */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-void/90 grid place-items-center p-4 overflow-y-auto"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selected.name}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-coal border border-white/15 my-8"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Закрыть"
                className="absolute top-4 right-4 z-10 w-10 h-10 grid place-items-center bg-white/10 text-white hover:bg-neon transition-colors"
              >
                <IconClose className="w-5 h-5" />
              </button>
              <div className="grid sm:grid-cols-[240px_1fr]">
                <div className="relative overflow-hidden">
                  <img src={selected.photo} alt={selected.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent sm:bg-gradient-to-r" />
                  <span className="absolute bottom-3 left-4 font-display font-bold text-7xl text-neon leading-none select-none">{selected.number}</span>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-steel">{selected.position} · №{selected.number}</div>
                  <h3 className="font-display uppercase font-bold text-3xl mt-1.5">{selected.name}</h3>
                  <div className="flex items-center gap-5 mt-3 text-[11px] uppercase tracking-[0.16em] text-steel">
                    <span>{selected.age} лет</span>
                    <span>{selected.height} см</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-6">
                    {[
                      { v: selected.stats.matches, l: "Матчи" },
                      { v: selected.stats.goals, l: "Голы" },
                      { v: selected.stats.cleanSheets ?? selected.stats.assists, l: selected.stats.cleanSheets ? "На ноль" : "Передачи" },
                    ].map((s) => (
                      <div key={s.l} className="bg-void border border-white/10 py-3 text-center">
                        <div className="font-display text-2xl font-semibold text-neon">{s.v}</div>
                        <div className="text-[9px] uppercase tracking-[0.18em] text-steel mt-1">{s.l}</div>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-steel leading-relaxed mt-6">{selected.bio}</p>
                  <div className="mt-5 border-l-2 border-neon pl-4">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-steel mb-1.5">Карьера</div>
                    <p className="text-xs text-white/80 leading-relaxed">{selected.career}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- прогресс-бар ---------- */
function Bar({ value, max, isUs }: { value: number; max: number; isUs?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="h-1.5 bg-white/10 flex-1 overflow-hidden">
      <motion.div
        initial={reduce ? { width: `${(value / max) * 100}%` } : { width: 0 }}
        whileInView={{ width: `${(value / max) * 100}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`h-full ${isUs ? "bg-neon" : "bg-white/40"}`}
      />
    </div>
  );
}

/* ---------- статистика ---------- */
function Stats() {
  const maxScorer = Math.max(...topScorers.map((s) => s.goals));
  const maxCs = Math.max(...cleanSheets.map((s) => s.value));

  return (
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 mt-10">
      <Reveal>
        <div className="bg-coal border border-white/10 overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <span className="font-display uppercase tracking-[0.18em] text-sm">Суперлига · таблица</span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-steel">Тур 18 из 26</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.14em] text-steel border-b border-white/10">
                <th className="text-left font-medium px-5 py-3 w-10">#</th>
                <th className="text-left font-medium">Команда</th>
                <th className="font-medium w-10">И</th>
                <th className="font-medium w-10 hidden sm:table-cell">В</th>
                <th className="font-medium w-10 hidden sm:table-cell">Н</th>
                <th className="font-medium w-10 hidden sm:table-cell">П</th>
                <th className="font-medium w-14 hidden md:table-cell">МЗ</th>
                <th className="font-medium w-14 text-neon">О</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((r) => (
                <tr key={r.pos} className={`border-b border-white/5 last:border-0 transition-colors ${r.isUs ? "bg-neon/10" : "hover:bg-white/[0.03]"}`}>
                  <td className={`px-5 py-3 font-display ${r.isUs ? "text-neon font-semibold" : "text-steel"}`}>{r.pos}</td>
                  <td className={`font-display uppercase tracking-wide ${r.isUs ? "text-white font-semibold" : "text-white/85"}`}>{r.team}</td>
                  <td className="text-center text-steel">{r.played}</td>
                  <td className="text-center text-steel hidden sm:table-cell">{r.w}</td>
                  <td className="text-center text-steel hidden sm:table-cell">{r.d}</td>
                  <td className="text-center text-steel hidden sm:table-cell">{r.l}</td>
                  <td className="text-center text-steel hidden md:table-cell">{r.gd}</td>
                  <td className={`text-center font-display font-semibold ${r.isUs ? "text-neon" : "text-white"}`}>{r.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <div className="space-y-6">
        <Reveal delay={0.1}>
          <div className="bg-coal border border-white/10 p-5">
            <div className="font-display uppercase tracking-[0.18em] text-sm mb-5 flex items-center gap-2">
              <IconWhistle className="w-4 h-4 text-neon" /> Бомбардиры лиги
            </div>
            <div className="space-y-4">
              {topScorers.map((s) => (
                <div key={s.name} className="flex items-center gap-4">
                  <div className="w-40 shrink-0">
                    <div className={`text-[13px] font-display uppercase ${s.isUs ? "text-white" : "text-white/75"}`}>{s.name}</div>
                    <div className="text-[9px] uppercase tracking-[0.14em] text-steel">{s.team}</div>
                  </div>
                  <Bar value={s.goals} max={maxScorer} isUs={s.isUs} />
                  <span className={`font-display font-semibold text-lg w-8 text-right ${s.isUs ? "text-neon" : "text-white/80"}`}>{s.goals}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="bg-coal border border-white/10 p-5">
            <div className="font-display uppercase tracking-[0.18em] text-sm mb-5 flex items-center gap-2">
              <IconShield className="w-4 h-4 text-neon" /> Сухие матчи · вратари
            </div>
            <div className="space-y-4">
              {cleanSheets.map((s) => (
                <div key={s.name} className="flex items-center gap-4">
                  <div className="w-40 shrink-0">
                    <div className={`text-[13px] font-display uppercase ${s.isUs ? "text-white" : "text-white/75"}`}>{s.name}</div>
                    <div className="text-[9px] uppercase tracking-[0.14em] text-steel">{s.team}</div>
                  </div>
                  <Bar value={s.value} max={maxCs} isUs={s.isUs} />
                  <span className={`font-display font-semibold text-lg w-8 text-right ${s.isUs ? "text-neon" : "text-white/80"}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ---------- форма просмотра ---------- */
function TryoutForm() {
  const [form, setForm] = useState({ name: "", dob: "", position: "Полузащита", experience: "", phone: "", telegram: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.dob || !form.phone.trim()) {
      setError("Заполните имя, дату рождения и телефон.");
      return;
    }
    setError("");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-coal border border-neon p-10 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="w-16 h-16 mx-auto grid place-items-center bg-neon text-white mb-6"
        >
          <IconCheck className="w-8 h-8" />
        </motion.div>
        <h3 className="font-display uppercase text-2xl font-semibold">Заявка отправлена</h3>
        <p className="text-sm text-steel mt-3 max-w-md mx-auto leading-relaxed">
          Скауты клуба свяжутся с вами в течение 3 рабочих дней. Ближайший открытый просмотр —
          суббота, 10:00, Пальмира Арена.
        </p>
        <button onClick={() => setSent(false)} className="mt-7 bg-white/10 text-white font-display uppercase tracking-[0.16em] text-xs px-6 py-3 hover:bg-white/20 transition-colors">
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <div ref={formRef} className="bg-coal border border-white/10 p-6 sm:p-10">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.2em] text-steel mb-2">ФИО *</label>
          <input className="field" placeholder="Иванова Мария Сергеевна" value={form.name} onChange={set("name")} />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.2em] text-steel mb-2">Дата рождения *</label>
          <input type="date" className="field" value={form.dob} onChange={set("dob")} />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.2em] text-steel mb-2">Позиция</label>
          <select className="field" value={form.position} onChange={set("position")}>
            {["Вратарь", "Защита", "Полузащита", "Нападение"].map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.2em] text-steel mb-2">Телефон *</label>
          <input className="field" placeholder="+7 (___) ___-__-__" value={form.phone} onChange={set("phone")} />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.2em] text-steel mb-2">Telegram</label>
          <input className="field" placeholder="@nickname" value={form.telegram} onChange={set("telegram")} />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.2em] text-steel mb-2">Опыт</label>
          <input className="field" placeholder="Клубы, лиги, сборные" value={form.experience} onChange={set("experience")} />
        </div>
      </div>

      <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-5">
        <button type="button" onClick={submit} className="group flex items-center justify-center gap-3 bg-neon text-white font-display uppercase tracking-[0.2em] text-sm px-8 py-4 hover:bg-[#e01f5c] transition-colors">
          Записаться на просмотр <IconArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-[11px] text-steel leading-relaxed">Просмотры — по субботам, 10:00, Пальмира Арена.<br />При себе: форма, щитки, медсправка.</p>
      </div>
      {error && <p className="mt-5 text-xs text-neon border border-neon/50 bg-neon/10 px-3 py-2.5 inline-block">{error}</p>}
    </div>
  );
}

/* ---------- страница ---------- */
export default function About() {
  const reduce = useReducedMotion();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const t = setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }, 120);
      return () => clearTimeout(t);
    }
  }, [reduce]);

  return (
    <>
      <PageHeader />
      <AnchorBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section id="staff" className="scroll-mt-36 py-16">
          <SectionHeading kicker="Тренерский штаб" title="Люди у кромки поля" />
          <div className="mt-10 grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {coaches.map((c, i) => <StaffCard key={c.id} s={c} delay={i * 0.06} />)}
          </div>
        </section>

        <section id="mgmt" className="scroll-mt-36 py-16 border-t border-white/10">
          <SectionHeading kicker="Руководство" title="Клуб изнутри" />
          <div className="mt-10 grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {management.map((m, i) => <StaffCard key={m.id} s={m} delay={i * 0.06} />)}
          </div>
        </section>

        <section id="roster" className="scroll-mt-36 py-16 border-t border-white/10">
          <SectionHeading
            kicker="Состав"
            title="Основная команда"
            right={<span className="text-[11px] uppercase tracking-[0.18em] text-steel">12 игроков · сезон 2025/26</span>}
          />
          <Roster />
        </section>

        <section id="stats" className="scroll-mt-36 py-16 border-t border-white/10">
          <SectionHeading kicker="Статистика" title="Сезон в цифрах" />
          <Stats />
        </section>

        <section id="tryout" className="scroll-mt-36 py-16 border-t border-white/10">
          <SectionHeading kicker="Просмотр в клуб" title="Стань частью «Пальмиры»" />
          <div className="mt-10 grid lg:grid-cols-[1fr_320px] gap-8 items-start">
            <TryoutForm />
            <Reveal delay={0.1}>
              <div className="bg-void border border-white/10 p-6 space-y-5">
                <div className="flex items-center gap-3">
                  <IconPhone className="w-5 h-5 text-neon" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-steel">Отдел селекции</div>
                    <a href="tel:+78122457008" className="text-sm text-white hover:text-neon transition-colors">+7 (812) 245-70-08</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <IconMail className="w-5 h-5 text-neon" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-steel">Почта селекции</div>
                    <a href="mailto:scout@sevpalmira.ru" className="text-sm text-white hover:text-neon transition-colors">scout@sevpalmira.ru</a>
                  </div>
                </div>
                <p className="text-xs text-steel leading-relaxed border-t border-white/10 pt-5">
                  Мы просматриваем игроков 2005 г.р. и младше. Для старших возрастов — открытые
                  тренировки каждый вторник, 19:00.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
