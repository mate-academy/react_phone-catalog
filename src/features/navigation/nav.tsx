import { NavigationLink } from '../../store/ui/nav-link/';
import { NavigationItem, RoutePath } from '../../store/types/NavLinkProps';
import './nav.scss';

export const Nav = () => {
  const linksList: NavigationItem[] = [
    { name: 'Home', path: RoutePath.Home, labelProp: 'homepage' },
    { name: 'Phones', path: RoutePath.Phones, labelProp: 'phones catalog' },
    { name: 'Tablets', path: RoutePath.Tablets, labelProp: 'tablets catalog' },
    {
      name: 'Accessories',
      path: RoutePath.Accessories,
      labelProp: 'accessories catalog',
    },
  ];

  return (
    <nav className="nav">
      <ul className="nav__list">
        {linksList.map(link => (
          <NavigationLink key={link.name} data={link} />
        ))}
      </ul>
    </nav>
  );
};
