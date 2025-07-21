import styles from './styles/header.module.scss';
import { NavLink } from 'react-router-dom';
import { NavigationLink } from '@ui/navLink';
import { navButtons, linksList } from './model';
import { BurgerMenuIcon } from '@shared/icons';

type Props = {
  className: string;
};

//TODO: NavLink styles optimization

export const Header = ({ className }: Props) => {
  return (
    <header className={`${styles.header} ${className}`}>
      <NavLink to="/">
        <img
          src="/src/shared/icons/logo.svg"
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%' }}
        />
      </NavLink>
      <nav
        role="navigation"
        aria-label="main navigation"
        style={{ display: 'flex' }}
      >
        <ul className={styles.header__nav}>
          {linksList.map(link => (
            <NavigationLink key={link.name} data={link} />
          ))}
        </ul>
      </nav>
      <nav
        aria-label="User actions menu"
        className={styles['buttons-container']}
      >
        <button aria-label="Open menu">
          <BurgerMenuIcon />
        </button>
        {navButtons.map(el => {
          const IconComponent: React.ComponentType = el.icon;

          return (
            <NavLink key={el.ariaName} to={el.to} aria-label={el.ariaName}>
              <IconComponent />
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
};
