import { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getSuggestedProducts } from '../../api';
import { ProductDetails } from '../../types/productDetails';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import classNames from 'classnames';
import { allProducts } from '../../utils/allProducts';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { Product } from '../../types/product';
import { Loader } from '../shared/components/Loader';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { useCart } from '../../context/CartContext';
import products from '../../../public/api/products.json';
import { useFav } from '../../context/FavouritesContext';
import { productColors } from './constants/ProductColors';

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState<ProductDetails | undefined>();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [selectedImg, setSelectedImg] = useState<string>();

  const { productId } = useParams();

  const navigate = useNavigate();

  const { addToCart, items } = useCart();
  const { favItems, addToFavourites, removeFromFavourites } = useFav();

  useEffect(() => {
    if (!productId) {
      return;
    }

    setError(false);
    setIsLoading(true);

    getProductById(productId)
      .then(setProduct)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  useEffect(() => {
    if (product) {
      setSelectedImg(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    if (!product?.id) {
      return;
    }

    getSuggestedProducts(product.id).then(setSuggestedProducts);
  }, [product?.id]);

  const capitalize = (category: string | undefined) => {
    if (!category) {
      return;
    }

    const firstLetter = category.slice(0, 1).toLocaleUpperCase();
    const rest = category.slice(1);

    return firstLetter + rest;
  };

  const variants = allProducts.filter(
    item => item.namespaceId === product?.namespaceId,
  );

  const cartProduct = products.find(p => p.itemId === product?.id);
  const favProduct = products.find(p => p.itemId === product?.id);

  if (!cartProduct || !favProduct) {
    return;
  }

  const isAlreadyInCart = items.find(item => item.id === product?.id);
  const isInFavourites = favItems.find(item => item.itemId === product?.id);

  const handleFavButton = () => {
    if (!product) {
      return;
    }

    if (isInFavourites) {
      removeFromFavourites(product?.id);
    } else {
      addToFavourites(favProduct);
    }
  };

  return (
    <div className={styles.details}>
      {isLoading && <Loader />}

      {error && !isLoading && <ErrorMessage />}

      {!error && !isLoading && (
        <>
          {product && (
            <Breadcrumbs
              items={[
                {
                  label: capitalize(product?.category),
                  to: `/${product?.category}`,
                },
                {
                  label: product?.name,
                },
              ]}
            />
          )}

          <button onClick={() => navigate(-1)} className={styles.details__back}>
            <span className={styles.details__back_icon}></span>
            <span className={styles.details__back_text}>Back</span>
          </button>

          {product && (
            <h2 className={styles.details__title}>{product?.name}</h2>
          )}
        </>
      )}

      {!error && !isLoading && !product && (
        <h4 className={styles.details__notfound}>Product was not found</h4>
      )}

      {!error && !isLoading && product && (
        <div className={styles.details__gridsection}>
          <div className={styles.details__gallery}>
            <img
              className={styles.details__mainimg}
              src={`/${selectedImg}`}
              alt={product?.name}
            />

            <div className={styles.details__allimgs}>
              {product?.images.map((img, index) => (
                <button
                  key={img}
                  type="button"
                  className={classNames(styles.details__imgbtn, {
                    [styles.selected]: img === selectedImg,
                  })}
                  onClick={() => setSelectedImg(img)}
                >
                  <img
                    className={styles.details__smallimg}
                    src={`/${img}`}
                    alt={`${product.name} ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.details__info}>
            <div className={styles.details__colors}>
              <label className={styles.details__colors_label}>
                Available colors
                <div className={styles.details__colors_radio}>
                  {product?.colorsAvailable.map(color => {
                    const targetProduct = variants.find(
                      item =>
                        item.color === color &&
                        item.capacity === product.capacity,
                    );

                    const isActive = color === product.color;

                    if (!targetProduct) {
                      return (
                        <span
                          key={color}
                          className={classNames(
                            styles.details__colors_link,
                            styles.details__colors_linkDisabled,
                          )}
                          aria-disabled="true"
                        >
                          <span
                            className={styles.details__colors_circle}
                            style={{
                              backgroundColor: productColors[color] || color,
                            }}
                          />
                        </span>
                      );
                    }

                    return (
                      <Link
                        key={color}
                        to={`/product/${targetProduct.id}`}
                        className={`${styles.details__colors_link} ${
                          isActive ? styles.details__colors_linkActive : ''
                        }`}
                        aria-label={`Choose ${productColors[color] || color} color`}
                      >
                        <span
                          className={styles.details__colors_circle}
                          style={{
                            backgroundColor: productColors[color] || color,
                          }}
                        />
                      </Link>
                    );
                  })}
                </div>
              </label>
              <span className={styles.details__id}>id: 802390</span>
            </div>

            <div className={styles.details__divider}></div>

            <div className={styles.details__capacity}>
              <label className={styles.details__capacity_label}>
                Select capacity
                <div className={styles.details__capacity_radio}>
                  {product?.capacityAvailable.map(capacity => {
                    const targetProduct = variants.find(
                      item =>
                        item.color === product.color &&
                        item.capacity === capacity,
                    );

                    const isActive = capacity === product.capacity;

                    if (!targetProduct) {
                      return (
                        <span
                          key={capacity}
                          className={classNames(
                            styles.details__capacity_link,
                            styles.details__capacity_linkDisabled,
                          )}
                          aria-disabled="true"
                        >
                          {capacity}
                        </span>
                      );
                    }

                    return (
                      <Link
                        key={capacity}
                        to={`/product/${targetProduct.id}`}
                        className={`${styles.details__capacity_link} ${
                          isActive ? styles.details__capacity_linkActive : ''
                        }`}
                        aria-label={`Choose ${capacity} capacity`}
                      >
                        {capacity}
                      </Link>
                    );
                  })}
                </div>
              </label>
            </div>

            <div className={styles.details__divider}></div>

            <div className={styles.details__cost}>
              <h1
                className={styles.details__price}
              >{`$${product?.priceDiscount}`}</h1>
              {product?.priceRegular !== product?.priceDiscount && (
                <h2
                  className={styles.details__fullprice}
                >{`$${product?.priceRegular}`}</h2>
              )}
            </div>

            <div className={styles.details__cartfav}>
              <button
                className={classNames(styles.details__cart, {
                  [styles.details__cart_added]: isAlreadyInCart,
                })}
                onClick={() => addToCart(cartProduct)}
              >
                {isAlreadyInCart ? 'Added' : 'Add to cart'}
              </button>
              <button className={styles.details__fav} onClick={handleFavButton}>
                <span
                  className={classNames(styles.details__fav_icon, {
                    [styles['details__fav_icon--active']]: isInFavourites,
                  })}
                ></span>
              </button>
            </div>

            <div className={styles.details__specs}>
              <p className={styles.details__spec}>
                <span className={styles.details__label}>Screen</span>
                <span className={styles.details__value}>{product?.screen}</span>
              </p>
              <p className={styles.details__spec}>
                <span className={styles.details__label}>Resolution</span>
                <span className={styles.details__value}>
                  {product?.resolution}
                </span>
              </p>
              <p className={styles.details__spec}>
                <span className={styles.details__label}>Processor</span>
                <span className={styles.details__value}>
                  {product?.processor}
                </span>
              </p>
              <p className={styles.details__spec}>
                <span className={styles.details__label}>RAM</span>
                <span className={styles.details__value}>{product?.ram}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {!error && !isLoading && product && (
        <div className={styles.details__bottom}>
          <div className={styles.details__about}>
            <h3 className={styles.details__about_title}>About</h3>

            <div className={styles.details__divider}></div>

            {product?.description.map(descr => (
              <div key={descr.title} className={styles.details__about_content}>
                <h4 className={styles.details__about_heading}>{descr.title}</h4>
                <p className={styles.details__about_text}>{descr.text}</p>
              </div>
            ))}
          </div>

          <div className={styles.details__techspecs}>
            <h3 className={styles.details__techspecs_title}>Tech specs</h3>

            <div className={styles.details__divider}></div>

            <div className={styles.details__techspecs_wrapper}>
              <p className={styles.details__techspecs_spec}>
                <span className={styles.details__techspecs_label}>Screen</span>
                <span className={styles.details__techspecs_value}>
                  {product?.screen}
                </span>
              </p>
              <p className={styles.details__techspecs_spec}>
                <span className={styles.details__techspecs_label}>
                  Resolution
                </span>
                <span className={styles.details__techspecs_value}>
                  {product?.resolution}
                </span>
              </p>
              <p className={styles.details__techspecs_spec}>
                <span className={styles.details__techspecs_label}>
                  Processor
                </span>
                <span className={styles.details__techspecs_value}>
                  {product?.processor}
                </span>
              </p>
              <p className={styles.details__techspecs_spec}>
                <span className={styles.details__techspecs_label}>RAM</span>
                <span className={styles.details__techspecs_value}>
                  {product?.ram}
                </span>
              </p>
              <p className={styles.details__techspecs_spec}>
                <span className={styles.details__techspecs_label}>
                  Built in memory
                </span>
                <span className={styles.details__techspecs_value}>
                  {product?.capacity}
                </span>
              </p>
              <p className={styles.details__techspecs_spec}>
                <span className={styles.details__techspecs_label}>Camera</span>
                <span className={styles.details__techspecs_value}>
                  {product?.camera}
                </span>
              </p>
              <p className={styles.details__techspecs_spec}>
                <span className={styles.details__techspecs_label}>Zoom</span>
                <span className={styles.details__techspecs_value}>
                  {product?.zoom}
                </span>
              </p>
              <p className={styles.details__techspecs_spec}>
                <span className={styles.details__techspecs_label}>Cell</span>
                <span className={styles.details__techspecs_value}>
                  {product?.cell.join(', ')}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {!error && !isLoading && product && (
        <div className={styles.details__slider}>
          <ProductsSlider
            products={suggestedProducts}
            title="You may also like"
          />
        </div>
      )}
    </div>
  );
};
