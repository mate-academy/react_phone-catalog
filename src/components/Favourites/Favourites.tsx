import { NavLink } from 'react-router-dom';
import styles from './Favourites.module.scss';
import { ProductCard } from '../ProductCard';
import { CartandFavContext } from '../CartandFavProvider';
import { useContext } from 'react';

export const Favourites = () => {
  const { fav: products } = useContext(CartandFavContext);
  const itemsCounter = products.length;

  return (
    <main className={styles.page}>
      <div className={styles.pageContent}>
        <div className={styles.pathHome}>
          <NavLink to="/">
            <img src="/img/icons/home.svg" alt="home" />
          </NavLink>
          <span className={styles.pathHome_title}>&gt;</span>
          <span className={styles.pathHome_title}>Favourites</span>
        </div>
        <div className={styles.pageInfo}>
          <h1 className={styles.pageInfo_title}>Favourites</h1>
          <span
            className={styles.pageInfo_counter}
          >{`${itemsCounter} items`}</span>
        </div>
        <div className={styles.pageItems}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};
