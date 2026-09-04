import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ClubLogo from "./ClubLogo";
import { VkIcon, TelegramIcon, IconTicket, IconMenu, IconClose } from "./icons";
import { useTickets } from "../context";

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
  const location = useLocation();
  const openTickets = useTickets();

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-void/95 border-b border-white/10" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>
            {/* Логотип */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <ClubLogo className={`object-contain transition-all duration-500 ${scrolled ? "w-10 h-10" : "w-12 h-12"}`} />
              <div className="leading-none hidden sm:block">
                <div className="font-display font-semibold uppercase tracking-[0.14em] text-sm text-white">Северная</div>
                <div className="font-display font-semibold uppercase tracking-[0.34em] text-sm text-neon">Пальмира</div>
              </div>
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
                onClick={openTickets}
                className="hidden sm:flex items-center gap-2 bg-neon text-white font-display uppercase tracking-[0.14em] text-[13px] px-5 py-2.5 transition-colors duration-300 hover:bg-[#e01f5c]"
              >
                <IconTicket className="w-4 h-4" />
                Купить билет
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
                  openTickets();
                }}
                className="flex items-center justify-center gap-2 bg-neon text-white font-display uppercase tracking-[0.2em] px-6 py-4"
              >
                <IconTicket className="w-5 h-5" /> Купить билет
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
