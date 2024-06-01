import { useEffect, useState } from "react";

const BREAKPOINTS = {
  desktop: 1200,
  tablet: 640,
  phone: 320,
}

type Breakpoint = keyof typeof BREAKPOINTS;


export const useBreakpoint = (breakpoint: Breakpoint) => {
  const [matches, setMatches] = useState(
      window.innerWidth <= BREAKPOINTS[breakpoint]
  );

  useEffect(() => {
      const handler = () => {
          setMatches(window.innerWidth <= BREAKPOINTS[breakpoint]);
      };

      window.addEventListener("resize", handler);
      return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);

  return matches;
}
