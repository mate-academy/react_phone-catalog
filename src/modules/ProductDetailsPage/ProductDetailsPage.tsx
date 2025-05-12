import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import notFoundImg from 'assets/img/ui/product-not-found.png';

import { useProductsContext } from 'contexts/ProductsContext';
import { ProductsSlider } from 'modules/HomePage/components/ProductsSlider';
import { NotFoundPage } from 'modules/NotFoundPage';
import { Error } from 'shared/components/layout/Error';
import { Loader } from 'shared/components/layout/Loader';
import { AddToCartButton } from 'shared/components/ui/AddToCartButton';
import { Breadcrumbs } from 'shared/components/ui/Breadcrumbs';
import { FavoriteButton } from 'shared/components/ui/FavoriteButton';
import { GoBack } from 'shared/components/ui/GoBack';
import { ProductCategory } from 'shared/constants/productCategory';
import {
  getProductsByCategory,
  getSuggestedProducts,
} from 'shared/services/services';
import { Product } from 'shared/types/Product';
import { BaseProductDetails } from 'shared/types/ProductDetails';

import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { category, id } = useParams();
  const { productsByCategory } = useProductsContext();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [curProduct, setCurProduct] = useState<BaseProductDetails | null>(null);

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);
  const [activeCapacityIndex, setActiveCapacityIndex] = useState<number>(0);

  useEffect(() => {
    if (!category || !id) return;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const allProducts = await getProductsByCategory(
          category as ProductCategory,
        );

        const detailedProduct = allProducts.find(p => p.id === id) || null;

        setCurProduct(detailedProduct);

        if (detailedProduct) {
          const suggested = await getSuggestedProducts(
            productsByCategory[category as ProductCategory],
            detailedProduct.id,
          );

          setSuggestedProducts(suggested);
        }
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productsByCategory, category, id]);

  let content = null;

  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <Error message={error} />;
  } else if (!curProduct) {
    content = (
      <NotFoundPage imageSrc={notFoundImg} message="Product not found" />
    );
  } else {
    content = (
      <div className={styles.productPage}>
        <header className={styles.navigation}>
          <Breadcrumbs />

          <GoBack />
          <h1 className={styles.title}>{curProduct.name}</h1>
        </header>

        <article className={styles.product}>
          <section className={styles.gallery}>
            <ul className={styles.thumbnails}>
              {curProduct.images.map((img, i) => (
                <li
                  key={i}
                  className={`${styles.thumbnail} ${activeImageIndex === i ? styles.activeThumbnail : ''}`}
                  onClick={() => setActiveImageIndex(i)}
                >
                  <button>
                    <img alt={curProduct.name} src={img} />
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.mainImage}>
              <img
                alt={curProduct.name}
                src={curProduct.images[activeImageIndex]}
              />
            </div>
          </section>

          <section className={styles.info}>
            <div className={styles.options}>
              <fieldset className={styles.colors}>
                <legend className={styles.optionsTitle}>
                  Available colors
                </legend>

                <div className={styles.colorsWrapper}>
                  {curProduct.colorsAvailable.map((color, i) => (
                    <label
                      key={i}
                      aria-label={color}
                      className={`${styles.colorItem} ${activeColorIndex === i ? styles.activeColor : ''}`}
                      style={{ backgroundColor: color }}
                    >
                      <input
                        name="color"
                        type="radio"
                        value={color}
                        onClick={() => setActiveColorIndex(i)}
                      />
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className={styles.capacity}>
                <legend className={styles.optionsTitle}>Select capacity</legend>

                <div className={styles.capacityWrapper}>
                  {curProduct.capacityAvailable.map((capacity, i) => (
                    <label
                      key={i}
                      className={`${styles.capacityItem} ${activeCapacityIndex === i ? styles.activeCapacity : ''}`}
                    >
                      <input
                        name="capacity"
                        type="radio"
                        value={capacity}
                        onClick={() => setActiveCapacityIndex(i)}
                      />
                      <span>{capacity}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className={styles.priceWrapper}>
              <p className={styles.productPrice}>${curProduct.priceRegular}</p>
              <p
                className={styles.productDiscount}
              >{`$${curProduct.priceDiscount}`}</p>
            </div>

            <div className={styles.actions}>
              <AddToCartButton size={48} />
              <FavoriteButton size={48} />
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureName}>Screen</span>
                <span className={styles.featureValue}>{curProduct.screen}</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureName}>Resolution</span>
                <span className={styles.featureValue}>
                  {curProduct.resolution}
                </span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureName}>Processor</span>
                <span className={styles.featureValue}>
                  {curProduct.processor}
                </span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureName}>RAM</span>
                <span className={styles.featureValue}>{curProduct.ram}</span>
              </div>
            </div>
          </section>

          <section className={styles.description}>
            <h2>About</h2>
            <p>And then there was Pro…</p>
            <h3>Camera</h3>
            <p>Meet the first triple-camera system…</p>
          </section>

          <section className={styles.specs}>
            <h2>Tech specs</h2>
            <dl>
              <dt>Screen</dt>
              <dd>6.5″ OLED</dd>
              <dt>Resolution</dt>
              <dd>2688×1242</dd>
            </dl>
          </section>
        </article>

        <section className={styles.suggestedProducts}>
          <ProductsSlider
            key={id}
            products={suggestedProducts}
            showDiscount={true}
            title="You may also like"
          />
        </section>
      </div>
    );
  }

  return <>{content}</>;
};
