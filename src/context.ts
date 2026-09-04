import { createContext, useContext } from "react";

/** Контекст открытия модалки покупки билетов из любого места сайта. */
export const TicketContext = createContext<() => void>(() => {});

export const useTickets = () => useContext(TicketContext);
