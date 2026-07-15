import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import { useLanguage } from '../../../../../../context/LanguageContext';
import { Item } from '../../../../../../types/Item';
import { useGlobalContext } from '../../../../../../context/GlobalContext';

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
  const { searchParams } = useGlobalContext();
  const { texts } = useLanguage();

  const buildSearch = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('page');
    params.delete('query');

    return params.toString();
  };

  return (
    <nav className={`nav ${className}`}>
      {menuItems.map(item => (
        <NavLink
          to={
            item.path === '/'
              ? item.path
              : { pathname: item.path, search: buildSearch() }
          }
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
