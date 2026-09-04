import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconClose, IconCheck, IconTicket } from "./icons";
import { matches } from "../data/club";

const sectors = [
  { id: "A", name: "Трибуна A · Запад", price: 900 },
  { id: "B", name: "Трибуна B · Восток", price: 700 },
  { id: "C", name: "Трибуна C · Юг (фан-сектор)", price: 500 },
  { id: "VIP", name: "VIP-ложа «Пальмира»", price: 2500 },
];

export default function TicketModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const upcoming = useMemo(() => matches.filter((m) => m.status !== "FT"), []);
  const [matchId, setMatchId] = useState(upcoming[0]?.id ?? 2);
  const [sector, setSector] = useState(sectors[1].id);
  const [qty, setQty] = useState(2);
  const [done, setDone] = useState(false);
  const [orderCode, setOrderCode] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      window.addEventListener("keydown", onKey);
      setDone(false);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const match = upcoming.find((m) => m.id === matchId) ?? upcoming[0];
  const sec = sectors.find((s) => s.id === sector)!;
  const total = sec.price * qty;

  const submit = () => {
    setOrderCode(`СП-2025-${Math.floor(1000 + Math.random() * 9000)}`);
    setDone(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-void/90 grid place-items-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-coal border border-white/15 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Покупка билетов"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent" />
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <IconTicket className="w-5 h-5 text-neon" />
                <span className="font-display uppercase tracking-[0.2em] text-sm">Билеты · Пальмира Арена</span>
              </div>
              <button onClick={onClose} aria-label="Закрыть" className="w-9 h-9 grid place-items-center bg-white/10 text-steel hover:bg-neon hover:text-white transition-colors">
                <IconClose className="w-4 h-4" />
              </button>
            </div>

            {done ? (
              <div className="px-6 py-12 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="w-16 h-16 mx-auto grid place-items-center bg-neon text-white mb-8"
                >
                  <IconCheck className="w-8 h-8" />
                </motion.div>
                <h3 className="font-display uppercase text-2xl font-semibold mb-2">Заявка принята</h3>
                <p className="text-sm text-steel mb-1">Номер брони: <span className="text-neon font-semibold">{orderCode}</span></p>
                <p className="text-xs text-steel/70 mb-8">Оплата и QR-билеты придут на почту в течение 15 минут.<br />Детям до 7 лет — вход бесплатный.</p>
                <button onClick={onClose} className="bg-neon text-white font-display uppercase tracking-[0.18em] text-sm px-8 py-3 hover:bg-[#e01f5c] transition-colors">
                  Отлично
                </button>
              </div>
            ) : (
              <div className="px-6 py-6 space-y-5">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-steel mb-2">Матч</label>
                  <select value={matchId} onChange={(e) => setMatchId(Number(e.target.value))} className="field">
                    {upcoming.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.home} — {m.away} · {m.competition} · {m.date}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-steel mb-2">Сектор</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sectors.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSector(s.id)}
                        className={`text-left px-3.5 py-3 transition-colors duration-300 ${
                          sector === s.id ? "bg-neon text-white" : "bg-white/5 text-steel hover:bg-white/10"
                        }`}
                      >
                        <div className="text-[12px] font-semibold">{s.name}</div>
                        <div className={`text-[11px] mt-0.5 ${sector === s.id ? "text-white/85" : "text-steel"}`}>{s.price.toLocaleString("ru-RU")} ₽</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-end gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-steel mb-2">Билетов</label>
                    <div className="flex items-center bg-white/5">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-11 grid place-items-center text-steel hover:text-white hover:bg-white/10 transition-colors" aria-label="Меньше">−</button>
                      <span className="w-10 text-center font-display text-lg">{qty}</span>
                      <button onClick={() => setQty(Math.min(6, qty + 1))} className="w-10 h-11 grid place-items-center text-steel hover:text-white hover:bg-white/10 transition-colors" aria-label="Больше">+</button>
                    </div>
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-steel mb-1">Итого</div>
                    <div className="font-display text-3xl font-semibold text-neon">{total.toLocaleString("ru-RU")} ₽</div>
                  </div>
                </div>

                <button
                  onClick={submit}
                  className="w-full bg-neon text-white font-display uppercase tracking-[0.2em] text-sm py-4 hover:bg-[#e01f5c] transition-colors"
                >
                  Забронировать · {match?.home} vs {match?.away}
                </button>
                <p className="text-[10px] text-steel/60 text-center uppercase tracking-[0.16em]">Демо-режим: оплата не производится</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
