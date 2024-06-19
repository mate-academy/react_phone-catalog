import { useContext, useEffect, useState } from 'react';
import Styles from './CardCart.module.scss';
import { ContextApp } from '../../../appContext/AppContext';
import { Item } from '../../../types/Item';

type ItemWithQuantity = Item & { quantity: number };

type Props = {
  product: ItemWithQuantity;
};

export const CartCard: React.FC<Props> = ({ product }) => {
  const { setCart } = useContext(ContextApp);
  const [quantity, setQuantity] = useState(product.quantity);

  useEffect(() => {
    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.id === product.id ? { ...item, quantity: quantity } : item
      );
      
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  }, [quantity, setCart, product.id]);

  const handleClose = (id: string) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.id !== id);

      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const handleIncrease = () => {
    setQuantity(prevState => prevState + 1);
  };

  const handleDecrease = () => {
    setQuantity(prevState => (prevState === 1 ? 1 : prevState - 1));
  };

  return (
    <div className={Styles.cart}>
      <div className={Styles.cart__product}>
        <img
          onClick={() => handleClose(product.id)}
          className={Styles.cart__product__closeButton}
          src=".\img\svg\close.svg"
          alt="close button"
        />

        <img
          className={Styles.cart__product__img}
          src={`./${product.images[0]}`}
          alt="product image"
        />

        <p className={Styles.cart__product__paragraph}>{product.id}</p>
      </div>

      <div className={Styles.cart__container}>
        <div className={Styles.cart__container__quantity}>
          <div
            onClick={handleIncrease}
            className={Styles.cart__container__quantity__plus}
          >
            +
          </div>
          <p className={Styles.cart__container__quantity__number}>{quantity}</p>
          <div
            onClick={handleDecrease}
            className={Styles.cart__container__quantity__plus}
          >
            -
          </div>
        </div>

        <p className={Styles.cart__total_price}>
          {' '}
          {`$${quantity * product.priceDiscount}`}
        </p>
      </div>

      <div className={Styles.cart_container}></div>
    </div>
  );
};
