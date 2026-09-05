import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

/** Страховка от «чёрного экрана»: показываем ошибку вместо пустой страницы. */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("Render error:", error);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: "100vh", background: "#050505", color: "#fff", fontFamily: "Montserrat, sans-serif", display: "grid", placeItems: "center", padding: 24 }}>
          <div style={{ maxWidth: 560, border: "1px solid rgba(255,42,109,0.5)", padding: 32 }}>
            <div style={{ fontFamily: "Oswald, sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 22, marginBottom: 12 }}>
              Ошибка рендера
            </div>
            <p style={{ color: "#a0a0a0", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              {String(this.state.error?.message ?? this.state.error)}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{ marginTop: 20, background: "#ff2a6d", color: "#fff", border: "none", padding: "12px 28px", fontFamily: "Oswald, sans-serif", textTransform: "uppercase", letterSpacing: "0.14em", cursor: "pointer" }}
            >
              Перезагрузить
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
