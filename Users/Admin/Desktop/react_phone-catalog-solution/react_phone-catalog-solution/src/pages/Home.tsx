import { Link } from "react-router-dom";
import { MatrixRain } from "../components/MatrixRain";

export const Home = () => {
  return (
    <>
     
      {typeof window !== "undefined" && <MatrixRain key={Date.now()} />}

      <div
  style={{
    textAlign: "center",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}
>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/react_phone-catalog/img/ai-banner.png"
            alt="AI tech"
            style={{
              width: "520px",
              maxWidth: "90%",
              filter: "drop-shadow(0 0 40px #c8f1ff)",
            }}
          />
        </div>

        <div style={{ marginTop: "40px" }}>
          <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
            Phone Catalog
          </h1>

          <p style={{ fontSize: "18px", color: "#8aa8b5" }}>
            FullStack portfolio project
          </p>

          <Link to="/catalog">
            <button
              style={{
                marginTop: "25px",
                padding: "14px 28px",
                fontSize: "16px",
                cursor: "pointer",
                background: "none",
                border: "none",
                color: "#94aeb8",
                letterSpacing: "2px",
                transition: "0.3s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#dff6ff";
                e.currentTarget.style.textShadow =
                  "0 0 14px rgba(180,230,255,0.7)";
                e.currentTarget.style.transform = "scale(1.08)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "#94aeb8";
                e.currentTarget.style.textShadow = "none";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              GO TO CATALOG
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};