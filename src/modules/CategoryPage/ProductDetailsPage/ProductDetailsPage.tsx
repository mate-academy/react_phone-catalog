import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Breadcrumbs } from '../../shared/Breadcrumbs';
import { Footer } from '../../shared/Footer';
import { Header } from '../../shared/Header';
import styles from './ProductDetailsPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductsSlider } from 'src/modules/HomePage/components/ProductsSlider';
import apiProducts from '../../../../public/api/products.json';
import apiPhones from '../../../../public/api/phones.json';
import apiTablets from '../../../../public/api/tablets.json';
import apiAccessories from '../../../../public/api/accessories.json';
import classNames from 'classnames';
import { FullProduct, ProductDetails } from 'models/product.model';
import { useProducts } from 'src/context/ProductsContext';
import {
  AvailableCapacities,
  AvailableColors,
} from './AvailableColorsCapacity';
import imgNotFoundProduct from '../../../../public/img/page-not-found.png';
const favoriteIcons = '/img/icons/';

const apiCategoryMap: Record<string, ProductDetails[]> = {
  phones: apiPhones,
  tablets: apiTablets,
  accessories: apiAccessories,
} as const;

export const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

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
    ? cart.some(item => item.product.itemId === product.id)
    : false;
  const isFavorite = product
    ? favorites.some(item => item.itemId === product.id)
    : false;

  return (
    <>
      <Header />
      {product ? (
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
              <div className={styles.productdetailspage__info_header}>
                <p
                  className={
                    styles.productdetailspage__info_availablecolors_text
                  }
                >
                  Available colors
                </p>
                <p className={styles.productdetailspage__info_idnum_s}>
                  ID: {product.namespaceId}
                </p>
              </div>
              <AvailableColors product={product} />
            </div>
            <div
              className={styles.productdetailspage__info_availablecapacities}
            >
              <p
                className={
                  styles.productdetailspage__info_availablecapacities_text
                }
              >
                Select capacity
              </p>
              <AvailableCapacities product={product} />
            </div>
            <div className={styles.productdetailspage__info_main}>
              <div className={styles.productdetailspage__info__price}>
                <h2
                  className={styles.productdetailspage__info__price_disconout}
                >
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
          <p className={styles.productdetailspage__info_idnum}>
            ID: {product.namespaceId}
          </p>
          <div className={styles.productdetailspage__extrainfo}>
            <div className={styles.productdetailspage__extrainfo_about}>
              <h1 className={styles.productdetailspage__extrainfo_title}>
                About
              </h1>
              {product.description?.map((descSection, index) => (
                <div
                  key={index}
                  className={styles.productdetailspage__extrainfo_about_text}
                >
                  <h2
                    className={
                      styles.productdetailspage__extrainfo_about_text_title
                    }
                  >
                    {descSection.title}
                  </h2>
                  {descSection.text.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className={
                        styles.productdetailspage__extrainfo_about_text_p
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <div className={styles.productdetailspage__extrainfo__techspecs}>
              <h1 className={styles.productdetailspage__extrainfo_title}>
                Tech specs
              </h1>
              <div
                className={styles.productdetailspage__extrainfo__techspecs_text}
              >
                <div
                  className={
                    styles.productdetailspage__extrainfo__techspecs_row
                  }
                >
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_label
                    }
                  >
                    Screen
                  </span>
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_value
                    }
                  >
                    {product.screen}
                  </span>
                </div>

                <div
                  className={
                    styles.productdetailspage__extrainfo__techspecs_row
                  }
                >
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_label
                    }
                  >
                    Resolution
                  </span>
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_value
                    }
                  >
                    {product.resolution}
                  </span>
                </div>

                <div
                  className={
                    styles.productdetailspage__extrainfo__techspecs_row
                  }
                >
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_label
                    }
                  >
                    Processor
                  </span>
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_value
                    }
                  >
                    {product.processor}
                  </span>
                </div>

                <div
                  className={
                    styles.productdetailspage__extrainfo__techspecs_row
                  }
                >
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_label
                    }
                  >
                    RAM
                  </span>
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_value
                    }
                  >
                    {product.ram}
                  </span>
                </div>

                <div
                  className={
                    styles.productdetailspage__extrainfo__techspecs_row
                  }
                >
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_label
                    }
                  >
                    Built in memory
                  </span>
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_value
                    }
                  >
                    {product.capacity}
                  </span>
                </div>

                <div
                  className={
                    styles.productdetailspage__extrainfo__techspecs_row
                  }
                >
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_label
                    }
                  >
                    Camera
                  </span>
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_value
                    }
                  >
                    {product.camera}
                  </span>
                </div>

                <div
                  className={
                    styles.productdetailspage__extrainfo__techspecs_row
                  }
                >
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_label
                    }
                  >
                    Zoom
                  </span>
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_value
                    }
                  >
                    {product.zoom}
                  </span>
                </div>

                <div
                  className={
                    styles.productdetailspage__extrainfo__techspecs_row
                  }
                >
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_label
                    }
                  >
                    Cell
                  </span>
                  <span
                    className={
                      styles.productdetailspage__extrainfo__techspecs_value
                    }
                  >
                    {product.cell?.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.productdetailspage__alsolike}>
            <ProductsSlider title="You may also like" excludeId={product.id} />
          </div>
        </div>
      ) : (
        <div className={styles.notfoundproductpage}>
          <h1 className={styles.notfoundproductpage__title}>
            404 - Product Not Found
          </h1>
          <p className={styles.notfoundproductpage__text}>
            Product by this id does not exist on server.
          </p>
          <img
            className={styles.notfoundproductpage__image}
            src={imgNotFoundProduct}
            alt="Page Not Found"
          />
        </div>
      )}

      <Footer />
    </>
  );
};
