/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/indent */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './ProductDetailsPage.scss';
import { getProductById } from '../../services/api/api';
import { FullProduct } from '../../types/FullProduct';
import { ProductsSlider } from '../../components/productsSlider/ProductsSlider';
import { Product } from '../../types/Product';
import { ProductsContext } from '../../context/ProductsContext';
import { BreadCrumbs } from '../../components/breadcrumbs';
import { COLORS } from '../../components/styles/_constants';
import { getNewId } from '../../services/utils/getNewId';
import { scrollToTop } from '../../services/utils/scrollToTop';
import { DetailsSkeleton } from '../../components/skeleton/DetailsSkeleton';

export type CartProducts = {
  id: number;
  quantity: number;
  product: Product;
};

export const ProductDetailsPage: React.FC = () => {
  const [detailProduct, setDetailProduct] = useState<FullProduct>();
  const [bigImage, setBigImage] = useState('');
  const [error, setError] = useState('');
  const { state } = useLocation();
  const location = useLocation();

  const context = useContext(ProductsContext);
  const { allProducts, cart, addCart, deleteFromCart } = context;
  const { addFavorites, deleteFromFavorites, favorites } = context;
  const { setIsLoading, isLoading } = context;

  const arrayPath = location.pathname.split('/');
  const backPath = state?.location?.pathname || `/${arrayPath[1]}`;
  const capitalize = (str: string) =>
    str?.charAt(0).toUpperCase() + str?.slice(1);
  const category = capitalize(arrayPath[1]);
  const categoryProduct = capitalize(arrayPath[2]);

  const getRandomProducts = useMemo(() => {
    return [...allProducts].slice().sort(() => Math.random() - 0.5);
  }, [allProducts]);

  useEffect(() => {
    scrollToTop();
  }, [location]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError('');

        const productsFromServer = await getProductById(category.toLowerCase());
        const productFromServer = productsFromServer.find(
          (prod: FullProduct) => prod.id === categoryProduct.toLowerCase(),
        );

        if (!productFromServer) {
          throw new Error('Product was not found');
        }

        setDetailProduct(productFromServer);
        setBigImage(productFromServer.images[0]);
      } catch {
        throw new Error();
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [category, categoryProduct, setIsLoading]);

  const searchProduct = useMemo(
    () => allProducts.find(product => product.itemId === detailProduct?.id),
    [allProducts, detailProduct],
  );

  const handlerAddToCart = () => {
    if (!searchProduct) {
      return;
    }

    const cartProduct = cart.find(item => item.product.id === searchProduct.id);

    if (cartProduct) {
      deleteFromCart(cartProduct.id);
    } else {
      const newProduct = {
        id: getNewId(cart),
        product: searchProduct,
        quantity: 1,
      };

      addCart(newProduct);
    }
  };

  const handlerAddToFavorites = () => {
    if (!searchProduct) {
      return;
    }

    if (favorites.some(item => item.itemId === searchProduct.id)) {
      deleteFromFavorites(searchProduct);
    } else {
      addFavorites(searchProduct);
    }
  };

  return (
    <>
      {error && (
        <div className="page-not-found">
          <h3 className="page-not-found__title">{error}</h3>
          <img
            className="page-not-found__image"
            src="img/product-not-found.png"
            alt="Product not found"
          />
        </div>
      )}
      {!error && detailProduct && (
        <div className="page__container">
          <BreadCrumbs category={category} categoryProduct={categoryProduct} />
          <div className="breadcrumbs breadcrumbs--back breadcrumbs--details">
            <div className="breadcrumbs__divider breadcrumbs__divider--back" />
            <div className="breadcrumbs__crumb">
              <Link
                to={{
                  pathname: backPath,
                  search: state?.location?.search,
                }}
                state={state?.location?.state}
                className="breadcrumbs__link"
              >
                Back
              </Link>
            </div>
          </div>
          {isLoading ? (
            <DetailsSkeleton />
          ) : (
            <>
              <div className="page__category details">
                <h2 className="details__title">{detailProduct?.name}</h2>
                <div className="details__main-image">
                  <img
                    className="details__image"
                    src={bigImage}
                    alt="product"
                  />
                </div>
                <div className="details__images">
                  {detailProduct?.images.map(image => (
                    <button
                      type="button"
                      className={classNames('details__image-wrapper', {
                        'details__image-wrapper--active': image === bigImage,
                      })}
                      key={image}
                      onClick={() => setBigImage(image)}
                    >
                      <img
                        className="details__image"
                        src={image}
                        alt="product"
                      />
                    </button>
                  ))}
                </div>

                <div
                  className="
                        details__description
                        details__description--right
                        "
                >
                  <div className="details__description-mini-block">
                    <div className="details__description-top">
                      <p className="details__description-title">
                        Available colors
                      </p>
                      {searchProduct ? (
                        <p className="details__id">{`ID: ${searchProduct?.id}`}</p>
                      ) : (
                        <p className="details__id">Loading ...</p>
                      )}
                    </div>
                    <div className="details__description-wrapper">
                      {detailProduct?.colorsAvailable.map(color => {
                        const colorStyle = COLORS[color];

                        if (!colorStyle) {
                          return null;
                        }

                        return (
                          <Link
                            state={{
                              location,
                            }}
                            to={`/${category.toLowerCase()}/${detailProduct?.namespaceId}-${detailProduct?.capacity}-${color.replace(' ', '-')}`}
                            className={classNames('details__color-border', {
                              'details__color-border--active':
                                color === detailProduct.color,
                            })}
                            key={color}
                          >
                            <div
                              className="details__color"
                              style={{ backgroundColor: colorStyle }}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    className="
                          details__description-mini-block
                          details__description-mini-block--last
                        "
                  >
                    <div className="details__description-top">
                      <p className="details__description-title">
                        Select capacity
                      </p>
                    </div>
                    <div className="details__description-wrapper">
                      {detailProduct?.capacityAvailable.map(capacity => (
                        <Link
                          state={{
                            location,
                          }}
                          to={`/${category.toLowerCase()}/${detailProduct.namespaceId}-${capacity}-${detailProduct.color.replace(' ', '-')}`}
                          key={capacity}
                          className={classNames('details__capacity', {
                            'details__capacity--active':
                              capacity === detailProduct.capacity,
                          })}
                        >
                          {capacity}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="details__description-block">
                    <div className="details__price-wrapper">
                      <p className="details__price">
                        {`$${detailProduct?.priceDiscount}`}
                      </p>
                      <p className="details__price details__price--full">
                        {`$${detailProduct?.priceRegular}`}
                      </p>
                    </div>
                    <div className="details__actions">
                      {/* eslint-disable-next-line max-len, prettier/prettier */}
                      {cart.some(
                        product => product.product.itemId === detailProduct?.id,
                      ) ? (
                        <button
                          type="button"
                          onClick={handlerAddToCart}
                          className="details__button details__button--added"
                        >
                          <span />
                          <span />
                          <span />
                          <span />
                          Added to cart
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="details__button details__button--add"
                          onClick={handlerAddToCart}
                        >
                          <span />
                          <span />
                          <span />
                          <span />
                          Add to cart
                        </button>
                      )}
                      {/* eslint-disable-next-line max-len, prettier/prettier */}
                      {favorites.some(
                        item => item.itemId === detailProduct?.id,
                      ) ? (
                        <button
                          type="button"
                          onClick={handlerAddToFavorites}
                          className="
                                details__button details__button--favorite-red
                              "
                        >
                          <span />
                          <span />
                          <span />
                          <span />
                          {}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handlerAddToFavorites}
                          className="
                            details__button details__button--favorite-white
                          "
                        >
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                          {}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="details__description-bottom">
                    <div className="details__description-group">
                      <div className="details__description-name">Screen</div>
                      <div className="details__description-value">
                        {detailProduct?.screen}
                      </div>
                    </div>
                    <div className="details__description-group">
                      <div className="details__description-name">
                        Resolution
                      </div>
                      <div className="details__description-value">
                        {detailProduct?.resolution}
                      </div>
                    </div>
                    <div className="details__description-group">
                      <div className="details__description-name">Processor</div>
                      <div className="details__description-value">
                        {detailProduct?.processor}
                      </div>
                    </div>
                    <div className="details__description-group">
                      <div className="details__description-name">RAM</div>
                      <div className="details__description-value">
                        {detailProduct?.ram}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="details__description details__description--bottom">
                  <h3 className="details__small-title">About</h3>
                  <article className="details__article">
                    <h4 className="details__article-title">
                      {detailProduct?.description[0].title}
                    </h4>
                    <p className="details__article-text">
                      {detailProduct?.description[0].text}
                    </p>
                  </article>

                  <article className="details__article">
                    <h4 className="details__article-title">
                      {detailProduct?.description[1].title}
                    </h4>
                    <p className="details__article-text">
                      {detailProduct?.description[1].text}
                    </p>
                  </article>

                  <article className="details__article">
                    <h4 className="details__article-title">
                      {detailProduct?.description[2].title}
                    </h4>
                    <p className="details__article-text">
                      {detailProduct?.description[2].text}
                    </p>
                  </article>
                </div>

                <div className="details__description details__description--last">
                  <h3 className="details__small-title">Tech specs</h3>
                  <div className="details__description-bottom">
                    <div className="details__tech-group">
                      <div className="details__tech-name">Screen</div>
                      <div className="details__tech-value">
                        {detailProduct?.screen}
                      </div>
                    </div>
                    <div className="details__tech-group">
                      <div className="details__tech-name">Resolution</div>
                      <div className="details__tech-value">
                        {detailProduct?.resolution}
                      </div>
                    </div>
                    <div className="details__tech-group">
                      <div className="details__tech-name">Processor</div>
                      <div className="details__tech-value">
                        {detailProduct?.processor}
                      </div>
                    </div>
                    <div className="details__tech-group">
                      <div className="details__tech-name">RAM</div>
                      <div className="details__tech-value">
                        {detailProduct?.ram}
                      </div>
                    </div>
                    <div className="details__tech-group">
                      <div className="details__tech-name">Built in memory</div>
                      <div className="details__tech-value">
                        {detailProduct?.capacity}
                      </div>
                    </div>
                    <div className="details__tech-group">
                      <div className="details__tech-name">Camera</div>
                      <div className="details__tech-value">
                        {detailProduct?.camera}
                      </div>
                    </div>
                    <div className="details__tech-group">
                      <div className="details__tech-name">Zoom</div>
                      <div className="details__tech-value">
                        {detailProduct?.zoom}
                      </div>
                    </div>
                    <div className="details__tech-group">
                      <div className="details__tech-name">Cell</div>
                      <div className="details__tech-value">
                        {detailProduct?.cell.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ProductsSlider
                title="You may also like"
                products={getRandomProducts}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};
