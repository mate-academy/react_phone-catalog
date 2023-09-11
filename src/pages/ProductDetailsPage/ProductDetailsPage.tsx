import {
  FC, useEffect, useMemo, useState,
} from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button } from '../../components/Button/Button';
import { addToCart, removeFromCard } from '../../features/cartSlice';
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from '../../features/favoritesSlice';
import { Product } from '../../types/Product';
import { getProductDetails } from '../../api/products';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';
import { Loader } from '../../components/Loader';
import { Notification } from '../../components/Notification/Notification';
import { NotificationMessage } from '../../types/NotificationMessage';
import { getRandomProducts } from '../../helpers/getRandomProducts';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { SectionName } from '../../types/SectionName';

import './ProductDetailsPage.scss';

export const ProductDetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(store => store.products);
  const { favorites } = useAppSelector(state => state.favorites);
  const { cartItems } = useAppSelector(state => state.cart);
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const { productId } = useParams() as { productId: string };
  const { pathname } = useLocation();

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setHasError(false);

      try {
        const getProductFromServer = await getProductDetails(productId);

        setProduct(getProductFromServer);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (products.length && product) {
      setSuggestedProducts(getRandomProducts(products, product, 8));
    }
  }, [products, product]);

  useEffect(() => {
    if (product) {
      setCurrentImage(product.images[0]);
    }
  }, [product]);

  const findProduct = useMemo(() => {
    return products.find(item => item.itemId === productId);
  }, [products, productId]);

  const isFavorite = useMemo(() => {
    return favorites.some(item => item.itemId === productId);
  }, [favorites, productId]);
  const isInCart = useMemo(() => {
    return cartItems.some(item => item.itemId === productId);
  }, [cartItems, productId]);

  const handleAddToFavoritesClick = () => {
    if (findProduct) {
      if (!isFavorite) {
        dispatch(addFavoriteProduct(findProduct));
      } else {
        dispatch(removeFavoriteProduct(findProduct));
      }
    }
  };

  const handleAddToCartClick = () => {
    if (findProduct) {
      if (!isInCart) {
        dispatch(addToCart({ ...findProduct, quantity: 1 }));
      } else {
        dispatch(removeFromCard(findProduct));
      }
    }
  };

  return (
    <div className="product-page">
      <section className="product">
        {isLoading && !hasError && <Loader />}

        {!isLoading && (hasError || !product) && (
          <Notification message={NotificationMessage.ProductNotFound} />
        )}

        {!isLoading && !hasError && product && (
          <>
            <div className="product__nav">
              <Breadcrumbs />
            </div>
            <div className="product__back-button">
              <BackButton />
            </div>
            <h1 className="product__title">
              {product.name}
            </h1>

            <div className="product__main-wrapper">
              <div className="product__images-container">
                <ul className="product__images-list">
                  {product.images.map(img => (
                    <button
                      key={img}
                      type="button"
                      className={classNames('product__image-wrapper', {
                        'product__image-wrapper--active': img === currentImage,
                      })}
                      onClick={() => setCurrentImage(img)}
                    >
                      <img
                        src={`new/${img}`}
                        alt="Product img"
                        className="product__img product__img--small"
                      />
                    </button>
                  ))}
                </ul>
                <div className="product__main-img">
                  <img
                    src={`new/${currentImage}`}
                    alt="Main product img"
                    className="product__img"
                  />
                </div>
              </div>

              <div className="product__main-info-container">
                <div className="product__options">
                  <div className="product__colors">
                    <p className="product__main-info-title">Available colors</p>
                    <ul className="product__colors-list">
                      {product.colorsAvailable.map(color => (
                        <Link
                          key={color}
                          to={pathname.replace(product.color, color)}
                          className={classNames('product__color-link', {
                            'product__color-link--active':
                               color === product.color,
                          })}
                        >
                          <span
                            className={`product__color-circle product__color-circle--${color}`}
                          />
                        </Link>
                      ))}
                    </ul>
                  </div>

                  <div className="product__capacity">
                    <p className="product__main-info-title">Select capacity</p>
                    <ul className="product__capacity-list">
                      {product.capacityAvailable.map(capacity => (
                        <Link
                          key={capacity}
                          to={pathname
                            .replace(
                              product.capacity.toLowerCase(),
                              capacity.toLowerCase(),
                            )}
                          className={classNames('product__capacity-link', {
                            'product__capacity-link--active':
                              capacity.toLowerCase()
                                === product.capacity.toLowerCase(),
                          })}
                        >
                          {capacity}
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="product__price-and-buttons-wrapper">
                  <div className="product__price">
                    <h1 className="product__price-regular">{`$${product.priceDiscount}`}</h1>
                    <p className="product__price-discount">{`$${product.priceRegular}`}</p>
                  </div>

                  <div className="product__buttons">
                    <Button
                      content={isInCart ? 'Added to cart' : 'Add to cart'}
                      className={classNames(
                        'add-to-cart button--add-to-cart--large',
                        {
                          'button--add-to-cart--active': isInCart,
                        },
                      )}
                      onClick={handleAddToCartClick}
                    />
                    <Button
                      dataCy="addToFavorite"
                      className={classNames(
                        'favorites button--favorites--large',
                        {
                          'button--favorites--active': isFavorite,
                        },
                      )}
                      iconType={isFavorite ? 'favorites-filled' : 'favorites'}
                      onClick={handleAddToFavoritesClick}
                    />
                  </div>
                </div>

                <div className="product__specs-container">
                  <div className="product__specs">
                    <p className="product__specs-title">Screen</p>
                    <p className="product__specs-value">{product.screen}</p>
                  </div>
                  <div className="product__specs">
                    <p className="product__specs-title">Resoluton</p>
                    <p className="product__specs-value">{product.resolution}</p>
                  </div>
                  <div className="product__specs">
                    <p className="product__specs-title">Processor</p>
                    <p className="product__specs-value">{product.processor}</p>
                  </div>
                  <div className="product__specs">
                    <p className="product__specs-title">RAM</p>
                    <p className="product__specs-value">{product.ram}</p>
                  </div>
                </div>
              </div>

              <p className="product__id">{`ID: ${findProduct?.id}`}</p>
            </div>

            <div className="product__info">
              <div data-cy="productDescription" className="product__about">
                <h2 className="product__subtitle">
                  About
                </h2>
                {product.description.map(({ title, text }) => (
                  <article
                    key={title}
                    className="product__article"
                  >
                    <h3 className="product__article-title">{title}</h3>
                    {text.map(info => (
                      <p key={info} className="product__article-text">{info}</p>
                    ))}
                  </article>
                ))}
              </div>

              <div className="product__tech-specs">
                <h2 className="product__subtitle">
                  Tech specs
                </h2>
                <div className="product__tech-specs-container">
                  <div className="product__specs">
                    <p className="product__tech-specs-title">Screen</p>
                    <p className="product__tech-specs-value">
                      {product.screen}
                    </p>
                  </div>
                  <div className="product__specs">
                    <p className="product__tech-specs-title">Resoluton</p>
                    <p className="product__tech-specs-value">
                      {product.resolution}
                    </p>
                  </div>
                  <div className="product__specs">
                    <p className="product__tech-specs-title">Processor</p>
                    <p className="product__tech-specs-value">
                      {product.processor}
                    </p>
                  </div>
                  <div className="product__specs">
                    <p className="product__tech-specs-title">RAM</p>
                    <p className="product__tech-specs-value">
                      {product.ram}
                    </p>
                  </div>
                  <div className="product__specs">
                    <p className="product__tech-specs-title">Build in memory</p>
                    <p className="product__tech-specs-value">
                      {product.capacity}
                    </p>
                  </div>
                  <div className="product__specs">
                    <p className="product__tech-specs-title">Camera</p>
                    <p className="product__tech-specs-value">
                      {product.camera}
                    </p>
                  </div>
                  <div className="product__specs">
                    <p className="product__tech-specs-title">Zoom</p>
                    <p className="product__tech-specs-value">
                      {product.zoom}
                    </p>
                  </div>
                  <div className="product__specs">
                    <p className="product__tech-specs-title">Cell</p>
                    <p className="product__tech-specs-value">
                      {product.cell.map(cellTechnology => `${cellTechnology} `)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {!isLoading && !hasError && !!suggestedProducts.length && (
              <ProductsSlider
                title={SectionName.RandomProducts}
                itemsLength={suggestedProducts.length}
              >
                <ProductsList
                  sectionTitle={SectionName.RandomProducts}
                  products={suggestedProducts}
                />
              </ProductsSlider>
            )}
          </>
        )}
      </section>
    </div>
  );
};
