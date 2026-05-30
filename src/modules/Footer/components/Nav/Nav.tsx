import React from 'react';

import styles from './Nav.module.scss';

export const Nav: React.FC = () => {
  const listItems = ['Github', 'Contacts', 'rights'];

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {listItems.map(item => {
          return (
            <li className={styles['list-item']} key={item}>
              <a href="" className={styles['list-link']}>
                {item}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
