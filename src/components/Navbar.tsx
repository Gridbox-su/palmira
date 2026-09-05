import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ClubLogo from "./ClubLogo";
import { VkIcon, TelegramIcon, IconPhone, IconMenu, IconClose, IconCheck } from "./icons";

const links = [
  { to: "/", label: "Главная", end: true },
  { to: "/about", label: "О команде" },
  { to: "/academy", label: "Детская школа" },
  { to: "/media", label: "Медиа" },
  { to: "/contacts", label: "Контакты" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const [callSent, setCallSent] = useState(false);
  const [callError, setCallError] = useState("");
  const [callForm, setCallForm] = useState({ name: "", phone: "" });
  const location = useLocation();

  const submitCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callForm.name.trim() || !callForm.phone.trim()) {
      setCallError("Заполните имя и номер телефона.");
      return;
    }
    setCallError("");
    setCallSent(true);
    setTimeout(() => {
      setCallOpen(false);
      setCallSent(false);
      setCallForm({ name: "", phone: "" });
    }, 2600);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative font-display uppercase tracking-[0.18em] text-[13px] transition-colors duration-300 pb-1
     after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-neon after:transition-all after:duration-300
     ${isActive ? "text-neon after:w-full" : "text-white/75 hover:text-white after:w-0 hover:after:w-full"}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-[9999] bg-[rgba(5,5,5,0.85)] backdrop-blur-[10px] transition-all duration-500 ${
          scrolled ? "border-b border-white/10" : "border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5">
            {/* Логотип */}
            <Link to="/" className="flex items-center group shrink-0" aria-label="ЖФК Северная Пальмира — на главную">
              <ClubLogo className="object-contain h-[60px] w-auto" />
            </Link>

            {/* Навигация (desktop) */}
            <nav className="hidden lg:flex items-center gap-8">
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                  {l.label}
                </NavLink>
              ))}
            </nav>

            {/* Соцсети + CTA */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden md:flex items-center gap-2">
                <a href="https://vk.com" target="_blank" rel="noreferrer" aria-label="ВКонтакте" className="w-9 h-9 grid place-items-center bg-neon text-white transition-colors duration-300 hover:bg-white hover:text-neon">
                  <VkIcon className="w-4 h-4" />
                </a>
                <a href="https://t.me" target="_blank" rel="noreferrer" aria-label="Telegram" className="w-9 h-9 grid place-items-center bg-neon text-white transition-colors duration-300 hover:bg-white hover:text-neon">
                  <TelegramIcon className="w-4 h-4" />
                </a>
              </div>
              <button
                onClick={() => setCallOpen((v) => !v)}
                aria-expanded={callOpen}
                className={`hidden sm:flex items-center gap-2 font-display uppercase tracking-[0.14em] text-[13px] px-5 py-2.5 transition-colors duration-300 ${
                  callOpen ? "bg-white text-neon" : "bg-neon text-white hover:bg-[#e01f5c]"
                }`}
              >
                <IconPhone className="w-4 h-4" />
                Заказать звонок
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden w-10 h-10 grid place-items-center bg-white/10 text-white hover:bg-neon transition-colors"
                aria-label="Меню"
              >
                {open ? <IconClose className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Мини-форма «Заказать звонок» */}
        <AnimatePresence>
          {callOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full mt-2 right-4 sm:right-6 lg:right-8 z-[60] w-[calc(100vw-2rem)] max-w-[320px] bg-coal border border-white/15 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-display uppercase tracking-[0.18em] text-sm">Заказать звонок</span>
                <button
                  onClick={() => setCallOpen(false)}
                  aria-label="Закрыть форму"
                  className="w-8 h-8 grid place-items-center bg-white/10 text-steel hover:bg-neon hover:text-white transition-colors"
                >
                  <IconClose className="w-3.5 h-3.5" />
                </button>
              </div>

              {callSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 border border-neon bg-neon/10 px-3.5 py-3.5 text-[13px] text-neon"
                >
                  <IconCheck className="w-5 h-5 shrink-0" />
                  Заявка принята — перезвоним в течение 15 минут.
                </motion.div>
              ) : (
                <form onSubmit={submitCall} className="space-y-3">
                  <input
                    className="field"
                    placeholder="Имя"
                    value={callForm.name}
                    onChange={(e) => { setCallForm((f) => ({ ...f, name: e.target.value })); setCallError(""); }}
                    aria-label="Имя"
                  />
                  <input
                    className="field"
                    placeholder="Номер телефона"
                    value={callForm.phone}
                    onChange={(e) => { setCallForm((f) => ({ ...f, phone: e.target.value })); setCallError(""); }}
                    aria-label="Номер телефона"
                  />
                  {callError && <p className="text-xs text-neon">{callError}</p>}
                  <button
                    type="submit"
                    className="w-full bg-neon text-white font-display uppercase tracking-[0.18em] text-xs py-3 hover:bg-[#e01f5c] transition-colors"
                  >
                    Отправить
                  </button>
                  <p className="text-[10px] text-steel/70 leading-relaxed">
                    Менеджер клуба свяжется с вами в рабочее время (10:00–19:00 МСК).
                  </p>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-void/98 lg:hidden flex flex-col"
          >
            <div className="absolute inset-x-0 top-1/4 opacity-40 pointer-events-none">
              <div className="smoke-trail" style={{ top: "20%", width: "60%", animationDuration: "14s" }} />
              <div className="smoke-trail" style={{ top: "60%", width: "45%", animationDuration: "18s", animationDelay: "3s" }} />
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.to}
                    end={l.end}
                    className={({ isActive }) =>
                      `block font-display uppercase font-semibold text-4xl sm:text-5xl tracking-tight py-3 border-b border-white/10 transition-colors ${
                        isActive ? "text-neon" : "text-white hover:text-neon"
                      }`
                    }
                  >
                    <span className="text-neon/60 font-normal text-lg mr-4 align-middle">0{i + 1}</span>
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="px-8 pb-12 flex flex-col gap-5"
            >
              <button
                onClick={() => {
                  setOpen(false);
                  setCallOpen(true);
                }}
                className="flex items-center justify-center gap-2 bg-neon text-white font-display uppercase tracking-[0.2em] px-6 py-4 hover:bg-[#e01f5c] transition-colors"
              >
                <IconPhone className="w-5 h-5" /> Заказать звонок
              </button>
              <div className="flex items-center gap-3">
                <a href="https://vk.com" target="_blank" rel="noreferrer" aria-label="ВКонтакте" className="w-11 h-11 grid place-items-center bg-neon text-white hover:bg-white hover:text-neon transition-colors">
                  <VkIcon className="w-5 h-5" />
                </a>
                <a href="https://t.me" target="_blank" rel="noreferrer" aria-label="Telegram" className="w-11 h-11 grid place-items-center bg-neon text-white hover:bg-white hover:text-neon transition-colors">
                  <TelegramIcon className="w-5 h-5" />
                </a>
                <span className="font-display uppercase tracking-[0.3em] text-xs text-steel ml-2">СПб · осн. 2011</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
