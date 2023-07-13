import logo from '../../imgs/LOGO.svg';

export const Logo = () => {
  return (
    <a href="/" className="header__logo">
      <img src={logo} alt="" />
    </a>
  );
};
