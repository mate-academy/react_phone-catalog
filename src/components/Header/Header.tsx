import { NavLink } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { Searchbar } from '../Searchbar';
import './style/Header.scss';
import { Icon } from '../Icon';
import { Icons } from '../../types/enums/Icons';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__nav">
        <Navbar />
      </div>
      <div className="header__controls">
        <Searchbar />
        <div className="header__link">
          <NavLink to="/">
            <Icon type={Icons.Heart} />
          </NavLink>
        </div>
        <div className="header__link">
          <NavLink to="/">
            <Icon type={Icons.Cart} />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
