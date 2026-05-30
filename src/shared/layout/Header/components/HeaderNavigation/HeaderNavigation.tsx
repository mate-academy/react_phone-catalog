import React from 'react';
import styles from './HeaderNavigation.module.scss';
import { Link } from 'react-router-dom';

const navItems = ['home', 'phones', 'tablets', 'accessories'];

type Props = {
  currentClass: string;
  setIsOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HeaderNavigation: React.FC<Props> = ({
  currentClass,
  setIsOpenMenu,
}) => {
  return (
    <nav className={styles.navigation}>
      <ul className={`${styles.navigation__items} ${styles[currentClass]}`}>
        {navItems.map((item, index) => (
          <Link
            to={item}
            key={index}
            onClick={() => {
              if (setIsOpenMenu) {
                setIsOpenMenu(false);
              }
            }}
          >
            <li className={styles.navigation__item}>{item}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
