import React from "react";
import {useLocation} from "react-router-dom";

export const ScrollButton: React.FC = () => {
  const [isVissible, setIsVissible] = React.useState(false);

  const {pathname, search} = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      const currScroll = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (currScroll > (totalHeight - clientHeight) / 2) {
        setIsVissible(true);
      } else {
        setIsVissible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname, search]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVissible && (
        <button className="scroll__button" onClick={scrollToTop}>
          <img src={"/img/footer/up.png"} alt="" />
        </button>
      )}
    </>
  );
};
