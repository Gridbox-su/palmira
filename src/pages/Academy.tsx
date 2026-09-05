import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "../components/Reveal";
import { IconArrow, IconCheck, IconClock, IconPhone, IconPin, IconWhistle } from "../components/icons";
import { IMG, branches, scheduleGroups, youthCoaches } from "../data/club";

/* ---------- герой ---------- */
function AcademyHero({ goForm }: { goForm: () => void }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative pt-10 md:pt-14 pb-20 overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <img src={IMG.academy} alt="Тренировка академии" className="w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/60 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-void/40" />
      </div>
      <div className="floodlight" style={{ top: "-25vh", left: "40%" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="line-mask">
          <motion.span initial={reduce ? undefined : { y: "115%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="flex items-center gap-4 font-display uppercase tracking-[0.4em] text-[11px] text-steel">
            <span className="h-px w-10 bg-neon" /> Академия «Пальмира-Метод»
          </motion.span>
        </span>
        <h1 className="mt-4 font-display uppercase font-bold leading-[0.9] tracking-tight text-5xl sm:text-7xl md:text-8xl max-w-4xl">
          <span className="line-mask"><motion.span initial={reduce ? undefined : { y: "112%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>Стань частью</motion.span></span>
          <span className="line-mask"><motion.span initial={reduce ? undefined : { y: "112%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }} className="text-neon">команды</motion.span></span>
        </h1>
        <motion.p initial={reduce ? undefined : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }} className="mt-7 max-w-xl text-sm md:text-base text-white/75 leading-relaxed">
          Бесплатные тренировки для девочек 5–16 лет в четырёх районах Петербурга.
          320 воспитанниц, 12 — в юношеских сборных, 4 — уже в основном составе.
        </motion.p>
        <motion.div initial={reduce ? undefined : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }} className="mt-9 flex flex-col sm:flex-row gap-4 items-start">
          <button onClick={goForm} className="group flex items-center gap-3 bg-neon text-white font-display uppercase tracking-[0.18em] text-sm px-8 py-4 transition-colors duration-300 hover:bg-[#e01f5c]">
            Записать ребёнка <IconArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-steel py-3">
            <span>Набор открыт · 4 филиала</span>
            <span className="w-px h-4 bg-white/20" />
            <span>Первая тренировка бесплатно</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- филиалы + карта ---------- */
function Branches() {
  const [activeId, setActiveId] = useState(branches[0].id);
  const active = branches.find((b) => b.id === activeId)!;
  const mapSrc = useMemo(
    () => `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent("Санкт-Петербург " + active.address)}&z=12`,
    [active]
  );

  return (
    <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-6">
      <Reveal>
        <div className="bg-coal border border-white/10 overflow-hidden h-full flex flex-col">
          <iframe
            title="Карта филиалов академии"
            src={mapSrc}
            className="w-full h-[320px] sm:h-[420px] grayscale-[35%] contrast-[1.05]"
            loading="lazy"
            style={{ border: 0 }}
          />
          <div className="px-5 py-4 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2">
            {branches.map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveId(b.id)}
                className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  activeId === b.id ? "text-white" : "text-steel hover:text-white"
                }`}
              >
                <span className="w-2.5 h-2.5" style={{ background: b.metroColor }} />
                {b.name}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="space-y-3">
        {branches.map((b, i) => (
          <Reveal key={b.id} delay={i * 0.06}>
            <button
              onClick={() => setActiveId(b.id)}
              className={`w-full text-left border p-5 transition-colors duration-300 ${
                activeId === b.id ? "bg-coal border-neon" : "bg-void border-white/10 hover:border-white/30"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`font-display uppercase font-semibold text-sm ${activeId === b.id ? "text-neon" : "text-white"}`}>{b.name}</span>
                <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] px-2 py-1 bg-white/5 text-steel shrink-0">
                  <span className="w-2 h-2" style={{ background: b.metroColor }} /> м. {b.metro}
                </span>
              </div>
              <div className="mt-3 space-y-1.5 text-[12px] text-steel">
                <div className="flex items-center gap-2"><IconPin className="w-3.5 h-3.5 shrink-0" /> {b.address}</div>
                <div className="flex items-center gap-2"><IconClock className="w-3.5 h-3.5 shrink-0" /> Ежедневно 08:00 – 22:00 · {b.ages}</div>
                <div className="flex items-center gap-2"><IconPhone className="w-3.5 h-3.5 shrink-0" /> {b.phone}</div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------- расписание ---------- */
function Schedule() {
  const [key, setKey] = useState<"u8" | "u12" | "u16">("u8");
  const group = scheduleGroups[key];

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2.5">
        {(Object.keys(scheduleGroups) as ("u8" | "u12" | "u16")[]).map((k) => (
          <button
            key={k}
            onClick={() => setKey(k)}
            className={`font-display uppercase tracking-[0.14em] text-[12px] px-5 py-3 transition-colors duration-300 ${
              key === k ? "bg-neon text-white" : "bg-white/5 text-steel hover:bg-white/10 hover:text-white"
            }`}
          >
            {scheduleGroups[k].label}
          </button>
        ))}
      </div>

      <motion.div key={key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm bg-coal border border-white/10">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.16em] text-steel border-b border-white/10">
              <th className="text-left font-medium px-5 py-3.5">Филиал</th>
              <th className="text-left font-medium px-5 py-3.5">Дни</th>
              <th className="text-left font-medium px-5 py-3.5">Время</th>
              <th className="text-left font-medium px-5 py-3.5">Тренер</th>
              <th className="text-left font-medium px-5 py-3.5">Свободно мест</th>
            </tr>
          </thead>
          <tbody>
            {group.rows.map((r) => (
              <tr key={r.branch} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
                <td className="px-5 py-4 font-display uppercase text-white">{r.branch}</td>
                <td className="px-5 py-4 text-steel">{r.days}</td>
                <td className="px-5 py-4 text-white tabular-nums">{r.time}</td>
                <td className="px-5 py-4 text-steel">{r.coach}</td>
                <td className="px-5 py-4">
                  <span className="flex items-center gap-2.5">
                    <span className={`w-1.5 h-1.5 ${r.slots <= 3 ? "bg-neon animate-pulse" : "bg-steel/60"}`} />
                    <span className={r.slots <= 3 ? "text-neon" : "text-steel"}>{r.slots}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

/* ---------- многошаговая регистрация ---------- */
function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ parent: "", child: "", age: "", branch: branches[0].name, phone: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setError("");
  };

  const next = () => {
    if (step === 1 && (!form.parent.trim() || !form.phone.trim())) {
      setError("Укажите имя родителя и телефон.");
      return;
    }
    if (step === 2 && (!form.child.trim() || !form.age)) {
      setError("Укажите имя ребёнка и возраст.");
      return;
    }
    if (step < 3) setStep(step + 1);
    else setDone(true);
  };

  if (done) {
    return (
      <div className="bg-coal border border-neon p-10 text-center">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className="w-16 h-16 mx-auto grid place-items-center bg-neon text-white mb-6">
          <IconCheck className="w-8 h-8" />
        </motion.div>
        <h3 className="font-display uppercase text-2xl font-semibold">Заявка принята</h3>
        <p className="text-sm text-steel mt-3 max-w-md mx-auto leading-relaxed">
          Координатор филиала «{form.branch}» позвонит вам в течение 2 дней и подберёт
          удобное время первой бесплатной тренировки для {form.child}.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-coal border border-white/10 p-6 sm:p-10">
      {/* шаги */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <span className={`w-9 h-9 grid place-items-center font-display text-sm shrink-0 transition-colors ${
              s < step ? "bg-neon text-white" : s === step ? "bg-white text-void" : "bg-white/10 text-steel"
            }`}>
              {s < step ? <IconCheck className="w-4 h-4" /> : s}
            </span>
            {s < 3 && <span className={`h-px flex-1 transition-colors ${s < step ? "bg-neon" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] uppercase tracking-[0.16em] text-steel -mt-5 mb-8">
        <span className={step === 1 ? "text-white" : ""}>Родитель</span>
        <span className={step === 2 ? "text-white" : ""}>Ребёнок</span>
        <span className={step === 3 ? "text-white" : ""}>Филиал</span>
      </div>

      <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
        {step === 1 && (
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] text-steel mb-2">Имя родителя *</label>
              <input className="field" placeholder="Елена Смирнова" value={form.parent} onChange={set("parent")} />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] text-steel mb-2">Телефон *</label>
              <input className="field" placeholder="+7 (___) ___-__-__" value={form.phone} onChange={set("phone")} />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] text-steel mb-2">Имя ребёнка *</label>
              <input className="field" placeholder="Алиса" value={form.child} onChange={set("child")} />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] text-steel mb-2">Возраст *</label>
              <select className="field" value={form.age} onChange={set("age")}>
                <option value="">Выберите возраст</option>
                {Array.from({ length: 12 }, (_, i) => i + 5).map((a) => (
                  <option key={a} value={a}>{a} лет</option>
                ))}
              </select>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="grid sm:grid-cols-2 gap-3">
            {branches.map((b) => (
              <button
                key={b.id}
                onClick={() => { setForm((f) => ({ ...f, branch: b.name })); setError(""); }}
                className={`text-left p-4 border transition-colors ${form.branch === b.name ? "border-neon bg-neon/10" : "border-white/10 bg-void hover:border-white/30"}`}
              >
                <div className={`font-display uppercase text-sm font-semibold ${form.branch === b.name ? "text-neon" : "text-white"}`}>{b.name}</div>
                <div className="text-[11px] text-steel mt-1">{b.address} · {b.ages}</div>
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {error && <p className="mt-5 text-xs text-neon border border-neon/50 bg-neon/10 px-3 py-2.5 inline-block">{error}</p>}

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          className={`font-display uppercase tracking-[0.16em] text-xs px-5 py-3.5 bg-white/5 text-steel hover:bg-white/10 hover:text-white transition-colors duration-300 ${step === 1 ? "invisible" : ""}`}
        >
          ← Назад
        </button>
        <button
          onClick={next}
          className="group flex items-center gap-3 bg-neon text-white font-display uppercase tracking-[0.18em] text-sm px-8 py-3.5 transition-colors duration-300 hover:bg-[#e01f5c]"
        >
          {step === 3 ? "Отправить заявку" : "Далее"}
          <IconArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

/* ---------- страница ---------- */
export default function Academy() {
  const formRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const goForm = () => formRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  return (
    <>
      <AcademyHero goForm={goForm} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-20">
          <SectionHeading kicker="Тренеры академии" title="Методика «Пальмира-Метод»" />
          <div className="mt-10 grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {youthCoaches.map((c, i) => (
              <Reveal key={c.id} delay={(i % 2) * 0.08}>
                <div className="group bg-coal border border-white/10 flex flex-col overflow-hidden h-full transition-colors duration-300 hover:border-neon">
                  <div className="relative h-52 overflow-hidden">
                    <img src={c.photo} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="font-display uppercase font-semibold text-lg leading-tight">{c.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-neon mt-1.5">{c.role}</div>
                    <span className="mt-3 self-start text-[8px] uppercase tracking-[0.12em] text-steel bg-white/5 border border-white/10 px-2 py-1">{c.license}</span>
                    <p className="text-xs text-steel mt-3 leading-relaxed">{c.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {[
              { t: "Единая методика", d: "Все филиалы работают по одной программе: техника, тактика и физика — по возрастным ступеням." },
              { t: "Путь в основу", d: "Лучшие выпускницы получают контракт: 4 воспитанницы уже играют в Суперлиге за наш клуб." },
              { t: "Бесплатно", d: "Базовые группы U-8 — за счёт клуба и партнёров. Форма и инвентарь — в подарок на первом занятии." },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 0.06}>
                <div className="group flex items-start gap-4 bg-void border border-white/10 p-6 h-full transition-colors duration-300 hover:border-neon">
                  <span className="w-11 h-11 shrink-0 grid place-items-center bg-white/5 text-neon group-hover:bg-neon group-hover:text-white transition-colors duration-300">
                    <IconWhistle className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-display uppercase font-semibold text-[15px]">{f.t}</div>
                    <p className="text-xs text-steel mt-2 leading-relaxed">{f.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="py-20 border-t border-white/10">
          <SectionHeading kicker="Филиалы" title="Где мы тренируемся" />
          <Branches />
        </section>

        <section className="py-20 border-t border-white/10">
          <SectionHeading kicker="Расписание" title="Тренировки по возрастам" />
          <Schedule />
        </section>

        <section className="py-20 border-t border-white/10">
          <div ref={formRef} className="scroll-mt-32">
            <SectionHeading kicker="Регистрация" title="Запишите ребёнка на тренировку" />
            <div className="mt-10 grid lg:grid-cols-[1fr_320px] gap-8 items-start">
              <RegistrationForm />
              <Reveal delay={0.1}>
                <div className="bg-void border border-white/10 p-6 space-y-4 text-sm text-steel leading-relaxed">
                  <p><span className="text-white font-semibold">Что взять с собой:</span> спортивную форму, обувь для зала или поля, воду.</p>
                  <p><span className="text-white font-semibold">Медсправка</span> нужна только после второй тренировки — её поможет оформить клубный врач.</p>
                  <p className="border-t border-white/10 pt-4 text-xs">Вопросы: <a href="tel:+78122457001" className="text-white hover:text-neon transition-colors">+7 (812) 245-70-01</a><br /><a href="mailto:academy@sevpalmira.ru" className="text-white hover:text-neon transition-colors">academy@sevpalmira.ru</a></p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
