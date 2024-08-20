import styles from './CartItemCard.module.scss';
import { Product } from '../../../../types/Product';
import { useContext, useEffect, useState } from 'react';
import deleteIcon from './icons/delete.svg';
import whiteDelete from './icons/whiteClose.svg';
import plus from './icons/plus.svg';
import whitePlus from './icons/whitePlus.svg';
import minus from './icons/minus.svg';
import whiteMinus from './icons/whiteMinus.svg';
import minusDisabled from './icons/minusDisabled.svg';
import classNames from 'classnames';
import { AppContext } from '../../../../utils/AppContext';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};

export const CartItemCard: React.FC<Props> = ({ product }) => {
  const { inCartItems, setInCartItems, isDarkTheme } = useContext(AppContext);
  const { name, image, price, itemId } = product;
  const [quantity, setQuantity] = useState(
    inCartItems.filter(item => item === name).length,
  );

  const changeQuantity = (targetQuantity: number) => {
    const preparedCart = inCartItems.filter(item => item !== name);
    const productsForAdd = [];

    while (productsForAdd.length < targetQuantity) {
      productsForAdd.push(name);
    }

    setInCartItems([...preparedCart, ...productsForAdd]);
  };

  const regulateQuantity = (v: string) => {
    switch (v) {
      case 'minus':
        if (quantity === 1) {
          return;
        } else {
          changeQuantity(quantity - 1);
        }

        break;

      case 'plus':
        if (quantity >= 99) {
          return;
        } else {
          changeQuantity(quantity + 1);
        }
    }
  };

  const deleteFromCart = () => {
    setInCartItems(inCartItems.filter(item => item !== name));
  };

  useEffect(() => {
    setQuantity(inCartItems.filter(item => item === name).length);
  }, [inCartItems, name, quantity]);

  return (
    <div
      className={classNames(styles.card, isDarkTheme ? styles.cardDark : '')}
    >
      <div className={styles.cardProduct}>
        <div className={styles.cardProduct__leftPart}>
          <div
            className={styles.cardProduct__delete}
            style={
              isDarkTheme
                ? { backgroundImage: `url(${whiteDelete})` }
                : { backgroundImage: `url(${deleteIcon})` }
            }
            onClick={deleteFromCart}
          ></div>

          <Link to={`/product/${itemId}`} className={styles.cardProduct__image}>
            <img
              alt="Product image"
              src={image}
              className={styles.cardProduct__img}
            />
          </Link>
        </div>

        <Link
          to={`/product/${itemId}`}
          className={classNames(
            styles.cardProduct__title,
            isDarkTheme ? styles.cardProduct__titleDark : '',
          )}
        >
          {name}
        </Link>
      </div>

      <div className={styles.calculations}>
        <div className={styles.calculations__quantity}>
          <div
            className={classNames(
              styles.button,
              isDarkTheme ? styles.buttonDark : '',
              quantity > 1 ? '' : styles.disabled,
              quantity === 1 && isDarkTheme ? styles.disabledDark : '',
            )}
            style={
              quantity > 1
                ? isDarkTheme
                  ? { backgroundImage: `url(${whiteMinus})` }
                  : { backgroundImage: `url(${minus})` }
                : isDarkTheme
                  ? { backgroundImage: `url(${minus})` }
                  : { backgroundImage: `url(${minusDisabled})` }
            }
            onClick={() => regulateQuantity('minus')}
          ></div>

          <div className={styles.quantity}>{quantity}</div>

          <div
            className={classNames(
              styles.button,
              isDarkTheme ? styles.buttonDark : '',
            )}
            style={
              isDarkTheme
                ? { backgroundImage: `url(${whitePlus})` }
                : { backgroundImage: `url(${plus})` }
            }
            onClick={() => regulateQuantity('plus')}
          ></div>
        </div>

        <div className={styles.calculations__sum}>${quantity * price}</div>
      </div>
    </div>
  );
};
