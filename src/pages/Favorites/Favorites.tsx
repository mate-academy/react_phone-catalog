import { Link } from 'react-router-dom';

import styles from './Favorites.module.scss';
import { useCart } from '../../context/CartContext';
import { ProductCarts } from '../../Functional/ProductCart/ProductCarts';

export const Favorites: React.FC = () => {
  const { favorites, totalQuantity } = useCart();

  if (favorites.length === 0) {
    return (
      <div>
        <p className={styles.emptyTex}>Your cart is empty</p>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <Link to="/" className={styles.home}>
        <button className={styles.homeButton}>
          <img src="/img/home.svg" alt="home" className={styles.homeImg} />
          <span className={styles.homeGo}>{'>'}</span>
          <span className={styles.homeGoTo}>Favorites</span>
        </button>
      </Link>
      <h1 className="title">Favorites</h1>
      <div className={styles.totalBlock}>
        <p className={styles.cardTotalFor}>{totalQuantity} item</p>
      </div>
      <div className={styles.gridCartBlock}>
        {favorites.map(product => (
          <ProductCarts key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
