import btn from '@shared/styles/regularButton.module.scss';
import styles from './styles/header.module.scss';
import { NavLink } from 'react-router-dom';
import { NavigationLink } from '@ui/navLink';
import { Button } from '@ui/button';
import { buttons, linksList } from './model';

type Props = {
  className: string;
};

export const Header = ({ className }: Props) => {
  const ButtonCN = { main: `${btn.button}`, icon: `${btn.button__icon}` };

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
        aria-label="Main navigation"
        style={{ display: 'flex' }}
      >
        <ul className={styles.header__nav}>
          {linksList.map(link => (
            <NavigationLink key={link.name} data={link} />
          ))}
        </ul>
      </nav>
      <div className={styles['buttons-container']}>
        {buttons.map(bttn => (
          <Button
            key={bttn.ariaName}
            ariaName={bttn.ariaName}
            iconPath={bttn.iconPath}
            className={ButtonCN}
          />
        ))}
      </div>
    </header>
  );
};
