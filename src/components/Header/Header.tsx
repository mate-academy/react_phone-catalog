/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import logo from "../../assets/PageLogo.svg";
import { useAppContext } from "../../context/AppContext";
import useScrollLock from "../../hooks/useScrollLock.hook";
import useWindowSize from "../../hooks/useWindowSize.hook";
import { navButtons, navOptions } from "./Header.data";
import HeaderBurger from "./HeaderBurger/HeaderBurger";
import HeaderBurgerButton from "./HeaderBurger/HeaderBurgerButton";
import HeaderButton from "./HeaderButton";
import HeaderLink from "./HeaderLink";

const Header = () => {
  const { isBurgerOpen, handleChangeBurger } = useAppContext();
  const { width } = useWindowSize();
  const isMobile = width >= 640;

  useScrollLock(isBurgerOpen && !isMobile);

  useEffect(() => {
    if (isMobile) {
      handleChangeBurger(false);
    }
  }, [isMobile]);

  return (
    <header
      id="header"
      className="sticky left-0 top-0 z-[100] grid h-12 grid-cols-2 gap-4 border-b-1 border-elem bg-white small:grid-cols-header desktop:h-16 desktop:gap-8"
    >
      <picture className="flex h-12 w-24 pl-6 desktop:h-16 desktop:w-32 desktop:pl-8">
        <img src={logo} alt="" className="h-full w-16 desktop:w-20" />
      </picture>
      {isMobile && (
        <div className="flex h-12 flex-row gap-8 desktop:h-16 desktop:gap-16">
          {navOptions.map((option) => (
            <HeaderLink key={option.page} option={option} />
          ))}
        </div>
      )}

      <div className="flex flex-row justify-end">
        {isMobile ? (
          navButtons.map((button) => (
            <button className="relative grid size-12 place-items-center border-l-1 border-elem desktop:size-16">
              <HeaderButton
                key={button.name}
                icon={button.icon}
                to={button.to}
              />
            </button>
          ))
        ) : (
          <HeaderBurgerButton />
        )}
      </div>

      {isBurgerOpen && !isMobile && <HeaderBurger />}
    </header>
  );
};

export default Header;
