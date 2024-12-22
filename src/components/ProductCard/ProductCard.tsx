import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Product} from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { StorageContext } from '../StorageContext';
import { getProductDetails } from '../../helpers/api';

type ProductCardProps = {
  product: Product;
  useDiscount?: boolean;
  sliderIndex?: number;
  setFavLength: React.Dispatch<number>;
  setCartLength: React.Dispatch<number>;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  useDiscount = false,
  sliderIndex = 0,
  setFavLength,
  setCartLength,
}) => {
  const {
    image = '',
    name = 'Unnamed Product',
    fullPrice = 0,
    price = 0,
    screen = 'Unknown',
    capacity = '',
    category = 'unknown-category',
    ram = '',
    itemId = '',
  } = product;

  const {
    cart,
    fav,
    saveItemToCart,
    saveItemToFav,
    deleteItemFromCart,
    deleteItemFromFav,
    findItemInCart,
    findItemInFav,
    cartSum,
  } = useContext(StorageContext);

  const [productDetails, setProductDetails] = useState<ProductDetails | undefined>();
  const [isSelectedToFav, setIsSelectedToFav] = useState(findItemInFav(itemId));
  const [isSelectedToCard, setIsSelectedToCard] = useState(findItemInCart(itemId));

  useEffect(() => {
    getProductDetails(itemId).then((details: ProductDetails) => {
      setProductDetails(details); // Now it will have ProductDetails type
    });
  }, [itemId]);

  useEffect(() => {
    if (productDetails) {
      if (isSelectedToCard !== findItemInCart(itemId)) {
        isSelectedToCard
          ? saveItemToCart(itemId, productDetails)
          : deleteItemFromCart(itemId);
      }
    }
  }, [isSelectedToCard, itemId, productDetails, saveItemToCart, deleteItemFromCart]);

  useEffect(() => {
    setCartLength(cartSum(cart));
  }, [cart, cartSum, setCartLength]);

  useEffect(() => {
    if (productDetails) {
      if (isSelectedToFav !== findItemInFav(itemId)) {
        isSelectedToFav
          ? saveItemToFav(product)
          : deleteItemFromFav(product);
      }
    }
  }, [isSelectedToFav, itemId, productDetails, product, saveItemToFav, deleteItemFromFav]);

  useEffect(() => {
    setFavLength(fav.length);
  }, [fav, setFavLength]);

  return (
    <div
      style={{ translate: `${-1152 * sliderIndex}px` }}
      className="product-card"
      data-cy="cardsContainer"
    >
      <Link to={`/${category}/${itemId}`} state={{ useDiscount }}>
        <img
          src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`}
          alt={name}
          className="product-card__picture"
        />
      </Link>

      <div className="product-card__title">{name}</div>

      {useDiscount ? (
        <div className="product-card__price">
          <div className="product-card__price-new">{`$${price}`}</div>
          <div className="product-card__price-old">{`$${fullPrice}`}</div>
        </div>
      ) : (
        <div className="product-card__price">
          <div className="product-card__price-new">{`$${fullPrice}`}</div>
        </div>
      )}

      <div className="product-card__short-info">
        <div className="product-card__short-info-section">
          <div className="product-card__short-info-section-title">Screen</div>
          <div className="product-card__short-info-section-value">{screen}</div>
        </div>

        <div className="product-card__short-info-section">
          <div className="product-card__short-info-section-title">Capacity</div>
          <div className="product-card__short-info-section-value">
            {capacity ? capacity.replace('GB', ' GB') : 'Unknown'}
          </div>
        </div>

        <div className="product-card__short-info-section">
          <div className="product-card__short-info-section-title">RAM</div>
          <div className="product-card__short-info-section-value">
            {ram ? ram.replace('GB', ' GB') : 'Unknown'}
          </div>
        </div>
      </div>

      <div className="product-card__buttons">
        <button
          type="button"
          onClick={() => setIsSelectedToCard(!isSelectedToCard)}
          className={classNames(
            'product-card__buttons-card',
            isSelectedToCard
              ? 'product-card__buttons-card--selected'
              : 'product-card__buttons-card--not-selected',
          )}
        >
          {isSelectedToCard ? 'Added to card' : 'Add to card'}
        </button>

        <button
          type="button"
          data-cy="addToFavorite"
          onClick={() => setIsSelectedToFav(!isSelectedToFav)}
          className={classNames(
            'product-card__buttons-fav',
            isSelectedToFav
              ? 'product-card__buttons-fav--selected'
              : 'product-card__buttons-fav--not-selected',
          )}
        />
      </div>
    </div>
  );
};
