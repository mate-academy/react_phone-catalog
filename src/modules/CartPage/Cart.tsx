import { useNavigate } from 'react-router-dom';
import style from './Cart.module.scss';
import { useCart } from '../shared/context/CartContext';
import { useProducts } from '../shared/context/ProductsContext';

export const Cart = () => {
  const navigate = useNavigate();
  const {
    products,
    removeProduct,
    totalPrice,
    totalQuantity,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const { phones, tablets, accessories } = useProducts();
  const allProducts = [...phones, ...tablets, ...accessories];
  const addedProducts = allProducts.filter(item =>
    products.some(p => p.id === item.id),
  );

  return (
    <div className={style.container}>
      <div className={style.back}>
        <div className={style.back__image}>
          <img src="./icons/arrow-left.png" alt="Back" />
        </div>
        <span className={style.back__word} onClick={() => navigate(-1)}>
          Back
        </span>
      </div>
      <h1 className={style.title}>Cart</h1>
      <div className={style.cart}>
        <div className={style.cart__items}>
          {addedProducts.map(prod => (
            <div className={style.cart__item} key={prod.id}>
              <button
                className={style.cart__remove}
                onClick={() => removeProduct(prod.id)}
              >
                <img src="./icons/close.png" alt="Remove" />
              </button>
              <img
                className={style.cart__image}
                src={prod.images[0]}
                alt="Gadget"
              />
              <span className={style.cart__name}>{prod.name}</span>
              <div className={style.cart__quantity}>
                <button
                  className={style.cart__minus}
                  onClick={() => decreaseQuantity(prod.id)}
                >
                  <img src="./icons/minus.png" alt="Less" />
                </button>
                <span className={style.cart__number}>
                  {products.find(p => p.id === prod.id)?.quantity}
                </span>
                <button
                  className={style.cart__plus}
                  onClick={() => increaseQuantity(prod.id)}
                >
                  <img src="./icons/plus.png" alt="More" />
                </button>
              </div>
              <span className={style.cart__money}>${prod.priceDiscount}</span>
            </div>
          ))}
        </div>
        <div className={style.cart__price}>
          <p className={style.cart__total}>${totalPrice}</p>
          <p className={style.cart__count}>Total for {totalQuantity} items</p>
          <button className={style.cart__checkout}>Checkout</button>
        </div>
      </div>
    </div>
  );
};
