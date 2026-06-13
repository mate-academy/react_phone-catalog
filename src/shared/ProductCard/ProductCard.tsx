import './ProductCard.scss';
import React, { FC, memo, useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { GlobalContext } from '../../context/GlobalContext';
import { Icon } from '../Icon';
import { icons } from '../../constants/icons';

type Props = {
  product: Product;
  displayType: 'fullPrice' | 'with-discount';
};

export const ProductCard: FC<Props> = memo(({ product, displayType }) => {
  const {
    cart,
    favorites,
    toggleFavorites,
    addToCart,
    theme,
    allPhones,
    allTablets,
    allAccessories,
  } = useContext(GlobalContext);

  const isInCart = useMemo(
    () => cart.some(({ id }) => id === product.itemId),
    [cart, product.itemId],
  );
  const isFavorites = useMemo(
    () => favorites.some(({ itemId }) => itemId === product.itemId),
    [favorites, product.itemId],
  );

  function findByKey(array: Product[], key: string, value: string) {
    // Validate inputs
    if (!Array.isArray(array)) {
      throw new TypeError('First argument must be an array.');
    }

    if (typeof key !== 'string' || key.trim() === '') {
      throw new TypeError('Key must be a non-empty string.');
    }

    // const matches = array.filter(obj => obj && obj[key] === value);

    // console.log('Matching objects:', matches);
    /* console.log(
      'Found item:',
      matches.find(item => item && item[key] === value),
    ); */

    return array.find(item => {
      if (item.hasOwnProperty('id')) {
        //  console.log('Checking id property:', item.id);
        // return true;
        return item.id === value;
      } else {
        throw new Error(
          `Object does not have id property: ${JSON.stringify(item)}`,
        );

        //  console.log('Object does not have id property:', item);
      }

      /* if (item[key as keyof Product] === value) {
        return item;
      } */

      // console.log(`Key "${key}" not found in item:`, item);

      return false;
    });
  }

  const images = useMemo(() => {
    if (product.category === 'phones') {
      return findByKey(allPhones, 'id', product.itemId)?.images;
    }

    if (product.category === 'tablets') {
      return findByKey(allTablets, 'id', product.itemId)?.images;
    }

    if (product.category === 'accessories') {
      return findByKey(allAccessories, 'id', product.itemId)?.images;
    }
  }, [allPhones, allTablets, allAccessories, product.category, product.itemId]);

  // console.log('ProductCard render:', { product, images });
  function handleMouseEnter() {
    const currentImage = document.getElementById(
      `product-image${product.itemId}`,
    ) as HTMLImageElement;

    currentImage.style.opacity = '0.3';
    currentImage.style.animation = 'moveRight 0.3s';
    currentImage.style.animationPlayState = 'running';

    setTimeout(() => {
      currentImage.style.animation = '';
      currentImage.style.animationPlayState = 'paused';
      currentImage.style.opacity = '1';
    }, 300);
  }

  return (
    <div className="productCard">
      <NavLink
        className="productCard__container"
        to={`/${product.category}/${product.itemId}`}
      >
        <div className="productCard__container-photo">
          <img
            // src="https://localhost:4000/img/accessories/apple-watch-se/gold/00.webp"
            crossOrigin="anonymous"
            src={`https://localhost:4000/${product.image}`}
            alt="Product's photo"
            className="productCard__photo"
            id={`product-image${product.itemId}`}
            onMouseEnter={e => {
              /*  const box = document.querySelector(
                '.productCard__container-photo',
              ) as HTMLElement; */
              const img = e.currentTarget as HTMLImageElement;

              img.style.opacity = '0.3';
              img.style.animationDuration = '0.25s';
              img.style.transition = 'opacity 0.3s ease-in-out';
              img.style.animationPlayState = 'running';
              img.style.animation = 'moveShake 0.25s alternate';
              setTimeout(() => {
                img.style.opacity = '1';
                img.style.transition = 'opacity 1s ease-in-out';

                // box.classList.add('-show');
                // box.style.opacity = '1';
                // box.style.transition = 'box-shadow 0.3s ease-in-out';
                // box.style.boxShadow = '0 3px 13px 0 #17203166';
                img.style.animationPlayState = 'paused';
                img.style.animation = '';
              }, 300);
              img.style.transform = 'scale(1.05)';

              if (
                product.category === 'phones' ||
                product.category === 'tablets'
              ) {
                img.src = `https://localhost:4000/${images && images[2] ? images[2] : images && images[1] ? images[1] : product.image}`;
              } else {
                img.src = `https://localhost:4000/${images && images[1] ? images[1] : images && images[2] ? images[2] : product.image}`;
              }
            }}
            onMouseLeave={e => {
              const img = e.currentTarget as HTMLImageElement;

              img.style.animationPlayState = 'paused';
              img.style.animationPlayState = 'running';
              img.style.opacity = '0.3';
              img.style.transition = 'opacity 0.3s ease-in-out';

              // img.style.transition = 'scale 0.3s ease-in-out';

              setTimeout(() => {
                img.style.opacity = '1';
                img.style.transition = 'opacity 1s ease-in-out';
                img.style.transition = 'scale 0.3s ease-in-out';
                img.style.transform = 'scale(1)';

                img.style.transition = 'transform 0.5s ease-in-out'; // Smoothly transition back to original size
              }, 300);

              img.src = `https://localhost:4000/${product.image}`;
            }}
          />
        </div>

        <div className="productCard__container-title">
          <span className="productCard__title">{product.name}</span>
        </div>

        <div className="productCard__container-price">
          {displayType === 'fullPrice' && (
            <span className="productCard__price-regular-without-discount">
              {`$${product.fullPrice}`}
            </span>
          )}

          {displayType === 'with-discount' && (
            <>
              <span className="productCard__price-discount">
                {`$${product.price}`}
              </span>
              <span className="productCard__price-regular">
                {`$${product.fullPrice}`}
              </span>
            </>
          )}
        </div>

        <div className="productCard__divider"></div>

        <div className="productCard__container-specifications">
          <div className="productCard__block">
            <span className="productCard__info">Screen</span>
            <span className="productCard__value">{product.screen}</span>
          </div>
          <div className="productCard__block">
            <span className="productCard__info">Capacity</span>
            <span className="productCard__value">{product.capacity}</span>
          </div>
          <div className="productCard__block">
            <span className="productCard__info">RAM</span>
            <span className="productCard__value">{product.ram}</span>
          </div>
        </div>

        <div className="productCard__container-buttons">
          <button
            className={classNames(
              'productCard__button',
              'productCard__button-card',
              { 'productCard__button-card--active': isInCart },
            )}
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            ) => {
              event.preventDefault();

              handleMouseEnter();
              addToCart(product);
            }}
          >
            {isInCart ? `Added` : `Add to cart`}
          </button>
          <button
            className={classNames(
              'productCard__button',
              'productCard__button-favorites',
              { 'productCard__button-favorites--active': isFavorites },
            )}
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            ) => {
              event.preventDefault();
              toggleFavorites(product);
            }}
          >
            {isFavorites ? (
              <Icon icon={icons.favorites__filled[theme]} />
            ) : (
              <Icon icon={icons.favorites[theme]} />
            )}
          </button>
        </div>
      </NavLink>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
