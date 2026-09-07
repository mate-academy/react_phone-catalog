/* eslint-disable max-len */
import './ProductDetailsCard.scss';
import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { useAppDispatch, useAppSelector } from '../../customHooks/customHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../expansions/cart';
import {
  addProductToFavorites,
  removeProductFromFavorites,
} from '../../expansions/favorites';
import classNames from 'classnames';
import { getColor } from '../../utils/getColor';
import favoritesImg from '../../images/logo/favorites.svg';
import addedToFavorites from '../../images/logo/addedInFavorites.svg';

type Props = {
  products: Product[];
  currentProductsDetails: ProductDetails | undefined;
};

export const ProductDetailsCard: React.FC<Props> = React.memo(
  ({ products, currentProductsDetails }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { favorites } = useAppSelector(state => state.favorites);
    const { productsInCart } = useAppSelector(state => state.cart);
    const [selectedImage, setSelectedImage] = useState<string | undefined>('');
    const [color, setColor] = useState<string | undefined>('');
    const [capacity, setCapacity] = useState<string | undefined>('');
    const { productId = '' } = useParams();
    const productImages = currentProductsDetails?.images;
    const id = productId.slice(1);
    const colors = currentProductsDetails?.colorsAvailable || [];
    const capacities = currentProductsDetails?.capacityAvailable || [];

    const redirectFromColor = (newColor: string) => {
      setColor(newColor);
      const newPath = currentProductsDetails?.id
        .split('-')
        .slice(0, -1)
        .join('-');

      navigate(`/${currentProductsDetails?.category}/:${newPath}-${newColor}`);
    };

    const redirectFromCapacity = (newCapacity: string) => {
      setCapacity(newCapacity);

      const capArr = newCapacity?.split('').slice(0, -2).join('') || '';
      const gB = newCapacity?.split('').slice(-2).join('').toLowerCase() || '';
      const normalizedCapacity = capArr + gB;

      navigate(
        `/${currentProductsDetails?.category}/:${currentProductsDetails?.namespaceId}-${normalizedCapacity}-${color}`,
      );
    };

    const isProductInFavorites = favorites.some(
      item => item && item.itemId === id,
    );
    const isProductInCart = productsInCart.some(item => item.itemId === id);

    const handleCartInDetails = (itemId: string) => {
      const index = products.findIndex(item => item.itemId === itemId);

      if (productsInCart.some(item => item.itemId === itemId)) {
        dispatch(removeFromCart(+products[index].id));
      } else {
        dispatch(addToCart(products[index]));
      }
    };

    const idInProducts = products.find(item => item.itemId === id)?.id;

    const handleFavoritesInDetails = (itemId: string) => {
      const index = products.findIndex(item => item.itemId === itemId);

      if (favorites.some(item => item.itemId === itemId)) {
        dispatch(removeProductFromFavorites(products[index]));
      } else {
        dispatch(addProductToFavorites(products[index]));
      }
    };

    useEffect(() => {
      const currColor = currentProductsDetails?.color;
      const currCap = currentProductsDetails?.capacity;

      setCapacity(currCap);
      setColor(currColor);
    }, [currentProductsDetails]);

    useEffect(() => {
      const bigImage = currentProductsDetails?.images[0];

      setSelectedImage(bigImage);
    }, [currentProductsDetails]);

    return (
      <div className="productDetailsCard">
        <div className="productDetailsCard__content">
          <h2 className="productDetailsCard__title">
            {currentProductsDetails?.name}
          </h2>

          <div className="productDetailsCard__images_section">
            <ul className="productDetailsCard__images_list">
              {productImages?.map((image, i) => (
                <li
                  key={i}
                  className={classNames('productDetailsCard__images_item', {
                    'productDetailsCard__images_item-active':
                      image === selectedImage,
                  })}
                >
                  <div
                    className="productDetailsCard__images_link"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={currentProductsDetails?.namespaceId}
                      className="productDetailsCard__images_item__img"
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="productDetailsCard__images">
              <img
                src={selectedImage}
                alt={currentProductsDetails?.namespaceId}
                className="productDetailsCard__images-img"
              />
            </div>
          </div>

          <div className="productDetailsCard__details">
            <div className="productDetailsCard__colorAndCapacity">
              <div className="productDetailsCard__details__color_section">
                <div className="productDetailsCard__details__color_colors">
                  <p className="productDetailsCard__details__color_title">
                    Available colors
                  </p>
                  <ul className="productDetailsCard__details__color_list">
                    {colors.map(colorAvailable => {
                      return (
                        <div
                          className={classNames('border', {
                            'border-active': color === colorAvailable,
                          })}
                          key={colorAvailable}
                          onClick={() => redirectFromColor(colorAvailable)}
                        >
                          <li
                            className="productDetailsCard__details__color_list_item"
                            style={{
                              backgroundColor: getColor(colorAvailable),
                            }}
                          ></li>
                        </div>
                      );
                    })}
                  </ul>
                </div>

                <span className="productDetailsCard__details__color_id">
                  {`ID: ${idInProducts}`}
                </span>
              </div>

              <div className="productDetailsCard__details__capacity_section">
                <p className="productDetailsCard__details__capacity_title">
                  Select capacity
                </p>
                <ul className="productDetailsCard__details__capacity_list">
                  {capacities.map(capacityAvailable => {
                    return (
                      <li
                        className={classNames(
                          'productDetailsCard__details__capacity_list_item',
                          {
                            'productDetailsCard__details__capacity_list_item-active':
                              capacity === capacityAvailable,
                          },
                        )}
                        key={capacityAvailable}
                        onClick={() => redirectFromCapacity(capacityAvailable)}
                      >
                        {capacityAvailable}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="productDetailsCard__price_section">
              <div className="productDetailsCard__prices">
                <p className="productDetailsCard__prices--discount">
                  {`$${currentProductsDetails?.priceDiscount}`}
                </p>
                <p className="productDetailsCard__prices--regular">
                  {`$${currentProductsDetails?.priceRegular}`}
                </p>
              </div>

              <div className="productDetailsCard__buttons">
                <button
                  className={classNames('productDetailsCard__buttons_cart', {
                    'productDetailsCard__buttons_cart-active': isProductInCart,
                  })}
                  onClick={() => handleCartInDetails(id)}
                >
                  {isProductInCart ? 'Added' : 'Add to cart'}
                </button>

                <button
                  className={classNames(
                    'productDetailsCard__buttons_favorites',
                    {
                      'productDetailsCard__buttons_favorites-active':
                        isProductInFavorites,
                    },
                  )}
                  onClick={() => handleFavoritesInDetails(id)}
                >
                  <img
                    src={isProductInFavorites ? addedToFavorites : favoritesImg}
                    alt="Favorites"
                    className="productDetailsCard__buttons_favorites_img"
                  />
                </button>
              </div>
            </div>

            <div className="productDetailsCard__parameters">
              <div className="productDetailsCard__parameters_item">
                <p className="productDetailsCard__parameters_item--name">
                  Screen
                </p>
                <p className="productDetailsCard__parameters_item--value">
                  {currentProductsDetails?.screen}
                </p>
              </div>

              <div className="productDetailsCard__parameters_item">
                <p className="productDetailsCard__parameters_item--name">
                  Resolution
                </p>
                <p className="productDetailsCard__parameters_item--value">
                  {currentProductsDetails?.resolution}
                </p>
              </div>

              <div className="productDetailsCard__parameters_item">
                <p className="productDetailsCard__parameters_item--name">
                  Processor
                </p>
                <p className="productDetailsCard__parameters_item--value">
                  {currentProductsDetails?.processor}
                </p>
              </div>

              <div className="productDetailsCard__parameters_item">
                <p className="productDetailsCard__parameters_item--name">RAM</p>
                <p className="productDetailsCard__parameters_item--value">
                  {currentProductsDetails?.ram}
                </p>
              </div>
            </div>
          </div>

          <div className="productDetailsCard__about">
            <h2 className="productDetailsCard__about_title">About</h2>
            {currentProductsDetails?.description.map(item => (
              <article
                className="productDetailsCard__about_item"
                key={item.title}
              >
                <h3 className="productDetailsCard__about_item_title">
                  {item.title}
                </h3>
                <p className="productDetailsCard__about_item_description">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <div className="productDetailsCard__specs">
            <h2 className="productDetailsCard__specs_title">Tech specs</h2>

            <div className="productDetailsCard__specs_parameters">
              <div className="productDetailsCard__specs_item">
                <p className="productDetailsCard__specs_item--title">Screen</p>
                <p className="productDetailsCard__specs_item--value">
                  {currentProductsDetails?.screen}
                </p>
              </div>

              <div className="productDetailsCard__specs_item">
                <p className="productDetailsCard__specs_item--title">
                  Resolution
                </p>
                <p className="productDetailsCard__specs_item--value">
                  {currentProductsDetails?.resolution}
                </p>
              </div>

              <div className="productDetailsCard__specs_item">
                <p className="productDetailsCard__specs_item--title">
                  Processor
                </p>
                <p className="productDetailsCard__specs_item--value">
                  {currentProductsDetails?.processor}
                </p>
              </div>

              <div className="productDetailsCard__specs_item">
                <p className="productDetailsCard__specs_item--title">RAM</p>
                <p className="productDetailsCard__specs_item--value">
                  {currentProductsDetails?.ram}
                </p>
              </div>

              <div className="productDetailsCard__specs_item">
                <p className="productDetailsCard__specs_item--title">
                  Built in memory
                </p>
                <p className="productDetailsCard__specs_item--value">
                  {currentProductsDetails?.capacity}
                </p>
              </div>

              {currentProductsDetails?.camera && (
                <div className="productDetailsCard__specs_item">
                  <p className="productDetailsCard__specs_item--title">
                    Camera
                  </p>
                  <p className="productDetailsCard__specs_item--value">
                    {currentProductsDetails?.camera || ''}
                  </p>
                </div>
              )}

              {currentProductsDetails?.zoom && (
                <div className="productDetailsCard__specs_item">
                  <p className="productDetailsCard__specs_item--title">Zoom</p>
                  <p className="productDetailsCard__specs_item--value">
                    {currentProductsDetails?.zoom || ''}
                  </p>
                </div>
              )}

              <div className="productDetailsCard__specs_item">
                <p className="productDetailsCard__specs_item--title">Cell</p>
                <p className="productDetailsCard__specs_item--value">
                  {currentProductsDetails?.cell.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ProductDetailsCard.displayName = 'ProductDetailsCard';
