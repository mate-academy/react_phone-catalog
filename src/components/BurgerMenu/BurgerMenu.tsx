import styles from './BurgerMenu.module.scss';
import NavLinkItem from '../NavLinkItem/NavLinkItem';
import NavIcons from '../NavIcons/NavIcons';

const BurgerMenu = () => {
  const links = [
    { to: '/', label: 'HOME' },
    { to: '/phones', label: 'PHONES' },
    { to: '/tablets', label: 'TABLETS' },
    { to: '/accessories', label: 'ACCESSORIES' },
  ];

  return (
    <ul className={styles.burger}>
      {links.map(({ to, label }) => (
        <NavLinkItem key={to} isBurgerMenu to={to}>
          {label}
        </NavLinkItem>
      ))}
      <NavIcons isBurgerMenu={true} />
    </ul>
  );
};

export default BurgerMenu;
