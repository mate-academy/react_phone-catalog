import styles from './styles/header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { NavigationLink } from '@ui/navLink';
import { navLinksList } from './model';
import { BurgerMenuIcon } from '@shared/icons';
import { useStoreContext } from '@features/user-store/model/storeContext';
import { NavAriaLabels } from '@shared/types';
import { uiLinksList } from './model/links';

//todo: add burger onclick;

export const Header: React.FC = () => {
  const { cartAmount, favAmount } = useStoreContext();

  return (
    <header className={styles.header}>
      <Link to="/">
        <img
          src="/src/shared/icons/logo.svg"
          alt=""
          aria-hidden="true"
          className={styles['logo-image']}
        />
      </Link>
      <nav aria-label="main navigation">
        <ul className={styles['main-navigation']}>
          {navLinksList.map(link => (
            <NavigationLink key={link.title} data={link} />
          ))}
        </ul>
      </nav>
      <nav
        aria-label="User actions menu"
        className={styles['buttons-container']}
      >
        <button aria-label={NavAriaLabels.Menu}>
          <BurgerMenuIcon />
        </button>
        {uiLinksList.map(el => {
          const IconComponent: React.ComponentType = el.icon;

          return (
            <NavLink key={el.ariaName} to={el.to} aria-label={el.ariaName}>
              <IconComponent icon={el.icon} />
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
};
