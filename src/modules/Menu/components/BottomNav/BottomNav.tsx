import React, { useContext } from 'react';
import styles from './BottomNav.module.scss';
import { HeartLikeSVG } from '../../../../svgs/HeartLikeSVG';
import { ShoppingBagSVG } from '../../../../svgs/ShoppingBagSVG';
import { Link } from 'react-router-dom';
import { FavouritesContext } from '../../../../context/FavouritesContext';
import { Counter } from '../../../Counter';

export const BottomNav: React.FC = () => {
  const { favourites } = useContext(FavouritesContext);
  const favouritesCondition = Object.values(favourites).length > 0;

  const navItems = {
    favourites: <HeartLikeSVG key={'HeartLikeSVG'} />,
    sss: <ShoppingBagSVG key={'ShoppingBagSVG'} />,
  };

  const keys = Object.keys(navItems);
  const values = Object.values(navItems);

  return (
    <nav>
      <ul className={styles['bottom-list']}>
        {keys.map((item, index) => (
          <li className={styles['bottom-item']} key={`item-${index}`}>
            <Link to={`/${item}`} className={styles.link}>
              {index === 0 && favouritesCondition && <Counter />}
              {values[index]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
