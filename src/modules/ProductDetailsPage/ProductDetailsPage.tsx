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
import { ProductDetails } from 'shared/types/ProductDetails';

import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { category, id } = useParams();
  const { productsByCategory } = useProductsContext();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [curProduct, setCurProduct] = useState<ProductDetails | null>(null);

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
      <article className={styles.productPage}>
        <header className={styles.navigation}>
          <nav aria-label="Breadcrumbs and back">
            <Breadcrumbs />

            <GoBack />
          </nav>

          <h1 className={styles.title}>{curProduct.name}</h1>
        </header>

        <section className={styles.product}>
          <section className={styles.gallery}>
            <ul className={styles.thumbnails}>
              {curProduct.images.map((img, i) => (
                <li
                  key={i}
                  className={`${styles.thumbnail} ${activeImageIndex === i ? styles.activeThumbnail : ''}`}
                >
                  <button onClick={() => setActiveImageIndex(i)}>
                    <img alt={`${curProduct.name}, image ${i + 1}`} src={img} />
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
                      <span className={styles.visuallyHidden}>{color}</span>
                    </label>
                  ))}
                </div>

                <hr aria-hidden="true" className={styles.divider} />
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

                <hr aria-hidden="true" className={styles.divider} />
              </fieldset>
            </div>

            <div className={styles.priceWrapper}>
              <p className={styles.productPrice}>${curProduct.priceDiscount}</p>
              <p
                className={styles.productDiscount}
              >{`$${curProduct.priceRegular}`}</p>
            </div>

            <div className={styles.actions}>
              <AddToCartButton size={48} />
              <FavoriteButton size={48} />
            </div>

            <dl className={styles.featuresList}>
              <dt className={styles.featureName}>Screen</dt>
              <dd className={styles.featureValue}>{curProduct.screen}</dd>

              <dt className={styles.featureName}>Resolution</dt>
              <dd className={styles.featureValue}>{curProduct.resolution}</dd>

              <dt className={styles.featureName}>Processor</dt>
              <dd className={styles.featureValue}>{curProduct.processor}</dd>

              <dt className={styles.featureName}>RAM</dt>
              <dd className={styles.featureValue}>{curProduct.ram}</dd>
            </dl>
          </section>

          <section className={styles.description}>
            <h2 className={styles.descriptionTitle}>About</h2>

            <hr aria-hidden="true" className={styles.divider} />

            <article className={styles.descriptionContent}>
              {curProduct.description.map(desc => (
                <section key={desc.title}>
                  <h3 key={desc.title} className={styles.descriptionSubtitle}>
                    {desc.title}
                  </h3>
                  <p className={styles.descriptionText}>{desc.text}</p>
                </section>
              ))}
            </article>
          </section>

          <section className={styles.specs}>
            <h2 className={styles.specsTitle}>Tech specs</h2>

            <hr aria-hidden="true" className={styles.divider} />

            <dl className={styles.featuresList}>
              <dt className={styles.featureName}>Screen</dt>
              <dd className={styles.featureValue}>{curProduct.screen}</dd>

              <dt className={styles.featureName}>Resolution</dt>
              <dd className={styles.featureValue}>{curProduct.resolution}</dd>

              <dt className={styles.featureName}>Processor</dt>
              <dd className={styles.featureValue}>{curProduct.processor}</dd>

              <dt className={styles.featureName}>RAM</dt>
              <dd className={styles.featureValue}>{curProduct.ram}</dd>

              <dt className={styles.featureName}>Capacity</dt>
              <dd className={styles.featureValue}>{curProduct.capacity}</dd>

              {curProduct.category === ProductCategory.PHONES ||
              curProduct.category === ProductCategory.TABLETS ? (
                <>
                  <dt className={styles.featureName}>Camera</dt>
                  <dd className={styles.featureValue}>{curProduct.camera}</dd>

                  <dt className={styles.featureName}>Zoom</dt>
                  <dd className={styles.featureValue}>{curProduct.zoom}</dd>
                </>
              ) : null}

              <dt className={styles.featureName}>Cell</dt>
              <dd className={styles.featureValue}>
                {curProduct.cell.join(', ')}
              </dd>
            </dl>
          </section>
        </section>

        <section className={styles.suggestedProducts}>
          <ProductsSlider
            key={id}
            products={suggestedProducts}
            showDiscount={true}
            title="You may also like"
          />
        </section>
      </article>
    );
  }

  return <>{content}</>;
};
