import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFav } from '../../context/FavContext';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { addToCart, isInCart } = useCart();
  const { toggleFav, isInFav } = useFav();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdded = product ? isInCart(product.id) : false;
  const isFav = product ? isInFav(product.id) : false;

  const isTablets = location.pathname.includes('tablets');
  const isAccessories = location.pathname.includes('accessories');

  let categoryName = 'Phones';
  let categoryPath = '/phones';
  let categoryApiFile = 'phones.json';
  let currentCategorySlug = 'phones';

  if (isTablets) {
    categoryName = 'Tablets';
    categoryPath = '/tablets';
    categoryApiFile = 'tablets.json';
    currentCategorySlug = 'tablets';
  } else if (isAccessories) {
    categoryName = 'Accessories';
    categoryPath = '/accessories';
    categoryApiFile = 'accessories.json';
    currentCategorySlug = 'accessories';
  }

  const fixImage = (url: string) => {
    if (!url) {
      return '';
    }

    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    const webpUrl = cleanUrl.replace('.jpg', '.webp');

    return `${import.meta.env.BASE_URL}${webpUrl}`;
  };

  const getNewId = (
    namespaceId: string,
    newColor: string,
    newCapacity: string,
  ) => {
    const normColor = newColor.toLowerCase().replace(/ /g, '-');
    const normCapacity = newCapacity
      ? newCapacity.toLowerCase().replace(/ /g, '')
      : '';

    if (!normCapacity) {
      return `${namespaceId}-${normColor}`;
    }

    return `${namespaceId}-${normCapacity}-${normColor}`;
  };

  const colorMap: Record<string, string> = {
    black: '#1c1c1b',
    gold: '#F9E5C9',
    silver: '#e2e4e1',
    red: '#a50011',
    rosegold: '#e6c7c2',
    spacegray: '#535150',
    midnightgreen: '#4e5851',
    white: '#f9f6ef',
    purple: '#d1cdda',
    green: '#aee1cd',
    yellow: '#ffe681',
    coral: '#ff7f50',
    grey: '#808080',
    skyblue: '#87CEEB',
    graphite: '#41424C',
    sierrablue: '#9BB5CE',
    pink: '#fae7e8',
    starlight: '#fbf7f4',
    blue: '#215E7C',
    midnight: '#191f28',
    starlight_new: '#f0fcf0',
  };

  const getSuggestedProducts = (allProducts: Product[], currentId: string) => {
    return allProducts
      .filter(item => item.itemId !== currentId && item.id !== currentId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  };

  const handleIconError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const target = e.currentTarget;

    target.style.display = 'none';
  };

  const checkScroll = () => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
    }
  };

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -288, behavior: 'smooth' });
      setTimeout(checkScroll, 500);
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 288, behavior: 'smooth' });
      setTimeout(checkScroll, 500);
    }
  };

  useEffect(() => {
    const listElement = listRef.current;
    const handleScroll = () => {
      checkScroll();
    };

    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      checkScroll();
      setTimeout(checkScroll, 500);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener('scroll', handleScroll);
      }

      window.removeEventListener('resize', handleScroll);
    };
  }, [suggestedProducts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const listResponse = await fetch(
          `${import.meta.env.BASE_URL}api/${categoryApiFile}`,
        );

        if (!listResponse.ok) {
          throw new Error('Source data not found');
        }

        const listData: Product[] = await listResponse.json();

        setSuggestedProducts(getSuggestedProducts(listData, productId || ''));

        let data: Product | null = null;

        try {
          const detailResponse = await fetch(
            `${import.meta.env.BASE_URL}api/products/${productId}.json`,
          );
          const contentType = detailResponse.headers.get('content-type');

          if (detailResponse.ok && contentType?.includes('application/json')) {
            const rawData = await detailResponse.json();

            data = { ...rawData, category: currentCategorySlug };
          }
        } catch {}

        if (!data) {
          const foundItem = listData.find(
            item => item.id === productId || item.itemId === productId,
          );

          if (!foundItem) {
            throw new Error('Product not found on server');
          }

          data = foundItem;
        }

        setProduct(data);
        if (data) {
          const mainImg =
            data.images && data.images.length > 0 ? data.images[0] : data.image;

          if (mainImg) {
            setSelectedImage(mainImg);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Loading error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, categoryApiFile, currentCategorySlug]);

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    const cartProduct: Product = {
      ...product,
      image: product.images?.[0] || product.image || '',
      price: product.priceDiscount || product.price || 0,
    };

    addToCart(cartProduct);
  };

  const handleToggleFav = () => {
    if (!product) {
      return;
    }

    const favProduct: Product = {
      ...product,
      image: product.images?.[0] || product.image || '',
      price: product.priceDiscount || product.price || 0,
    };

    toggleFav(favProduct);
  };

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error || !product) {
    return <NotFoundPage />;
  }

  const currentPrice = product.priceDiscount || product.price;
  const oldPrice = product.priceRegular || product.fullPrice;
  const showOldPrice = oldPrice && oldPrice !== currentPrice;

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link to="/">
          <img
            src={`${import.meta.env.BASE_URL}/img/icons/Home.svg`}
            alt="Home"
            onError={handleIconError}
          />
        </Link>
        <span>&gt;</span>
        <Link to={categoryPath}>{categoryName}</Link>
        <span>&gt;</span>
        <span className={styles.activeName}>{product.name}</span>
      </nav>

      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        <span>&lt;</span> Back
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.grid}>
        <div className={styles.galleryContainer}>
          <div className={styles.thumbnails}>
            {product.images?.map((imgUrl, index) => {
              const fixedUrl = fixImage(imgUrl);
              const isActive = selectedImage === imgUrl;

              return (
                <div
                  key={index}
                  className={`${styles.thumbnailBox} ${isActive ? styles.active : ''}`}
                  onClick={() => setSelectedImage(imgUrl)}
                >
                  <img src={fixedUrl} alt="thumb" />
                </div>
              );
            })}
          </div>
          <div className={styles.mainImage}>
            <img
              src={selectedImage ? fixImage(selectedImage) : ''}
              alt={product.name}
            />
          </div>
        </div>

        <div className={styles.detailsWrapper}>
          <div className={styles.optionsBlock}>
            <div className={styles.idText}>ID: {product.id}</div>

            <div className={styles.optionLabel}>Available colors</div>
            <div className={styles.colorsList}>
              {product.colorsAvailable?.map((c, i) => {
                const targetId = getNewId(
                  product.namespaceId || product.itemId || '',
                  c,
                  product.capacity,
                );
                const isActive = c === product.color;

                return (
                  <Link
                    key={i}
                    to={`${categoryPath}/${targetId}`}
                    title={c}
                    className={`${styles.colorCircle} ${isActive ? styles.active : ''}`}
                    style={{ backgroundColor: colorMap[c] || c }}
                  />
                );
              })}
            </div>

            <div className={styles.optionLabel}>Select capacity</div>
            <div className={styles.capacityList}>
              {product.capacityAvailable?.map((cap, i) => {
                const targetId = getNewId(
                  product.namespaceId || product.itemId || '',
                  product.color,
                  cap,
                );
                const isActive = cap === product.capacity;

                return (
                  <Link
                    key={i}
                    to={`${categoryPath}/${targetId}`}
                    className={`${styles.capacityBtn} ${isActive ? styles.active : ''}`}
                  >
                    {cap}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className={styles.pricesBlock}>
            <span className={styles.price}>${currentPrice}</span>
            {showOldPrice && (
              <span className={styles.fullPrice}>${oldPrice}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              onClick={handleAddToCart}
              className={`${styles.addToCart} ${isAdded ? styles.added : ''}`}
            >
              {isAdded ? 'Added' : 'Add to cart'}
            </button>
            <button onClick={handleToggleFav} className={styles.favoriteBtn}>
              <img
                src={
                  isFav
                    ? `${import.meta.env.BASE_URL}/img/icons/Heart Like.svg`
                    : `${import.meta.env.BASE_URL}/img/icons/Heart.svg`
                }
                alt="Fav"
              />
            </button>
          </div>

          <div className={styles.smallSpecs}>
            <div className={styles.specRowSmall}>
              <span className={styles.specName}>Screen</span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
            <div className={styles.specRowSmall}>
              <span className={styles.specName}>Resolution</span>
              <span className={styles.specValue}>{product.resolution}</span>
            </div>
            <div className={styles.specRowSmall}>
              <span className={styles.specName}>Processor</span>
              <span className={styles.specValue}>{product.processor}</span>
            </div>
            <div className={styles.specRowSmall}>
              <span className={styles.specName}>RAM</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.descriptionSection}>
        <div className={styles.about}>
          <h2>About</h2>
          {product.description?.map((descPart, index) => (
            <div key={index}>
              <h3>{descPart.title}</h3>
              {Array.isArray(descPart.text) ? (
                descPart.text.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p>{descPart.text}</p>
              )}
            </div>
          ))}
        </div>

        <div className={styles.techSpecs}>
          <h2>Tech specs</h2>
          <div className={styles.specsList}>
            <div className={styles.specRow}>
              <span className={styles.specName}>Screen</span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Resolution</span>
              <span className={styles.specValue}>{product.resolution}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Processor</span>
              <span className={styles.specValue}>{product.processor}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>RAM</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
            {product.camera && (
              <div className={styles.specRow}>
                <span className={styles.specName}>Camera</span>
                <span className={styles.specValue}>{product.camera}</span>
              </div>
            )}
            {product.zoom && (
              <div className={styles.specRow}>
                <span className={styles.specName}>Zoom</span>
                <span className={styles.specValue}>{product.zoom}</span>
              </div>
            )}
            {product.cell && (
              <div className={styles.specRow}>
                <span className={styles.specName}>Cell</span>
                <span className={styles.specValue}>
                  {product.cell?.join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.suggestionsSection}>
        <div className={styles.suggestionsHeader}>
          <h2 className={styles.suggestionsTitle}>You may also like</h2>
          <div className={styles.buttons}>
            <button
              onClick={scrollLeft}
              className={cn(styles.navBtn, {
                [styles.disabled]: !canScrollLeft,
              })}
              disabled={!canScrollLeft}
            >
              <img
                src={`${import.meta.env.BASE_URL}/img/icons/arrow-left.svg`}
                alt="Prev"
              />
            </button>

            <button
              onClick={scrollRight}
              className={cn(styles.navBtn, {
                [styles.disabled]: !canScrollRight,
              })}
              disabled={!canScrollRight}
            >
              <img
                src={`${import.meta.env.BASE_URL}/img/icons/arrow-right.svg`}
                alt="Next"
              />
            </button>
          </div>
        </div>

        <ProductsList
          products={suggestedProducts}
          ref={listRef}
          variant="slider"
        />
      </div>
    </div>
  );
};
