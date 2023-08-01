/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { BackButton } from '../../components/BackButton/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { CartContext } from '../../components/CartProvider/CartProvider';
import { AddToCartButton }
  from '../../components/AddToCartButton/AddToCartButton';
import { AddToFavButton }
  from '../../components/AddToFavButton/AddToFavButton';

import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { getDiscount } from '../../helpers/getDiscount';

import './ProductDetailsPage.scss';

type Props = {
  suggestedProducts: Product[];
  products: Product[];
};

export const ProductDetailsPage: React.FC<Props> = ({
  suggestedProducts,
  products,
}) => {
  const location = useLocation();
  const propsData: ProductDetails = location.state;

  const {
    name,
    images,
    id,
    display,
    hardware,
    storage,
    camera,
    connectivity,
    description,
  } = propsData;

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const { productsInCart, setProductsInCart } = useContext(CartContext);

  const getCurrentProduct = () => {
    const prod = products.find((product) => product.id === id);

    setCurrentProduct(prod);
  };

  useEffect(() => {
    if (images[0] !== currentImage) {
      setCurrentImage(images[0]);
    }
  }, [images]);

  useEffect(() => {
    if (products && (!currentProduct || currentProduct?.id !== id)) {
      getCurrentProduct();
    }
  }, [currentProduct, products, id]);

  const discountedPrice
    = currentProduct
    && getDiscount(currentProduct.price, currentProduct.discount);

  const isItemInCart = productsInCart.some(cartItem => cartItem.id === id);

  const handleAddToCart = () => {
    if (isItemInCart) {
      const updatedCart = productsInCart.filter(cartItem => cartItem.id !== id);

      setProductsInCart(updatedCart);

      return;
    }

    if (currentProduct) {
      const newProd = {
        ...currentProduct,
        quantity: 1,
      };

      setProductsInCart([...productsInCart, newProd]);
    }
  };

  return (
    <div className="ProductDetailsPage">
      <div className="container">
        {currentProduct ? (
          <div className="ProductDetailsPage__content">
            <Breadcrumbs />

            <BackButton />

            <h1 className="ProductDetailsPage__title">{name}</h1>

            <div className="ProductDetailsPage__main">
              <ul className="ProductDetailsPage__list">
                {images.map((image) => (
                  <li
                    key={image}
                    className="ProductDetailsPage__photo"
                    onClick={() => setCurrentImage(image)}
                  >
                    <img
                      className="ProductDetailsPage__photo-img"
                      src={image}
                      alt="product img"
                    />
                  </li>
                ))}
              </ul>

              <div className="ProductDetailsPage__current">
                <img
                  src={currentImage}
                  alt="main img"
                />
              </div>

              <div className="ProductDetailsPage__characteristics">
                <div className="ProductDetailsPage__colors colors">
                  <div className="colors__text">Available colors</div>
                  <div className="colors__list">
                    <div className="colors__link colors__link-active">
                      <div
                        className="colors__link-color colors__link-color--1"
                      />
                    </div>
                    <div className="colors__link">
                      <div
                        className="colors__link-color colors__link-color--2"
                      />
                    </div>
                    <div className="colors__link">
                      <div
                        className="colors__link-color colors__link-color--3"
                      />
                    </div>
                    <div className="colors__link">
                      <div
                        className="colors__link-color colors__link-color--4"
                      />
                    </div>
                  </div>
                </div>
                <div className="ProductDetailsPage__capacities capacities">
                  <div className="capacities__text">Select capacity</div>
                  <div className="capacities__list">
                    <div className="capacities__link capacities__link-active">
                      64 GB
                    </div>
                    <div className="capacities__link">256 GB</div>
                    <div className="capacities__link">512 GB</div>
                  </div>
                </div>
                <div className="ProductDetailsPage__price price">
                  <div className="price__normal">{`$${discountedPrice}`}</div>

                  {currentProduct?.discount > 0 && (
                    <div className="price__without-discount">{`$${currentProduct.price}`}</div>
                  )}
                </div>
                <div className="ProductDetailsPage__buttons buttons">
                  <AddToCartButton handleAddToCart={handleAddToCart} id={id} />
                  <AddToFavButton />
                </div>
                <div className="ProductDetailsPage__details details">
                  <div className="details__item">
                    <div className="details__name">Screen</div>
                    <div className="details__value">{display.screenSize}</div>
                  </div>
                  <div className="details__item">
                    <div className="details__name">Resolution</div>
                    <div className="details__value">
                      {display.screenResolution}
                    </div>
                  </div>
                  <div className="details__item">
                    <div className="details__name">Processor</div>
                    <div className="details__value">{hardware.cpu}</div>
                  </div>
                  <div className="details__item">
                    <div className="details__name">RAM</div>
                    <div className="details__value">{storage.ram}</div>
                  </div>
                </div>
              </div>

              <div className="ProductDetailsPage__id">{`ID: ${id}`}</div>
            </div>

            <div className="ProductDetailsPage__info">
              <div
                className="ProductDetailsPage__about about"
                data-cy="productDescription"
              >
                <h2 className="about__title">About</h2>

                <div className="about__description">{description}</div>
              </div>

              <div className="ProductDetailsPage__tech tech">
                <h2 className="tech__title">Tech specs</h2>

                <div className="tech__details details">
                  <div className="details__item details__item--tech">
                    <div className="details__name">Screen</div>
                    <div className="details__value">{display.screenSize}</div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Resolution</div>
                    <div className="details__value">
                      {display.screenResolution}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Processor</div>
                    <div className="details__value">{hardware.cpu}</div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">RAM</div>
                    <div className="details__value">{storage.ram}</div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Built in memory</div>
                    <div className="details__value">{storage.flash}</div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Camera</div>
                    <div className="details__value">{camera.primary}</div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Bluetooth</div>
                    <div className="details__value">
                      {connectivity.bluetooth}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Wifi</div>
                    <div className="details__value">{connectivity.wifi}</div>
                  </div>
                </div>
              </div>
            </div>

            <ProductsSlider
              title="You may also like"
              products={suggestedProducts}
              key={id}
            />
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};
