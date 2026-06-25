/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { useGlobal } from '../../components/CartContext/CartContext';
import HeartIcon from '../../api/icons/heart.svg';
import like from '../../api/buttoms/Union.svg';
import phones from '../../../src/data/phones.json';
import tablets from '../../../src/data/tablets.json';
import accessories from '../../../src/data/accessories.json';
import home from '../../api/icons/Home.svg';
import { ProductCard } from '../../components/ProduuctCard/ProductCard';

interface ProductData {
  id: number;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
}

const getColorHex = (color: string): string => {
  const colors: Record<string, string> = {
    black: '#1f2020',
    green: '#ade0c9',
    yellow: '#f9e48c',
    white: '#f0f0f0',
    purple: '#dfd3e3',
    red: '#ba0c2e',
    spacegray: '#535150',
    midnight: '#191970',
    gold: '#f9e5c9',
    silver: '#ebebe3',
    graphite: '#4c4c4d',
    sierrablue: '#92a6be',
    pink: '#fae3e3',
  };

  return colors[color.toLowerCase().replace(/\s+/g, '')] || color;
};

const allProducts = [...phones, ...tablets, ...accessories];

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [error, setError] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const { cart, addToCart, removeFromCart, favorites, addToFavorites } =
    useGlobal();
  const [suggestedProducts, setSuggestedProducts] = useState<ProductData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);

    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const nextSlide = () => {
    if (currentIndex < suggestedProducts.length - visibleCards) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setError(false);
    const currentProduct = allProducts.find(p => p.id === productId);

    if (currentProduct) {
      setProductData(currentProduct as unknown as ProductData);
      setMainImage(currentProduct.images[0]);
    } else {
      setError(true);
    }

    const shuffled = [...allProducts]
      .filter(p => p.id !== productId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 12);

    setSuggestedProducts(shuffled as unknown as ProductData[]);
    setCurrentIndex(0);
  }, [productId]);

  if (error) {
    return <div className={styles.error}>Product not found.</div>;
  }

  if (!productData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const getNewProductUrl = (cap: string, col: string) => {
    const category = productData.category;
    const id = `${productData.namespaceId}-${cap.toLowerCase()}-${col.toLowerCase().replace(/\s+/g, '-')}`;

    return `/${category}/${id}`;
  };

  // Функция для безопасного формирования пути к картинкам из папки public
  const getSafeImageUrl = (imagePath: string) => {
    if (!imagePath) {
      return '';
    }

    // 1. Очищаем от начальных точек и слэшей
    let cleanPath = imagePath.replace(/^(\.\.\/|\.\/|\/)/, '');

    // 2. Если путь НЕ начинается с "img/", но и не содержит "api/", добавляем "img/"
    if (!cleanPath.startsWith('img/') && !cleanPath.startsWith('api/')) {
      cleanPath = `img/${cleanPath}`;
    }

    // 3. Формируем правильный базовый URL со слэшем на конце
    const baseUrl = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;

    return `${baseUrl}${cleanPath}`;
  };

  const formatProduct = (p: ProductData) =>
    ({
      ...p,
      itemId: p.id,
      fullPrice: p.priceRegular,
      price: p.priceDiscount,
      image: getSafeImageUrl(p.images[0]),
    }) as any;

  const handleAddToCart = (e: React.MouseEvent, product: ProductData) => {
    e.preventDefault();
    e.stopPropagation();
    const isInCart = cart.some(item => item.id === product.id);

    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(formatProduct(product));
    }
  };

  const handleAddToFavorite = (e: React.MouseEvent, product: ProductData) => {
    e.preventDefault();
    e.stopPropagation();
    addToFavorites(formatProduct(product));
  };

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumbs}>
        <Link to="/">
          <img src={home} alt="home" />
        </Link>
        <span>{'>'}</span>
        {/* ТУТ ИСПРАВЛЕНО: Преобразуем первую букву категории в заглавную */}
        <Link to={`/${productData.category}`}>
          {productData.category
            ? productData.category.charAt(0).toUpperCase() +
              productData.category.slice(1)
            : ''}
        </Link>
        <span>{'>'}</span>
        <p>{productData.name}</p>
      </nav>

      <h1 className={styles.title}>{productData.name}</h1>

      <div className={styles.productGrid}>
        <div className={styles.imageSection}>
          <div className={styles.thumbnails}>
            {productData.images.map(img => (
              <div
                key={img}
                className={`${styles.thumb} ${mainImage === img ? styles.active : ''}`}
                onClick={() => setMainImage(img)}
              >
                {/* Безопасный путь к превью */}
                <img src={getSafeImageUrl(img)} alt="thumb" />
              </div>
            ))}
          </div>
          <div className={styles.mainImage}>
            {/* Безопасный путь к главной картинке */}
            <img src={getSafeImageUrl(mainImage)} alt="main" />
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.selectBlock}>
            <p className={styles.label}>Available colors</p>
            <div className={styles.colors}>
              {productData.colorsAvailable.map(c => (
                <Link
                  key={c}
                  to={getNewProductUrl(productData.capacity, c)}
                  className={`${styles.colorCircle} ${productData.color === c ? styles.activeColor : ''}`}
                  style={{ backgroundColor: getColorHex(c) }}
                />
              ))}
            </div>
          </div>

          <div className={styles.selectBlock}>
            <p className={styles.label}>Select capacity</p>
            <div className={styles.capacities}>
              {productData.capacityAvailable.map(cap => (
                <Link
                  key={cap}
                  to={getNewProductUrl(cap, productData.color)}
                  className={`${styles.capacityBtn} ${productData.capacity === cap ? styles.activeCapacity : ''}`}
                >
                  {cap}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.priceBlock}>
            <span className={styles.currentPrice}>
              ${productData.priceDiscount}
            </span>
            <span className={styles.oldPrice}>${productData.priceRegular}</span>
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.addBtn} ${cart.some(i => i.id === productData.id) ? styles.inCart : ''}`}
              onClick={e => handleAddToCart(e, productData)}
            >
              {cart.some(i => i.id === productData.id)
                ? 'Added'
                : 'Add to cart'}
            </button>
            <button
              className={styles.favBtn}
              onClick={e => handleAddToFavorite(e, productData)}
            >
              <img
                src={
                  favorites.some(i => i.id === productData.id)
                    ? like
                    : HeartIcon
                }
                alt="fav"
              />
            </button>
          </div>

          <div className={styles.shortSpecs}>
            {[
              ['Screen', productData.screen],
              ['Resolution', productData.resolution],
              ['Processor', productData.processor],
              ['RAM', productData.ram],
            ].map(([l, v]) => (
              <div key={l} className={styles.shortSpecRow}>
                <span>{l}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.about}>
          <h2>About</h2>
          <div className={styles.divider} />
          {productData.description.map(s => (
            <div key={s.title} className={styles.descriptionSection}>
              <h3>{s.title}</h3>
              {s.text.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.specs}>
          <h2>Tech specs</h2>
          <div className={styles.divider} />
          {[
            ['Screen', productData.screen],
            ['Resolution', productData.resolution],
            ['Processor', productData.processor],
            ['RAM', productData.ram],
            ['Built in memory', productData.capacity],
            ['Cell', productData.cell.join(', ')],
          ].map(([l, v]) => (
            <div key={l} className={styles.specsRow}>
              <span>{l}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.suggestedSection}>
        <div className={styles.suggestedHeader}>
          <h2>You may also like</h2>
          <div className={styles.sliderButtons}>
            <button
              onClick={prevSlide}
              className={`${styles.arrowBtn} ${currentIndex === 0 ? styles.disabled : ''}`}
            >
              {'<'}
            </button>
            <button
              onClick={nextSlide}
              className={`${styles.arrowBtn} ${currentIndex >= suggestedProducts.length - visibleCards ? styles.disabled : ''}`}
            >
              {'>'}
            </button>
          </div>
        </div>
        <div className={styles.sliderWindow}>
          <div
            className={styles.sliderTrack}
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}
          >
            {suggestedProducts.map(product => (
              <div key={product.id} className={styles.cardWrapper}>
                <ProductCard product={formatProduct(product)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
