import React, { useEffect, useState } from 'react';
import './ProductCard.scss';
import { Product } from '../../types/product';
import { Link, useLocation } from 'react-router-dom';
import { Device } from '../../types/device';
import { useDeviceContext } from '../DeviceContext/DeviceContext';
import classNames from 'classnames';
import { getProducts } from '../../api/api';
import { useTranslation } from 'react-i18next';

type Props = {
  product?: Product;
  discount?: boolean;
  className?: string;
  device?: Device;
};

export const ProductCard: React.FC<Props> = ({
  product,
  discount = false,
  className = '',
  device,
}) => {
  const {
    shoppingCart,
    favourites,
    addProductToCart,
    addProductToFavourites,
    removeProductFromFavourites,
  } = useDeviceContext();
  const location = useLocation();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFavourites, setIsAddedToFavourites] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    if (
      shoppingCart.find(
        cart => cart.id === product?.itemId || cart.id === device?.id,
      )
    ) {
      setIsAddedToCart(true);
    }

    if (
      favourites.find(f => f.id === product?.id) ||
      favourites.find(f => f.itemId === device?.id)
    ) {
      setIsAddedToFavourites(true);
    }
  }, [shoppingCart, favourites, device?.id, product?.id, product?.itemId]);

  if (!product && !device) {
    return null;
  }

  const handleAddToFavourites = (p: Product) => {
    if (isAddedToFavourites) {
      removeProductFromFavourites(p.id);
      setIsAddedToFavourites(false);

      return;
    }

    setIsAddedToFavourites(true);
    addProductToFavourites(p);
  };

  const handleAddToCart = (
    image: string,
    name: string,
    price: number,
    id: string,
  ) => {
    setIsAddedToCart(false);

    const newCartProduct = {
      image,
      name,
      price,
      id,
      count: 1,
    };

    if (shoppingCart.find(cart => cart.id === newCartProduct.id)) {
      setIsAddedToCart(true);

      return;
    }

    addProductToCart(newCartProduct);
  };

  const handleAddDeviceToFavourites = (newDevice: Device) => {
    const newProduct = products.find(p => p.itemId === newDevice.id);

    if (newProduct) {
      handleAddToFavourites(newProduct);
    }
  };

  return (
    <div className={`productCard ${className}`}>
      {product && (
        <>
          <Link
            to={{
              pathname: `/product/${product.itemId}`,
            }}
            state={{ from: location.pathname }}
          >
            <img src={`${product.image}`} className="productCard__img" alt="" />
            <p className="productCard__title body-text">{product.name}</p>
          </Link>
          <div className="productCard__price-block">
            <h3 className="productCard__price-block--price">{`$${product.price}`}</h3>
            {discount && (
              <h3 className="productCard__price-block--fullprice body-text">{`$${product.fullPrice}`}</h3>
            )}
          </div>

          <div className="productCard__specs">
            {[
              { title: t('Screen'), value: product.screen },
              { title: t('Capacity'), value: product.capacity },
              { title: t('RAM'), value: product.ram },
            ].map((spec, index) => (
              <div className="productCard__specs--spec" key={index}>
                <p className="productCard__specs--spec--text-1 small-text">
                  {spec.title}
                </p>
                <p className="productCard__specs--spec--text-2 small-text">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
          <div className="productCard__buttons">
            <button
              className={classNames('button-primary buttons', {
                'button-primary--selected': isAddedToCart,
              })}
              onClick={() =>
                handleAddToCart(
                  product.image,
                  product.name,
                  product.price,
                  product.itemId,
                )
              }
            >
              {isAddedToCart ? t('Added to cart') : t('Add to cart')}
            </button>

            <button
              className={classNames('button-favourite', {
                'button-favourite--selected': isAddedToFavourites,
              })}
              onClick={() => handleAddToFavourites(product)}
            ></button>
          </div>
        </>
      )}
      {device && (
        <>
          <div className="productCard__price-block">
            <h3 className="productCard__price-block--price">{`$${device.priceDiscount}$`}</h3>
            <h3 className="productCard__price-block--fullprice body-text">{`$${device.priceRegular}`}</h3>
          </div>

          <div className="productCard__buttons">
            <button
              className={classNames('button-primary buttons', {
                'button-primary--selected': isAddedToCart,
              })}
              onClick={() =>
                handleAddToCart(
                  device?.images[0],
                  device.name,
                  device.priceDiscount,
                  device.id,
                )
              }
            >
              {isAddedToCart ? t('Added to cart') : t('Add to cart')}
            </button>

            <button
              className={classNames('button-favourite', {
                'button-favourite--selected': isAddedToFavourites,
              })}
              onClick={() => handleAddDeviceToFavourites(device)}
            ></button>
          </div>

          <div className="productCard__specs">
            {[
              { title: t('Screen'), value: device.screen },
              { title: t('Capacity'), value: device.capacity },
              { title: t('Processor'), value: device.processor },
              { title: t('RAM'), value: device.ram },
            ].map((spec, index) => (
              <div className="productCard__specs--spec" key={index}>
                <p className="productCard__specs--spec--text-1 small-text">
                  {spec.title}
                </p>
                <p className="productCard__specs--spec--text-2 small-text">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <div className="card-skeleton__img skeleton" />
      <div className="card-skeleton__title skeleton" />
      <div className="card-skeleton__price-block">
        <div className="card-skeleton__price skeleton" />
        <div className="card-skeleton__full-price skeleton" />
      </div>
      <div className="card-skeleton__specs">
        <div className="card-skeleton__spec">
          <div className="card-skeleton__spec-text-1 skeleton" />
          <div className="card-skeleton__spec-text-2 skeleton" />
        </div>
        <div className="card-skeleton__spec">
          <div className="card-skeleton__spec-text-1 skeleton" />
          <div className="card-skeleton__spec-text-2 skeleton" />
        </div>
        <div className="card-skeleton__spec">
          <div className="card-skeleton__spec-text-1 skeleton" />
          <div className="card-skeleton__spec-text-2 skeleton" />
        </div>
      </div>
      <div className="card-skeleton__buttons">
        <div className="card-skeleton__button-add skeleton" />
        <div className="card-skeleton__button-favourite skeleton" />
      </div>
    </div>
  );
};
