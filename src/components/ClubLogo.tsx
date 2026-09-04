import { useState } from "react";
import { LOGO_URL } from "../data/club";
import Crest from "./Crest";

/** Логотип клуба: PNG по ссылке, при ошибке загрузки — SVG-герб. */
export default function ClubLogo({ className = "w-12 h-12", detailed = false }: { className?: string; detailed?: boolean }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <Crest size={48} detailed={detailed} className={className} />;
  }

  return (
    <img
      src={LOGO_URL}
      alt="Логотип ЖФК Северная Пальмира"
      className={className}
      style={{ objectFit: "contain" }}
      onError={() => setFailed(true)}
      draggable={false}
    />
  );
}
