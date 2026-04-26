import { useNavigate, useParams } from 'react-router-dom';
import { Product, ProductCategory } from '../../features/types/productType';
import { useEffect, useMemo, useState } from 'react';
import { ProductDetails } from '../../features/types/productDetailsType';
import { getProductDetails, getProducts } from '../../api/products';
import { Loader } from '../../components/Loader';
import styles from './ProductDetailsPage.module.scss';
import { ProductGallery } from '../../components/ProductGallery';
import { ProductsCarousel } from '../../components/ProductsCarousel';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Chevron } from '../../components/icons/Chevron';
import { ProductActions } from '../../components/ProductActions';
import { ProductOptions } from '../../components/ProductOptions';

const isProductCategory = (value: string): value is ProductCategory =>
  value === 'phones' || value === 'tablets' || value === 'accessories';

const normalizeColorForUrl = (color: string) =>
  color.toLowerCase().replace(/\s+/g, '-');

export const ProductDetailsPage = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<ProductDetails | null>(null);

  const [detailsLoading, setDetailsLoading] = useState(true);
  const [recommendedLoading, setRecommendedLoading] = useState(true);

  const [detailsError, setDetailsError] = useState('');
  const [recommendedError, setRecommendedError] = useState('');

  const [mainImage, setMainImage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!category || !productId) {
      setDetailsError('Product not found');
      setDetailsLoading(false);

      return;
    }

    if (!isProductCategory(category)) {
      setDetailsError('Unknown category');
      setDetailsLoading(false);

      return;
    }

    setDetailsLoading(true);
    setDetailsError('');

    getProductDetails(category, productId)
      .then(data => {
        setProduct(data);
        setMainImage(data.images[0] ? `/${data.images[0]}` : '');
      })
      .catch(error => {
        setDetailsError(
          error instanceof Error ? error.message : 'Something went wrong',
        );
      })
      .finally(() => setDetailsLoading(false));
  }, [category, productId]);

  useEffect(() => {
    setRecommendedLoading(true);
    setRecommendedError('');

    getProducts()
      .then(setProducts)
      .catch(() => setRecommendedError('Failed to load recommended products'))
      .finally(() => setRecommendedLoading(false));
  }, []);

  const recommended = useMemo(() => {
    if (!category || !product) {
      return [];
    }

    return products.filter(
      item =>
        item.category === category &&
        item.itemId !== product.id &&
        item.name !== product.name,
    );
  }, [products, category, product]);

  if (detailsLoading) {
    return <Loader />;
  }

  if (detailsError) {
    return (
      <div className={styles.productDetails}>
        <div className={styles.productDetails__wrapper}>
          <div className={styles.productDetails__state}>
            <p className={styles.productDetails__stateText}>{detailsError}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product || !category) {
    return (
      <div className={styles.productDetails}>
        <div className={styles.productDetails__wrapper}>
          <div className={styles.productDetails__state}>
            <p className={styles.productDetails__stateText}>
              Product not found
            </p>
          </div>
        </div>
      </div>
    );
  }

  const specs = [
    { label: 'Screen', value: product.screen, isShort: true },
    { label: 'Resolution', value: product.resolution, isShort: true },
    { label: 'Processor', value: product.processor, isShort: true },
    { label: 'RAM', value: product.ram, isShort: true },
    { label: 'Camera', value: product.camera, isShort: false },
    { label: 'Zoom', value: product.zoom, isShort: false },
    { label: 'Cell', value: product.cell.join(', '), isShort: false },
  ];

  const shortSpecs = specs.filter(spec => spec.isShort);

  const buildVariantLink = ({
    color = product.color,
    capacity = product.capacity,
  }: {
    color?: string;
    capacity?: string;
  }) => {
    return `/${category}/${product.namespaceId}-${capacity.toLowerCase()}-${normalizeColorForUrl(color)}`;
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.productDetails__header}>
        <Breadcrumbs productName={product.name} />

        <div className={styles.productDetails__headerText}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.productDetails__back}
          >
            <span className={styles.productDetails__backIcon}>
              <Chevron direction="left" />
            </span>
            <span className={styles.productDetails__backText}>Back</span>
          </button>

          <h1 className={styles.productDetails__title}>{product.name}</h1>
        </div>
      </div>
      <div className={styles.productDetails__wrapper}>
        <section className={styles.productDetails__hero}>
          <div className={styles.productDetails__gallery}>
            <ProductGallery
              images={product.images}
              productName={product.name}
              mainImage={mainImage}
              onImageSelect={setMainImage}
            />
          </div>

          <aside className={styles.productDetails__sidebar}>
            <div className={styles.productDetails__options}>
              <ProductOptions
                colors={product.colorsAvailable}
                selectedColor={product.color}
                capacities={product.capacityAvailable}
                selectedCapacity={product.capacity}
                onColorChange={color => navigate(buildVariantLink({ color }))}
                onCapacityChange={capacity =>
                  navigate(buildVariantLink({ capacity }))
                }
              />
              <div className={styles.productDetails__summary}>
                <div className={styles.productDetails__priceBlock}>
                  <span className={styles.productDetails__priceDiscount}>
                    ${product.priceDiscount}
                  </span>
                  <span className={styles.productDetails__priceRegular}>
                    ${product.priceRegular}
                  </span>
                </div>

                <ProductActions itemId={product.id} />
              </div>

              <div className={styles.productDetails__shortSpecs}>
                {shortSpecs.map(spec => (
                  <div
                    key={spec.label}
                    className={styles.productDetails__shortSpec}
                  >
                    <p className={styles.productDetails__shortSpecLabel}>
                      {spec.label}
                    </p>
                    <p className={styles.productDetails__shortSpecValue}>
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className={styles.productDetails__content}>
          <div className={styles.productDetails__about}>
            <h2 className={styles.productDetails__sectionTitle}>About</h2>
            <div className={styles.productDetails__divider} />

            {product.description.map(section => (
              <div
                className={styles.productDetails__descriptionBlock}
                key={section.title}
              >
                <h3 className={styles.productDetails__descriptionTitle}>
                  {section.title}
                </h3>
                <p className={styles.productDetails__descriptionText}>
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.productDetails__tech}>
            <h2 className={styles.productDetails__sectionTitle}>Tech specs</h2>
            <div className={styles.productDetails__divider} />

            <div className={styles.productDetails__techList}>
              {specs.map(spec => (
                <div
                  key={spec.label}
                  className={styles.productDetails__techRow}
                >
                  <p className={styles.productDetails__techLabel}>
                    {spec.label}
                  </p>
                  <p className={styles.productDetails__techValue}>
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {!recommendedLoading && !recommendedError && recommended.length > 0 && (
          <section className={styles.productDetails__recommended}>
            <ProductsCarousel
              title="You may also like"
              products={recommended}
            />
          </section>
        )}
      </div>
    </div>
  );
};
