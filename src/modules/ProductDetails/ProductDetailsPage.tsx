/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import styles from './ProductDetailsPage.module.scss';
import { Loader } from '../Catalog/components/Loader/Loader';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { useFavorites } from '../Favorites/context/FavoritesContext';
import { mapDetailsToProduct } from './utils/mapDetailsToProduct';
import { useProduct } from './hooks/useProduct';
import { useProductSelection } from './hooks/useProductSelection';
import { useEffect, useState } from 'react';
import { PhoneDetails } from './interfaces/PhoneDetailsInterface';
import { CartButton } from '../Cart/components/CartButton';
import cartBtn from '../Cart/components/CartButton.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();
  const { favorites, toggleFavorite } = useFavorites();

  const {
    product: loadedProduct,
    allProducts,
    isLoading,
    isError,
  } = useProduct(category, productId);

  const [suggestedProducts, setSuggestedProducts] = useState<PhoneDetails[]>(
    [],
  );

  const {
    product,
    selectedColor,
    selectedCapacity,
    mainImage,
    setMainImage,
    handleColorChange,
    handleCapacityChange,
  } = useProductSelection(loadedProduct, allProducts);

  useEffect(() => {
    if (allProducts.length && loadedProduct) {
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
      const suggested = shuffled
        .filter(p => p.id !== loadedProduct.id)
        .slice(0, 4);

      setSuggestedProducts(suggested);
    }
  }, [allProducts, loadedProduct]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <BreadCrumbs />
        <Loader />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className={styles.container}>
        <BreadCrumbs />
        <div className={styles.back}>
          <img src="./img/icons/butnBack.png" alt="Arrow left" />
          <Link to={`/${category}`} className={styles.buttonBack}>
            Back
          </Link>
        </div>
        <h1 className={styles.container__errorTitle}>
          {isError || 'Product not found'}
        </h1>
        <div className={styles.container__detailsImg}>
          <img
            className={styles.container__img}
            src="./img/product-not-found.png"
            alt="Product not found"
          />
        </div>
      </div>
    );
  }

  const isFavorite = product
    ? favorites.some(item => String(item.id) === String(product.id))
    : false;

  return (
    <>
      <div className={styles.container}>
        <BreadCrumbs category={product.category} product={product} />
        <div className={styles.back}>
          <img src="./img/icons/butnBack.png" alt="Arrow left" />
          <Link to={`/${category}`} className={styles.buttonBack}>
            Back
          </Link>
        </div>

        <h1 className={styles.name}>{product.name}</h1>

        <div className={styles.wrapper}>
          <div className={styles.top}>
            <div className={styles.images}>
              <div className={styles.thumbnails}>
                {product.images.map((src, i) => (
                  <img
                    key={i}
                    src={`./${src}`}
                    className={`${styles.thumbnail} ${mainImage === src ? styles.activeThumb : ''}`}
                    onClick={() => setMainImage(src)}
                    alt={`Thumbnail ${i}`}
                  />
                ))}
              </div>

              <div className={styles.mainImageWrapper}>
                <img
                  src={`./${mainImage}`}
                  alt="Main product"
                  className={styles.mainImage}
                />
              </div>
            </div>

            <div className={styles.info}>
              <div className={styles.colors}>
                <p className={styles.colors__title}>Available colors</p>
                {product?.colorsAvailable.map((color, i) => {
                  const id = `color-${i}`;

                  return (
                    <label
                      key={id}
                      className={`${styles.colorOption} ${selectedColor === color ? styles.activeColor : ''}`}
                      htmlFor={id}
                    >
                      <input
                        id={id}
                        type="radio"
                        name="color"
                        checked={selectedColor === color}
                        className={styles.colorInput}
                        onChange={() => handleColorChange(color)}
                      />
                      <span
                        className={styles.colorSwatch}
                        style={{ backgroundColor: color }}
                      ></span>
                    </label>
                  );
                })}
              </div>

              <div className={styles.capacity}>
                <p className={styles.capacity__title}>Select capacity</p>
                <div className={styles.capacityOptions}>
                  {product.capacityAvailable.map((cap, i) => {
                    const inputId = `capacity-${i}`;

                    return (
                      <label
                        key={i}
                        className={`${styles.capacityItem} ${selectedCapacity === cap ? styles.activeCapacity : ''}`}
                      >
                        <input
                          key={inputId}
                          type="radio"
                          name="capacity"
                          value={cap}
                          checked={selectedCapacity === cap}
                          className={styles.capacityInput}
                          onChange={() => handleCapacityChange(cap)}
                        />
                        {cap}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className={styles.prices}>
                <span className={styles.prices__discount}>
                  ${product.priceDiscount}
                </span>
                <span className={styles.prices__regular}>
                  ${product.priceRegular}
                </span>
              </div>

              <div className={styles.info__buttons}>
                <CartButton
                  product={mapDetailsToProduct(product)}
                  className={cartBtn.large}
                />
                <a
                  href="#"
                  className={styles['info__buttons-fav']}
                  onClick={e => {
                    e.preventDefault();

                    if (product) {
                      toggleFavorite(mapDetailsToProduct(product));
                    }
                  }}
                >
                  <img
                    src={
                      isFavorite
                        ? './img/icons/fav-active.png'
                        : './img/icons/fav.png'
                    }
                    alt="favourite goods"
                  />
                </a>
              </div>

              <div className={styles.specs}>
                <div className={styles.specs__row}>
                  <span className={styles.specs__name}>Screen:</span>
                  <span className={styles.specs__value}>{product.screen}</span>
                </div>
                <div className={styles.specs__row}>
                  <span className={styles.specs__name}>Resolution:</span>
                  <span className={styles.specs__value}>
                    {product.resolution}
                  </span>
                </div>
                <div className={styles.specs__row}>
                  <span className={styles.specs__name}>Processor:</span>
                  <span className={styles.specs__value}>
                    {product.processor}
                  </span>
                </div>
                <div className={styles.specs__row}>
                  <span className={styles.specs__name}>RAM:</span>
                  <span className={styles.specs__value}>{product.ram}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.descr}>
            <div className={styles.about}>
              <p className={styles.about__name}>About</p>

              {product.description.map((section, i) => (
                <div key={i} className={styles.about__section}>
                  <div className={styles.about__title}>{section.title}</div>

                  {section.text.map((paragraph, j) => (
                    <div key={j} className={styles.about__text}>
                      {paragraph}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.tech}>
              <p className={styles.tech__title}>Tech specs</p>
              <div className={styles.tech__row}>
                <span className={styles.tech__name}>Screen:</span>
                <span className={styles.tech__value}>{product.screen}</span>
              </div>
              <div className={styles.tech__row}>
                <span className={styles.tech__name}>Resolution:</span>
                <span className={styles.tech__value}>{product.resolution}</span>
              </div>
              <div className={styles.tech__row}>
                <span className={styles.tech__name}>Processor:</span>
                <span className={styles.tech__value}>{product.processor}</span>
              </div>
              <div className={styles.tech__row}>
                <span className={styles.tech__name}>RAM:</span>
                <span className={styles.tech__value}>{product.ram}</span>
              </div>

              {product.category !== 'accessories' && (
                <>
                  <div className={styles.tech__row}>
                    <span className={styles.tech__name}>Camera:</span>
                    <span className={styles.tech__value}>{product.camera}</span>
                  </div>
                  <div className={styles.tech__row}>
                    <span className={styles.tech__name}>Zoom:</span>
                    <span className={styles.tech__value}>{product.zoom}</span>
                  </div>
                </>
              )}
              <div className={styles.tech__row}>
                <span className={styles.tech__name}>Cell:</span>
                <span className={styles.tech__value}>{product.cell}</span>
              </div>
            </div>
          </div>

          <div className={styles.containerSlider}>
            <ProductSlider
              title={'You may also like'}
              showOldPrice={true}
              limit={10}
              products={suggestedProducts || []}
            />
          </div>
        </div>
      </div>
    </>
  );
};
