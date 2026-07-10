import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import { useLanguage } from '../../../../../../context/LanguageContext';
import { Item } from '../../../../../../types/Item';

type Props = {
  className: string;
  closeMenu?: () => void;
};

const menuItems: Item[] = [
  {
    name: 'home',
    id: 1,
    path: '/',
  },
  {
    name: 'phones',
    id: 2,
    path: '/phones',
  },
  {
    name: 'tablets',
    id: 3,
    path: '/tablets',
  },
  {
    name: 'accessories',
    id: 4,
    path: '/accessories',
  },
];

export const Navbar: React.FC<Props> = ({
  className,
  closeMenu = () => {},
}) => {
  const { texts } = useLanguage();

  return (
    <nav className={`nav ${className}`}>
      {menuItems.map(item => (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            isActive ? 'nav__element nav__element--is-active' : 'nav__element'
          }
          key={item.id}
          onClick={closeMenu}
          end
        >
          {texts[item.name]}
        </NavLink>
      ))}
    </nav>
  );
};
