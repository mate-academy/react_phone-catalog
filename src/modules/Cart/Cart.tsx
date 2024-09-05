import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/const';
import styles from './Cart.module.scss';
import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { CartProduct } from '../../components/CartProduct';
import { TotalCart } from '../../components/TotalCart';

const Cart = () => {
  const { cart } = useContext(ProductContext);

  return (
    <section className={styles.container}>
      {cart.length > 0 ? (
        <div>
          <Link to="/" className={styles.breadcrumbs}>
            <img src={`${BASE_URL}/icons/ArrowLeft.svg`} alt="ArrowLeft" />
            <span className={styles.back}>Back</span>
          </Link>
          <h1 className={styles.title}>Cart</h1>
          <div className={styles.info}>
            <div className={styles.wrapper}>
              {cart.map(({ product, quantity }) => (
                <CartProduct
                  key={product.id}
                  product={product}
                  quantity={quantity}
                />
              ))}
            </div>
            <TotalCart />
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <img
            src={`${BASE_URL}/img/cart-is-empty.png`}
            alt="cart-is-empty"
            className={styles.emptyImg}
          />
        </div>
      )}
    </section>
  );
};

export default Cart;
