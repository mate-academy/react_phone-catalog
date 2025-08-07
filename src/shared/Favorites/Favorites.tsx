import React, { useEffect, useState } from 'react';
import styles from './Favorites .module.scss';
import { NavBar } from '../NavBar';
import { useMyContext } from '../../Context/ProductContexts';
import { ProductList } from '../ProductList';
import { Footer } from '../../modules/Footer';
import { Direction } from '../Direction/Direction';
import { BurgerMenu } from '../BurgerMenu';
import { ProductDemo } from '../../types/ProductDemo';

export const Favorites: React.FC = () => {
  const { isMenuOpen, products } = useMyContext();
  const [currentList, setCurrentList] = useState<ProductDemo[]>([]);

  console.log(products);
  useEffect(() => {
    const getFavorite = () => {
      const favoriteList: ProductDemo[] = [];

      products.forEach(product => {
        const existInStorage = localStorage.getItem(product.itemId);

        if (existInStorage) {
          favoriteList.push(product);
        }
      });
      setCurrentList(favoriteList);
    };

    getFavorite();
  }, [products]);

  return (
    <div className={styles.page}>
      {isMenuOpen ? (
        <BurgerMenu />
      ) : (
        <>
          <NavBar />

          <div className={styles.content}>
            <Direction page="favorites" />

            <h2 className={styles.page_title}>Favorites</h2>

            <span
              className={styles.page_quantity}
            >{`${currentList.length} items`}</span>

            <div className={styles.list}>
              <ProductList data={currentList} />
            </div>

            <Footer />
          </div>
        </>
      )}
    </div>
  );
};
