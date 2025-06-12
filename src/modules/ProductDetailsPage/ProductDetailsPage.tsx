/* eslint-disable @typescript-eslint/no-use-before-define */

import React, { useEffect, useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import notFoundImg from '../../assets/img/ui/page-not-found.png';
import { useProductsContext } from '../../contexts/ProductsContext';
import { ProductsSlider } from '../../modules/HomePage/components/ProductsSlider';
import { NotFoundPage } from '../../modules/NotFoundPage';
import { Error } from '../../shared/components/layout/Error';
import { Loader } from '../../shared/components/layout/Loader';
import { Breadcrumbs } from '../../shared/components/ui/Breadcrumbs';
import { Divider } from '../../shared/components/ui/Divider';
import dividerStyles from '../../shared/components/ui/Divider/Divider.module.scss';
import { FavoriteButton } from '../../shared/components/ui/FavoriteButton';
import { GoBack } from '../../shared/components/ui/GoBack';
import { PrimaryButton } from '../../shared/components/ui/PrimaryButton';
import { DividerMargin } from '../../shared/constants/dividerMargin';
import { ProductCategory } from '../../shared/constants/productCategory';
import {
  getProductsByCategory,
  getSuggestedProducts,
} from '../../shared/services/services';
import { Product } from '../../shared/types/Product';
import { ProductDetails } from '../../shared/types/ProductDetails';

import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { category, id } = useParams<{
    category: ProductCategory;
    id: string;
  }>();
  const { productsByCategory } = useProductsContext();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [curProduct, setCurProduct] = useState<ProductDetails | null>(null);

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);
  const [activeCapacityIndex, setActiveCapacityIndex] = useState<number>(0);

  const navigate = useNavigate();
  const goToProduct = (newId: string) => {
    navigate(`/${category}/${newId}`);
  };

  const handleProductChange = (capacityIdex: number, colorIndex: number) => {
    if (!curProduct) return;

    const parts = [
      curProduct.namespaceId,
      curProduct.capacityAvailable[capacityIdex].toLowerCase(),
      curProduct.colorsAvailable[colorIndex],
    ];

    const newId = parts.join('-');

    setActiveCapacityIndex(capacityIdex);
    setActiveColorIndex(colorIndex);

    goToProduct(newId);
  };

  const products = useMemo(() => {
    return productsByCategory[category as ProductCategory] || [];
  }, [productsByCategory, category]);

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
          setActiveCapacityIndex(
            detailedProduct.capacityAvailable.indexOf(detailedProduct.capacity),
          );

          setActiveColorIndex(
            detailedProduct.colorsAvailable.indexOf(detailedProduct.color),
          );
        }

        if (detailedProduct) {
          const suggested = await getSuggestedProducts(
            products,
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
  }, [products, category, id]);

  let content = null;

  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <Error message={error} />;
  } else if (!curProduct) {
    content = (
      <NotFoundPage
        aria-controls="product-not-found"
        imageSrc={notFoundImg}
        message="Product not found"
      />
    );
  } else {
    content = (
      <article className={styles.productPage}>
        <header>
          <nav aria-label="Breadcrumbs and back" className={styles.navigation}>
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
                        checked={activeColorIndex === i}
                        name="color"
                        type="radio"
                        value={color}
                        onChange={() => {
                          handleProductChange(activeCapacityIndex, i);
                        }}
                      />
                      <span className={styles.visuallyHidden}>{color}</span>
                    </label>
                  ))}
                </div>

                <Divider margin={DividerMargin.MD} />
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
                        checked={activeCapacityIndex === i}
                        name="capacity"
                        type="radio"
                        value={capacity}
                        onChange={() =>
                          handleProductChange(i, activeColorIndex)
                        }
                      />
                      <span>{capacity}</span>
                    </label>
                  ))}
                </div>

                <Divider margin={DividerMargin.LG} />
              </fieldset>
            </div>

            <div className={styles.priceWrapper}>
              <p className={styles.productPrice}>${curProduct.priceDiscount}</p>
              <p
                className={styles.productDiscount}
              >{`$${curProduct.priceRegular}`}</p>
            </div>

            <div className={styles.actions}>
              <PrimaryButton product={curProduct} size={48} variant="add" />
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

            <Divider margin={DividerMargin.LG} />

            <article className={styles.descriptionContent}>
              {curProduct.description.map((desc, index) => (
                <section key={`${desc.title}-${index}`}>
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

            <Divider className={dividerStyles.marginResponsive} />

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
