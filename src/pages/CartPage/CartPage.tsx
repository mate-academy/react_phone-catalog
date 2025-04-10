import { useAppDispatch, useAppSelector } from '../../hooks/DispatchSelector';
import { cartSlice } from '../../utils/cart';
import { Product } from '../../types/Product';
import { CartProduct } from '../../types/CartProduct';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import s from './CartPage.module.scss';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(state => state.cart);
  const productsInCart = [...cartProducts].sort(
    (a: Product, b: Product) => a.id - b.id,
  );
  const itemsCount = productsInCart.length;
  const navigate = useNavigate();

  const productsToShow = productsInCart.reduce(
    (acc: CartProduct[], product) => {
      const existingProduct = acc.find(
        (item: Product) => item.id === product.id,
      );

      if (existingProduct) {
        existingProduct.amount += 1;
      } else {
        acc.push({ ...product, amount: 1 });
      }

      return acc;
    },
    [],
  );

  const totalPrice = productsInCart.reduce((acc, item: Product) => {
    return acc + item.price;
  }, 0);

  const handleIncreaseProduct = (product: Product) => {
    dispatch(cartSlice.actions.addToCart(product));
  };

  const handleDecreaseProduct = (product: Product) => {
    const ids = productsInCart.map(item => item.id);

    if (ids.indexOf(product.id) !== ids.lastIndexOf(product.id)) {
      dispatch(cartSlice.actions.removeFromCart(product));
    }
  };

  const handleRemove = (product: Product) => {
    dispatch(cartSlice.actions.deleteFromCart(product));
  };

  const handleCheckout = () => {
    alert('Sold');
    dispatch(cartSlice.actions.clearCart());
  };

  const goBack = () => navigate('..');

  return (
    <main>
      <button className={s.back} onClick={goBack}>
        <div className={s.back__arrow}>
          <img src="../../../public/img/icons/arr_left.svg" alt="Arrow left" />
        </div>
        <span className={s.back__text}>Back</span>
      </button>
      <h2>Cart</h2>
      <div className={s.cart}>
        <div className={s.cart__list}>
          {productsToShow.map((product: CartProduct) => (
            <div key={product.id} className={s.cart__item}>
              <img
                src="../../../public/img/icons/Close.png"
                alt="Remove mark"
                className={s.cart__item__remove}
                onClick={() => handleRemove(product)}
              />
              <img
                src={product.image}
                alt="Product"
                className={s.cart__item__image}
              />
              <h3 className={s.cart__item__title}>{product.name}</h3>
              <div className={(s.cart__item__count, quantityCounter)}>
                <div
                  className={s.quantityCounter__item}
                  onClick={() => handleDecreaseProduct(product)}
                >
                  <img src="../../../public/img/icons/Minus.png" alt="Minus" />
                </div>
                <span
                  className={(s.quantityCounter__item, quantityCounter__count)}
                >
                  {product.amount}
                </span>
                <div
                  className={s.quantityCounter__item}
                  onClick={() => handleIncreaseProduct(product)}
                >
                  <img src="../../../public/img/icons/Plus.png" alt="Plus" />
                </div>
              </div>
              <h3 className={s.cart__item__price}>${product.price}</h3>
            </div>
          ))}
          {!productsToShow.length && (
            <img
              src="../../../public/img/cart-is-empty.png"
              alt="Cart is empty"
    //          className={s.cart__list--empty}
            />
          )}
        </div>
        <div
          className={cn(s.cart__checkout, {
            [s['cart__checkout--hidden']]: !itemsCount,
          })}
        >
          <h4 className={s.cart__checkout__price}>${totalPrice}</h4>
          <p className={s.cart__checkout__info}>Total for {itemsCount} items</p>
          <div className={s.divider}></div>
          <button className={s.cart__checkout__button} onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
};
