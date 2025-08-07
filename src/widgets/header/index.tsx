import { Link } from 'react-router-dom';
import styles from './styles/header.module.scss';
import { navLinksList } from './model';
import { NavigationLink } from '@ui/navLink';
import { BurgerMenuIcon } from '@shared/icons';
import { NavAriaLabels } from '@shared/types';
import { uiLinksList } from './model/links';
import { HeaderUINavLink } from './ui/headerUINavLink';

//todo: add burger onclick;

export const Header: React.FC = () => {
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
        <button
          aria-label={NavAriaLabels.Menu}
          className={styles['burger-button']}
        >
          <BurgerMenuIcon />
        </button>
        {uiLinksList.map(el => (
          <HeaderUINavLink
            key={el.to}
            ariaName={el.ariaName}
            to={el.to}
            icon={el.icon}
          />
        ))}
      </nav>
    </header>
  );
};
