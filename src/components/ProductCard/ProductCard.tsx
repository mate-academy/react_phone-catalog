import React, { useEffect, useState } from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import style from './ProductCard.module.scss';
import classNames from 'classnames';
import { COLOR_MAP } from '../../constants/categories/categories';
import { Link } from 'react-router-dom';
import { useCartDispatch, useCartState } from '../../store/CartProvider';
import { useProductsContext } from '../../store/ProductsContext';
import {
  useFavoritesDispatch,
  useFavoritesState,
} from '../../store/FavouritesProvider';
import { useTheme } from '../../store/ThemeContext';
import { ICONS } from '../../assets/icons';

type Props = {
  product: ProductDetails | null;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [mainPhoto, setMainPhoto] = useState<string | undefined>(undefined);
  const { theme } = useTheme();
  const { products } = useProductsContext();
  const { items } = useCartState();
  const { favItems } = useFavoritesState();
  const dispatch = useCartDispatch();
  const favDispatch = useFavoritesDispatch();
  const isAdded = items.some(item => item.id === product?.id);
  const favIsAdded = favItems.some(favItem => favItem.itemId === product?.id);

  const handleToggleCart = () => {
    if (!product) {
      return;
    }

    if (isAdded) {
      dispatch({ type: 'DELETE_ITEM', payload: product.id });
    } else {
      const cartProduct = products.find(p => p.itemId === product.id);

      if (!cartProduct) {
        return;
      }

      dispatch({ type: 'ADD_ITEM', payload: cartProduct });
    }
  };

  const handleToggleFav = () => {
    if (!product) {
      return;
    }

    const favProduct = products.find(p => p.itemId === product.id);

    if (!favProduct) {
      return;
    } else {
      favDispatch({ type: 'TOGGLE_FAVORITE', payload: favProduct });
    }
  };

  useEffect(() => {
    if (product?.images.length) {
      setMainPhoto(product.images[0]);
    }
  }, [product]);

  return (
    <div className={style.productCard}>
      <h2 className={style.productCard__name}>{product?.name}</h2>

      <div className={style.productCard__controls}>
        <div className={style.productCard__gallery}>
          <div className={style.productCard__photos}>
            {product?.images.map((photo, index) => (
              <img
                src={photo}
                alt={photo}
                key={index}
                onClick={() => setMainPhoto(photo)}
                className={classNames(style.productCard__photo, {
                  [style.productCard__photoActive]: mainPhoto === photo,
                })}
              />
            ))}
          </div>
          <div className={style.productCard__mainPhotoContainer}>
            <img
              src={mainPhoto}
              alt={mainPhoto}
              className={style.productCard__mainPhoto}
            />
          </div>
        </div>
        <div className={style.productCard__options}>
          <div className={style.productCard__colorSelector}>
            <div className={style.productCard__varilableColors}>
              <p className={style.productCard__colorsTitle}>Available colors</p>
              <div className={style.productCard__colors}>
                {product?.colorsAvailable.map(color => {
                  const newProductId = `${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`;

                  return (
                    <Link
                      to={`/${product.category}/${newProductId}`}
                      className={classNames(style.productCard__colorWrapper, {
                        [style.productCard__colorWrapperActive]:
                          color === product.color,
                      })}
                      key={color}
                    >
                      <div
                        className={style.productCard__color}
                        style={{ backgroundColor: COLOR_MAP[color] || color }}
                      ></div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className={style.productCard__productId}>
              {product?.namespaceId}
            </div>
          </div>
          <div className={style.productCard__capacity}>
            <p className={style.productCard__capacityTitle}>Select capacity</p>
            <div className={style.productCard__capacityButtons}>
              {product?.capacityAvailable.map(capacity => {
                const newProductId = `${product.namespaceId}-${capacity.toLowerCase()}-${product.color}`;

                return (
                  <Link
                    to={`/${product.category}/${newProductId}`}
                    className={classNames(style.productCard__capacityButton, {
                      [style.productCard__capacityButtonActive]:
                        capacity === product.capacity,
                    })}
                    key={capacity}
                  >
                    {capacity}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={style.productCard__actions}>
            <div className={style.productCard__price}>
              <p className={style.productCard__discountPrice}>
                {`$${product?.priceDiscount}`}
              </p>
              <p className={style.productCard__fullPrice}>
                {`$${product?.priceRegular}`}
              </p>
            </div>
            <div className={style.productCard__actionsButtons}>
              <button
                className={classNames(style.productCard__addButton, {
                  [style.productCard__addedButton]: isAdded,
                })}
                onClick={handleToggleCart}
              >
                {isAdded ? 'Added' : 'Add to cart'}
              </button>
              <button
                className={style.productCard__favButton}
                onClick={handleToggleFav}
              >
                {favIsAdded ? (
                  <img src="./img/favourites-active.svg" alt="fav-active" />
                ) : (
                  <img
                    src={theme === 'dark' ? ICONS.darkFav : ICONS.fav}
                    alt="fav"
                  />
                )}
              </button>
            </div>
          </div>
          <div className={style.productCard__characteristics}>
            <div className={style.productCard__characteristic}>
              <span>Screen</span>
              <span>{product?.screen}</span>
            </div>
            <div className={style.productCard__characteristic}>
              <span>Resolution</span>
              <span>{product?.resolution}</span>
            </div>
            <div className={style.productCard__characteristic}>
              <span>Processor</span>
              <span>{product?.processor}</span>
            </div>
            <div className={style.productCard__characteristic}>
              <span>RAM</span>
              <span>{product?.ram}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
