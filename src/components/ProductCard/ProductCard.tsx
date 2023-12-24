/* eslint-disable  jsx-a11y/control-has-associated-label */
import { useCallback, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { getCorrectImageUrl } from '../../helpers/getCorrectImageUrl';
import { getMemoryString } from '../../helpers/getMemoryString';
import { Item } from '../../types/Item';
import './ProductCard.scss';
import { ProductsContext } from '../../context/ProductsContext';
import { getLinkTypeByProduct } from '../../helpers/getLinkTypeByProduct';

type Props = {
  item: Item;
};

const CURRENCY = '$';

export const ProductCard: React.FC<Props> = ({ item }) => {
  const {
    favourites,
    cart,
    setCart,
    setFavourites,
  } = useContext(ProductsContext);

  const type: PageItems
    = useMemo(() => getLinkTypeByProduct(item), [item]);

  const handleFavouriteButton = useCallback((
    product: Item,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (favourites.find((favItem) => favItem.id === product.id)) {
      setFavourites(favourites.filter((favItem) => favItem.id !== product.id));
    } else {
      setFavourites([...favourites, product]);
    }
  }, [favourites]);

  const handleAddToCartButton = useCallback((
    product: Item,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (!cart.find((favItem) => favItem.id === product.id)) {
      const productToCart = { ...product, quantity: 1 };

      setCart([...cart, productToCart]);
    }
  }, [cart]);

  return (
    <Link
      to={`/${type}/${item.id}`}
      className="product-card"
    >
      <div className="product-card__top">
        <img
          src={getCorrectImageUrl(item.imageUrl)}
          className="product-card__top-image"
          alt="Product"
        />
        <h2
          className="product-card__top-title"
        >
          {item.name}
        </h2>
        <div className="product-card__top-price">
          {
            item.discount !== 0
              ? (
                <>
                  <p className="product-card__top-price--new">
                    {CURRENCY
                      + (item.price - ((item.price * item.discount) / 100))}
                  </p>
                  <p className="product-card__top-price--old">
                    {CURRENCY + item.price}
                  </p>
                </>
              ) : (
                <p className="product-card__top-price--new">
                  {CURRENCY + item.price}
                </p>
              )
          }
        </div>
      </div>
      <div className="product-card__bottom">
        <div className="product-card__bottom-info">
          <div className="product-card__bottom-info-block">
            <p className="product-card__bottom-info-block-title">
              Screen
            </p>
            <p className="product-card__bottom-info--block-value">
              {item.screen}
            </p>
          </div>
          {item.capacity && (
            <div className="product-card__bottom-info-block">
              <p className="product-card__bottom-info-block-title">
                Capacity
              </p>
              <p className="product-card__bottom-info--block-value">
                {getMemoryString(item.capacity)}
              </p>
            </div>
          )}
          {item.ram && (
            <div className="product-card__bottom-info-block">
              <p className="product-card__bottom-info-block-title">
                RAM
              </p>
              <p className="product-card__bottom-info--block-value">
                {getMemoryString(item.ram)}
              </p>
            </div>
          )}
        </div>
        <div className="product-card__bottom-controls">
          <button
            className={cn('primary-button', {
              selected: cart.find((favItem) => favItem.id === item.id),
            })}
            type="button"
            onClick={(event) => handleAddToCartButton(item, event)}
          >
            {
              cart.find((favItem) => favItem.id === item.id)
                ? 'Added to cart'
                : 'Add to cart'
            }
          </button>
          <button
            data-cy="addToFavorite"
            type="button"
            className={cn('simple-button', 'favourite', {
              selected: favourites.find((favItem) => favItem.id === item.id),
            })}
            onClick={(event) => handleFavouriteButton(item, event)}
          />
        </div>
      </div>
    </Link>
  );
};
