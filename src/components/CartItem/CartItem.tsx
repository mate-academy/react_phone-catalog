import classNames from 'classnames';
import { useContext } from 'react';
import { Product } from '../../types/Product';
import { CartContext, DispatchCartContext } from '../../store/CartContext';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { id, itemId, name, image, price } = product;
  const cartState = useContext(CartContext);
  const dispatchCart = useContext(DispatchCartContext);
  const { t } = useTranslation();

  const amount = cartState.filter(item => item.id === id).length;

  return (
    <article className="cart-card">
      <div className="cart-card__top">
        <button
          type="button"
          className="btn btn--remove"
          onClick={() =>
            dispatchCart({ type: 'deleteProduct', payload: itemId })
          }
          aria-label={t(TRANSLATIONS.cart.item.button.remove.ariaLabel, {
            name,
          })}
        >
          <span className="icon icon--close icon--c-base"></span>
        </button>
        <a href="#" className="cart-card__image-frame">
          <img
            src={image}
            alt={t(TRANSLATIONS.cart.item.image.alt, {
              name,
            })}
            className="cart-card__image"
          />
        </a>
        <p className="cart-card__title">{name}</p>
      </div>

      <div className="cart-card__bottom">
        <div className="cart-card__counter">
          <button
            type="button"
            className={classNames('btn btn--square-sm', {
              'btn--disabled': amount === 1,
            })}
            onClick={() => dispatchCart({ type: 'deleteItem', payload: id })}
            aria-label={t(TRANSLATIONS.cart.item.button.reduce.ariaLabel)}
            disabled={amount === 1}
          >
            <span className="icon icon--minus"></span>
          </button>

          <p className="cart-card__counter--number">{amount}</p>

          <button
            type="button"
            className="btn btn--square-sm"
            onClick={() => dispatchCart({ type: 'add', payload: product })}
            aria-label={t(TRANSLATIONS.cart.item.button.increase.ariaLabel)}
          >
            <span className="icon icon--plus"></span>
          </button>
        </div>

        <h3 className="cart-card__price">${price * amount}</h3>
      </div>
    </article>
  );
};
