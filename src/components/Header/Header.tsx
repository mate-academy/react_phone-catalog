import logo from "../../assets/PageLogo.svg";
import { navButtons, navOptions } from "./Header.data";
import HeaderButton from "./HeaderButton";
import HeaderLink from "./HeaderLink";

const Header = () => {
  return (
    <header
      id="header"
      className="mb-14 grid h-12 grid-cols-header gap-6 border-b-1 border-elem desctop:h-16"
    >
      <picture className="flex h-12 px-6 desctop:h-16">
        <img src={logo} alt="" className="w-16 desctop:w-20" />
      </picture>
      <div className="flex h-12 flex-row gap-16 desctop:h-16">
        {navOptions.map((option) => (
          <HeaderLink key={option.page} option={option} />
        ))}
      </div>
      <div className="flex flex-row justify-end">
        {navButtons.map((button) => (
          <HeaderButton key={button.name} icon={button.icon} to={button.to} />
        ))}
      </div>
    </header>
  );
};

export default Header;
