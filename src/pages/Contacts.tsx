import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "../components/Reveal";
import { VkIcon, TelegramIcon, IconArrow, IconCheck, IconClock, IconMail, IconMetro, IconPhone, IconPin } from "../components/icons";

const cards = [
  { icon: <IconPhone className="w-5 h-5" />, label: "Офис клуба", value: "+7 (812) 245-70-07", sub: "Пн–Пт · 10:00–19:00 МСК", href: "tel:+78122457007" },
  { icon: <IconMail className="w-5 h-5" />, label: "Пресс-центр", value: "press@sevpalmira.ru", sub: "Аккредитации и интервью", href: "mailto:press@sevpalmira.ru" },
  { icon: <IconPin className="w-5 h-5" />, label: "Пальмира Арена", value: "Южная дорога, 8", sub: "Санкт-Петербург, 197110", href: "https://yandex.ru/maps/?text=Санкт-Петербург, Южная дорога 8" },
  { icon: <IconClock className="w-5 h-5" />, label: "Кассы стадиона", value: "12:00 – 20:00", sub: "Ежедневно, без выходных", href: undefined },
];

const topics = ["Спонсорство и партнёрство", "СМИ и аккредитация", "Аренда площадок", "Мерч и атрибутика", "Другое"];

export default function Contacts() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({ name: "", company: "", topic: topics[0], email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setError("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Заполните имя, e-mail и сообщение.");
      return;
    }
    setSent(true);
  };

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-14 overflow-hidden border-b border-white/10 bg-coal">
        <div className="floodlight" style={{ top: "-30vh", left: "30%" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="line-mask">
            <motion.span initial={reduce ? undefined : { y: "115%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="flex items-center gap-4 font-display uppercase tracking-[0.4em] text-[11px] text-steel">
              <span className="h-px w-10 bg-neon" /> Мы на связи
            </motion.span>
          </span>
          <h1 className="mt-4 font-display uppercase font-bold text-6xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight">
            <span className="line-mask"><motion.span initial={reduce ? undefined : { y: "112%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>Контакты</motion.span></span>
          </h1>
          <motion.p initial={reduce ? undefined : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }} className="mt-6 max-w-xl text-sm md:text-base text-steel leading-relaxed">
            Офис клуба, пресс-центр, кассы и партнёрский отдел — все каналы связи
            с «Северной Пальмирой» в одном месте.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* контактные карточки */}
        <section className="py-16">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {cards.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06}>
                <div className="group bg-coal border border-white/10 p-6 h-full transition-colors duration-300 hover:border-neon">
                  <span className="w-11 h-11 grid place-items-center bg-white/5 text-neon group-hover:bg-neon group-hover:text-white transition-colors duration-300">
                    {c.icon}
                  </span>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-steel mt-5">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block font-display uppercase font-semibold text-lg mt-1.5 hover:text-neon transition-colors">
                      {c.value}
                    </a>
                  ) : (
                    <div className="font-display uppercase font-semibold text-lg mt-1.5">{c.value}</div>
                  )}
                  <div className="text-xs text-steel mt-1.5">{c.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* карта + форма */}
        <section className="py-16 border-t border-white/10">
          <SectionHeading kicker="Как нас найти" title="Пальмира Арена" />
          <div className="mt-10 grid lg:grid-cols-[1.1fr_1fr] gap-6 items-stretch">
            <Reveal>
              <div className="bg-coal border border-white/10 overflow-hidden h-full flex flex-col">
                <iframe
                  title="Карта: Пальмира Арена"
                  src="https://yandex.ru/map-widget/v1/?text=Санкт-Петербург, Южная дорога 8&z=14"
                  className="w-full h-[320px] sm:h-[400px] flex-1 grayscale-[35%] contrast-[1.05]"
                  loading="lazy"
                  style={{ border: 0 }}
                />
                <div className="px-5 py-4 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.14em] text-steel">
                  <span className="flex items-center gap-2"><IconMetro className="w-4 h-4 text-neon" /> м. Крестовский остров · 7 мин пешком</span>
                  <span>Парковка P2 — бесплатно по билету</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-coal border border-white/10 p-6 sm:p-8 h-full">
                <div className="font-display uppercase tracking-[0.2em] text-sm mb-6">Обратная связь</div>
                {sent ? (
                  <div className="text-center py-10">
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className="w-14 h-14 mx-auto grid place-items-center bg-neon text-white mb-5">
                      <IconCheck className="w-7 h-7" />
                    </motion.div>
                    <div className="font-display uppercase text-xl font-semibold">Сообщение отправлено</div>
                    <p className="text-sm text-steel mt-2">Ответим в течение 2 рабочих дней на {form.email}.</p>
                    <button onClick={() => { setSent(false); setForm({ name: "", company: "", topic: topics[0], email: "", message: "" }); }} className="mt-6 bg-white/10 text-white font-display uppercase tracking-[0.14em] text-xs px-5 py-3 hover:bg-white/20 transition-colors">
                      Написать ещё
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input className="field" placeholder="Ваше имя *" value={form.name} onChange={set("name")} aria-label="Имя" />
                      <input className="field" placeholder="Компания" value={form.company} onChange={set("company")} aria-label="Компания" />
                    </div>
                    <select className="field" value={form.topic} onChange={set("topic")} aria-label="Тема обращения">
                      {topics.map((t) => <option key={t}>{t}</option>)}
                    </select>
                    <input type="email" className="field" placeholder="E-mail *" value={form.email} onChange={set("email")} aria-label="E-mail" />
                    <textarea className="field min-h-[110px] resize-y" placeholder="Сообщение *" value={form.message} onChange={set("message")} aria-label="Сообщение" />
                    {error && <p className="text-xs text-neon border border-neon/50 bg-neon/10 px-3 py-2.5">{error}</p>}
                    <button type="submit" className="group w-full flex items-center justify-center gap-3 bg-neon text-white font-display uppercase tracking-[0.2em] text-sm py-4 transition-colors duration-300 hover:bg-[#e01f5c]">
                      Отправить <IconArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}

                <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-steel">Мы в соцсетях:</span>
                  <a href="https://vk.com" target="_blank" rel="noreferrer" aria-label="ВКонтакте" className="w-10 h-10 grid place-items-center bg-neon text-white hover:bg-white hover:text-neon transition-colors duration-300">
                    <VkIcon className="w-4 h-4" />
                  </a>
                  <a href="https://t.me" target="_blank" rel="noreferrer" aria-label="Telegram" className="w-10 h-10 grid place-items-center bg-neon text-white hover:bg-white hover:text-neon transition-colors duration-300">
                    <TelegramIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* партнёрам */}
        <section className="py-16 border-t border-white/10">
          <div className="bg-void border border-white/10 p-8 md:p-10 grid md:grid-cols-3 gap-8">
            {[
              { t: "Спонсорам", d: "Медиакит сезона, форматы интеграций и условия партнёрства — по запросу в течение одного дня.", v: "partner@sevpalmira.ru", h: "mailto:partner@sevpalmira.ru" },
              { t: "Партнёрам", d: "Совместные проекты, кросс-промо и корпоративные абонементы на домашние матчи клуба.", v: "b2b@sevpalmira.ru", h: "mailto:b2b@sevpalmira.ru" },
              { t: "СМИ", d: "Аккредитации, пресс-релизы и организация интервью с игроками и тренерами клуба.", v: "press@sevpalmira.ru", h: "mailto:press@sevpalmira.ru" },
            ].map((b, i) => (
              <Reveal key={b.t} delay={i * 0.07}>
                <div className="group h-full">
                  <div className="text-outline-neon font-display font-bold text-5xl leading-none mb-4">0{i + 1}</div>
                  <div className="font-display uppercase font-semibold text-xl">{b.t}</div>
                  <p className="text-sm text-steel mt-3 leading-relaxed">{b.d}</p>
                  <a href={b.h} className="inline-flex items-center gap-2 mt-4 text-sm text-white border-b border-neon pb-1 hover:text-neon transition-colors">
                    {b.v} <IconArrow className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
