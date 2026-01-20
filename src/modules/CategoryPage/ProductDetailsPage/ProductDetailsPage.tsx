import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Breadcrumbs } from '../../shared/Breadcrumbs';
import { Footer } from '../../shared/Footer';
import { Header } from '../../shared/Header';
import styles from './ProductDetailsPage.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProductsSlider } from 'src/modules/HomePage/components/ProductsSlider';
import apiProducts from '../../../../public/api/products.json';
import apiPhones from '../../../../public/api/phones.json';
import apiTablets from '../../../../public/api/tablets.json';
import apiAccessories from '../../../../public/api/accessories.json';
import classNames from 'classnames';
import { FullProduct, ProductDetails, ProductType } from 'models/product.model';
import { useProducts } from 'src/context/ProductsContext';
const favoriteIcons = '/img/icons/';

const apiCategoryMap: Record<string, ProductDetails[]> = {
  phones: apiPhones,
  tablets: apiTablets,
  accessories: apiAccessories,
} as const;

const COLOR_MAP: Record<string, string> = {
  black: '#000000',
  blue: '#4f5ca8',
  coral: '#f16e4e',
  white: '#f5f5f5',
  gold: '#f5d7b2',
  silver: '#e0e0e0',
  spacegray: '#4b4b4b',
  spaceblack: '#222020',
  midnight: 'midnightblue',
  midnightgreen: 'darkgreen',
  sierrablue: '#9bb7d4',
  starlight: '#f8f3e8',
  green: '#576856',
  yellow: '#f2d94e',
  purple: '#b39ddb',
  pink: '#db9dc3',
  rosegold: '#dfaaaf',
  red: '#c0392b',
};

