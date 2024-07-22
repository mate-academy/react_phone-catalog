import classNames from 'classnames';
import { useContext } from 'react';
import { Product } from '../../types/Product';
import { CartContext, DispatchCartContext } from '../../store/CartContext';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import styles from './CartItem.module.scss';
import btnStyles from '../../styles/buttons.module.scss';
import iconStyles from '../../styles/icons.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { id, itemId, category, name, image, price } = product;
  const cartState = useContext(CartContext);
  const dispatchCart = useContext(DispatchCartContext);
  const { t } = useTranslation();

  const amount = cartState.filter(item => item.id === id).length;

  return (
    <article className={styles.block}>
      <div className={styles.top}>
        <button
          type="button"
          className={`${btnStyles.block} ${btnStyles.remove}`}
          onClick={() =>
            dispatchCart({ type: 'deleteProduct', payload: itemId })
          }
          aria-label={t(TRANSLATIONS.cart.item.button.remove.ariaLabel, {
            name,
          })}
        >
          <span
            className={`${iconStyles.block} ${iconStyles.close} ${iconStyles.colorBase}`}
          ></span>
        </button>
        <Link to={`/${category}/${itemId}`} className={styles.imageFrame}>
          <img
            src={image}
            alt={t(TRANSLATIONS.cart.item.image.alt, {
              name,
            })}
            className={styles.image}
          />
        </Link>
        <Link to={`/${category}/${itemId}`} className={styles.link}>
          {name}
        </Link>
      </div>

      <div className={styles.bottom}>
        <div className={styles.counter}>
          <button
            type="button"
            className={classNames(`${btnStyles.block} ${btnStyles.squareSm}`, {
              [btnStyles.disabled]: amount === 1,
            })}
            onClick={() => dispatchCart({ type: 'deleteItem', payload: id })}
            aria-label={t(TRANSLATIONS.cart.item.button.reduce.ariaLabel)}
            disabled={amount === 1}
          >
            <span className={`${iconStyles.block} ${iconStyles.minus}`}></span>
          </button>

          <p className={styles.counter__number}>{amount}</p>

          <button
            type="button"
            className={`${btnStyles.block} ${btnStyles.squareSm}`}
            onClick={() => dispatchCart({ type: 'add', payload: product })}
            aria-label={t(TRANSLATIONS.cart.item.button.increase.ariaLabel)}
          >
            <span className={`${iconStyles.block} ${iconStyles.plus}`}></span>
          </button>
        </div>

        <h3 className={styles.price}>${price * amount}</h3>
      </div>
    </article>
  );
};
