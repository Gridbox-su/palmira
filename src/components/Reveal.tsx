import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  once?: boolean;
}

/** Обёртка появления при скролле (fade + сдвиг). */
export function Reveal({ children, className, delay = 0, y = 36, x = 0, once = true }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Заголовок секции: кикер + крупный Oswald-заголовок. */
export function SectionHeading({
  kicker,
  title,
  right,
  className,
}: {
  kicker: string;
  title: string;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 ${className ?? ""}`}>
      <div>
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-10 bg-neon inline-block" />
            <span className="font-display uppercase tracking-[0.3em] text-[11px] md:text-xs text-steel">{kicker}</span>
          </div>
          <h2 className="font-display uppercase font-semibold text-3xl md:text-5xl leading-[0.95] tracking-tight">
            {title}
          </h2>
        </Reveal>
      </div>
      {right && <Reveal delay={0.1}>{right}</Reveal>}
    </div>
  );
}

/** Горизонтальные неоновые дымовые следы. */
export function SmokeTrails({ count = 5, className = "" }: { count?: number; className?: string }) {
  const trails = [
    { top: "18%", width: "46%", duration: "11s", delay: "0s" },
    { top: "34%", width: "30%", duration: "15s", delay: "2.5s" },
    { top: "55%", width: "58%", duration: "13s", delay: "5s" },
    { top: "70%", width: "38%", duration: "17s", delay: "1.2s" },
    { top: "84%", width: "52%", duration: "12s", delay: "7s" },
    { top: "45%", width: "26%", duration: "19s", delay: "9s" },
  ].slice(0, count);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {trails.map((t, i) => (
        <span
          key={i}
          className="smoke-trail"
          style={{
            top: t.top,
            width: t.width,
            left: `${(i * 13) % 40}%`,
            animationDuration: t.duration,
            animationDelay: t.delay,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

/** Пульсирующее неоновое кольцо (для герба). */
export function PulseRings() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {[0, 1].map((i) => (
        <span
          key={i}
          className="absolute inset-0 border border-neon/50"
          style={{ animation: `ring-pulse 2.8s ease-out ${i * 1.4}s infinite` }}
        />
      ))}
    </div>
  );
}
