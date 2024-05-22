import React, { useEffect, useState } from 'react';
import './ProductCard.scss';
import { Product } from '../../types/Product';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useAppContext } from '../../store/store';

type Props = {
  product: Product;
  discount?: boolean;
  className?: string;
};

export const ProductCard: React.FC<Props> = ({
  product,
  discount = false,
  className = '',
}) => {
  const {
    state: { cart, favourites },
    methods: {
      addProductToCart,
      addProductToFavourites,
      removeProductFromCart,
      removeProductFromFavourites,
    },
  } = useAppContext();

  const location = useLocation();
  const { category } = useParams();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFavourites, setIsAddedToFavourites] = useState(false);

  useEffect(() => {
    if (cart.find(item => item.id === product?.itemId)) {
      setIsAddedToCart(true);
    }

    if (favourites.find(f => f.id === product?.id)) {
      setIsAddedToFavourites(true);
    }
  }, [cart, favourites, product?.id, product?.itemId]);

  if (!product) {
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

  const path = !category
    ? `${product.category}/${product?.itemId}`
    : `${product?.itemId}`;

  return (
    <div className={`product ${className}`}>
      <Link
        to={{
          pathname: path,
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
    </div>
  );
};
