import { NavItemVariants, NavListVariants } from '../../types/Types';
import { NavItem } from '../NavItem/NavItem';
import styles from './NavList.module.scss';

const navItems = [
  { text: 'Home', to: '/' },
  { text: 'Phones', to: 'phones' },
  { text: 'Tablets', to: 'tablets' },
  { text: 'Accessories', to: 'accessories' },
];

type Props = { variant: NavListVariants };

export const NavList: React.FC<Props> = ({ variant }) => {
  return (
    <ul
      className={
        variant === NavListVariants.header
          ? styles.headerList
          : styles.burgerList
      }
    >
      {navItems.map(item => (
        <li key={item.to}>
          <NavItem to={item.to} variant={NavItemVariants.navlist}>
            {item.text}
          </NavItem>
        </li>
      ))}
    </ul>
  );
};
