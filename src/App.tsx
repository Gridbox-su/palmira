import { useEffect, useState } from "react";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TicketModal from "./components/TicketModal";
import Home from "./pages/Home";
import About from "./pages/About";
import Academy from "./pages/Academy";
import Media from "./pages/Media";
import Contacts from "./pages/Contacts";
import Matches from "./pages/Matches";
import { PrivacyPage, RulesPage } from "./pages/Legal";
import { TicketContext } from "./context";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        document.getElementById(hash.replace("#", ""))?.scrollIntoView({ block: "start" });
      }, 150);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
}

function Shell() {
  const [ticketsOpen, setTicketsOpen] = useState(false);

  return (
    <TicketContext.Provider value={() => setTicketsOpen(true)}>
      <div className="min-h-screen bg-void text-snow font-body antialiased">
        <ScrollManager />
        <div className="noise-overlay" aria-hidden="true" />
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <TicketModal open={ticketsOpen} onClose={() => setTicketsOpen(false)} />
      </div>
    </TicketContext.Provider>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <Shell />
      </HashRouter>
    </MotionConfig>
  );
}
