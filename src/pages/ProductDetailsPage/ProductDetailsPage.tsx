/* eslint-disable max-len */
import './ProductDetailsPage.scss';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails, getProducts } from '../../api';
import { Loader } from '../../components/Loader/Loader';
import { PathBar } from '../../components/PathBar/PathBar';
import { Back } from '../../components/Back/Back';
import { IMAGE_BASE_URL, PRODUCTS_COLORS, SPECS } from '../../helpers/constants';
import { FavouriteContext } from '../../contexts/FavoriteContext';
import { CartContext } from '../../contexts/CartContext';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { Banner } from '../../components/Banner/Banner';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { favourites, handleAddToFav } = useContext(FavouriteContext);
  const { cart, handleAddToCart } = useContext(CartContext);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const productInList = product
    ? products.filter(p => p.itemId === product.id)[0]
    : null;
  const isFavourite = favourites.find(f => f.itemId === product?.id);
  const isInCart = cart.find(c => c.itemId === product?.id);
  const youMayAlsoLike = products.filter(p => p.capacity === product?.capacity
    && p.itemId !== product?.id);

  useEffect(() => {
    if (productId) {
      setIsLoader(true);
      Promise.all([getProducts(), getProductDetails(productId)])
        .then(data => {
          setProducts(data[0]);
          setProduct(data[1]);
          setCurrentImage(data[1].images[0]);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoader(false);
        });
    }

    return () => {
      setProduct(null);
      setProducts([]);
      setCurrentImage('');
    };
  }, [productId]);

  const handleFavClick = () => {
    if (productInList) {
      handleAddToFav(productInList);
    }
  };

  const handleAddClick = () => {
    if (productInList) {
      handleAddToCart(productInList);
    }
  };

  if (!product) {
    return (
      <>
        {isLoader && <Loader />}
        {!isLoader && !isError && <NotFoundPage />}
        {!isLoader && isError
          && <Banner message="Error occured. Try again later" />}
      </>
    );
  }

  return (
    <div className="product-details-page">
      <div className="product-details-page__content">
        <div className="product-details-page__navigation">
          <PathBar />

          <Back />
        </div>

        <h1
          className="product-details-page__title"
        >
          {product?.name}
        </h1>

        <div className="product-details-page__main">
          <div className="product-details-page__images">
            {product?.images.map(image => (
              <button
                key={image}
                type="button"
                className={classNames('product-details-page__image-button',
                  {
                    'product-details-page__image-button--active': image === currentImage,
                  })}
                onClick={() => {
                  setCurrentImage(image);
                }}
              >
                <img
                  className="product-details-page__image--small"
                  src={`${IMAGE_BASE_URL}${image}`}
                  alt={product?.name}
                />
              </button>
            ))}
          </div>

          <div className="product-details-page__photo">
            <img
              className="product-details-page__image--big"
              src={`${IMAGE_BASE_URL}${currentImage}`}
              alt={product?.name}
            />
          </div>

          <div className="product-details-page__parameters">
            <div className="product-details-page__parameter">
              <p
                className="product-details-page__parameter-title"
              >
                Available colors
              </p>

              <ul className="product-details-page__parameter-list">
                {product?.colorsAvailable.map(color => (
                  <li
                    key={color}
                    className={classNames(
                      'product-details-page__parameter-color', {
                        'product-details-page__parameter-color--active': product?.color === color,
                      },
                    )}
                  >
                    <Link
                      className="product-details-page__parameter-color-link"
                      style={{
                        backgroundColor: PRODUCTS_COLORS[color],
                      }}
                      to={`/phones/${product?.namespaceId}-${product?.capacity.toLowerCase()}-${color}`}
                    />
                  </li>
                ))}
              </ul>

              <div className="product-details-page__line" />
            </div>

            <div className="product-details-page__parameter">
              <p
                className="product-details-page__parameter-title"
              >
                Select capacity
              </p>

              <ul className="product-details-page__parameter-list">
                {product?.capacityAvailable.map(capacity => (
                  <li
                    key={capacity}
                    className={classNames(
                      'product-details-page__parameter-capacity', {
                        'product-details-page__parameter-capacity--active': product?.capacity === capacity,
                      },
                    )}
                  >
                    <Link
                      className="product-details-page__parameter-capacity-link"
                      to={`/phones/${product?.namespaceId}-${capacity.toLowerCase()}-${product?.color}`}
                    >
                      {capacity}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="product-details-page__line" />
            </div>

            <div className="product-details-page__prices">
              <h1
                className="product-details-page__price-discount"
              >
                {`$${product.priceDiscount}`}
              </h1>

              <p
                className="product-details-page__price-regular"
              >
                {`$${product.priceRegular}`}
              </p>
            </div>

            <div className="product-details-page__buttons">
              <button
                type="button"
                className={classNames('product-details-page__add', {
                  'product-details-page__add--added': isInCart,
                })}
                onClick={handleAddClick}
              >
                {isInCart
                  ? 'Added to cart'
                  : 'Add to cart'}
              </button>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="product-details-page__like"
                onClick={handleFavClick}
              >
                {isFavourite
                  ? <i className="icon icon--favourites-added" />
                  : <i className="icon icon--favourites" />}
              </button>
            </div>

            <div className="product-details-page__characteristics">
              <div className="product-details-page__row">
                <p className="product-details-page__characteristic-name">Screen</p>
                <p className="product-details-page__characteristic-value">{product.screen}</p>
              </div>
              <div className="product-details-page__row">
                <p className="product-details-page__characteristic-name">Resolution</p>
                <p className="product-details-page__characteristic-value">{product.resolution}</p>
              </div>
              <div className="product-details-page__row">
                <p className="product-details-page__characteristic-name">Processor</p>
                <p className="product-details-page__characteristic-value">{product.processor}</p>
              </div>
              <div className="product-details-page__row">
                <p className="product-details-page__characteristic-name">RAM</p>
                <p className="product-details-page__characteristic-value">{product.ram}</p>
              </div>
            </div>
          </div>

          <div className="product-details-page__id">
            <p
              className="product-details-page__id-value"
            >
              {`ID: ${productInList?.id}`}
            </p>
          </div>
        </div>

        <div className="product-details-page__bottom">
          <div className="product-details-page__about">
            <div className="product-details-page__bottom-top">
              <h2 className="product-details-page__bottom-title">About</h2>

              <div className="product-details-page__line" />
            </div>

            <ul className="product-details-page__description">
              {product.description.map(({ title, text }) => {
                return (
                  <li
                    key={title}
                    className="product-details-page__description-item"
                  >
                    <h3
                      className="product-details-page__description-title"
                    >
                      {title}
                    </h3>

                    <div className="product-details-page__description-text">
                      {text.map(t => (
                        <p
                          key={t}
                          className="product-details-page__description-text-piece"
                        >
                          {t}
                        </p>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="product-details-page__specs">
            <div className="product-details-page__bottom-top">
              <h2 className="product-details-page__bottom-title">Tech specs</h2>

              <div className="product-details-page__line" />
            </div>

            <ul className="product-details-page__specs-list">
              {Object.entries(SPECS).map(([key, value]) => {
                let productValue = product[key];

                if (Array.isArray(product[key])) {
                  productValue = product[key].join(', ');
                }

                return (
                  <li
                    key={key}
                    className="product-details-page__row"
                  >
                    <p
                      className="product-details-page__specs-name"
                    >
                      {value}
                    </p>

                    <p
                      className="product-details-page__specs-value"
                    >
                      {productValue}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="product-details-page__you-may-like">
          <ProductsSlider
            title="You may also like"
            products={youMayAlsoLike}
            isLoader={isLoader}
          />
        </div>
      </div>
    </div>
  );
};
