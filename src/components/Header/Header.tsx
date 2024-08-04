import { Link } from "react-router-dom";
import logo from "../../assets/PageLogo.svg";
import { navButtons, navOptions } from "./Header.data";
import HeaderButton from "./HeaderButton";

const Header = () => {
  return (
    <header id="header" className="border-b-1 border-elem grid grid-cols-header h-16">
      <picture className="h-16">
        <img src={logo} alt="" className="w-20 mx-6 my-4" />
      </picture>
      <div className="flex flex-row h-16">
        {navOptions.map((option) => (
          <Link
            key={option.page}
            to={option.to}
            className="text-sec  ml-4 text-center grid place-items-center font-montSemi text-uppercase uppercase border-b-3 border-b-primary"
          >
            {option.page}
          </Link>
        ))}
      </div>
      <div>
        {navButtons.map((button) => (
          <HeaderButton key={button.name} icon={button.icon} to={button.to} />
        ))}
      </div>
    </header>
  );
};

export default Header;
