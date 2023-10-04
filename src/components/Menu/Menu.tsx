import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './Menu.scss';

export const Menu = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => (
    cn(
      'NavButton',
      { 'NavButton--selected': isActive },
    )
  );

  return (
    <div className="Menu" id="Menu">
      <div className="container container--with-min-height">
        <div className="Menu__content">
          <nav className="Nav">
            <NavLink to="/" className={getNavLinkClass}>
              HOME
            </NavLink>

            <NavLink to="/phones" className={getNavLinkClass}>
              PHONES
            </NavLink>

            <NavLink to="/tablets" className={getNavLinkClass}>
              TABLETS
            </NavLink>

            <NavLink to="/accessories" className={getNavLinkClass}>
              ACCESSORIES
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};
