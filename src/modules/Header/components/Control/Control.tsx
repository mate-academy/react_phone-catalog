import React, { useContext } from 'react';
import styles from './Control.module.scss';
import { HeartLikeSVG } from '../../../../svgs/HeartLikeSVG';
import { ShoppingBagSVG } from '../../../../svgs/ShoppingBagSVG';
import { Link } from 'react-router-dom';
import { NavLinks } from '../../../../enums/NavLinks';
import { FavouritesContext } from '../../../../context/FavouritesContext';
import { Counter } from '../../../Counter';

export const Control: React.FC = () => {
  const { favourites } = useContext(FavouritesContext);
  const favouritesCondition = Object.values(favourites).length > 0;

  return (
    <div className="flex-center">
      <Link to={`/${NavLinks.favourites}`} className={styles.item}>
        {favouritesCondition && <Counter />}
        <HeartLikeSVG />
      </Link>
      <a className={styles.item}>
        <ShoppingBagSVG />
      </a>
    </div>
  );
};
