import React from 'react';
import styles from './BottomNav.module.scss';
import { HeartLikeSVG } from '../../../../svgs/HeartLikeSVG';
import { ShoppingBagSVG } from '../../../../svgs/ShoppingBagSVG';

export const BottomNav: React.FC = () => {
  const navItems = [
    <HeartLikeSVG key={'HeartLikeSVG'} />,
    <ShoppingBagSVG key={'ShoppingBagSVG'} />,
  ];

  return (
    <nav>
      <ul className={styles['bottom-list']}>
        {navItems.map((item, index) => (
          <li className={styles['bottom-item']} key={`item-${index}`}>
            <a href="" className={styles.link}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
