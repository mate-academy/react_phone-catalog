import './PhoneCard.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Phone } from '../../types/Phone';
import { getProduct } from '../../api';
import { ProductDetails } from '../../types/PhoneDetails';
import { Loader } from '../Loader/Loader';

type Props = {
  product: Phone;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    itemId,
    category,
  } = product;
  const [productWithDetails, setProductWithDetails]
    = useState<ProductDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const loadProduct = async () => {
      try {
        const productFromServer = await getProduct(itemId);

        setProductWithDetails(productFromServer);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();

    return () => {
      setIsLoading(false);
    };
  }, []);

  const topRef = useRef<HTMLDivElement>(null);

  return (
    <div className="ProductCard" ref={topRef}>
      <div className="ProductCard__content">
        {isError && !isLoading && (
          <div className="ProductCard__error">
            <h2>Product download error</h2>
          </div>
        )}
        {isLoading && !isError ? (
          <Loader />
        ) : !isError && (
          <>
            {productWithDetails && (
              <Link
                to={`/${category}/${itemId}`}
                state={productWithDetails}
                className="ProductCard__photo"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                  });
                }}
              >
                <img
                  src={`/_new/${image}`}
                  alt="product"
                  className="ProductCard__img"
                />
              </Link>
            )}

            <div className="ProductCard__title">{name}</div>

            <div className="ProductCard__price">
              <div className="ProductCard__price-normal">{`$${price}`}</div>
              {price && (
                <div className="ProductCard__price-discounted">{`$${fullPrice}`}</div>
              )}
            </div>

            <div className="ProductCard__details">
              <div className="ProductCard__details-item">
                <div className="ProductCard__details-item__name">Screen</div>
                <div className="ProductCard__details-item__value">
                  {screen || '-'}
                </div>
              </div>
              <div className="ProductCard__details-item">
                <div className="ProductCard__details-item__name">Capacity</div>
                <div className="ProductCard__details-item__value">
                  {capacity || '-'}
                </div>
              </div>
              <div className="ProductCard__details-item">
                <div className="ProductCard__details-item__name">RAM</div>
                <div className="ProductCard__details-item__value">
                  {ram || '-'}
                </div>
              </div>
            </div>

            {/* <div className="ProductCard__buttons">
              <AddToCartButton handleAddToCart={handleAddToCart} id={id} />
              <AddToFavButton
                handleAddToFavorites={handleAddToFavorites}
                isItemFav={isItemFav}
              />
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};
