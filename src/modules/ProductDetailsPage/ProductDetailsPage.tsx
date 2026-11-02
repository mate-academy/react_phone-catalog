import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, getSuggestedProducts } from '../../api/productsApi';
import { Product } from '../../api/types';
import { Breadcrumbs, BreadcrumbItem } from '../../shared/Breadcrumbs';
import { Loader } from '../../shared/Loader';
import { ProductImagePicker } from './components/ProductImagePicker';
import { ProductOptions } from './components/ProductOptions';
import { YouMayAlsoLike } from './components/YouMayAlsoLike';
import { formatMemory, formatPrice } from '../../shared/utils/format';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  const [color, setColor] = useState<string | undefined>();
  const [capacity, setCapacity] = useState<string | undefined>();
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setHasError(false);
    setProduct(undefined);
    setSuggestedProducts([]);

    getProductById(productId ?? '')
      .then(result => {
        if (cancelled) {
          return;
        }

        setProduct(result);
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setHasError(true);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  useEffect(() => {
    if (!product) {
      return undefined;
    }

    let cancelled = false;

    setSuggestionsLoading(true);
    getSuggestedProducts(product)
      .then(items => {
        if (cancelled) {
          return;
        }

        setSuggestedProducts(items);
        setSuggestionsLoading(false);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setSuggestionsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [product]);

  const selectedColor =
    color ?? product?.colorsAvailable?.[0] ?? product?.color;
  const selectedCapacity =
    capacity ?? product?.capacityAvailable?.[0] ?? product?.capacity;
  const selectedImage = product?.images?.[imageIndex] ?? product?.images?.[0];

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Loader count={1} />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.page}>
        <div className={styles.state}>
          <p>Something went wrong</p>
          <button
            type="button"
            className={styles.reloadButton}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.state}>
          <h1>Product was not found</h1>
          <button
            type="button"
            className={styles.reloadButton}
            onClick={() => navigate('/')}
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  const categoryLabel = `${product.category.charAt(0).toUpperCase()}${product.category.slice(1)}`;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: categoryLabel, path: `/${product.category}` },
    { label: formatMemory(product.name) },
  ];

  return (
    <div className={styles.page}>
      <Breadcrumbs items={breadcrumbItems} />
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <i className="fas fa-arrow-left" /> Back
      </button>
      <div className={styles.details}>
        <ProductImagePicker
          images={product.images}
          selectedImage={selectedImage}
          onSelect={setImageIndex}
        />
        <div className={styles.info}>
          <h1 className={styles.title}>{formatMemory(product.name)}</h1>
          <div className={styles.prices}>
            {formatPrice(product.price) && (
              <span className={styles.price}>{formatPrice(product.price)}</span>
            )}
            {formatPrice(product.fullPrice) && (
              <s className={styles.fullPrice}>
                {formatPrice(product.fullPrice)}
              </s>
            )}
          </div>
          {product.screen && <p className={styles.meta}>{product.screen}</p>}
          <ProductOptions
            product={product}
            color={selectedColor}
            capacity={selectedCapacity}
            onColorChange={setColor}
            onCapacityChange={setCapacity}
          />
          {product.description && product.description.length > 0 && (
            <div className={styles.about}>
              {product.description.map(block => (
                <div key={block.title} className={styles.aboutBlock}>
                  <h2 className={styles.aboutTitle}>{block.title}</h2>
                  {block.text.map((text, index) => (
                    <p key={`${block.title}-${index}`}>{text}</p>
                  ))}
                </div>
              ))}
            </div>
          )}
          {product.screen && (
            <div className={styles.tech}>
              <h2 className={styles.techTitle}>Tech specs</h2>
              <dl>
                {product.screen && (
                  <div key="screen" className={styles.spec}>
                    <dt>Screen</dt>
                    <dd>{product.screen}</dd>
                  </div>
                )}
                {product.resolution && (
                  <div key="resolution" className={styles.spec}>
                    <dt>Resolution</dt>
                    <dd>{product.resolution}</dd>
                  </div>
                )}
                {product.processor && (
                  <div key="processor" className={styles.spec}>
                    <dt>Processor</dt>
                    <dd>{product.processor}</dd>
                  </div>
                )}
                {product.ram && (
                  <div key="ram" className={styles.spec}>
                    <dt>RAM</dt>
                    <dd>{product.ram}</dd>
                  </div>
                )}
                {product.camera && (
                  <div key="camera" className={styles.spec}>
                    <dt>Camera</dt>
                    <dd>{product.camera}</dd>
                  </div>
                )}
                {product.zoom && (
                  <div key="zoom" className={styles.spec}>
                    <dt>Zoom</dt>
                    <dd>{product.zoom}</dd>
                  </div>
                )}
                {product.cell && product.cell.length > 0 && (
                  <div key="cell" className={styles.spec}>
                    <dt>Cell</dt>
                    <dd>{product.cell.join(', ')}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>
      </div>
      <YouMayAlsoLike
        products={suggestedProducts}
        isLoading={suggestionsLoading}
      />
    </div>
  );
};
