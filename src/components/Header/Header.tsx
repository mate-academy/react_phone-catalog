import logo from "../../assets/PageLogo.svg";
import { useAppContext } from "../../context/AppContext";
import useWindowSize from "../../hooks/useWindowSize.hook";
import { navButtons, navOptions } from "./Header.data";
import HeaderBurger from "./HeaderBurger/HeaderBurger";
import HeaderBurgerButton from "./HeaderBurger/HeaderBurgerButton";
import HeaderButton from "./HeaderButton";
import HeaderLink from "./HeaderLink";

const Header = () => {
  const { isBurgerOpen } = useAppContext();
  const { width } = useWindowSize();
  const isMobile = width >= 640;

  return (
    <header
      id="header"
      className="desktop:h-16 desktop:gap-8 small:grid-cols-header sticky left-0 top-0 z-50 mb-14 grid h-12 grid-cols-2 gap-4 border-b-1 border-elem bg-white"
    >
      <picture className="desktop:h-16 desktop:pl-8 desktop:w-32 flex h-12 w-24 pl-6">
        <img src={logo} alt="" className="desktop:w-20 h-full w-16" />
      </picture>
      {isMobile && (
        <div className="desktop:h-16 desktop:gap-16 flex h-12 flex-row gap-8">
          {navOptions.map((option) => (
            <HeaderLink key={option.page} option={option} />
          ))}
        </div>
      )}

      <div className="flex flex-row justify-end">
        {isMobile ? (
          navButtons.map((button) => (
            <button className="desktop:size-16 relative grid size-12 place-items-center border-l-1 border-elem">
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
