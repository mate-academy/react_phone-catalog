import React, { useEffect, useState } from 'react';
import './ProductCard.scss';
import { Product } from '../../types/Product';
import { Link, useLocation } from 'react-router-dom';
import { FullProductData } from '../../types/FullProductData';
import classNames from 'classnames';
import { useAppContext } from '../../store/store';

type Props = {
  product?: Product;
  discount?: boolean;
  className?: string;
  device?: FullProductData;
};

export const ProductCard: React.FC<Props> = ({
  product,
  discount = false,
  className = '',
  device,
}) => {
  const {
    state: { products, cart, favourites },
    methods: {
      addProductToCart,
      addProductToFavourites,
      removeProductFromCart,
      removeProductFromFavourites,
    },
  } = useAppContext();

  const location = useLocation();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFavourites, setIsAddedToFavourites] = useState(false);

  useEffect(() => {
    if (
      cart.find(item => item.id === product?.itemId || item.id === device?.id)
    ) {
      setIsAddedToCart(true);
    }

    if (
      favourites.find(f => f.id === product?.id) ||
      favourites.find(f => f.itemId === device?.id)
    ) {
      setIsAddedToFavourites(true);
    }
  }, [cart, favourites, device?.id, product?.id, product?.itemId]);

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

    if (cart.find(item => item.id === newCartProduct.id)) {
      removeProductFromCart(id);
      setIsAddedToCart(false);

      return;
    }

    addProductToCart(newCartProduct);
    setIsAddedToCart(true);
  };

  const handleAddDeviceToFavourites = (newDevice: FullProductData) => {
    const newProduct = products.find(p => p.itemId === newDevice.id);

    if (newProduct) {
      handleAddToFavourites(newProduct);
    }
  };

  return (
    <div className={`product ${className}`}>
      {product && (
        <>
          <Link
            to={{
              pathname: `${product.category}/${product.itemId}`,
            }}
            state={{ from: location.pathname }}
          >
            <img src={`${product.image}`} className="product__img" alt="" />
            <p className="product__title">{product.name}</p>
          </Link>

          <div className="product__price-container">
            <h3 className="product__price">{`$${product.price}`}</h3>
            {discount && (
              <h3 className="product__full-price">{`$${product.fullPrice}`}</h3>
            )}
          </div>

          <div className="product__specs">
            {[
              { title: 'Screen', value: product.screen },
              { title: 'Capacity', value: product.capacity },
              { title: 'RAM', value: product.ram },
            ].map((spec, index) => (
              <div className="product__spec" key={index}>
                <p className="product__spec-text">{spec.title}</p>
                <p className="product__spec-text product__spec-text--2">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
          <div className="product__buttons">
            <button
              className={classNames('buttons', {
                'buttons--selected': isAddedToCart,
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
              {isAddedToCart ? 'Added to cart' : 'Add to cart'}
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
          <div className="product__price-container">
            <h3 className="product__price">{`$${device.priceDiscount}$`}</h3>
            <h3 className="product__full-price">{`$${device.priceRegular}`}</h3>
          </div>

          <div className="product__buttons">
            <button
              className={classNames('buttons', {
                'buttons--selected': isAddedToCart,
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
              {isAddedToCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              className={classNames('button-favourite', {
                'button-favourite--selected': isAddedToFavourites,
              })}
              onClick={() => handleAddDeviceToFavourites(device)}
            ></button>
          </div>

          <div className="product__specs">
            {[
              { title: 'Screen', value: device.screen },
              { title: 'Capacity', value: device.capacity },
              { title: 'Processor', value: device.processor },
              { title: 'RAM', value: device.ram },
            ].map((spec, index) => (
              <div className="product__spec" key={index}>
                <p className="product__spec-text">{spec.title}</p>
                <p className="product__spec-text--2">{spec.value}</p>
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
