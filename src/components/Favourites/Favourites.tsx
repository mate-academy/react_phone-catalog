import { NavLink } from 'react-router-dom';
import styles from './Favourites.module.scss';
import { ProductCard } from '../ProductCard';
import { CartandFavContext } from '../CartandFavProvider';
import { useContext } from 'react';
import { EmptyPage } from '../EmptyPage';
import Home from '../../../public/img/icons/home.svg';

export const Favourites = () => {
  const { fav: products } = useContext(CartandFavContext);
  const itemsCounter = products.length;

  if (itemsCounter === 0) {
    return <EmptyPage title="Favourites" text="Favourites is empty" />;
  }

  return (
    <main className={styles.page}>
      <div className={styles.pageContent}>
        <div className={styles.pathHome}>
          <NavLink to="/">
            <img src={Home} alt="home" />
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
