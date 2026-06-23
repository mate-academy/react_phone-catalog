import React, { useEffect, useState } from 'react';
import styles from './Favorites .module.scss';
import { useMyContext } from '../../Context/ProductContexts';
import { ProductDemo } from '../../types/ProductDemo';
import { NavBar } from '../../shared/NavBar';
import { Direction } from '../../shared/Direction/Direction';
import { ProductList } from '../../shared/ProductList';
import { BurgerMenu } from '../BurgerMenu';

export const Favorites: React.FC = () => {
  const { isMenuOpen, products, heartIsPressed } = useMyContext();
  const [currentList, setCurrentList] = useState<ProductDemo[]>([]);

  useEffect(() => {
    const getFavorite = () => {
      const favoriteItems: ProductDemo[] = [];

      products.forEach(product => {
        const existInStorage = localStorage.getItem(product.itemId);

        if (existInStorage) {
          favoriteItems.push(product);
        }
      });
      setCurrentList(favoriteItems);
    };

    getFavorite();
  }, [products, heartIsPressed]);

  return (
    <div className={styles.page}>
      {isMenuOpen ? (
        <BurgerMenu />
      ) : (
        <>
          <NavBar />

          <div className={styles.wrapper}>
            <div className={styles.content}>
              <Direction page="favorites" />
              <h2 className={styles.page_title}>Favorites</h2>
              <span
                className={styles.page_quantity}
              >{`${currentList.length > 0 ? currentList.length : 'There is no'} items`}</span>
              <div className={styles.list}>
                <ProductList data={currentList} productPage={true} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
