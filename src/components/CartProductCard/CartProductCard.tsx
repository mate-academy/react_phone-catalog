/* eslint-disable @typescript-eslint/no-var-requires */
import { FC, useContext } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ThemeContext } from '../../contexts/ThemeContext';
import { IconButton } from '../IconButton';
import { CartContext } from '../../contexts/CartContext';
import { getImgUrl } from '../../api/apiProducts';
import { Styles } from '../../types/Styles';

const styles: Styles = require('./CartProductCard.module.scss');

const {
  CartProductCard: card,
  'CartProductCard--dark': cardDark,
  CartProductCard__section: section,
  CartProductCard__wrapper: wrapper,
  'CartProductCard__photo-container': photoContainer,
  CartProductCard__photo: photo,
  CartProductCard__counter: counter,
  CartProductCard__price: price,
} = styles;

type Props = {
  className?: string;
  product: Product
};

export const CartProductCard: FC<Props> = ({ className = '', product }) => {
  const { theme, isThemeDark } = useContext(ThemeContext);
  const { removeFromCart, changeCount, cart } = useContext(CartContext);

  const {
    namespaceId,
    productId,
    category,
    name,
    discountPrice,
    color,
    count,
  } = product;

  const itemsCount = cart.find(
    (item) => item.product.productId === productId,
  )?.count || 1;

  const image = getImgUrl({
    category,
    namespaceId,
    color,
    number: 0,
  });

  return (
    <div className={cn(
      card,
      { [cardDark]: isThemeDark },
      className,
    )}
    >
      <div className={section}>
        <div className={wrapper}>
          <button
            type="button"
            onClick={() => removeFromCart(productId)}
          >
            <img
              src={`./icons/Close_${theme}_disabled.svg`}
              alt="delete"
            />
          </button>

          <Link
            to={`../${category}/${productId}`}
            className={photoContainer}
          >
            <img
              className={photo}
              src={image}
              alt={name}
            />
          </Link>
        </div>

        <Link
          to={`../${category}/${productId}`}
        >
          {name}
        </Link>
      </div>

      <div className={section}>
        <div className={counter}>
          <IconButton
            counter={{ action: 'Minus', disabled: itemsCount === 1 }}
            onClick={() => changeCount(productId, -1)}
          />

          <span>
            {itemsCount}
          </span>

          <IconButton
            counter={{ action: 'Plus', disabled: itemsCount === count }}
            onClick={() => changeCount(productId, 1)}
          />
        </div>

        <div className={price}>
          $
          {discountPrice * itemsCount}
        </div>
      </div>
    </div>
  );
};

CartProductCard.defaultProps = {
  className: '',
};
