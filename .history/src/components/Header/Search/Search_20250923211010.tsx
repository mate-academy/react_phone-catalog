/* eslint-disable max-len */
import { useContext } from 'react';
import styles from './Search.module.scss';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../../StoreProvider';
import { ProductsContext } from '../../../ProductsProvider';

export const Search = () => {
  const { isAddedToCart, isAddedToFavourites, addItemToCart, addItemToFavourites } =
    useContext(StoreContext);
  const { products } = useContext(ProductsContext);

  return (


    <div className={styles.search}>
    </div>
    
  );
};
