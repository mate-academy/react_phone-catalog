import { NavLink } from 'react-router-dom';
import { ReactComponent as CloseIcon }
  from '../assets/images/icons/cancel-icon.svg';

type Props = {
  showSlider: () => void;
  show: boolean;
};

const SideMenu: React.FC<Props> = ({ showSlider, show }) => {
  return (
    <div
      className="SideMenu"
      style={show ? {
        left: '0',
      }
        : {
          left: '-50vw',
        }}
    >
      <button
        type="button"
        className="SideMenu__sidemMenu-btn"
        onClick={showSlider}
      >
        <CloseIcon />
      </button>
      <NavLink
        className={({ isActive }) => `SideMenu__link ${(isActive ? 'SideMenu__link--active' : '')}`}
        to="/"
        onClick={showSlider}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => `SideMenu__link ${(isActive ? 'SideMenu__link--active' : '')}`}
        to="/phones"
        onClick={showSlider}
      >
        Phones
      </NavLink>
      <NavLink
        className={({ isActive }) => `SideMenu__link ${(isActive ? 'SideMenu__link--active' : '')}`}
        to="/tablets"
        onClick={showSlider}
      >
        Tables
      </NavLink>
      <NavLink
        className={({ isActive }) => `SideMenu__link ${(isActive ? 'SideMenu__link--active' : '')}`}
        to="/accessories"
        onClick={showSlider}
      >
        Accessories
      </NavLink>
    </div>
  );
};

export default SideMenu;