export const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();
  const products: ProductType[] = apiProducts;

  // const findProductById = (productID: string) => {
  //   const summary = apiProducts.find(
  //     product => String(product.id) === productID,
  //   );

  //   if (!summary) {
  //     return null;
  //   }

  //   const categoryProducts =
  //     apiCategoryMap[summary.category as keyof typeof apiCategoryMap];

  //   if (!categoryProducts) {
  //     return summary;
  //   }

  //   const detailedProduct = categoryProducts.find(
  //     item => item.id === summary.itemId,
  //   );

  //   return detailedProduct ? { ...detailedProduct } : summary;
  // };

  const findProductById = (id: string): FullProduct | null => {
    // console.log('productId from params:', id);
    // Find summary info in apiProducts (ProductType)
    const summary = apiProducts.find(
      product => String(product.id) === id || product.itemId === id,
    );

    // console.log('summary found:', summary);

    if (!summary) {
      return null;
    }

    // Get the correct category data (array of ProductDetails)
    const categoryProducts = apiCategoryMap[summary.category];

    // console.log('categoryProducts:', categoryProducts);

    if (!categoryProducts) {
      return null;
    }

    // Find detailed info by itemId
    const detailedProduct = categoryProducts.find(
      item => item.id === String(summary.itemId),
    );

    // console.log('detailedProduct:', detailedProduct);

    if (!detailedProduct) {
      return null;
    }

    // Merge summary and details
    return { ...summary, ...detailedProduct } as FullProduct;
  };

  const [activeImage, setActiveImage] = useState<string | null>(null);
  const product = productId ? findProductById(productId) : null;
  const baseId =
    product?.itemId
      ?.split('-')
      .slice(0, product?.itemId?.split('-').length - 2)
      .join('-') || '';

  // Діагностика
  // console.log('product:', product);
  // console.log('baseId:', baseId);
  // console.log('products:', products);
  // console.log('colorsAvailable:', product?.colorsAvailable);

  const images: string[] = useMemo(() => {
    if (!product) {
      return [];
    }

    if (Array.isArray((product as FullProduct).images)) {
      return (product as FullProduct).images ?? [];
    }

    if ('image' in product && typeof product.image === 'string') {
      return [product.image];
    }

    return [];
  }, [product]);

  useEffect(() => {
    if (images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [images]);

  const { cart, favorites, toggleCart, toggleFav } = useProducts();

  const handleAddToCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (product) {
        toggleCart(product);
      }
    },
    [product, toggleCart],
  );

  const handleAddToFavorites = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (product) {
        toggleFav(product);
      }
    },
    [product, toggleFav],
  );

  const isAdded = product
    ? cart.some(item => item.product.id === product.id)
    : false;
  const isFavorite = product
    ? favorites.some(item => item.id === product.id)
    : false;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.productdetailspage}>
        <Breadcrumbs category={category || ''} productId={productId || ''} />
        <button
          className={styles.productdetailspage__backbutton}
          onClick={() => navigate(`/${product.category}`)}
        >
          <img
            className={styles.productdetailspage__backbutton__icon}
            src="/public/img/icons/icon-chevron-arrow-left.png"
            alt=""
          />
          <p className={styles.productdetailspage__backbutton__text}>Back</p>
        </button>
        <h1 className={styles.productdetailspage__title}>{product.name}</h1>
        <p className={styles.productdetailspage__info_idnum}>
          ID:{product.namespaceId}
        </p>
        <div className={styles.productdetailspage__gallery}>
          <div className={styles.productdetailspage__gallery__thumbs}>
            {images.map((image: string) => (
              <button
                key={image}
                className={classNames(
                  styles.productdetailspage__gallery__thumb,
                  image === activeImage &&
                    styles.productdetailspage__gallery__thumb_active,
                )}
                onClick={() => setActiveImage(image)}
                type="button"
              >
                <img
                  src={`/${image}`}
                  alt={product.name}
                  className={styles.productdetailspage__gallery__thumb_img}
                />
              </button>
            ))}
          </div>
          <div className={styles.productdetailspage__gallery__main}>
            <img
              src={`/${activeImage}`}
              alt={product.name}
              className={styles.productdetailspage__gallery__main_img}
            />
          </div>
        </div>
        <div className={styles.productdetailspage__info}>
          <div className={styles.productdetailspage__info_availablecolors}>
            <p className={styles.productdetailspage__info_availablecolors_text}>
              Available colors
            </p>
            <ul
              className={styles.productdetailspage__info_availablecolors_list}
            >
              {product.colorsAvailable.map(color => {
                const newProduct = products.find(
                  p =>
                    p.itemId ===
                    `${baseId}-${product.capacity.toLowerCase()}-${color}`,
                );

                if (!newProduct) {
                  return null;
                }

                return (
                  <li
                    key={color}
                    className={styles.productdetailspage__info_availablecolor}
                  >
                    <Link
                      to={`/${product.category}/product/${newProduct.id}`}
                      className={classNames(
                        // eslint-disable-next-line max-len
                        styles.productdetailspage__info_availablecolor_colorLink,
                        {
                          // eslint-disable-next-line max-len
                          [styles.productdetailspage__info_availablecolor_colorLink_active]:
                            color === product.color,
                        },
                      )}
                      aria-label={color}
                    >
                      <span
                        className={
                          // eslint-disable-next-line max-len
                          styles.productdetailspage__info_availablecolor_colorInner
                        }
                        style={{
                          backgroundColor: COLOR_MAP[color] ?? '#ccc',
                        }}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.productdetailspage__info_availablecapacities}>
            <p
              className={
                styles.productdetailspage__info_availablecapacities_text
              }
            >
              Select capacity
            </p>
            <ul
              className={
                styles.productdetailspage__info_availablecapacities_list
              }
            >
              {product.capacityAvailable.map(capacity => {
                const newProduct = products.find(
                  p =>
                    p.itemId ===
                    `${baseId}-${capacity.toLowerCase()}-${product.color}`,
                );

                if (!newProduct) {
                  return null;
                }

                return (
                  <li
                    key={capacity}
                    className={
                      styles.productdetailspage__info_availablecapacity
                    }
                  >
                    <Link
                      to={`/${product.category}/product/${newProduct.id}`}
                      className={classNames(
                        // eslint-disable-next-line max-len
                        styles.productdetailspage__info_availablecapacity_colorLink,
                        {
                          // eslint-disable-next-line max-len
                          [styles.productdetailspage__info_availablecapacity_colorLink_active]:
                            capacity === product.capacity,
                        },
                      )}
                      aria-label={capacity}
                    >
                      {capacity}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.productdetailspage__info_main}>
            <div className={styles.productdetailspage__info__price}>
              <h2 className={styles.productdetailspage__info__price_disconout}>
                ${product.price}
              </h2>
              <h2 className={styles.productdetailspage__info__price_full}>
                ${product.fullPrice}
              </h2>
            </div>
            <div className={styles.productdetailspage__info__buttons}>
              <button
                className={`${styles.productdetailspage__info__buttons_cart} ${
                  isAdded ? styles['productcard__buttons_cart_is-active'] : ''
                }`}
                onClick={handleAddToCart}
              >
                {isAdded ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                className={`${styles.productdetailspage__info__buttons_like} ${
                  isFavorite
                    ? styles['productcard__buttons_like_is-active']
                    : ''
                }`}
                onClick={handleAddToFavorites}
              >
                {isFavorite ? (
                  <img
                    src={
                      favoriteIcons + 'icon-favourites-heart-like-filled.png'
                    }
                    alt=""
                    className={
                      styles.productdetailspage__info__buttons_like__img
                    }
                  />
                ) : (
                  <img
                    src={favoriteIcons + 'icon-favourites-heart-like.png'}
                    alt=""
                    className={
                      styles.productdetailspage__info__buttons_like__img
                    }
                  />
                )}
              </button>
            </div>
            <div className={styles.productdetailspage__info_tech}>
              <div className={styles.productdetailspage__info_tech_row}>
                <span className={styles.productdetailspage__info_tech_label}>
                  Screen
                </span>
                <span className={styles.productdetailspage__info_tech_value}>
                  {product.screen}
                </span>
              </div>

              <div className={styles.productdetailspage__info_tech_row}>
                <span className={styles.productdetailspage__info_tech_label}>
                  Resolution
                </span>
                <span className={styles.productdetailspage__info_tech_value}>
                  {product.resolution}
                </span>
              </div>

              <div className={styles.productdetailspage__info_tech_row}>
                <span className={styles.productdetailspage__info_tech_label}>
                  Processor
                </span>
                <span className={styles.productdetailspage__info_tech_value}>
                  {product.processor}
                </span>
              </div>

              <div className={styles.productdetailspage__info_tech_row}>
                <span className={styles.productdetailspage__info_tech_label}>
                  RAM
                </span>
                <span className={styles.productdetailspage__info_tech_value}>
                  {product.ram}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.productdetailspage__alsolike}>
          <ProductsSlider title="You may also like" />
        </div>
      </div>
      <Footer />
    </>
  );
};
