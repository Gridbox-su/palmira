import { useState } from "react";
import { Link } from "react-router-dom";
import ClubLogo from "./ClubLogo";
import { VkIcon, TelegramIcon, IconCheck, IconPhone, IconMail, IconPin, IconArrow } from "./icons";
import { sponsors } from "../data/club";

const navLinks = [
  { to: "/about", label: "О команде" },
  { to: "/about#roster", label: "Состав" },
  { to: "/academy", label: "Детская школа" },
  { to: "/media", label: "Медиа" },
  { to: "/contacts", label: "Контакты" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-void overflow-hidden">
      {/* Спонсоры */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <p className="font-display uppercase tracking-[0.3em] text-[10px] text-steel/70 mb-6">Официальные партнёры клуба</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
          {sponsors.map((s, i) => (
            <div
              key={s.name}
              className="group cursor-default border border-white/10 px-4 py-4 text-center transition-colors duration-300 hover:border-neon"
            >
              <div
                className={`font-display uppercase text-white/55 group-hover:text-white transition-colors duration-300 ${
                  i % 3 === 0 ? "tracking-[0.22em] text-sm font-semibold" : i % 3 === 1 ? "tracking-[0.1em] text-base font-medium" : "tracking-[0.3em] text-xs font-semibold"
                }`}
              >
                {s.name}
              </div>
              <div className="text-[9px] uppercase tracking-[0.18em] text-steel/60 mt-1.5">{s.role}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/10" />

      {/* Основная сетка */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-12 lg:grid-cols-[1.3fr_0.8fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-4 mb-5">
            <ClubLogo className="w-20 h-20" />
            <div>
              <div className="font-display uppercase font-semibold tracking-[0.12em] text-lg leading-tight">Северная<br />Пальмира</div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-neon mt-1">ЖФК · Санкт-Петербург</div>
            </div>
          </div>
          <p className="text-sm text-steel leading-relaxed max-w-sm">
            Профессиональный женский футбольный клуб. Суперлига, Кубок России и академия,
            в которой тренируются 320 девочек со всего города.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a href="https://vk.com" target="_blank" rel="noreferrer" aria-label="ВКонтакте" className="w-10 h-10 grid place-items-center bg-neon text-white transition-colors duration-300 hover:bg-white hover:text-neon">
              <VkIcon className="w-4.5 h-4.5" />
            </a>
            <a href="https://t.me" target="_blank" rel="noreferrer" aria-label="Telegram" className="w-10 h-10 grid place-items-center bg-neon text-white transition-colors duration-300 hover:bg-white hover:text-neon">
              <TelegramIcon className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display uppercase tracking-[0.25em] text-sm mb-5 text-white">Навигация</h4>
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="group inline-flex items-center gap-2 text-sm text-steel hover:text-neon transition-colors duration-300">
                  <span className="h-px w-3 bg-neon/50 group-hover:w-5 transition-all duration-300" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display uppercase tracking-[0.25em] text-sm mb-5 text-white">Контакты</h4>
          <ul className="space-y-4 text-sm text-steel">
            <li className="flex items-start gap-3">
              <IconPin className="w-4.5 h-4.5 text-neon shrink-0 mt-0.5" />
              <span>Санкт-Петербург,<br />Южная дорога, 8 · «Пальмира Арена»</span>
            </li>
            <li className="flex items-center gap-3">
              <IconPhone className="w-4.5 h-4.5 text-neon shrink-0" />
              <a href="tel:+78122457007" className="hover:text-neon transition-colors">+7 (812) 245-70-07</a>
            </li>
            <li className="flex items-center gap-3">
              <IconMail className="w-4.5 h-4.5 text-neon shrink-0" />
              <a href="mailto:press@sevpalmira.ru" className="hover:text-neon transition-colors">press@sevpalmira.ru</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display uppercase tracking-[0.25em] text-sm mb-5 text-white">Клубная рассылка</h4>
          <p className="text-sm text-steel mb-4">Билеты, новости и эксклюзивы — раз в неделю, без спама.</p>
          {subscribed ? (
            <div className="flex items-center gap-3 border border-neon bg-neon/10 px-4 py-3.5 text-sm text-neon">
              <IconCheck className="w-5 h-5" /> Вы подписаны! Проверьте почту.
            </div>
          ) : (
            <form onSubmit={subscribe} className="flex">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш e-mail"
                className="field !border-r-0 flex-1 min-w-0"
                aria-label="E-mail для рассылки"
              />
              <button
                type="submit"
                aria-label="Подписаться"
                className="bg-neon px-4 grid place-items-center text-white transition-colors duration-300 hover:bg-[#e01f5c]"
              >
                <IconArrow className="w-5 h-5" />
              </button>
            </form>
          )}
          <div className="mt-6 surface px-4 py-3 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.2em] text-steel">Следующий домашний матч</span>
            <Link to="/media" className="text-[11px] uppercase tracking-[0.14em] text-neon hover:text-white transition-colors">Смотреть анонс →</Link>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-steel/70 tracking-wide">© 2025 ЖФК «Северная Пальмира». Все права защищены.</p>
        <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.14em] text-steel/70">
          <Link to="/contacts" className="hover:text-neon transition-colors">Политика конфиденциальности</Link>
          <Link to="/contacts" className="hover:text-neon transition-colors">Регламент стадиона</Link>
          <Link to="/about" className="hover:text-neon transition-colors">Вакансии</Link>
        </div>
      </div>
    </footer>
  );
}
