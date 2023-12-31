import cn from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import './Sidebar.scss';

type Props = {
  isSidebarOpen: boolean;
};

function getClassName({ isActive }: { isActive: boolean }) {
  return cn('Sidebar__link', {
    'Sidebar__link--active': isActive,
  });
}

export const Sidebar: React.FC<Props> = ({ isSidebarOpen }) => {
  return (
    <aside className="Sidebar">
      <div
        className={cn('Sidebar__window', {
          'Sidebar__window--visible': isSidebarOpen,
        })}
      >
        <ul className="Sidebar__links">
          <NavLink to="/" className={getClassName}>Home</NavLink>
          <NavLink to="/phones" className={getClassName}>Phones</NavLink>
          <NavLink to="/tablets" className={getClassName}>Tablets</NavLink>
          <NavLink to="/accessories" className={getClassName}>
            Accessories
          </NavLink>
          <Link
            to="https://github.com/akozlovska/react_phone-catalog"
            className="Sidebar__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </Link>
          <NavLink to="/contacts" className={getClassName}>Contacts</NavLink>
          <NavLink to="/rights" className={getClassName}>Rights</NavLink>
        </ul>
      </div>
    </aside>
  );
};
