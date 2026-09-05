import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import ClubLogo from "../components/ClubLogo";
import { Reveal, SectionHeading, SmokeTrails } from "../components/Reveal";
import { IconArrow, IconArrowUpRight, IconPin, IconTicket, IconClock, IconCalendar } from "../components/icons";
import { IMG, clubMilestones, importantMoments, matches, news, upcomingMatches, type UpcomingMatch } from "../data/club";
import { useTickets } from "../context";

/* ---------- countdown до ближайшей субботы 19:00 ---------- */
function useCountdown() {
  const target = useMemo(() => {
    const d = new Date();
    const day = d.getDay();
    const diff = (6 - day + 7) % 7 || 7;
    d.setDate(d.getDate() + diff);
    d.setHours(19, 0, 0, 0);
    return d.getTime();
  }, []);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(0, target - now);
  return {
    days: Math.floor(left / 86400000),
    hours: Math.floor((left / 3600000) % 24),
    mins: Math.floor((left / 60000) % 60),
    secs: Math.floor((left / 1000) % 60),
  };
}

/* ================= HERO ================= */
function Hero() {
  const openTickets = useTickets();
  const reduce = useReducedMotion();

  const line = (text: string, delay: number) => (
    <span className="line-mask">
      <motion.span
        initial={reduce ? undefined : { y: "112%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* фон */}
      <div className="absolute inset-0">
        <img src={IMG.hero} alt="Пальмира Арена ночью" className="w-full h-full object-cover animate-kenburns opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/85 via-void/50 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-transparent to-void/70" />
      </div>

      {/* прожекторы и дым */}
      <div className="floodlight" style={{ top: "-12vh", left: "-12vw", transform: "rotate(14deg)" }} />
      <div className="floodlight" style={{ top: "-12vh", right: "-12vw", transform: "rotate(-14deg)", animationDelay: "3.5s" }} />
      <SmokeTrails count={5} />

      {/* контент */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-44 pb-24">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10"
        >
          <div className="absolute inset-0 -m-10 bg-neon/15 blur-3xl" aria-hidden="true" />
          <ClubLogo className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px]" detailed />
        </motion.div>

        <motion.p
          initial={reduce ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-display uppercase tracking-[0.5em] text-[11px] sm:text-xs text-steel mb-6 flex items-center gap-4"
        >
          <span className="h-px w-8 sm:w-14 bg-white/30" /> Женский футбольный клуб <span className="h-px w-8 sm:w-14 bg-white/30" />
        </motion.p>

        <h1
          className="font-display uppercase font-bold leading-[0.92] tracking-tight text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem]"
          style={{ textShadow: "0 0 60px rgba(255,42,109,0.18)" }}
        >
          {line("Северная", 0.35)}
          {line("Пальмира", 0.5)}
        </h1>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-7 font-display uppercase tracking-[0.42em] text-[11px] sm:text-sm text-white/70"
        >
          Санкт-Петербург · Суперлига · сезон 2025/26
        </motion.p>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8 }}
          className="mt-12"
        >
          <button
            onClick={openTickets}
            className="group flex items-center gap-3 bg-neon text-white font-display uppercase tracking-[0.18em] text-sm px-10 py-4.5 hover:bg-[#e01f5c] transition-colors duration-300"
          >
            <IconTicket className="w-5 h-5" />
            Купить билет
            <IconArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* нижняя статистика */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.25, duration: 0.8 }}
        className="relative z-10 border-t border-white/10 bg-void"
      >
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4">
          {[
            { n: "2011", t: "Год основания" },
            { n: "6", t: "Трофеев клуба" },
            { n: "320+", t: "Воспитанниц академии" },
            { n: "7 400", t: "Средняя посещаемость" },
          ].map((s, i) => (
            <div
              key={s.t}
              className={`py-8 px-6 text-center ${i > 0 ? "border-l border-white/10" : ""} ${i >= 2 ? "border-t md:border-t-0 border-white/10" : ""} ${i === 2 ? "border-l-0 md:border-l" : ""}`}
            >
              <div className="font-display text-4xl md:text-5xl font-semibold text-white leading-none">{s.n}</div>
              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-steel mt-2.5">{s.t}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ================= МАТЧ-ЦЕНТР ================= */
function MatchCenter() {
  const cd = useCountdown();
  const derby = matches.find((m) => m.id === 2)!;

  return (
    <section className="relative py-24 overflow-hidden bg-void border-b border-white/10">
      <div className="absolute -top-10 right-0 font-display uppercase font-bold text-[18vw] leading-none text-outline-neon opacity-[0.06] select-none pointer-events-none" aria-hidden="true">
        Матчи
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Матч-центр"
          title="Результаты и афиша"
          right={
            <Link to="/about#stats" className="group flex items-center gap-2 font-display uppercase tracking-[0.18em] text-xs text-steel hover:text-white transition-colors">
              Турнирная таблица <IconArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          }
        />

        {/* ближайший матч: только команды, время и одна кнопка */}
        <Reveal className="mt-12">
          <div className="bg-coal border border-white/10">
            <div className="grid lg:grid-cols-[1.4fr_1fr]">
              <div className="p-7 sm:p-10 lg:border-r border-white/10">
                <div className="flex items-center gap-3 mb-7">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-neon text-white px-2.5 py-1">Ближайший матч</span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-steel">{derby.competition}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-6 sm:gap-10">
                  <div className="text-center">
                    <ClubLogo className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3" />
                    <div className="font-display uppercase font-semibold text-xl sm:text-2xl leading-none">Сев.<br />Пальмира</div>
                  </div>
                  <div className="text-center">
                    <div className="font-display font-bold text-4xl sm:text-5xl text-white leading-none tabular-nums">19:00</div>
                    <div className="mt-3 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.18em] text-steel">
                      <IconCalendar className="w-3.5 h-3.5" /> Суббота
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 grid place-items-center bg-void border border-white/15">
                      <span className="font-display uppercase font-bold text-lg text-white/70">ГЗ</span>
                    </div>
                    <div className="font-display uppercase font-semibold text-xl sm:text-2xl leading-none text-white/85">Гроза</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-5 p-7 sm:p-10">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="font-display text-3xl sm:text-4xl font-semibold text-white tabular-nums leading-none">{String(cd.days).padStart(2, "0")}</div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-steel mt-1.5">Дней</div>
                  </div>
                  <span className="text-2xl text-white/25">:</span>
                  <div className="text-center">
                    <div className="font-display text-3xl sm:text-4xl font-semibold text-white tabular-nums leading-none">{String(cd.hours).padStart(2, "0")}</div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-steel mt-1.5">Часов</div>
                  </div>
                  <span className="text-2xl text-white/25">:</span>
                  <div className="text-center">
                    <div className="font-display text-3xl sm:text-4xl font-semibold text-white tabular-nums leading-none">{String(cd.mins).padStart(2, "0")}</div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-steel mt-1.5">Минут</div>
                  </div>
                  <span className="text-2xl text-white/25">:</span>
                  <div className="text-center">
                    <div className="font-display text-3xl sm:text-4xl font-semibold text-neon tabular-nums leading-none">{String(cd.secs).padStart(2, "0")}</div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-steel mt-1.5">Секунд</div>
                  </div>
                </div>

                <Link
                  to="/about#stats"
                  className="group flex items-center justify-center gap-2 bg-neon text-white font-display uppercase tracking-[0.16em] text-sm py-4 hover:bg-[#e01f5c] transition-colors duration-300"
                >
                  Статистика команды
                  <IconArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <p className="text-[11px] text-steel text-center">Пальмира Арена · билеты от 500 ₽</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ближайшие матчи */}
        <div className="mt-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white">Ближайшие матчи</span>
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-steel/60 hidden sm:block">Календарь · май — июнь</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {upcomingMatches.map((m) => (
            <UpcomingCard key={m.id} m={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- карточка ближайшего матча ---------- */
function UpcomingCard({ m }: { m: UpcomingMatch }) {
  return (
    <div className="bg-coal border border-white/10 px-5 pt-5 pb-6 flex flex-col gap-4 transition-colors duration-300 hover:border-neon">
      <div className="text-[10px] uppercase tracking-[0.16em] font-semibold text-steel">{m.competition}</div>

      <div className="flex items-center gap-4">
        <div className="bg-white/5 px-3 py-2 text-center">
          <div className="font-display font-bold text-xl text-white leading-none">{m.date}</div>
        </div>
        <div className="flex items-center gap-1.5">
          <IconClock className="w-4 h-4 text-neon" />
          <span className="font-display font-semibold text-xl text-white leading-none tabular-nums">{m.time}</span>
        </div>
      </div>

      <div className="h-px bg-white/10" />

      <div className="space-y-1.5">
        <div className="font-display uppercase font-semibold text-base leading-tight">{m.home}</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-steel/60">против</div>
        <div className="font-display uppercase font-semibold text-base leading-tight text-white/80">{m.away}</div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-steel">
        <IconPin className="w-3.5 h-3.5 shrink-0 text-steel" />
        {m.stadium}
      </div>
    </div>
  );
}

/* ================= О КЛУБЕ ================= */
function Overview() {
  return (
    <section className="relative py-24 bg-coal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker="Клуб" title="Северный характер" />
        <div className="mt-14 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
          {/* постер: чистый прямоугольник */}
          <Reveal x={-30} y={0}>
            <div className="relative group overflow-hidden">
              <img
                src={IMG.poster}
                alt="Игрок ЖФК Северная Пальмира"
                className="w-full aspect-[2/3] object-cover grayscale-[25%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-void via-void/60 to-transparent p-6 pt-16">
                <div className="font-display uppercase tracking-[0.3em] text-[10px] text-steel">Домашняя форма · 2025/26</div>
                <div className="font-display uppercase font-semibold text-2xl mt-1.5">«Чёрный лёд»</div>
              </div>
            </div>
          </Reveal>

          {/* текстовые блоки с вертикальными линиями */}
          <div>
            <div className="group border-l-2 border-neon pl-6 sm:pl-8 py-2">
              <div className="flex items-start gap-5">
                <span className="text-outline-neon font-display font-bold text-7xl md:text-8xl leading-[0.8] select-none shrink-0">01</span>
                <div className="pt-1.5">
                  <h3 className="font-display uppercase font-semibold text-2xl md:text-3xl mb-5">История клуба</h3>
                  <div className="space-y-5 text-[15px] text-steel leading-relaxed">
                    {clubMilestones.slice(0, 3).map((m) => (
                      <p key={m.year}>
                        <span className="text-neon font-display font-semibold tracking-wider mr-3">{m.year}</span>
                        {m.text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/10 my-10" />

            <div className="group border-l-2 border-white/25 hover:border-neon pl-6 sm:pl-8 py-2 transition-colors duration-300">
              <div className="flex items-start gap-5">
                <span className="text-outline-neon font-display font-bold text-7xl md:text-8xl leading-[0.8] select-none shrink-0">02</span>
                <div className="pt-1.5 flex-1">
                  <h3 className="font-display uppercase font-semibold text-2xl md:text-3xl mb-5">Важные моменты</h3>
                  <div>
                    {importantMoments.map((m, i) => (
                      <div
                        key={m.index}
                        className={`group/item flex gap-4 py-4 transition-colors duration-300 cursor-default hover:bg-white/[0.03] ${
                          i < importantMoments.length - 1 ? "border-b border-white/10" : ""
                        }`}
                      >
                        <span className="font-display text-white/40 text-sm tracking-widest pt-1">{m.index}</span>
                        <div>
                          <div className="font-display uppercase font-medium text-base group-hover/item:text-white transition-colors duration-300">{m.title}</div>
                          <div className="text-sm text-steel mt-1.5 leading-relaxed max-w-lg">{m.text}</div>
                        </div>
                        {i === 0 && (
                          <span className="ml-auto self-center text-neon opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <IconArrow className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className="group mt-10 inline-flex items-center gap-3 font-display uppercase tracking-[0.2em] text-sm text-white border-b border-neon pb-2 hover:text-neon hover:gap-5 transition-all duration-300"
            >
              Полная история и состав <IconArrow className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= НОВОСТИ ================= */
function News() {
  /* ровно 6 новостей: 2 ряда по 3 карточки */
  const items = news.slice(0, 6);

  return (
    <section className="relative py-24 bg-void">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Пресс-служба"
          title="Последние новости"
          right={
            <Link to="/media" className="group flex items-center gap-2 font-display uppercase tracking-[0.18em] text-xs text-steel hover:text-white transition-colors">
              Все публикации <IconArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          }
        />

        {/* сетка 3×2 */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {items.map((n, i) => (
            <Reveal key={n.id} delay={(i % 3) * 0.07} className="h-full">
              <Link
                to="/media"
                className="group flex flex-col border border-white/10 bg-coal overflow-hidden h-full transition-colors duration-300 hover:border-neon"
              >
                <div className="relative overflow-hidden shrink-0">
                  <img
                    src={n.image}
                    alt={n.title}
                    loading="lazy"
                    className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-neon text-white text-[9px] font-bold uppercase tracking-[0.14em] px-2 py-1">
                    {n.category}
                  </span>
                  <span className="absolute bottom-2.5 right-3 text-[9px] uppercase tracking-[0.16em] text-white/75">
                    {n.date}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display uppercase font-semibold text-base leading-snug line-clamp-2 group-hover:text-neon transition-colors duration-300">
                    {n.title}
                  </h3>
                  <p className="text-xs text-steel mt-3 leading-relaxed line-clamp-3">{n.excerpt}</p>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-steel group-hover:text-neon transition-colors duration-300">
                    Читать далее <IconArrow className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= ФИНАЛЬНЫЙ ПРИЗЫВ ================= */
function CtaBand() {
  const openTickets = useTickets();
  return (
    <section className="relative py-24 overflow-hidden bg-coal border-t border-white/10">
      <SmokeTrails count={4} />
      <div className="floodlight" style={{ top: "-20vh", left: "25%" }} />
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <Reveal>
          <p className="font-display uppercase tracking-[0.4em] text-[11px] text-steel mb-5">12-й игрок — это ты</p>
          <h2 className="font-display uppercase font-bold text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight">
            До встречи<br />на трибунах <span className="text-neon">Арены</span>
          </h2>
          <p className="text-steel text-sm md:text-base mt-6 max-w-xl mx-auto leading-relaxed">
            Дерби с «Грозой» уже в субботу. Западный сектор готовит перформанс,
            а клубный магазин — лимитированный мерч к матчу.
          </p>
          <div className="mt-9">
            <button
              onClick={openTickets}
              className="group inline-flex items-center justify-center gap-3 bg-neon text-white font-display uppercase tracking-[0.18em] text-sm px-10 py-4 hover:bg-[#e01f5c] transition-colors duration-300"
            >
              <IconTicket className="w-5 h-5" /> Купить билет
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <MatchCenter />
      <Overview />
      <News />
      <CtaBand />
    </>
  );
}
