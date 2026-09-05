import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "../components/Reveal";
import { IconArrow, IconCamera, IconChevron, IconClose, IconEye, IconPlay } from "../components/icons";
import { IMG, photos, videos, type PhotoItem, type VideoItem } from "../data/club";

/* ---------- стрим-хаб ---------- */
function StreamHub() {
  const reduce = useReducedMotion();
  const [featured, setFeatured] = useState<VideoItem | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => setPlaying(false), [featured]);

  const title = featured ? featured.title : "Сев. Пальмира — Гроза · Прямая трансляция дерби";
  const meta = featured ? `${featured.category} · ${featured.views} просмотров` : "Суббота · 19:00 МСК · Пальмира Арена";

  return (
    <div id="stream">
      <Reveal className="mt-10">
        <div className="relative bg-coal border border-white/10 overflow-hidden">
          <div className="relative aspect-video max-h-[540px] w-full bg-void">
            <img src={IMG.stream} alt="Кадр трансляции" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-void/40" />

            {/* верхние бейджи */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="flex items-center gap-2 bg-neon text-white text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> {playing ? "Эфир идёт" : "Скоро в эфире"}
              </span>
              <span className="bg-void/80 text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 text-white/80">1080p</span>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-void/80 text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 text-white/80">
              <IconEye className="w-3.5 h-3.5 text-neon" /> 24 318 ждут
            </div>

            {/* эквалайзер при «эфире» */}
            {playing && (
              <div className="absolute bottom-16 left-5 flex items-end gap-1 h-8" aria-hidden="true">
                {[0.9, 0.5, 1.1, 0.7, 1.3, 0.6].map((d, i) => (
                  <span key={i} className="w-1.5 bg-neon animate-eq" style={{ animationDuration: `${d}s`, height: `${18 + (i % 3) * 8}px` }} />
                ))}
              </div>
            )}

            {/* кнопка play */}
            {!playing && (
              <button
                onClick={() => setPlaying(true)}
                aria-label="Включить трансляцию"
                className="absolute inset-0 grid place-items-center"
              >
                <span className="w-20 h-20 md:w-24 md:h-24 bg-neon grid place-items-center text-white transition-colors duration-300 hover:bg-[#e01f5c]">
                  <IconPlay className="w-8 h-8 ml-1" />
                </span>
              </button>
            )}

            {/* прогресс-бар */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
              {playing && (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: reduce ? 0 : 180, ease: "linear" }}
                  className="h-full bg-neon"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5">
            <div>
              <div className="font-display uppercase font-semibold text-lg md:text-xl leading-tight">{title}</div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-steel mt-1.5">{meta}</div>
            </div>
            {playing && (
              <button onClick={() => setPlaying(false)} className="shrink-0 text-[11px] uppercase tracking-[0.16em] px-4 py-2.5 bg-white/10 text-steel hover:bg-white/20 hover:text-white transition-colors">
                Остановить превью
              </button>
            )}
          </div>
        </div>
      </Reveal>

      <VideoGallery onPick={(v) => { setFeatured(v); setPlaying(true); document.getElementById("stream")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); }} />
    </div>
  );
}

/* ---------- видео-галерея ---------- */
const videoCats = ["Все", "Обзоры матчей", "Интервью", "Влоги"] as const;

