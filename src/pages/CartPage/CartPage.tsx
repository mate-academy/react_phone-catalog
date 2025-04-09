import { useAppDispatch, useAppSelector } from '../../hooks/DispatchSelector';
import { cartSlice } from '../../utils/cart';
import { Product } from '../../types/Product';
import { CartProduct } from '../../types/CartProduct';
import classNames from 'classnames';
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
        <div className="back__arrow">
          <img
            src="../../../public/img/icons/Chevron\ \(Arrow\ Right\).svg"
            alt="Arrow left"
          />
        </div>
        <span className="back__text">Back</span>
      </button>
      <h2>Cart</h2>
      <div className="cart">
        <div className="cart__list">
          {productsToShow.map((product: CartProduct) => (
            <div key={product.id} className="cart__item">
              <img
                src="./img/icons/cross-x.svg"
                alt="Remove mark"
                className="cart__item__remove"
                onClick={() => handleRemove(product)}
              />
              <img
                src={product.image}
                alt="Product"
                className="cart__item__image"
              />
              <h3 className="cart__item__title">{product.name}</h3>
              <div className="cart__item__count quantity-counter">
                <div
                  className="quantity-counter__item"
                  onClick={() => handleDecreaseProduct(product)}
                >
                  <img src="./img/icons/minus.svg" alt="Minus" />
                </div>
                <span className="quantitycounter__item quantitycounter__count">
                  {product.amount}
                </span>
                <div
                  className={s.quantitycounter__item}
                  onClick={() => handleIncreaseProduct(product)}
                >
                  <img src="./img/icons/plus.svg" alt="Plus" />
                </div>
              </div>
              <h3 className="cart__item__price">${product.price}</h3>
            </div>
          ))}
          {!productsToShow.length && (
            <img
              src="./img/cart-is-empty.png"
              alt="Cart is empty"
              className="cart__list--empty"
            />
          )}
        </div>
        <div
          className={classNames('cart__checkout', {
            'cart__checkout--hidden': !itemsCount,
          })}
        >
          <h4 className="cart__checkout__price">${totalPrice}</h4>
          <p className="cart__checkout__info">Total for {itemsCount} items</p>
          <div className="divider"></div>
          <button className="cart__checkout__button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
};
