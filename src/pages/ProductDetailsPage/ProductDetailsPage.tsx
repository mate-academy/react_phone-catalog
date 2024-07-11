/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../../services/Products';
import './ProductDetailsPage.scss';
import '../../styles/utils/typography.scss';
import { ProductFull } from '../../types/ProductFull';
import { Color, Colors } from './colors';
import { ActionButtons } from '../../components/ActionButtons';

type ProductPageParams = {
  itemId: string;
};

export const ProductDetailsPage: React.FC = () => {
  const { itemId } = useParams<ProductPageParams>();
  const [product, setProduct] = useState<ProductFull | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (itemId) {
          const fetchedProduct = await getProduct(itemId);

          setProduct(fetchedProduct || null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="product-details-page">Product not found</div>;
  }

  const photosSecondary = product.images.slice(1);

  const handleColorChange = (color: string) => {
    const newUrl = `/products/${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`;

    navigate(newUrl);
  };

  const handleCapacityChange = (capacity: string) => {
    const newUrl = `/products/${product.namespaceId}-${capacity.toLowerCase()}-${product.color}`;

    navigate(newUrl);
  };

  return (
    <div className="product-details-page">
      <h2 className="title title--h2 product-details-page__title">
        {product.name}
      </h2>
      <div className="product-details-page__top">
        <div className="photos">
          <div className="photos__secondary">
            {photosSecondary.map(image => (
              <div className="photos__secondary__wrapper" key={image}>
                <img
                  src={image}
                  alt={`${product.name} secondary`}
                  className="photos__small-photo"
                />
              </div>
            ))}
          </div>
          <div className="photos__main-wrapper">
            <img
              src={product.images[0]}
              className="photos__main"
              alt={product.name}
            />
          </div>
        </div>

        <div className="main-info">
          <div className="colors">
            <p className="small-text colors__subtitle">Available Colors</p>
            <div className="colors__wrapper">
              {product.colorsAvailable.map(color => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={classNames('colors__button', {
                    'colors__button--active': color === product.color,
                  })}
                >
                  <div
                    className="colors__button__inside"
                    style={{ backgroundColor: Colors[color as Color] }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="main-info__capacity capacity">
            <p className="small-text capacity__subtitle">Select capacity</p>

            <div className="capacity__wrapper">
              {product.capacityAvailable.map(capacity => (
                <button
                  key={capacity}
                  onClick={() => handleCapacityChange(capacity)}
                  className={classNames('capacity__button paragraph', {
                    'capacity__button--active': capacity === product.capacity,
                  })}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>

          <div className="main-info__price price">
            <div className="price__wrapper">
              <h3 className="title title--h3">${product.priceRegular}</h3>
              <p className="price__fullprice">${product.priceDiscount}</p>
            </div>

            <ActionButtons />
          </div>

          <div className="main-info__charact charact">
            <div className="charact__container">
              <p className="charact__subtitle small-text">Screen</p>
              <p className="charact__data">{product.screen}</p>
            </div>

            <div className="charact__container">
              <p className="charact__subtitle small-text">Capacity</p>
              <p className="charact__data">{product.capacity}</p>
            </div>

            <div className="charact__container">
              <p className="charact__subtitle small-text">RAM</p>
              <p className="charact__data">{product.ram}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
