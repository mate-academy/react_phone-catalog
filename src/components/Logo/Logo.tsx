import { Link } from "react-router-dom";

export const Logo: React.FC = () => {
  return (
    <Link to="/">
      <picture>
        <source srcSet="img/logo-desktop.svg" media="(min-width: 1024px)" />
        <source srcSet="img/logo-tablet.svg" media="(min-width: 576px)" />
        <img
          src="img/logo-mobile.svg"
          alt="The Nice Gadgets Logo"
          title="The Nice Gadgets Logo"
          className="topBar__logo logo"
        />
      </picture>
    </Link>
  );
};
