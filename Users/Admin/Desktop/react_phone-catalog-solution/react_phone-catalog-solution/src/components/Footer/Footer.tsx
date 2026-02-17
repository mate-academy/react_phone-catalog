const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "120px",
        padding: "40px 0",
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        fontSize: "14px",
        color: "#8aa8b5",
        letterSpacing: "2px",
      }}
    >
      <a
        href="https://github.com/sashkatmshchk-pixel"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "#8aa8b5",
          transition: "0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#c8f1ff";
          e.currentTarget.style.textShadow = "0 0 12px rgba(0,200,255,0.6)";
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#8aa8b5";
          e.currentTarget.style.textShadow = "none";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        GITHUB
      </a>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#8aa8b5",
          fontSize: "14px",
          letterSpacing: "2px",
          transition: "0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#c8f1ff";
          e.currentTarget.style.textShadow = "0 0 12px rgba(0,200,255,0.6)";
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#8aa8b5";
          e.currentTarget.style.textShadow = "none";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        BACK TO TOP
      </button>
    </footer>
  );
};

export default Footer;