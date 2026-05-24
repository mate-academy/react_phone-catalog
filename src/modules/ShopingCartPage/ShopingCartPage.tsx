import { BackButton } from '../shared/componets/BackButton/BackButton';
import { useProductInCart } from '../shared/Utills/ShopingCartContext';
import { ShopingCartElement } from './Components/ShopingCartElement/ShopingCartElement';
import { Total } from './Components/Total/Total';
import styles from './ShopingCartPage.module.scss';

export const ShopingCartPage = () => {
  const { state: productsInCart } = useProductInCart();

  if (!productsInCart || productsInCart.length === 0) {
    return (
      <div className={styles.product__cart__empty}>
        <h1>Your cart is empty</h1>

        <div>
          <img
            src="img/cart-is-empty.png"
            alt="product_cart_empty"
            className={styles.product__cart__empty__img}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ShopingCartPage}>
      <div className={styles.ShopingCartPage__top}>
        <BackButton />

        <h1>Cart</h1>
      </div>

      <div className={styles.container}>
        <div className={styles.ShopingCart__list}>
          {productsInCart?.map(product => (
            <ShopingCartElement product={product} key={product.id} />
          ))}
        </div>

        <Total products={productsInCart} />
      </div>
    </div>
  );
};
