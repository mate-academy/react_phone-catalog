import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './ProductDetailsPage.module.scss';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { useStore } from '../../context';
import { ProductsSlider } from '../../components/ProductsSlider';

const colorMap: Record<string, string> = {
  black: '#363636',
  gold: '#F9E5C9',
  yellow: '#FEE863',
  green: '#3D5347',
  midnightgreen: '#4E5851',
  silver: '#E2E4E1',
  spacegray: '#535150',
  red: '#A50011',
  white: '#F8F7F2',
  purple: '#D1CDDA',
  coral: '#FF7F50',
  rosegold: '#B76E79',
};

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, favorites, addToFavorites, cart } =
    useStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [currentImage, setCurrentImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    fetch('./api/products.json')
      .then(res => res.json())
      .then((productsData: Product[]) => {
        const foundProduct = productsData.find(p => p.itemId === productId);

        setProduct(foundProduct || null);

        if (foundProduct) {
          fetch(`./api/${foundProduct.category}.json`)
            .then(res => res.json())
            .then((detailsData: ProductDetails[]) => {
              const details = detailsData.find(d => d.id === productId);

              setProductDetails(details || null);

              if (details && details.images && details.images.length > 0) {
                setCurrentImage(details.images[0]);
              } else {
                setCurrentImage(foundProduct.image);
              }
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
        } else {
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [productId]);

  useEffect(() => {
    if (product) {
      window.scrollTo(0, 0);
    }
  }, [product]);

  const isAdded = product
    ? cart.some(item => item.id === product.itemId)
    : false;
  const isFavorite = product
    ? favorites.some(item => item.itemId === product.itemId)
    : false;

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.loading}>Loading...</h1>
      </div>
    );
  }

  if (!isLoading && !product) {
    return (
      <div className={styles.notFoundContainer}>
        <img
          src="img/product-not-found.png"
          alt="Product not found"
          className={styles.notFoundImage}
        />
        <h1 className={styles.notFoundTitle}>Product was not found</h1>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          Back to home
        </button>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <h1>Something went wrong</h1>
      </div>
    );
  }

  const p = product!;
  const d = productDetails;

  const images = d?.images || [p.image];
  const availableColors = d?.colorsAvailable || [p.color];
  const availableCapacities = d?.capacityAvailable || [p.capacity];

  const getVariantLink = (type: 'color' | 'capacity', value: string) => {
    if (!d || !d.namespaceId) {
      return '#';
    }

    const color = type === 'color' ? value : d.color;
    const capacity = type === 'capacity' ? value : d.capacity;

    const formattedCapacity = capacity.toLowerCase().replace(/\s+/g, '');
    const formattedColor = color.toLowerCase().replace(/\s+/g, '-');

    return `/${p.category}/${d.namespaceId}-${formattedCapacity}-${formattedColor}`;
  };

  const toggleCart = () => {
    if (isAdded) {
      removeFromCart(p.itemId);
    } else {
      addToCart(p);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadLink}>
          <img
            src="img/icons/Home.svg"
            alt="Home"
            className={styles.homeIcon}
          />
        </Link>
        <img
          src="img/icons/Chevron (Arrow Right).svg"
          alt="Arrow"
          className={styles.arrowIcon}
        />
        <Link to={`/${p.category}`} className={styles.breadLink}>
          {p.category}
        </Link>
        <img
          src="img/icons/Chevron (Arrow Right).svg"
          alt="Arrow"
          className={styles.arrowIcon}
        />
        <span className={styles.breadText}>{p.name}</span>
      </div>

      <button className={styles.backBtnText} onClick={() => navigate(-1)}>
        <img
          src="img/icons/Chevron (Arrow Left).svg"
          alt="Back"
          style={{ marginRight: 4 }}
        />
        Back
      </button>

      <h1 className={styles.title}>{p.name}</h1>

      <div className={styles.grid}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {images.map((img, index) => (
              <div
                key={index}
                className={classNames(styles.thumbnailWrapper, {
                  [styles.active]: currentImage === img,
                })}
                onClick={() => setCurrentImage(img)}
              >
                <img
                  src={`${img}`}
                  alt="Thumbnail"
                  className={styles.thumbnail}
                />
              </div>
            ))}
          </div>

          <div className={styles.mainImageWrapper}>
            <img
              src={`${currentImage}`}
              alt={p.name}
              className={styles.mainImage}
            />
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.topRow}>
            <span className={styles.labelColors}>Available colors</span>
            <span className={styles.idText}>ID: 802390</span>
          </div>

          <div className={styles.colorsRow}>
            {availableColors.map(color => (
              <Link
                key={color}
                to={getVariantLink('color', color)}
                className={classNames(styles.colorBtn, {
                  [styles.selected]: d ? color === d.color : color === p.color,
                })}
                style={{ backgroundColor: colorMap[color] || color }}
                title={color}
              />
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.selectorBlock}>
            <span className={styles.selectorLabel}>Select capacity</span>
            <div className={styles.capacityList}>
              {availableCapacities.map(cap => (
                <Link
                  key={cap}
                  to={getVariantLink('capacity', cap)}
                  className={classNames(styles.capacityBtn, {
                    [styles.selected]: d
                      ? cap === d.capacity
                      : cap === p.capacity,
                  })}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {cap}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.priceRow}>
            <span className={styles.price}>${d?.priceDiscount || p.price}</span>
            {(d?.priceRegular || p.fullPrice) !==
              (d?.priceDiscount || p.price) && (
              <span className={styles.fullPrice}>
                ${d?.priceRegular || p.fullPrice}
              </span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              className={classNames(styles.addToCart, {
                [styles.isAdded]: isAdded,
              })}
              onClick={toggleCart}
            >
              {isAdded ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              className={classNames(styles.favoriteBtn, {
                [styles.isFavorite]: isFavorite,
              })}
              onClick={() => addToFavorites(p)}
            >
              <img
                src={
                  isFavorite
                    ? 'img/icons/Favourites Filled (Heart Like).svg'
                    : 'img/icons/Favourites (Heart Like).svg'
                }
                alt="Favorite"
              />
            </button>
          </div>

          <div className={styles.specsSmall}>
            <div className={styles.specRow}>
              <span className={styles.specName}>Screen</span>
              <span className={styles.specValue}>{p.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Resolution</span>
              <span className={styles.specValue}>
                {d?.resolution || p.resolution}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Processor</span>
              <span className={styles.specValue}>
                {d?.processor || p.processor}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>RAM</span>
              <span className={styles.specValue}>{p.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.aboutSpecs}>
        <div className={styles.about}>
          <h3 className={styles.sectionHeader}>About</h3>
          <div className={styles.description}>
            {d?.description ? (
              d.description.map((section, idx) => (
                <React.Fragment key={idx}>
                  <h4 className={styles.descTitle}>{section.title}</h4>
                  {section.text.map((textLine, i) => (
                    <p key={i} className={styles.descText}>
                      {textLine}
                    </p>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <p className={styles.descText}>No description available.</p>
            )}
          </div>
        </div>
        <div className={styles.specs}>
          <h3 className={styles.sectionHeader}>Tech specs</h3>
          <div className={styles.specsList}>
            <div className={styles.specRowLarge}>
              <span className={styles.specName}>Screen</span>
              <span className={styles.specValue}>{p.screen}</span>
            </div>
            <div className={styles.specRowLarge}>
              <span className={styles.specName}>Resolution</span>
              <span className={styles.specValue}>
                {d?.resolution || p.resolution}
              </span>
            </div>
            <div className={styles.specRowLarge}>
              <span className={styles.specName}>Processor</span>
              <span className={styles.specValue}>
                {d?.processor || p.processor}
              </span>
            </div>
            <div className={styles.specRowLarge}>
              <span className={styles.specName}>RAM</span>
              <span className={styles.specValue}>{p.ram}</span>
            </div>
            <div className={styles.specRowLarge}>
              <span className={styles.specName}>Built in memory</span>
              <span className={styles.specValue}>{p.capacity}</span>
            </div>
            <div className={styles.specRowLarge}>
              <span className={styles.specName}>Camera</span>
              <span className={styles.specValue}>{d?.camera || p.camera}</span>
            </div>
            <div className={styles.specRowLarge}>
              <span className={styles.specName}>Zoom</span>
              <span className={styles.specValue}>{d?.zoom || p.zoom}</span>
            </div>
            <div className={styles.specRowLarge}>
              <span className={styles.specName}>Cell</span>
              <span className={styles.specValue}>
                {Array.isArray(d?.cell || p.cell)
                  ? (d?.cell || p.cell)?.join(', ')
                  : d?.cell || p.cell}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.suggestions}>
        <h2 className={styles.sectionTitle}>You may also like</h2>
        <ProductsSlider sortBy="age" />
      </div>
    </div>
  );
};
