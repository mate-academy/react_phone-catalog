import {
  FC, useContext,
} from 'react';
import cn from 'classnames';
import { Link, useAsyncValue } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { PrimaryButton } from '../PrimaryButton';
import { IconButton } from '../IconButton';
import { ProductDescription } from '../../types/ProductDescription';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { Product } from '../../types/Product';
import { CartContext } from '../../contexts/CartContext';
import { Styles } from '../../types/Styles';
import { getImages } from '../../api/apiProducts';
import { TechSpecs } from '../TechSpecs';
import { ProductAbout } from '../ProductAbout/ProductAbout';
import { ProductPhotos } from '../ProductPhotos';
import { useNotification } from '../../hooks/useNotification';
import { NotificationMessage } from '../NotificationMessage';

const styles: Styles = require('./ProductDescriptionCard.module.scss');

const {
  ProductDescriptionCard: card,
  ProductDescriptionCard__title: title,
  ProductDescriptionCard__container: container,
  ProductDescriptionCard__info: info,
  'ProductDescriptionCard__info-container': infoContainer,
  'ProductDescriptionCard__info-item': infoItem,
  'ProductDescriptionCard__info-item--dark': infoItemDark,
  'ProductDescriptionCard__info-item-title': infoItemTitle,
  'ProductDescriptionCard__info-item-title--dark': infoItemTitleDark,
  ProductDescriptionCard__colors: colorsAvailable,
  ProductDescriptionCard__color: color,
  'ProductDescriptionCard__color-link': colorLink,
  'ProductDescriptionCard__color-link--active': colorLinkActive,
  'ProductDescriptionCard__color-link--dark': colorLinkDark,
  'ProductDescriptionCard__color-link--active-dark': colorLinkActiveDark,
  ProductDescriptionCard__capacities: capacitiesAvailable,
  'ProductDescriptionCard__capacity-link': capacityLink,
  'ProductDescriptionCard__capacity-link--active': capacityLinkActive,
  'ProductDescriptionCard__capacity-link--dark': capacityLinkDark,
  'ProductDescriptionCard__capacity-link--active-dark': capacityLinkActiveDark,
  ProductDescriptionCard__price: price,
  'ProductDescriptionCard__full-price': priceFull,
  'ProductDescriptionCard__full-price--dark': priceFullDark,
  ProductDescriptionCard__unavailable: unavailable,
  ProductDescriptionCard__buttons: buttons,
  ProductDescriptionCard__About: about,
  ProductDescriptionCard__Photos: photos,
  'ProductDescriptionCard__tech-specs-title': techSpecsTitle,
  'ProductDescriptionCard__tech-specs-title--dark': techSpecsTitleDark,
  'ProductDescriptionCard__last-items': lastItems,
} = styles;

type Props = {
  className?: string;
};

export const ProductDescriptionCard: FC<Props> = ({ className = '' }) => {
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

  const [
    currentProduct,
    product,
  ] = useAsyncValue() as [Product, ProductDescription];

  const [isNotificationShown, showNotification] = useNotification();

  const {
    id,
    namespaceId,
    screen,
    resolution,
    processor,
    ram,
    camera,
    colors,
    capacities,
    description,
    category,
  } = product;

  const {
    productId,
    color: currentColor,
    capacity: currentCapacity,
    fullPrice,
    discountPrice,
    count,
    name: currentName,
  } = currentProduct;

  const hasDiscount = discountPrice !== fullPrice;

  const images = getImages({
    category,
    namespaceId,
    color: currentColor,
  }, 5);

  const baseSpecs = {
    Screen: screen,
    Resolution: resolution,
    Processor: processor,
    RAM: ram,
  };

  const fullSpecs = {
    Screen: screen,
    Resolution: resolution,
    Processor: processor,
    RAM: ram,
    'Build-in memory': currentCapacity,
    Camera: camera,
  };

  const handleCartButtonClick = () => {
    if (isInCart(productId)) {
      removeFromCart(productId);
    } else {
      saveToCart(currentProduct);
    }
  };

  const handleFavoritesButtonClick = () => {
    if (isInFavorites(productId)) {
      removeFromFavorites(productId);
    } else {
      saveToFavorites(currentProduct);
    }
  };

  return (
    <>
      <NotificationMessage
        isShown={isNotificationShown}
      />

      <div
        className={cn(
          card,
          className,
        )}
      >
        <h1 className={title}>
          {currentName}
        </h1>

        <div className={container}>
          <ProductPhotos
            images={images}
            className={photos}
          />

          <div className={infoContainer}>
            <div className={info}>
              <div className={cn(
                infoItem,
                { [infoItemDark]: isThemeDark },
              )}
              >
                <p className={cn(
                  infoItemTitle,
                  { [infoItemTitleDark]: isThemeDark },
                )}
                >
                  <span>
                    Available colors
                  </span>

                  <span>
                    {`ID: ${id}`}
                  </span>
                </p>

                <div className={colorsAvailable}>
                  {colors.map(col => (
                    <Link
                      to={`../${namespaceId}-${currentCapacity.toLowerCase()}-${col}`}
                      key={col}
                      className={cn(
                        colorLink,
                        { [colorLinkDark]: isThemeDark },
                        {
                          [colorLinkActive]: col === currentColor
                            && !isThemeDark,
                        },
                        {
                          [colorLinkActiveDark]: isThemeDark
                            && col === currentColor,
                        },
                      )}
                    >
                      <div
                        className={color}
                        style={{ backgroundColor: col }}
                      />
                    </Link>
                  ))}
                </div>
              </div>

              <div className={cn(
                infoItem,
                { [infoItemDark]: isThemeDark },
              )}
              >
                <p className={cn(
                  infoItemTitle,
                  { [infoItemTitleDark]: isThemeDark },
                )}
                >
                  Select capacity
                </p>

                <div className={capacitiesAvailable}>
                  {capacities.map(cap => (
                    <Link
                      to={`../${namespaceId}-${cap.toLowerCase()}-${currentColor}`}
                      key={cap}
                      className={cn(
                        capacityLink,
                        { [capacityLinkDark]: isThemeDark },
                        {
                          [capacityLinkActive]: cap === currentCapacity
                            && !isThemeDark,
                        },
                        {
                          [capacityLinkActiveDark]: isThemeDark
                            && cap === currentCapacity,
                        },
                      )}
                    >
                      {cap}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {count ? (
              <p className={price}>
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
              <p className={unavailable}>
                Not available
              </p>
            )}

            {count > 0 && count < 10 && (
              <p className={lastItems}>
                Last items in stock
              </p>
            )}

            <div className={buttons}>
              {count ? (
                <>
                  <PrimaryButton
                    onClick={handleCartButtonClick}
                    selected={isInCart(productId)}
                  >
                    {isInCart(productId)
                      ? 'Selected'
                      : 'Add to cart'}
                  </PrimaryButton>

                  <IconButton
                    onClick={handleFavoritesButtonClick}
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

            <TechSpecs specs={baseSpecs} />
          </div>
        </div>

        <div className={styles.ProductDescriptionCard__container}>

          <ProductAbout
            description={description}
            className={about}
          />

          <div>
            <h2 className={cn(
              techSpecsTitle,
              { [techSpecsTitleDark]: isThemeDark },
            )}
            >
              Tech specs
            </h2>

            <TechSpecs specs={fullSpecs} />
          </div>
        </div>
      </div>
    </>
  );
};

ProductDescriptionCard.defaultProps = {
  className: '',
};
