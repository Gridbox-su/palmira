import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Reveal, SectionHeading } from "../components/Reveal";
import ClubLogo from "../components/ClubLogo";
import { IconArrow, IconCalendar, IconClock, IconPin } from "../components/icons";
import { matches, upcomingMatches } from "../data/club";

function MatchesHero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative pt-10 md:pt-14 pb-14 overflow-hidden border-b border-white/10 bg-coal">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/90 via-void/75 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-void/50 to-void/75" />
      </div>
      <div className="floodlight" style={{ top: "-30vh", left: "30%", zIndex: 1 }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="line-mask">
          <motion.span
            initial={reduce ? undefined : { y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 font-display uppercase tracking-[0.4em] text-[11px] text-steel"
          >
            <span className="h-px w-10 bg-neon" /> Матч-центр · сезон 2025/26
          </motion.span>
        </span>
        <h1 className="mt-4 font-display uppercase font-bold text-6xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight">
          <span className="line-mask">
            <motion.span initial={reduce ? undefined : { y: "112%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
              Ближайшие
            </motion.span>
          </span>
          <span className="line-mask">
            <motion.span initial={reduce ? undefined : { y: "112%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}>
              матчи
            </motion.span>
          </span>
        </h1>
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-6 max-w-xl text-sm md:text-base text-steel leading-relaxed"
        >
          Календарь домашних и выездных игр «Северной Пальмиры» на май — июнь.
          Дерби с «Грозой» — уже в эту субботу на Пальмира Арене.
        </motion.p>
      </div>
    </section>
  );
}

function UpcomingSection() {
  return (
    <section className="py-16">
      <SectionHeading
        kicker="Афиша"
        title="Календарь игр"
        right={<span className="text-[11px] uppercase tracking-[0.18em] text-steel">4 матча · май — июнь 2026</span>}
      />
      <div className="mt-10 space-y-4">
        {upcomingMatches.map((m, i) => (
          <Reveal key={m.id} delay={i * 0.06}>
            <div className="group bg-coal border border-white/10 p-5 sm:p-6 transition-colors duration-300 hover:border-neon">
              <div className="grid md:grid-cols-[150px_1fr_auto] gap-5 md:gap-8 items-center">
                <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-2">
                  <div className="bg-white/5 px-4 py-2.5 text-center">
                    <div className="font-display font-bold text-2xl text-white leading-none">{m.date}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IconClock className="w-4 h-4 text-neon" />
                    <span className="font-display font-semibold text-xl text-white tabular-nums">{m.time}</span>
                    <span className="text-[9px] uppercase tracking-[0.14em] text-steel">МСК</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-steel mb-2">{m.competition}</div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="font-display uppercase font-semibold text-xl sm:text-2xl">{m.home}</span>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-steel">против</span>
                    <span className="font-display uppercase font-semibold text-xl sm:text-2xl text-white/80">{m.away}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-steel mt-2.5">
                    <IconPin className="w-3.5 h-3.5" /> {m.stadium}
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end gap-2">
                  {i === 0 ? (
                    <span className="bg-neon text-white text-[10px] font-bold uppercase tracking-[0.16em] px-3 py-1.5">Главный матч</span>
                  ) : (
                    <span className="bg-white/10 text-white/80 text-[10px] uppercase tracking-[0.16em] px-3 py-1.5">
                      {m.home === "Сев. Пальмира" ? "Дома" : "Выезд"}
                    </span>
                  )}
                  <span className="text-[10px] uppercase tracking-[0.16em] text-steel flex items-center gap-1.5">
                    <IconCalendar className="w-3.5 h-3.5" /> {m.time} · начало
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ResultsSection() {
  const finished = matches.filter((m) => m.status === "FT");
  return (
    <section className="py-16 border-t border-white/10">
      <SectionHeading
        kicker="Архив"
        title="Последние результаты"
        right={
          <Link to="/about#stats" className="group flex items-center gap-2 font-display uppercase tracking-[0.18em] text-xs text-steel hover:text-white transition-colors">
            Турнирная таблица <IconArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        }
      />
      <Reveal className="mt-10">
        <div className="bg-coal border border-white/10 overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.14em] text-steel border-b border-white/10">
                <th className="text-left font-medium px-5 py-3.5">Дата</th>
                <th className="text-left font-medium px-5 py-3.5">Турнир</th>
                <th className="text-left font-medium px-5 py-3.5">Матч</th>
                <th className="text-center font-medium px-5 py-3.5 w-24">Счёт</th>
                <th className="text-left font-medium px-5 py-3.5 hidden lg:table-cell">Стадион</th>
              </tr>
            </thead>
            <tbody>
              {finished.map((m) => {
                const weHome = m.home === "Сев. Пальмира";
                const our = (weHome ? m.hs : m.as) ?? 0;
                const their = (weHome ? m.as : m.hs) ?? 0;
                return (
                  <tr key={m.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
                    <td className="px-5 py-4 text-steel whitespace-nowrap">{m.date}</td>
                    <td className="px-5 py-4 text-[11px] uppercase tracking-[0.1em] text-steel whitespace-nowrap">{m.competition}</td>
                    <td className="px-5 py-4 font-display uppercase tracking-wide whitespace-nowrap">
                      {m.home} <span className="text-steel mx-1.5">—</span> {m.away}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-block font-display font-semibold text-base px-3 py-1 ${our > their ? "bg-neon text-white" : "bg-white/10 text-white/85"}`}>
                        {m.hs}:{m.as}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-steel hidden lg:table-cell">{m.stadium}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-void border border-white/10 p-6">
          <div className="flex items-center gap-4">
            <ClubLogo className="w-14 h-14 shrink-0" />
            <p className="text-sm text-steel leading-relaxed max-w-xl">
              Билеты на домашние матчи открываются за 10 дней до игры. Держатели абонементов
              выкупают места первыми — следите за анонсами в клубных соцсетях.
            </p>
          </div>
          <Link to="/media" className="group shrink-0 flex items-center gap-2 font-display uppercase tracking-[0.16em] text-xs text-white border-b border-neon pb-1.5 hover:text-neon transition-colors">
            Трансляции и обзоры <IconArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export default function Matches() {
  return (
    <>
      <MatchesHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UpcomingSection />
        <ResultsSection />
      </div>
    </>
  );
}
