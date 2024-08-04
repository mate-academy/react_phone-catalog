/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      h1: [
        "48px",
        {
          lineHeight: "56px",
          letterSpacing: "-0.01em",
          fontFamily: "Mont Bold",
        },
      ],
      h2: [
        "32px",
        {
          lineHeight: "41px",
          letterSpacing: "-0.01em",
          fontFamily: "Mont Bold",
        },
      ],
      h3: [
        "22px",
        {
          lineHeight: "31px",
          letterSpacing: "0",
          fontFamily: "Mont Bold",
        },
      ],
      h4: [
        "20px",
        {
          lineHeight: "26px",
          letterSpacing: "0",
          fontFamily: "Mont SemiBold",
        },
      ],
      uppercase: [
        "12px",
        {
          lineHeight: "11px",
          letterSpacing: "0.04em",
          fontFamily: "Mont Bold",
        },
      ],
      buttons: [
        "14px",
        {
          lineHeight: "21px",
          letterSpacing: "0",
          fontFamily: "Mont SemiBold",
        },
      ],
      bodyText: [
        "14px",
        {
          lineHeight: "21px",
          letterSpacing: "0",
          fontFamily: "Mont",
        },
      ],
      smallText: [
        "12px",
        {
          lineHeight: "15px",
          letterSpacing: "0",
          fontFamily: "Mont SemiBold",
        },
      ],
    },
    colors: {
      accent: "#f86800",
      secAccent: "#476df4",
      primary: "#0f0f11",
      sec: "#89939a",
      icon: "#b4bdc3",
      elem: "#e2e6e9",
      hoverBg: "#fafbfc",
      white: "#fff",
      green: "#27ae60",
      red: "#eb5757",
    },
    extend: {
      borderWidth: {
        1: "1px",
        3: "3px",
      },
      gridTemplateColumns: {
        header: "auto 1fr auto",
      },
      fontFamily: {
        mont: "Mont",
        montSemi: "Mont SemiBold",
        montBold: "Mont Bold",
      },
    },
  },
  plugins: [],
};
