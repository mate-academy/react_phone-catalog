import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import styles from './Cart.module.scss';
import { RootState } from '../../store/store';

import ChevronRight from '/img/ChevronRight.png';
import Delete from '../../UI/Buttons/Icons/DeleteCart.svg';
import {
  addToCart,
  CartItem,
  clearCart,
  decreaseQuantity,
  removeFromCart,
} from '../../store/slices/cartSlice';
import { Skeleton } from '@mui/material';
import { selectCartTotal } from '../../store/selectors/selectCartTotal';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const carts = useSelector((state: RootState) => state.cart.items);

  const total = useSelector(selectCartTotal);

  useEffect(() => {
    if (!carts.length) {
      setProducts([]);
      setIsLoading(false);

      return;
    }

    setIsLoading(true);

    setProducts(
      carts.map(item => ({
        ...item,
        quantity: item.quantity,
      })),
    );

    setIsLoading(false);
  }, [carts]);

  const handleDeleteFromCart = (product: CartItem) => {
    dispatch(removeFromCart(product.itemId));
  };

  const handleTotalPrice = () => {
    return carts.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleToProduct = ({
    itemId,
    category,
  }: Pick<CartItem, 'itemId' | 'category'>) => {
    navigate(`/product/${category}/${itemId}`);
  };

  if (isLoading) {
    return (
      <div className={styles.cart}>
        <h1 className={styles.cart__title}>Cart</h1>

        <div className={styles.cart__items}>
          <div className={styles.cart__list}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className={styles.cart__item}>
                {/* ЛІВА ЧАСТИНА */}
                <div className={styles.cart__item_left}>
                  <Skeleton variant="circular" width={24} height={24} />

                  <Skeleton variant="rectangular" width={80} height={80} />

                  <Skeleton variant="text" width={150} />
                </div>

                {/* ПРАВА ЧАСТИНА */}
                <div className={styles.cart__item_right}>
                  <Skeleton variant="rectangular" width={100} height={40} />
                  <Skeleton variant="text" width={60} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <button
        type="button"
        className={styles.cart__back}
        onClick={() => navigate(-1)}
      >
        <img src={ChevronRight} alt="Back" className={styles.cart__back_icon} />
        Back
      </button>

      <h1 className={styles.cart__title}>Cart</h1>

      {products.length <= 0 ? (
        <p className={styles.cart__empty}>Cart is empty</p>
      ) : null}

      <div className={styles.cart__items}>
        <div className={styles.cart__list}>
          {products.map(product => (
            <div className={styles.cart__item} key={product.itemId}>
              {/* ЛІВИЙ БЛОК: хрестик + фото + назва */}
              <div className={styles.cart__item_left}>
                <button
                  type="button"
                  className={styles.cart__item_btn}
                  aria-label="Delete from cart"
                  onClick={() => handleDeleteFromCart(product)}
                >
                  <img src={Delete} alt="Delete" />
                </button>
                <div
                  className={styles.cart__item_detail}
                  onClick={() => handleToProduct(product)}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${product.image}`}
                    alt={`${product.name}`}
                    className={styles.cart__item_img}
                  />

                  <p className={styles.cart__item_info_title}>{product.name}</p>
                </div>
              </div>

              <div className={styles.cart__item_right}>
                <div className={styles.cart__item__quantity}>
                  <button
                    className={`${styles.cart__item__quantity_btn} ${product.quantity <= 1 ? styles.cart__item__quantity_btn_minus : ''}`}
                    disabled={product.quantity <= 1}
                    onClick={e => (
                      e.preventDefault(),
                      dispatch(decreaseQuantity(product.itemId))
                    )}
                  >
                    -
                  </button>
                  <p>{product.quantity}</p>
                  <button
                    className={styles.cart__item__quantity_btn}
                    onClick={e => (
                      e.preventDefault(),
                      dispatch(
                        addToCart({ ...product, quantity: product.quantity }),
                      )
                    )}
                  >
                    +
                  </button>
                </div>

                <p className={styles.cart__item_info_price}>${product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cart__total}>
          <p className={styles.cart__total_price}>${handleTotalPrice()}</p>
          <p className={styles.cart__total_text}>Total for {total} items</p>

          <span className={styles.cart__total_line}>{''}</span>

          <button
            type="button"
            className={styles.cart__total_btn}
            onClick={() => dispatch(clearCart())}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
