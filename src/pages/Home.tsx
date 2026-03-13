import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MatrixRain } from "../components/MatrixRain";

export const Home = () => {
  useEffect(() => {
    document.title = "Home | Phone Catalog";
  }, []);

  return (
    <>
     
      {typeof window !== "undefined" && <MatrixRain />}

      <div
        className="home-hero"
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
          className="home-banner-wrap"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/react_phone-catalog/img/ai-banner.png"
            alt="AI tech"
            className="home-banner"
            style={{
              width: "520px",
              maxWidth: "90%",
              filter: "drop-shadow(0 0 40px #c8f1ff)",
            }}
          />
        </div>

        <div className="home-content" style={{ marginTop: "40px" }}>
          <h1 className="home-title" style={{ fontSize: "48px", marginBottom: "10px" }}>
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
