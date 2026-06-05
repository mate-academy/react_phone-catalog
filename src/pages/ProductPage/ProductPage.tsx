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
import { useFavorite } from '../FavoritePage/context/FavoriteContext';
import { COLOR_MAP } from '../../utils/colorMap';
import { HeartIcon } from '../../components/icons/HeartIcon';
import classNames from 'classnames';

export const ProductPage = () => {
  const [product, setProduct] = useState<ProductDetails>();
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart, isInCart } = useCart();
  const { addToFavorite, removeFromFavorite, isFavorite } = useFavorite();

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
        itemId: String(prod.id),
        category: category!,
        image: `/${prod.images[0]}`,
        price: prod.priceDiscount,
        fullPrice: prod.priceRegular,
      }));
  }, [product, products, category]);

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
    const targetProduct = products.find(
      p =>
        p.namespaceId === product?.namespaceId &&
        p.color === color &&
        p.capacity === product?.capacity,
    );

    return targetProduct
      ? `/${category}/${targetProduct.id}`
      : `/${category}/${productId}`;
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    addToCart({
      ...product,
      image: product.images[0],
      price: product.priceDiscount,
    });
  };

  const handleAddToFavorite = () => {
    if (!product) {
      return;
    }

    addToFavorite({
      ...product,
      image: product.images[0],
      price: product.priceDiscount,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return <h1 className={styles.errorMessage}>Something went wrong</h1>;
  }

  if (!product && !isLoading) {
    return <h1 className={styles.errorMessage}>Product was not found</h1>;
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
                  style={{ backgroundColor: COLOR_MAP[color] }}
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
              className={classNames(styles.cartButton, {
                [styles.cartButtonActive]: isInCart(String(product?.id)),
              })}
              onClick={() => {
                if (product && !isInCart(String(product.id))) {
                  handleAddToCart();
                }
              }}
              disabled={isInCart(String(product?.id))}
            >
              {isInCart(String(product?.id)) ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              className={classNames(styles.favoriteButton, {
                [styles.favoriteButtonActive]: isFavorite(String(product?.id)),
              })}
              onClick={() => {
                if (isFavorite(String(product?.id))) {
                  removeFromFavorite(String(product?.id));
                } else {
                  handleAddToFavorite();
                }
              }}
            >
              <HeartIcon isActive={isFavorite(String(product?.id))} />
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
      </div>
      <ProductsSlider
        title={'You may also like'}
        products={sliderProducts}
        className={styles['product-page']}
      />
    </div>
  );
};
