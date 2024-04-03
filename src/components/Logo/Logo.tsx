import { NavLink } from 'react-router-dom';
import './Logo.scss';

const Logo = () => {
  return (
    <NavLink to="/">
      <div className="logo ml-24">
        <img src="./img/icons/logo2.svg" alt="img" />
      </div>
    </NavLink>
  );
};

export default Logo;
