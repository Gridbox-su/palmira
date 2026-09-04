interface IconProps {
  className?: string;
}

const base = (className?: string) => className ?? "w-5 h-5";

export const VkIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)} aria-label="VK">
    <path d="M13.1 17.2h1.5s.45-.05.68-.3c.21-.23.2-.66.2-.66s-.03-2 .9-2.3c.92-.29 2.1 1.95 3.35 2.81.94.65 1.66.51 1.66.51l3.34-.05s1.75-.11.92-1.5c-.07-.11-.48-1-2.47-2.86-2.08-1.95-1.8-1.64.7-4.98 1.52-2.03 2.13-3.27 1.94-3.8-.18-.5-1.3-.37-1.3-.37l-3.76.02s-.28-.04-.49.08c-.2.12-.33.4-.33.4s-.6 1.59-1.4 2.95c-1.68 2.87-2.35 3.02-2.63 2.84-.64-.41-.48-1.66-.48-2.54 0-2.77.42-3.92-.82-4.22-.41-.1-.71-.17-1.76-.18-1.34-.01-2.48 0-3.12.32-.43.21-.76.68-.56.71.25.03.81.15 1.11.55.39.52.37 1.69.37 1.69s.22 3.29-.52 3.69c-.51.28-1.2-.29-2.69-2.86-.76-1.31-1.34-2.76-1.34-2.76s-.11-.27-.31-.42c-.24-.17-.58-.23-.58-.23l-3.57.02s-.54.02-.74.25c-.18.21-.01.64-.01.64s2.79 6.53 5.95 9.82c2.9 3.02 6.19 2.82 6.19 2.82Z" />
  </svg>
);

export const TelegramIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)} aria-label="Telegram">
    <path d="M9.04 15.51l-.37 5.27c.53 0 .76-.23 1.04-.5l2.5-2.4 5.18 3.8c.95.52 1.63.25 1.88-.88l3.4-15.95c.3-1.4-.51-1.95-1.43-1.6L1.35 11.5c-1.36.53-1.34 1.29-.23 1.63l5.1 1.59L18.06 6.8c.56-.37 1.07-.16.65.2L9.04 15.51Z" />
  </svg>
);

export const IconTicket = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={base(className)}>
    <path d="M3.5 8V6a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v2a2.6 2.6 0 0 0 0 8v2a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-2a2.6 2.6 0 0 0 0-8Z" />
    <path d="M14 5.5v2M14 11v2M14 16.5v2" strokeDasharray="0.1 3.4" strokeLinecap="round" />
  </svg>
);

export const IconPlay = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)}>
    <path d="M7 4.8v14.4c0 .8.9 1.3 1.6.9l11-7.2c.6-.4.6-1.4 0-1.8l-11-7.2c-.7-.4-1.6.1-1.6.9Z" />
  </svg>
);

export const IconArrow = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base(className)}>
    <path d="M5 12h13M13 6.5 18.5 12 13 17.5" strokeLinecap="square" />
  </svg>
);

export const IconArrowUpRight = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base(className)}>
    <path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" strokeLinecap="square" />
  </svg>
);

export const IconPhone = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={base(className)}>
    <path d="M5 4h4l1.5 4.5L8 10a13 13 0 0 0 6 6l1.5-2.5L20 15v4a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z" strokeLinejoin="round" />
  </svg>
);

export const IconMail = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={base(className)}>
    <rect x="3.5" y="5.5" width="17" height="13" />
    <path d="m4.5 7 7.5 6 7.5-6" />
  </svg>
);

export const IconPin = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={base(className)}>
    <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);

export const IconMetro = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base(className)}>
    <path d="M4 18 8.5 6h2L12 10.2 13.5 6h2L20 18h-3.4l-2.6-7.4L11.4 18H4Z" strokeLinejoin="round" />
  </svg>
);

export const IconBall = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={base(className)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 8.2 15.6 11l-1.4 4.2H9.8L8.4 11 12 8.2ZM12 3.5v4.7M15.6 11l4.3-1.3M14.2 15.2l2.6 3.6M9.8 15.2 7.2 18.8M8.4 11 4.1 9.7" />
  </svg>
);

export const IconClock = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={base(className)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5.2l3.4 2" strokeLinecap="round" />
  </svg>
);

export const IconCalendar = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={base(className)}>
    <rect x="4" y="5.5" width="16" height="15" />
    <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" strokeLinecap="round" />
  </svg>
);

export const IconClose = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base(className)}>
    <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
  </svg>
);

export const IconMenu = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base(className)}>
    <path d="M3.5 7h17M3.5 12h11M3.5 17h17" strokeLinecap="round" />
  </svg>
);

export const IconChevron = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base(className)}>
    <path d="m8.5 5 7 7-7 7" strokeLinecap="square" />
  </svg>
);

export const IconCamera = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={base(className)}>
    <path d="M4 8h3l2-2.5h6L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
    <circle cx="12" cy="13" r="3.4" />
  </svg>
);

export const IconCheck = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={base(className)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="square" />
  </svg>
);

export const IconWhistle = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={base(className)}>
    <path d="M3 10.5 13 8.5a5 5 0 1 0 8 4c0-.6-.1-1.2-.3-1.7L22 10l-1-3.5-9.5 2.3A5 5 0 0 0 3 10.5Z" strokeLinejoin="round" />
    <circle cx="17" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const IconStar = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)}>
    <path d="m12 3 2.7 5.8 6.3.8-4.6 4.3 1.2 6.1L12 17l-5.6 3 1.2-6.1L3 9.6l6.3-.8L12 3Z" />
  </svg>
);

export const IconUser = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={base(className)}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M5 20a7 7 0 0 1 14 0" strokeLinecap="round" />
  </svg>
);

export const IconShield = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={base(className)}>
    <path d="M12 3 20 6v6c0 5-3.4 7.6-8 9-4.6-1.4-8-4-8-9V6l8-3Z" strokeLinejoin="round" />
    <path d="M12 8v5m-2.4-3.2L12 8l2.4 1.8" strokeLinecap="round" />
  </svg>
);

export const IconEye = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={base(className)}>
    <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2.8" />
  </svg>
);
