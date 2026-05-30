import { useEffect, useState, useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styles from './ProductPage.module.scss';
import { Path } from '../../components/Path';
import { loadProductDetails } from '../../api/getData';
import { catalogConfig, CatalogType } from '../../utils/catalogConfig';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductsSlider } from '../HomePage/components/ProductSlider';
import { SpecsTable } from '../../components/SpecsTable/SpecsTable';
import { SpecRow } from '../../components/SpecsTable/SpecsTable';
import { Loader } from '../../components/Loader';
import { ButtonBack } from '../../components/ButtonBack';
import { useCart } from '../CartPage/context/CartContext';
import classNames from 'classnames';

export const ProductPage = () => {
  const [product, setProduct] = useState<ProductDetails>();
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const { category, productId } = useParams();
  const capitalized = (category!.charAt(0).toUpperCase() +
    category!.slice(1)) as CatalogType;
  const config = catalogConfig[capitalized];

  useEffect(() => {
    const loadingData = async () => {
      setIsLoading(true);
      setActiveIndex(0);
      try {
        const data = await loadProductDetails(config.apiProduct);
        const item = data.find(prod => prod.id === productId);

        setProduct(item);
        setProducts(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadingData();
  }, [config.apiProduct, productId]);

  const sliderProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    const currentBase = product.name.split(' ').slice(0, 3).join(' ');

    return products
      .filter(prod => {
        const prodBase = prod.name.split(' ').slice(0, 3).join(' ');

        return prodBase === currentBase && prod.id !== product.id;
      })
      .map(prod => ({
        ...prod,
        image: `/${prod.images[0]}`,
        price: prod.priceDiscount,
        fullPrice: prod.priceRegular,
      }));
  }, [products, product]);

  const shortSpecs = [
    { label: 'Screen', value: product?.screen },
    { label: 'Capacity', value: product?.capacity },
    { label: 'RAM', value: product?.ram },
  ].filter((spec): spec is SpecRow => spec.value !== undefined);

  const fullSpecs = [
    { label: 'Screen', value: product?.screen },
    { label: 'Resolution', value: product?.resolution },
    { label: 'Processor', value: product?.processor },
    { label: 'RAM', value: product?.ram },
    { label: 'Built in memory', value: product?.capacity },
    { label: 'Camera', value: product?.camera },
    { label: 'Zoom', value: product?.zoom },
    { label: 'Cell', value: product?.cell.join(', ') },
  ].filter((spec): spec is SpecRow => spec.value !== undefined);

  const colorMap: Record<string, string> = {
    midnight: '#171E27',
    starlight: '#F9F3EE',
    gold: '#F9E5C9',
    silver: '#F5F5F0',
    graphite: '#5C5B57',
    sierrablue: '#9BB5CE',
    spaceblack: '#1C1C1E',
    'space gray': '#4C4C4C',
    spacegray: '#4C4C4C',
    'midnight green': '#5F7170',
    green: '#364935',
    red: '#A50011',
    purple: '#B89FCA',
    'deep purple': '#3D2B55',
    yellow: '#FFE566',
    blue: '#215E7C',
    pink: '#FAE0D8',
    black: '#1C1C1E',
    white: '#F5F5F0',
  };

  const getCapacityLink = (capacity: string) => {
    const targetProduct = products.find(
      prod =>
        prod.namespaceId === product?.namespaceId &&
        prod.color === product?.color &&
        prod.capacity === capacity,
    );

    return targetProduct
      ? `/${category}/${targetProduct.id}`
      : `/${category}/${productId}`;
  };

  const getColorLink = (color: string) => {
    const currentColor = product?.color.replace(/ /g, '-') ?? '';
    const newColor = color.replace(/ /g, '-');
    const newProductId = productId?.replace(currentColor, newColor);

    return `/${category}/${newProductId}`;
  };

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.container}>
        <Path productId={productId} category={category!} />
        <ButtonBack />
        <h2 className={styles.title}>{product?.name}</h2>
        <div className={styles.galary}>
          <div className={styles.sideImages}>
            {product?.images.map((image, index) => (
              <img
                key={index}
                src={`/${image}`}
                alt={`image ${index}`}
                className={classNames(styles.image, {
                  [styles.active]: activeIndex === index,
                })}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <img
            src={`/${product?.images[activeIndex]}`}
            alt="main image"
            className={styles.mainImage}
          />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.availableColors}>
            <p className={styles.sectionTitle}>Available colors</p>
            <div className={styles.colorContainer}>
              {product?.colorsAvailable.map(color => (
                <NavLink
                  key={color}
                  to={getColorLink(color)}
                  className={`${styles.color} ${
                    color === product.color ? styles.isActiveColor : ''
                  }`}
                  style={{ backgroundColor: colorMap[color] }}
                ></NavLink>
              ))}
            </div>
          </div>

          <div className={styles.selectCapacity}>
            <p className={styles.sectionTitle}>Select capacity</p>
            <div className={styles.capacityContainer}>
              {product?.capacityAvailable.map(capacity => (
                <NavLink
                  key={capacity}
                  to={getCapacityLink(capacity)}
                  className={`${styles.capacity} ${
                    capacity === product.capacity ? styles.isActiveCapacity : ''
                  }`}
                >
                  {capacity}
                </NavLink>
              ))}
            </div>
          </div>

          <div className={styles.prices}>
            <p className={styles.price}>${product?.priceDiscount}</p>
            {product && product.priceDiscount < product.priceRegular && (
              <p className={styles.fullPrice}>${product?.priceRegular}</p>
            )}
          </div>

          <div className={styles.actions}>
            <button
              className={styles.cartButton}
              onClick={() => {
                if (product) {
                  if (isInCart(String(product.id))) {
                    removeFromCart(String(product.id));
                  } else {
                    addToCart(product);
                  }
                }
              }}
            >
              {isInCart(String(product?.id) ?? '')
                ? 'Added to cart'
                : 'Add to cart'}
            </button>
            <button
              className={classNames(styles.favoriteButton, {
                [styles.favoriteButtonActive]: isFavorite,
              })}
              onClick={() => setIsFavorite(prev => !prev)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                  2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                  C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                  c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill={isFavorite ? '#ac2424' : 'none'}
                  stroke={isFavorite ? '#ac2424' : '#0F0F11'}
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
          <SpecsTable specs={shortSpecs} />
        </div>
        <div className={styles.fullInfo}>
          <div className={styles.about}>
            <h2 className={styles.secondTitle}>About</h2>

            {product?.description.map((section, index) => (
              <div key={index} className={styles.descriptionSection}>
                <h4 className={styles.descriptionTitle}>{section.title}</h4>

                {section.text.map((paragraph, i) => (
                  <p key={i} className={styles.descriptionText}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.techSpecs}>
            <h2 className={styles.secondTitle}>Tech specs</h2>
            <SpecsTable specs={fullSpecs} variant="small" />
          </div>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <ProductsSlider
            title={'You may also like'}
            products={sliderProducts}
          />
        </div>
      </div>
    </div>
  );
};
