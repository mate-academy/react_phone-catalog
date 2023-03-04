/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartAndFavContext } from '../../context/CartAndFavContext';
import { DetailedProductContext } from '../../context/DetailedProductContext';
import { scrollUp } from '../../Routes';
import { Product } from '../../types/types';
import { Button } from '../Button/Button';
import { LongButton } from '../LongButton/LongButton';
import './ProductCard.scss';

type Props = {
  product: Product,
  products?: Product[],
  link?: string,
};

export const ProductCard: React.FC<Props> = ({
  product, link, products,
}) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const { setDetailedProduct } = useContext(DetailedProductContext) ?? {};

  const {
    name, price,
    fullPrice, screen, capacity, ram, image,
  } = product;
  const {
    cartProducts,
    favProducts,
  } = useContext(CartAndFavContext) ?? {};

  const getDetailedProduct = async () => {
    scrollUp();

    if (!products) {
      return;
    }

    const newProduct = products.find(
      (one: Product) => one.id === product.id,
    );

    if (newProduct) {
      try {
        const response = await fetch(
          `new/products/${newProduct.itemId}.json`,
          {
            method: 'GET',
          },
        );

        if (response.status === 200) {
          const result = await response.json();

          if (!setDetailedProduct) {
            return;
          }

          setDetailedProduct(result);
        }
      } catch (error) {
        throw new Error(String(error));
      }
    }
  };

  useEffect(() => {
    cartProducts?.map((one: Product) => {
      if (one.id === product.id) {
        setIsAddedToCart(true);
      }
    });
  }, [cartProducts]);

  useEffect(() => {
    setIsAddedToFav(false);

    favProducts?.map((one: Product) => {
      if (one.id === product.id) {
        setIsAddedToFav(true);
      }
    });
  }, [favProducts]);

  return (
    <>
      <div className="product">
        <Link
          to={link || `/${product.category}/${product.id}`}
          onClick={getDetailedProduct}
          className="product__link"
        >
          <img
            className="product__image"
            src={`new/${image}`}
            alt={name}
          />
          <h3 className="product__title body14">{name}</h3>
        </Link>
        <div className="product__prices">
          <h2 className="product__price">
            $
            {price}
          </h2>
          <h2 className="product__old-price">
            $
            {fullPrice}
          </h2>
        </div>
        <div className="product__info">
          <div className="product__keys body12">
            <p className="product__key">Screen</p>
            <p className="product__key">Capacity</p>
            <p className="product__key">Ram</p>
          </div>
          <div className="product__values body12">
            <p className="product__value">{screen}</p>
            <p className="product__value">{capacity}</p>
            <p className="product__value">{ram}</p>
          </div>
        </div>
        <div className="product__buttons">
          <LongButton
            text={isAddedToCart ? 'Added to cart' : 'Add to cart'}
            className={isAddedToCart ? 'selected' : ''}
            product={product}
          />
          <Button
            image={isAddedToFav
              ? 'icons/Favourites Filled (Heart Like).svg'
              : 'icons/Favourites.svg'}
            product={product}
          />
        </div>

      </div>
    </>
  );
};