function VideoGallery({ onPick }: { onPick: (v: VideoItem) => void }) {
  const [cat, setCat] = useState<(typeof videoCats)[number]>("Все");
  const list = useMemo(() => (cat === "Все" ? videos : videos.filter((v) => v.category === cat)), [cat]);

  return (
    <div className="mt-16">
      <SectionHeading kicker="Видео" title="Клубное телевидение" />
      <div className="mt-8 flex flex-wrap gap-2.5">
        {videoCats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`font-display uppercase tracking-[0.14em] text-[12px] px-4.5 py-2.5 transition-colors duration-300 ${
              cat === c ? "bg-neon text-white" : "bg-white/5 text-steel hover:bg-white/10 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {list.map((v, i) => (
            <motion.button
              layout
              key={v.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.38, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onPick(v)}
              className="group text-left bg-coal border border-white/10 overflow-hidden transition-colors duration-300 hover:border-neon"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={v.thumb} alt={v.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
                <span className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-14 h-14 bg-neon text-white grid place-items-center">
                    <IconPlay className="w-5 h-5 ml-0.5" />
                  </span>
                </span>
                <span className="absolute top-3 left-3 bg-void/80 text-[9px] uppercase tracking-[0.14em] px-2 py-1 text-white/85">{v.category}</span>
                <span className="absolute bottom-3 right-3 bg-neon text-white text-[10px] font-bold px-2 py-0.5">{v.duration}</span>
              </div>
              <div className="p-4.5">
                <div className="font-display uppercase font-medium text-[15px] leading-snug group-hover:text-neon transition-colors duration-300">{v.title}</div>
                <div className="flex items-center gap-3 mt-2.5 text-[10px] uppercase tracking-[0.14em] text-steel">
                  <span className="flex items-center gap-1.5"><IconEye className="w-3.5 h-3.5" /> {v.views}</span>
                  <span>{v.date}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ---------- фотоальбомы + лайтбокс ---------- */
const photoCats = ["Все", "Матчи", "Тренировки", "События"] as const;

function Albums() {
  const [cat, setCat] = useState<(typeof photoCats)[number]>("Все");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const list = useMemo(() => (cat === "Все" ? photos : photos.filter((p) => p.category === cat)), [cat]);

  const move = (dir: 1 | -1) => {
    if (lightbox === null) return;
    const idx = list.findIndex((p) => p.id === lightbox);
    const nextIdx = (idx + dir + list.length) % list.length;
    setLightbox(list[nextIdx].id);
  };

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, cat]);

  const current: PhotoItem | undefined = photos.find((p) => p.id === lightbox);
  const currentIdx = current ? list.findIndex((p) => p.id === current.id) + 1 : 0;

  return (
    <div className="mt-20">
      <SectionHeading
        kicker="Фотоальбомы"
        title="Жизнь клуба в кадрах"
        right={<span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-steel"><IconCamera className="w-4 h-4 text-neon" /> {photos.length} фото · сезон 2025/26</span>}
      />
      <div className="mt-8 flex flex-wrap gap-2.5">
        {photoCats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`font-display uppercase tracking-[0.14em] text-[12px] px-4.5 py-2.5 transition-colors duration-300 ${
              cat === c ? "bg-neon text-white" : "bg-white/5 text-steel hover:bg-white/10 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-7 columns-2 md:columns-3 gap-4 [column-fill:balance]">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.button
              layout
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox(p.id)}
              className="group relative block w-full mb-4 break-inside-avoid overflow-hidden border border-white/10 transition-colors duration-300 hover:border-neon"
            >
              <img src={p.src} alt={p.title} loading="lazy" className={`w-full object-cover grayscale-[25%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ${p.wide ? "aspect-[16/10]" : "aspect-[4/5]"}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 inset-x-0 p-4 text-left translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[9px] uppercase tracking-[0.16em] text-neon">{p.category}</span>
                <div className="font-display uppercase text-sm font-medium mt-0.5">{p.title}</div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* лайтбокс */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-void/95 flex flex-col"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <div className="font-display uppercase font-medium text-sm">{current.title}</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-steel mt-1">{current.category} · {currentIdx} / {list.length}</div>
              </div>
              <button aria-label="Закрыть" className="w-10 h-10 grid place-items-center bg-white/10 text-white hover:bg-neon transition-colors" onClick={() => setLightbox(null)}>
                <IconClose className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 relative grid place-items-center px-4 pb-6 min-h-0">
              <button
                aria-label="Предыдущее фото"
                onClick={(e) => { e.stopPropagation(); move(-1); }}
                className="absolute left-3 sm:left-6 z-10 w-12 h-12 grid place-items-center bg-white/10 text-white hover:bg-neon transition-colors"
              >
                <IconChevron className="w-5 h-5 rotate-180" />
              </button>
              <motion.img
                key={current.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                src={current.src}
                alt={current.title}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full object-contain border border-white/10"
              />
              <button
                aria-label="Следующее фото"
                onClick={(e) => { e.stopPropagation(); move(1); }}
                className="absolute right-3 sm:right-6 z-10 w-12 h-12 grid place-items-center bg-white/10 text-white hover:bg-neon transition-colors"
              >
                <IconChevron className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Media() {
  const reduce = useReducedMotion();
  return (
    <>
      <section className="relative pt-10 md:pt-14 pb-10 overflow-hidden border-b border-white/10 bg-coal">
        <div className="floodlight" style={{ top: "-30vh", left: "35%" }} />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 font-display uppercase font-bold text-[16vw] leading-none text-outline-neon opacity-[0.06] select-none pointer-events-none" aria-hidden="true">
          Медиа
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="line-mask">
            <motion.span initial={reduce ? undefined : { y: "115%" }} animate={{ y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }} className="flex items-center gap-4 font-display uppercase tracking-[0.4em] text-[11px] text-steel">
              <span className="h-px w-10 bg-neon" /> Клубное телевидение «Пальмира ТВ»
            </motion.span>
          </span>
          <h1 className="mt-4 font-display uppercase font-bold text-6xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight">
            <span className="line-mask"><motion.span initial={reduce ? undefined : { y: "112%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>Медиа</motion.span></span>
          </h1>
          <motion.p initial={reduce ? undefined : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }} className="mt-6 max-w-xl text-sm md:text-base text-steel leading-relaxed">
            Прямые трансляции домашних матчей, обзоры, интервью и влоги — всё, что происходит
            в клубе, в одном месте. Новое видео — каждый вторник.
          </motion.p>
          <motion.div initial={reduce ? undefined : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.7 }} className="mt-7 flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-steel">
            <span><b className="text-neon font-display text-base">180K</b> подписчиков</span>
            <span className="w-px h-4 bg-white/15" />
            <span><b className="text-neon font-display text-base">2.4M</b> просмотров за сезон</span>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StreamHub />
        <Albums />
        <Reveal className="mt-20">
          <div className="bg-coal border border-white/10 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="font-display uppercase font-semibold text-2xl">Аккредитация СМИ</div>
              <p className="text-sm text-steel mt-2 max-w-xl">Пресс-центр работает на каждом домашнем матче: микст-зона, пресс-конференция и фото-позиции у поля. Заявки — за 48 часов до игры.</p>
            </div>
            <Link to="/contacts" className="group shrink-0 flex items-center gap-3 bg-neon text-white font-display uppercase tracking-[0.16em] text-sm px-7 py-3.5 transition-colors duration-300 hover:bg-[#e01f5c]">
              Подать заявку <IconArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
