import { Link } from 'react-router-dom';
import { useShoppingCart } from '../../../../store/CartContext';
import styles from './CartItem.module.scss';
import classNames from 'classnames';
import { PlusIcon } from '../../../../components/Icons/PlusIcon';
import { MinusIcon } from '../../../../components/Icons/MinusIcon';

export const CartItem = () => {
  const {
    shoppingCartProducts,
    deleteFromCart,
    productQuantities,
    handleQuantity,
  } = useShoppingCart();

  return (
    <div className={styles.cartItem__block}>
      {shoppingCartProducts.map(cartProduct => {
        const { id, itemId, image, name, price } = cartProduct;
        const link = `/${cartProduct.category}/${cartProduct.itemId}`;

        return (
          <div className={styles.cartItem} key={id}>
            <div className={styles.cartItem__wrapper}>
              <div onClick={() => deleteFromCart(itemId)}>
                <img
                  src="img/icons/close.svg"
                  alt="close"
                  className={styles.cartItem__close}
                />
              </div>

              <Link to={link} className={styles.cartItem__imgLink}>
                <img
                  src={image}
                  alt="product"
                  className={styles.cartItem__img}
                />
              </Link>

              <Link to={link}>
                <p className={classNames(styles.cartItem__text, 'text-body')}>
                  {name}
                </p>
              </Link>
            </div>

            <div className={styles.cartItem__wrapper}>
              <div className={styles.cartItem__quantity}>
                <div
                  onClick={() => handleQuantity(itemId, 'minus')}
                  aria-disabled={productQuantities[itemId] < 2}
                  className={classNames(styles.cartItem__quantityBtn, {
                    [styles.cartItem__disabled]: productQuantities[itemId] < 2,
                  })}
                >
                  <MinusIcon />
                </div>
                <p>{productQuantities[itemId] || 1}</p>
                <div
                  className={styles.cartItem__quantityBtn}
                  onClick={() => handleQuantity(itemId, 'plus')}
                >
                  <PlusIcon />
                </div>
              </div>

              <h3 className={styles.cartItem__price}>${price}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
