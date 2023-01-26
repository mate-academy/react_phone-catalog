import { FC, useContext } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ThemeContext } from '../../contexts/ThemeContext';
import { IconButton } from '../IconButton';
import { PrimaryButton } from '../PrimaryButton';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { CartContext } from '../../contexts/CartContext';
import { goToTop } from '../../utils/goToTop';
import { getImgUrl } from '../../api/apiProducts';
import { TechSpecs } from '../TechSpecs';
import { Styles } from '../../types/Styles';
import { useNotification } from '../../hooks/useNotification';
import { NotificationMessage } from '../NotificationMessage';

const styles: Styles = require('./ProductCard.module.scss');

const {
  ProductCard: card,
  'ProductCard--dark': cardDark,
  'ProductCard__photo-container': photoContainer,
  ProductCard__photo: photo,
  'ProductCard__photo--unavailable': scale,
  ProductCard__title: title,
  ProductCard__price: price,
  'ProductCard__price--dark': priceDark,
  'ProductCard__full-price': priceFull,
  'ProductCard__full-price--dark': priceFullDark,
  ProductCard__unavailable: unavailable,
  'ProductCard__unavailable--dark': unavailableDark,
  ProductCard__TechSpecs: techSpecs,
  ProductCard__buttons: buttons,
} = styles;

type Props = {
  className?: string;
  product: Product;
  transform: number;
};

export const ProductCard: FC<Props> = ({
  className = '',
  product,
  transform,
}) => {
  const { isThemeDark } = useContext(ThemeContext);

  const {
    saveToFavorites,
    isInFavorites,
    removeFromFavorites,
  } = useContext(FavoritesContext);

  const {
    saveToCart,
    isInCart,
    removeFromCart,
  } = useContext(CartContext);

  const [isNotificationShown, showNotification] = useNotification();

  const transformStyle = {
    transform: `translateX(${transform}px)`,
  };

  const {
    namespaceId,
    productId,
    category,
    name,
    fullPrice,
    discountPrice,
    screen,
    capacity,
    color,
    ram,
    count,
  } = product;

  const hasDiscount = discountPrice !== fullPrice;

  const splitName = () => {
    const splited = name.split(' ');

    const firstPart = splited.slice(0, -2).join(' ');
    const secondPart = splited.slice(-2).join(' ');

    return [firstPart, secondPart];
  };

  const image = getImgUrl({
    namespaceId, category, color, number: 0,
  });

  const specs = {
    Screen: screen,
    Capacity: capacity,
    RAM: ram,
  };

  return (
    <>
      <NotificationMessage
        isShown={isNotificationShown}
      />

      <div
        className={cn(
          card,
          { [cardDark]: isThemeDark },
          className,
        )}
        style={transformStyle}
      >
        <Link
          to={`/${category}/${productId}`}
          onClick={goToTop}
          className={photoContainer}
        >
          <img
            className={cn(
              photo,
              { [scale]: !count },
            )}
            src={image}
            alt={name}
          />
        </Link>

        <Link
          to={`/${category}/${productId}`}
          onClick={goToTop}
          className={title}
        >
          {splitName()[0]}
          <br />
          {splitName()[1]}
        </Link>

        {count ? (
          <p
            className={cn(
              price,
              { [priceDark]: isThemeDark },
            )}
          >
            <span>
              $
              {discountPrice}
            </span>

            {hasDiscount && (
              <span className={cn(
                priceFull,
                { [priceFullDark]: isThemeDark },
              )}
              >
                $
                {fullPrice}
              </span>
            )}
          </p>
        ) : (
          <p className={cn(
            unavailable,
            { [unavailableDark]: isThemeDark },
          )}
          >
            Not available
          </p>
        )}

        <TechSpecs
          className={techSpecs}
          specs={specs}
        />

        <div className={buttons}>
          {count ? (
            <>
              <PrimaryButton
                onClick={() => {
                  if (isInCart(productId)) {
                    removeFromCart(productId);
                  } else {
                    saveToCart(product);
                  }
                }}
                selected={isInCart(productId)}
              >
                {
                  isInCart(productId)
                    ? 'Selected'
                    : 'Add to cart'
                }
              </PrimaryButton>

              <IconButton
                onClick={() => {
                  if (isInFavorites(productId)) {
                    removeFromFavorites(productId);
                  } else {
                    saveToFavorites(product);
                  }
                }}
                favorite={{ filled: isInFavorites(productId) }}
              />
            </>
          ) : (
            <PrimaryButton
              onClick={showNotification}
              selected={false}
            >
              Notify me
            </PrimaryButton>
          )}
        </div>
      </div>
    </>
  );
};

ProductCard.defaultProps = {
  className: '',
};
