import { useContext, useEffect, useState } from 'react';
import Styles from './CardCart.module.scss';
import { ContextApp } from '../../../appContext/AppContext';
import { ItemWithQuantity } from '../../../types/ItemWithQuantity';

type Props = {
  product: ItemWithQuantity;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setTotalQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export const CartCard: React.FC<Props> = ({
  product,
  setTotalQuantity,
  setTotalPrice,
}) => {
  const { setCart } = useContext(ContextApp);
  const [isEdited, setIsEdited] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity);
  const [inputValue, setInputValue] = useState(quantity);
  const [cardPrice, setCardPrice] = useState(quantity * product.priceDiscount);

  useEffect(() => {
    setTotalPrice(prevState => prevState + cardPrice);
    setTotalQuantity(prevState => prevState + quantity);
  }, []);

  useEffect(() => {
    setTotalPrice(
      prevState =>
        prevState + product.priceDiscount * (quantity - product.quantity),
    );
  }, [cardPrice, quantity]);

  useEffect(() => {
    setTotalQuantity(prevState => prevState + quantity - product.quantity);

    setCardPrice(quantity * product.priceDiscount);

    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.id === product.id ? { ...item, quantity: quantity } : item,
      );

      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  }, [quantity]);

  const handleClose = (id: string) => {
    setCart(prev => {
      const itemToRemove = prev.find(item => item.id === id);
      const newCart = prev.filter(item => item.id !== id);

      if (itemToRemove) {
        setTotalPrice(
          prevState =>
            prevState - itemToRemove.quantity * itemToRemove.priceDiscount,
        );
        setTotalQuantity(prevState => prevState - itemToRemove.quantity);
      }

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

  const handleEdit = () => {
    setIsEdited(true);
  };

  const handleKeyDownOnInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setQuantity(inputValue);
      setIsEdited(false);
    }
  };

  const handleBlurOnInput = () => {
    setQuantity(inputValue);
    setIsEdited(false);
  };

  return (
    <div className={Styles.cartCard}>
      <div className={Styles.cartCard__product}>
        <img
          onClick={() => handleClose(product.id)}
          className={Styles.cartCard__product__closeButton}
          src=".\img\svg\close.svg"
          alt="close button"
        />

        <img
          className={Styles.cartCard__product__img}
          src={`./${product.images[0]}`}
          alt="product image"
        />

        <p className={Styles.cartCard__product__paragraph}>{product.id}</p>
      </div>

      <div className={Styles.cartCard__container}>
        <div className={Styles.cartCard__container__quantity}>
          <div
            onClick={handleIncrease}
            className={`${Styles.cartCard__container__quantity__item} ${Styles.border}`}
          >
            +
          </div>

          <div
            onClick={handleEdit}
            onDoubleClick={handleEdit}
            className={Styles.cartCard__container__quantity__item}
          >
            {isEdited ? (
              <input
              className={Styles.cartCard__container__quantity__input}
                value={inputValue}
                onChange={event => setInputValue(+event.target.value)}
                type="number"
                onKeyDown={handleKeyDownOnInput}
                onBlur={handleBlurOnInput}
              />
            ) : (
              quantity
            )}
          </div>

          <div
            onClick={handleDecrease}
            className={`${Styles.cartCard__container__quantity__item} ${Styles.border}`}
          >
            -
          </div>
        </div>

        <div className={Styles.cartCard__container__price}>${cardPrice}</div>
      </div>
    </div>
  );
};
