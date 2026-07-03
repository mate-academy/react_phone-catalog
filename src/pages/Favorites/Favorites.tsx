import { Link } from 'react-router-dom';

import styles from './Favorites.module.scss';
import { useCart } from '../../context/CartContext';
import { Products } from '../../types/Alltypes';
// import { ProductCarts } from '../../Functional/ProductCart/ProductCarts';

type Props = {
  product: Products[];
};

export const Favorites: React.FC<Props> = ({ product }) => {
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
    </section>
  );
};
