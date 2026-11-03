import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { useEffect, useState } from 'react';
import { getProductDetails, getProducts } from '../shared/services/api';
import { Product, ProductDetail } from '../shared/types';
import { Loader } from '../../components/Loader';
import { useFavourites } from '../../context/FavouritesContext';
import { ProductSlider } from '../HomePage/components/ProductsSlider';
import classNames from 'classnames';
import { useCart } from '../../context/CartContext';
import { getNormalizedImagePath } from '../shared/getNormalizedImagePath';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const { isFavourite, toggleFavourite } = useFavourites();
  const { addToCart, removeFromCart, isInCart } = useCart();

  const isCurrentFavourite = product ? isFavourite(product.id) : false;
  const isAddedToCart = product ? isInCart(String(product.id)) : false;

  const getProductForActions = (p: ProductDetail): Product => ({
    id: p.id,
    itemId: String(p.id),
    category: p.category as Product['category'],
    name: p.name,
    fullPrice: p.priceRegular,
    price: p.priceDiscount,
    screen: p.screen,
    capacity: p.capacity,
    color: p.color,
    ram: p.ram,
    year: 2022,
    image: getNormalizedImagePath(p.images[0] || ''),
  });

  const handleLike = () => {
    if (!product) {
      return;
    }

    toggleFavourite(getProductForActions(product));
  };

  const handleCartClick = () => {
    if (!product) {
      return;
    }

    if (isAddedToCart) {
      removeFromCart(String(product.id));
    } else {
      addToCart(getProductForActions(product));
    }
  };

  useEffect(() => {
    if (!productId) {
      return;
    }

    let isCancelled = false;
    let timerId: NodeJS.Timeout;

    setIsError(false);
    setIsLoading(true);

    const startTime = Date.now();

    getProductDetails(productId)
      .then(data => {
        if (isCancelled) {
          return;
        }

        if (!data) {
          setIsError(true);
          setIsLoading(false);

          return;
        }

        const elapsedTime = Date.now() - startTime;
        const minLoaderTime = 300;
        const remainingTime = Math.max(0, minLoaderTime - elapsedTime);

        timerId = setTimeout(() => {
          if (isCancelled) {
            return;
          }

          setProduct(data);
          const firstImage = data.images?.[0] || '';

          setSelectedImage(getNormalizedImagePath(firstImage));
          setIsLoading(false);
        }, remainingTime);
      })
      .catch(() => {
        if (!isCancelled) {
          setIsError(true);
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [productId]);

  useEffect(() => {
    if (!product) {
      return;
    }

    const currentProductId = product.id;
    let isCancelled = false;

    getProducts()
      .then(products => {
        if (isCancelled) {
          return;
        }

        const normalizedProducts = products.map(p => ({
          ...p,
          image: getNormalizedImagePath(p.image),
        }));

        const filtered = normalizedProducts.filter(
          p => p.itemId !== currentProductId,
        );

        const shuffled = [...filtered];

        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));

          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        setSuggestedProducts(shuffled);
      })
      .catch(() => {});

    return () => {
      isCancelled = true;
    };
  }, [product]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !product) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  const formatColorForUrl = (colorStr: string) => {
    return colorStr.toLowerCase().replace(/\s+/g, '');
  };

  const formatCapacityForUrl = (capacityStr: string) => {
    return capacityStr.toLowerCase().replace(/\s+/g, '');
  };

  const formatCapacity = (capacity: string) => {
    return capacity.replace(/(\d+)\s*([A-Za-z]+)/, '$1 $2');
  };

  return (
    <div className={styles.productPage}>
      <div className={styles.breadcrumbs} data-cy="breadCrumbs">
        <Link to="/" className={styles.breadcrumbsLink}>
          <img
            className={styles.btnHome}
            src="./img/icons/home.svg"
            alt="Home"
          />
        </Link>

        <img src="./img/icons/arrow-right-disabled.svg" alt="" />

        <Link to={`/${product.category}`} className={styles.breadcrumbsLink}>
          {product.category}
        </Link>

        <img src="./img/icons/arrow-right-disabled.svg" alt="" />

        <span className={styles.breadcrumbsCurrent}>{product.name}</span>
      </div>

      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
        data-cy="backButton"
      >
        <img src="./img/icons/arrow-left.svg" alt="" />
        <span>Back</span>
      </button>

      <h3 className={styles.productTitle}>{product.name}</h3>

      <div className={styles.gallery}>
        <div className={styles.thumbnails}>
          {product.images.map(img => {
            const normalizedImg = getNormalizedImagePath(img);

            return (
              <button
                key={img}
                type="button"
                className={classNames(styles.thumbButton, {
                  [styles['thumbButton--active']]:
                    normalizedImg === selectedImage,
                })}
                onClick={() => setSelectedImage(normalizedImg)}
              >
                <img src={normalizedImg} alt={product.name} />
              </button>
            );
          })}
        </div>

        <div className={styles.mainImageWrapper}>
          <img
            src={selectedImage}
            alt={product.name}
            className={styles.mainImage}
          />
        </div>
      </div>

      <div className={styles.productActions}>
        <div className={styles.picker}>
          <span className={styles.pickerTitle}>Available colors</span>

          <div className={styles.pickerList}>
            {product.colorsAvailable.map(color => (
              <Link
                to={`/products/${product.namespaceId}-${formatCapacityForUrl(product.capacity)}-${formatColorForUrl(color)}`}
                key={color}
                style={{ backgroundColor: color }}
                className={classNames(styles.color, {
                  [styles['color--active']]:
                    color.toLowerCase() === product.color.toLowerCase(),
                })}
              >
                {color}
              </Link>
            ))}
          </div>
        </div>

        <div className={classNames(styles.picker, styles['picker--capacity'])}>
          <span className={styles.pickerTitle}>Select capacity</span>

          <div className={styles.pickerList}>
            {product.capacityAvailable.map(capacity => (
              <Link
                to={`/products/${product.namespaceId}-${formatCapacityForUrl(capacity)}-${formatColorForUrl(product.color)}`}
                key={capacity}
                className={classNames(styles.capacity, {
                  [styles['capacity--active']]:
                    capacity.toLowerCase() === product.capacity.toLowerCase(),
                })}
              >
                {formatCapacity(capacity)}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.priceBlock}>
          <span
            className={styles.priceDiscount}
          >{`$${product.priceDiscount}`}</span>

          {product.priceRegular && (
            <span className={styles.priceRegular}>${product.priceRegular}</span>
          )}
        </div>

        <div className={styles.buttonsGroup}>
          <button
            type="button"
            className={classNames(styles.addButton, {
              [styles['addButton--active']]: isAddedToCart,
            })}
            onClick={handleCartClick}
          >
            {isAddedToCart ? 'Added' : 'Add to cart'}
          </button>

          <button
            type="button"
            className={classNames(styles.favouriteButton, {
              [styles['favouriteButton--active']]: isCurrentFavourite,
            })}
            onClick={handleLike}
            aria-label={
              isCurrentFavourite
                ? 'Remove from favourites'
                : 'Add to favourites'
            }
          >
            <img
              src={
                isCurrentFavourite
                  ? './img/icons/heart-active.svg'
                  : './img/icons/heart.svg'
              }
              alt="Favourite"
            />
          </button>
        </div>

        <div className={styles.specsPreview}>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>Screen</span>
            <span className={styles.specValue}>{product.screen}</span>
          </div>

          <div className={styles.specRow}>
            <span className={styles.specLabel}>Resolution</span>
            <span className={styles.specValue}>{product.resolution}</span>
          </div>

          <div className={styles.specRow}>
            <span className={styles.specLabel}>Processor</span>
            <span className={styles.specValue}>{product.processor}</span>
          </div>

          <div className={styles.specRow}>
            <span className={styles.specLabel}>RAM</span>
            <span className={styles.specValue}>{product.ram}</span>
          </div>
        </div>
      </div>

      <div className={styles.about}>
        <h2 className={styles.sectionTitle}>About</h2>

        {product.description.map((item, index) => (
          <article key={`${item.title}-${index}`} className={styles.aboutBlock}>
            <h3 className={styles.title}>{item.title}</h3>
            {item.text.map((paragraph, pIndex) => (
              <p key={pIndex} className={styles.text}>
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>

      <div className={styles.techSpecs}>
        <h2 className={styles.sectionTitle}>Tech specs</h2>

        <div className={styles.specsPreview}>
          <div className={styles.specRow}>
            <span className={styles.techSpecLabel}>Screen</span>
            <span className={styles.techSpecValue}>{product.screen}</span>
          </div>

          <div className={styles.specRow}>
            <span className={styles.techSpecLabel}>Resolution</span>
            <span className={styles.techSpecValue}>{product.resolution}</span>
          </div>

          <div className={styles.specRow}>
            <span className={styles.techSpecLabel}>Processor</span>
            <span className={styles.techSpecValue}>{product.processor}</span>
          </div>

          <div className={styles.specRow}>
            <span className={styles.techSpecLabel}>RAM</span>
            <span className={styles.techSpecValue}>{product.ram}</span>
          </div>

          <div className={styles.specRow}>
            <span className={styles.techSpecLabel}>Built in memory</span>
            <span className={styles.techSpecValue}>{product.capacity}</span>
          </div>

          <div className={styles.specRow}>
            <span className={styles.techSpecLabel}>Camera</span>
            <span className={styles.techSpecValue}>{product.camera}</span>
          </div>

          <div className={styles.specRow}>
            <span className={styles.techSpecLabel}>Zoom</span>
            <span className={styles.techSpecValue}>{product.zoom}</span>
          </div>

          <div className={styles.specRow}>
            <span className={styles.techSpecLabel}>Cell</span>
            <span className={styles.techSpecValue}>
              {product.cell.slice(0, 3).join(', ')}
            </span>
          </div>
        </div>
      </div>

      {suggestedProducts.length > 0 && (
        <div className={styles.suggestedProducts}>
          <ProductSlider
            title="You may also like"
            products={suggestedProducts}
          />
        </div>
      )}
    </div>
  );
};
