import { NavLink } from 'react-router-dom';
import styles from './Favourites.module.scss';
import { ProductCard } from '../ProductCard';

const product = {
  id: 1,
  category: 'phones',
  itemId: 'apple-iphone-7-32gb-black',
  name: 'Apple iPhone 7 32GB Black',
  fullPrice: 400,
  price: 375,
  screen: "4.7' IPS",
  capacity: '32GB',
  color: 'black',
  ram: '2GB',
  year: 2016,
  image: 'img/phones/apple-iphone-7/black/00.webp',
};

export const Favourites = () => {
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
          <span className={styles.pageInfo_counter}>xxx items</span>
        </div>
        <div className={styles.pageItems}>
          {[1, 2, 3, 4, 5].map(() => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};
