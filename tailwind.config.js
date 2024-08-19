/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      small: "640px",
      desktop: "1200px",
    },
    fontSize: {
      h1: [
        "48px",
        {
          lineHeight: "56px",
          letterSpacing: "-0.01em",
        },
      ],
      h1mobile: [
        "32px",
        {
          lineHeight: "41px",
          letterSpacing: "-0.01em",
        },
      ],
      h2: [
        "32px",
        {
          lineHeight: "41px",
          letterSpacing: "-0.01em",
        },
      ],
      h2mobile: [
        "22px",
        {
          lineHeight: "31px",
          letterSpacing: "0",
        },
      ],
      h3: [
        "22px",
        {
          lineHeight: "31px",
          letterSpacing: "0",
        },
      ],
      h3mobile: [
        "20px",
        {
          lineHeight: "26px",
          letterSpacing: "0",
        },
      ],
      h4: [
        "20px",
        {
          lineHeight: "26px",
          letterSpacing: "0",
        },
      ],
      h4mobile: [
        "16px",
        {
          lineHeight: "20px",
          letterSpacing: "0",
        },
      ],
      uppercase: [
        "12px",
        {
          lineHeight: "11px",
          letterSpacing: "0.04em",
        },
      ],
      buttons: [
        "14px",
        {
          lineHeight: "21px",
          letterSpacing: "0",
        },
      ],
      bodyText: [
        "14px",
        {
          lineHeight: "21px",
          letterSpacing: "0",
        },
      ],
      smallText: [
        "12px",
        {
          lineHeight: "15px",
          letterSpacing: "0",
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
      width: {
        page: "min(100%, calc(1200px + (2rem * 2)))",
        68: "272px",
        53: "212px",
      },
      height: {
        banner: "400px",
      },
      borderWidth: {
        1: "1px",
        3: "3px",
      },
      gridTemplateColumns: {
        header: "1fr minmax(0, 1200px) 1fr",
        footer: "auto 40% auto",
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
