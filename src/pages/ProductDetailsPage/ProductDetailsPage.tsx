import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import { getProductById, getProducts } from '../../api/api';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { ProductActions } from '../../components/ProductActions';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './ProductDetailsPage.module.scss';

type SpecItem = { label: string; value: string };

const Specs = ({ items }: { items: SpecItem[] }) => (
  <div className={styles.specs}>
    {items.map(({ label, value }) => (
      <div key={label} className={styles.spec}>
        <span className={styles.spec__name}>{label}</span>
        <span className={styles.spec__value}>{value}</span>
      </div>
    ))}
  </div>
);

export const ProductDetailsPage = () => {
  const { productId, category } = useParams<{
    productId: string;
    category: string;
  }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [catalogProduct, setCatalogProduct] = useState<Product | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (!productId || !category) {
      return;
    }

    setIsLoading(true);
    setIsError(false);
    Promise.all([getProductById(category, productId), getProducts()])
      .then(([details, allProducts]) => {
        setProduct(details);
        setMainImage(details.images[0]);
        setCatalogProduct(
          allProducts.find(p => p.itemId === productId) || null,
        );
        setSuggested(
          allProducts
            .filter(p => p.itemId !== productId)
            .sort(() => 0.5 - Math.random())
            .slice(0, 8),
        );
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [productId, category]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !product || !catalogProduct) {
    return (
      <div className={styles.details}>
        <BackButton />
        <Breadcrumbs />
        <h2 className={styles.details__title}>Product was not found</h2>
      </div>
    );
  }

  const getProductUrl = (newColor: string, newCapacity: string) => {
    const capacityFormatted = newCapacity.toLowerCase().replace(' ', '');
    const colorFormatted = newColor.toLowerCase().replace(/ /g, '-');

    return `/${category}/${product.namespaceId}-${capacityFormatted}-${colorFormatted}`;
  };

  const techSpecs: SpecItem[] = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built in memory', value: product.capacity },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell.join(', ') },
  ];

  return (
    <div className={styles.details} data-cy="ProductDetailsPage">
      <BackButton />
      <Breadcrumbs />

      <h1 className={styles.details__title}>{product.name}</h1>
      <div className="columns is-desktop is-variable is-8">
        <div className="column is-half-desktop">
          <div className={styles.gallery}>
            <div className={styles.gallery__thumbnails}>
              {product.images.map((img, index) => (
                <button
                  key={img}
                  className={classNames(styles.gallery__thumb, {
                    [styles['gallery__thumb--active']]: img === mainImage,
                  })}
                  onClick={() => setMainImage(img)}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className={styles['gallery__thumb-img']}
                  />
                </button>
              ))}
            </div>
            <div className={styles.gallery__main}>
              <img
                src={mainImage}
                alt={product.name}
                className={styles['gallery__main-img']}
              />
            </div>
          </div>
        </div>
        <div className="column is-half-desktop">
          <div className={styles.options}>
            <div className={styles.options__block}>
              <div className={styles.options__header}>
                <span className={styles.options__label}>Available colors</span>
                <span className={styles.options__label}>ID: {product.id}</span>
              </div>
              <div className={styles.options__list}>
                {product.colorsAvailable.map(color => (
                  <Link
                    key={color}
                    to={getProductUrl(color, product.capacity)}
                    className={classNames(styles.options__color, {
                      [styles['options__color--active']]:
                        color === product.color,
                    })}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            <div className={styles.options__block}>
              <span className={styles.options__label}>Select capacity</span>
              <div className={styles.options__list}>
                {product.capacityAvailable.map(cap => (
                  <Link
                    key={cap}
                    to={getProductUrl(product.color, cap)}
                    className={classNames(styles.options__capacity, {
                      [styles['options__capacity--active']]:
                        cap === product.capacity,
                    })}
                  >
                    {cap}
                  </Link>
                ))}
              </div>
            </div>
            <div className={styles.details__prices}>
              <span className={styles['details__price-discount']}>
                ${product.priceDiscount}
              </span>
              <span className={styles['details__price-regular']}>
                ${product.priceRegular}
              </span>
            </div>
            <ProductActions product={catalogProduct} isLarge />
            <Specs items={techSpecs.slice(0, 4)} />
          </div>
        </div>
      </div>
      <div className={styles.details__info}>
        <div className="columns is-desktop is-variable is-8">
          <div className="column is-half-desktop">
            <h2 className={styles.details__subtitle}>About</h2>
            <div className={styles.details__divider} />
            <div className={styles.about}>
              {product.description.map(desc => (
                <div key={desc.title} className={styles.about__section}>
                  <h3 className={styles.about__title}>{desc.title}</h3>
                  {desc.text.map((paragraph, i) => (
                    <p key={i} className={styles.about__text}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="column is-half-desktop">
            <h2 className={styles.details__subtitle}>Tech specs</h2>
            <div className={styles.details__divider} />
            <Specs items={techSpecs} />
          </div>
        </div>
      </div>
      <ProductsSlider title="You may also like" products={suggested} />
    </div>
  );
};
