import fav from '../../images/icons/favourites.svg';
import favDark from '../../images/icons/fav_dark.svg';
import favLike from '../../images/icons/favourites_like.png';
import React, { useState, useEffect } from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import { Filter } from '../Filter';
import { FilterCapacity } from '../FilterCapacity';
import { Product } from '../../types/Product';
import { useAppDispath, useAppSelector } from '../../hooks/hooks';
import { addProduct, removeProduct } from '../../features/favourites';
import { addToCart, removeFromCart } from '../../features/cart';
import classNames from 'classnames';
import { NotFoundProductPage } from '../../pages/NotFoundProductPage';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './ProductDetailsCard.scss';

type Props = {
  products: Product[];
  currProd: ProductDetails | undefined;
};

export const ProductDetailsCard: React.FC<Props> = React.memo(
  ({ products, currProd }) => {
    const dispatch = useAppDispath();
    const { favourites } = useAppSelector(state => state.favourites);
    const { productsOfCart } = useAppSelector(state => state.cart);

    const { theme } = useAppSelector(state => state.theme);

    const { t } = useTranslation();

    const { productId = '' } = useParams();

    const id = productId.slice(1);

    const images = currProd?.images;

    const [selectedImage, setSelectedImage] = useState<string | undefined>('');

    const handleCartsDetails = (prodId: string) => {
      const index = products.findIndex(item => item.itemId === prodId);

      if (productsOfCart.some(item => item.itemId === prodId)) {
        dispatch(removeFromCart(+products[index].id));
      } else {
        dispatch(addToCart(products[index]));
      }
    };

    const isProductFav = favourites.some(item => item.itemId === id);
    const isProductInCart = productsOfCart.some(prod => prod.itemId === id);

    const handleFavouritesDetails = (prodId: string) => {
      const index = products.findIndex(item => item.itemId === prodId);

      if (favourites.some(item => item.itemId === prodId)) {
        dispatch(removeProduct(products[index]));
      } else {
        dispatch(addProduct(products[index]));
      }
    };

    useEffect(() => {
      const currImage = currProd?.images[0];

      setSelectedImage(currImage);
    }, [currProd]);

    if (!currProd?.id) {
      return <NotFoundProductPage title="Product was not found" />;
    }

    return (
      <div className="productDetailsCard">
        <div className="container">
          <div className="productDetailsCard__contant">
            <h2 className="productDetailsCard__title">{currProd?.name}</h2>

            <div className="productDetailsCard__blockPhoto">
              <ul className="productDetailsCard__photo-list">
                {images?.map((image, i) => (
                  <li
                    key={i}
                    className={classNames('productDetailsCard__photo-item', {
                      'productDetailsCard__photo-item-active':
                        image === selectedImage,
                    })}
                  >
                    <div
                      // href="#"
                      className="productDetailsCard__photo-link"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        // src={`/${image}`}
                        src={image}
                        alt={currProd?.namespaceId}
                        className="productDetailsCard__photo-item--img"
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="productDetailsCard__photo">
                <img
                  // src={`/${selectedImage}`}
                  src={selectedImage}
                  alt={currProd?.namespaceId}
                  className="productDetailsCard__photo-img"
                />
              </div>
            </div>

            <div className="productDetailsCard__options">
              <div className="productDetailsCard__colorFilter">
                <Filter product={currProd} products={products} />
                <span className="productDetailsCard__line-filter"></span>

                <FilterCapacity product={currProd} />
                <span className="productDetailsCard__line-filter"></span>
              </div>

              <div className="productDetailsCard__capacityFilter"></div>

              <div className="productDetailsCard__priceBlock">
                <div className="productDetailsCard__price">
                  <p className="productDetailsCard__price--discountPrice">
                    {currProd?.priceDiscount}
                  </p>
                  <p className="productDetailsCard__price--regularPrice">
                    {currProd?.priceRegular}
                  </p>
                </div>

                <div className="productDetailsCard__buttons">
                  <button
                    className={classNames('productDetailsCard__buttons_cart', {
                      'productDetailsCard__buttons_cart-isActive':
                        isProductInCart,
                    })}
                    onClick={() => handleCartsDetails(id)}
                  >
                    {isProductInCart
                      ? t('productDetailsCard.button.added')
                      : t('productDetailsCard.button.add')}
                  </button>

                  <button
                    className={classNames(
                      'productDetailsCard__buttons_favourites',
                      {
                        'productDetailsCard__buttons_favourites-active':
                          isProductFav,
                      },
                    )}
                    onClick={() => handleFavouritesDetails(id)}
                  >
                    <img
                      src={
                        isProductFav
                          ? favLike
                          : theme === 'light-theme'
                            ? fav
                            : favDark
                      }
                      alt="Favourites"
                      className="productDetailsCard__buttons_favourites-img"
                    />
                  </button>
                </div>
              </div>

              <div className="productDetailsCard__info">
                <div className="productDetailsCard__info_block">
                  <div className="productDetailsCard__info_block--name">
                    {t('productDetailsCard.info.screen')}
                  </div>
                  <div className="productDetailsCard__info_block--value">
                    {currProd?.screen}
                  </div>
                </div>

                <div className="productDetailsCard__info_block">
                  <div className="productDetailsCard__info_block--name">
                    {t('productDetailsCard.info.resolution')}
                  </div>
                  <div className="productDetailsCard__info_block--value">
                    {currProd?.resolution}
                  </div>
                </div>

                <div className="productDetailsCard__info_block">
                  <div className="productDetailsCard__info_block--name">
                    {t('productDetailsCard.info.processor')}
                  </div>
                  <div className="productDetailsCard__info_block--value">
                    {currProd?.processor}
                  </div>
                </div>

                <div className="productDetailsCard__info_block">
                  <div className="productDetailsCard__info_block--name">
                    {t('productDetailsCard.info.ram')}
                  </div>
                  <div className="productDetailsCard__info_block--value">
                    {currProd?.ram}
                  </div>
                </div>
              </div>
            </div>
            <div className="productDetailsCard__about">
              <h2 className="productDetailsCard__about-top">
                {t('productDetailsCard.about')}
              </h2>
              <span className="productDetailsCard__line"></span>
              {currProd?.description.map(item => (
                <article
                  className="productDetailsCard__about-block"
                  key={item.title}
                >
                  <h3 className="productDetailsCard__about-block--title">
                    {item.title}
                  </h3>
                  <p className="productDetailsCard__about-block--text">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
            <div className="productDetailsCard__techSpecs">
              <h2 className="productDetailsCard__techSpecs-top">
                {t('productDetailsCard.info.title')}
              </h2>

              <span className="productDetailsCard__line"></span>

              <div className="productDetailsCard__techSpecs-info">
                <div className="productDetailsCard__techSpecs-block">
                  <div className="productDetailsCard__techSpecs-block--title">
                    {t('productDetailsCard.info.screen')}
                  </div>
                  <div className="productDetailsCard__techSpecs-block--text">
                    {currProd?.screen}
                  </div>
                </div>

                <div className="productDetailsCard__techSpecs-block">
                  <div className="productDetailsCard__techSpecs-block--title">
                    {t('productDetailsCard.info.resolution')}
                  </div>
                  <div className="productDetailsCard__techSpecs-block--text">
                    {currProd?.resolution}
                  </div>
                </div>

                <div className="productDetailsCard__techSpecs-block">
                  <div className="productDetailsCard__techSpecs-block--title">
                    {t('productDetailsCard.info.processor')}
                  </div>
                  <div className="productDetailsCard__techSpecs-block--text">
                    {currProd?.processor}
                  </div>
                </div>

                <div className="productDetailsCard__techSpecs-block">
                  <div className="productDetailsCard__techSpecs-block--title">
                    {t('productDetailsCard.info.ram')}
                  </div>
                  <div className="productDetailsCard__techSpecs-block--text">
                    {currProd?.ram}
                  </div>
                </div>

                <div className="productDetailsCard__techSpecs-block">
                  <div className="productDetailsCard__techSpecs-block--title">
                    {t('productDetailsCard.info.memory')}
                  </div>
                  <div className="productDetailsCard__techSpecs-block--text">
                    {currProd?.capacity}
                  </div>
                </div>

                {currProd?.camera && (
                  <div className="productDetailsCard__techSpecs-block">
                    <div className="productDetailsCard__techSpecs-block--title">
                      {t('productDetailsCard.info.camera')}
                    </div>
                    <div className="productDetailsCard__techSpecs-block--text">
                      {currProd?.camera || ''}
                    </div>
                  </div>
                )}

                {currProd?.zoom && (
                  <div className="productDetailsCard__techSpecs-block">
                    <div className="productDetailsCard__techSpecs-block--title">
                      {t('productDetailsCard.info.zoom')}
                    </div>
                    <div className="productDetailsCard__techSpecs-block--text">
                      {currProd?.zoom || ''}
                    </div>
                  </div>
                )}

                <div className="productDetailsCard__techSpecs-block">
                  <div className="productDetailsCard__techSpecs-block--title">
                    {t('productDetailsCard.info.cell')}
                  </div>
                  <div className="productDetailsCard__techSpecs-block--text">
                    {currProd?.cell.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ProductDetailsCard.displayName = 'ProductDetailsCard';
