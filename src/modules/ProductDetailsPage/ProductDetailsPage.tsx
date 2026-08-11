import React, { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { useApp } from '../../context/AppContext';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Loader } from '../../components/Loader';

interface Props {
  allProducts: Product[];
}

interface ItemDetails {
  id: string;
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
  camera?: string;
  zoom?: string;
  cell: string[];
}

export const ProductDetailsPage: React.FC<Props> = ({ allProducts }) => {
  // Дістаємо унікальний ID пристрою з адресного рядка браузера
  const { productId } = useParams<{ productId: string }>();

  // Оголошуємо інструмент для повернення назад по історії переходів
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  // Локальні стейти сторінки
  const [details, setDetails] = useState<ItemDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const { cart, favorites, addToCart, toggleFavorite } = useApp();

  // Шукаємо продукт у загальному масиві, щоб дізнатися його категорію (phones, tablets, etc.)
  const foundProduct = allProducts.find(item => item.itemId === productId);

  // Визначаємо, чи доданий поточний товар у кошик або в обране
  const isInCart = foundProduct
    ? cart.some(item => item.id === foundProduct.id)
    : false;
  const isFavorite = foundProduct
    ? favorites.some(fav => fav.id === foundProduct.id)
    : false;
useEffect(() => {
  if (!productId) {
    return;
  }

  // Якщо масив товарів ще порожній, чекаємо на його завантаження
  if (allProducts.length === 0) {
    return;
  }

  setError(null);

  // Шукаємо продукт безпосередньо всередині ефекту, щоб не тригерувати нескінченний цикл
  const currentProduct = allProducts.find(item => item.itemId === productId);

  // Якщо список товарів є, але саме такого айдішника немає в базі даних
  if (!currentProduct) {
    setError('Product not found in the global catalog');
    setLoading(false);
    return;
  }

  // Склеюємо назву потрібного JSON-файлу категорії
  const categoryFile = `${currentProduct.category}.json`;

  // Створюємо штучну затримку (паузу) на 1000 мілісекунд (1 секунда)
  const delay = new Promise(resolve => setTimeout(resolve, 1000));

  // Робимо  запит 
 const fetchData = fetch(
      `${import.meta.env.BASE_URL}/api/${categoryFile}`, // Твій варіант із доданим слешем
    ).then(response => {
      if (!response.ok) {
        throw new Error('Failed to load product specifications');
      }
      return response.json();
});
  // Вмикаємо лоадер безпосередньо перед початком завантаження
  setLoading(true);

  Promise.all([fetchData, delay])
    .then(([data]) => {
      // Шукаємо характеристики конкретно нашого productId всередині завантаженого файлу
      const specificDetails = data.find(
        (item: ItemDetails) => item.id === productId,
      );

      if (specificDetails) {
        setDetails(specificDetails);
        setSelectedImage(specificDetails.images[0]); // Ставимо першу картинку головною за замовчуванням
      } else {
        throw new Error('Product specifications are missing');
      }
    })
    .catch(err => {
      setError(err.message || 'Something went wrong');
    })
    .finally(() => {
      setLoading(false);
    });

// Стежимо лише за примітивами, щоб уникнути циклічних перезавантажень
}, [productId, allProducts.length]);


  // Функція для динамічного формування URL при зміні кольору чи пам'яті
  const getNewProductUrl = (newColor?: string, newCapacity?: string) => {
    if (!details) {
      return '#';
    }

    // Якщо передали новий параметр — беремо його, інакше залишаємо поточний
    const finalColor = newColor || details.color;
    const finalCapacity = (newCapacity || details.capacity).toLowerCase();

    // Склеюємо фінальний шлях на основі константи namespaceId з бази даних

    return `/${foundProduct?.category || 'phones'}/${details.namespaceId}-${finalCapacity}-${finalColor}`;
  };

  const shortSpecs = details
    ? [
        { label: 'Screen', value: details.screen },
        { label: 'Resolution', value: details.resolution },
        { label: 'Processor', value: details.processor },
        { label: 'RAM', value: details.ram },
      ]
    : [];

  const fullSpecs = details
    ? [
        { label: 'Screen', value: details.screen },
        { label: 'Resolution', value: details.resolution },
        { label: 'Processor', value: details.processor },
        { label: 'RAM', value: details.ram },
        { label: 'Built in memory', value: details.capacity },
        { label: 'Camera', value: details.camera || 'No data' },
        { label: 'Zoom', value: details.zoom || 'No data' },
        { label: 'Cell', value: details.cell.join(', ') },
      ]
    : [];

  const recommendedProducts = foundProduct
    ? allProducts.filter(
        item =>
          item.category === foundProduct.category && item.itemId !== productId,
      )
    : [];

  const productIndex = details
    ? allProducts.findIndex(product => product.itemId === details.id)
    : -1;

  const modelNumber = productIndex !== -1 ? productIndex + 1 : '—';

  const getValidColor = (colorName: string): string => {
    const name = colorName.toLowerCase().replace(/\s+/g, '');

    // 1. Словник ТІЛЬКИ для складних кольорів Apple, які браузер не знає нативно
    const appleColors: Record<string, string> = {
      midnight: '#2e3641',
      starlight: '#f8f9fa',
      spacegray: '#535150',
      sierrablue: '#9bb5ce',
      graphite: '#4e4e4a',
      silver: '#e3e4e5',
      gold: '#f9e5c9',
      spaceblack: '#1b1c1e',
      deeppurple: '#473e4b',
      pacificblue: '#2b4653',
      alpinegreen: '#4e5b4e',
    };

    // Якщо колір є в списку Apple — беремо точний HEX
    if (appleColors[name]) {
      return appleColors[name];
    }

    // 2. Перевіряємо, чи знає браузер це слово нативно (для black, green, yellow, red, white, purple)
    const ctx = document.createElement('canvas').getContext('2d');

    if (!ctx) {
      return colorName;
    }

    ctx.fillStyle = name;

    return ctx.fillStyle !== '#000000' || name === 'black' ? name : '#b4bdc3';
  };

  return (
    <div className={styles['product-details']}>
      {/* 1. ПЕРЕВІРКА ЗАВАНТАЖЕННЯ */}
      {loading && <Loader />}

      {/* 2. ПЕРЕВІРКА ПОМИЛКИ */}
      {error && (
        <div className={styles['product-details__error']}>Error: {error}</div>
      )}

      {/* 3. ГОЛОВНИЙ ІНТЕРФЕЙС */}
      {!loading && !error && details && (
        <>
          {/* Хлібні крихти: категорія стає повноцінним клікабельним посиланням! */}
          <Breadcrumbs
            currentPath={
              <span className={styles['product-details__crumbs-container']}>
                <Link
                  to={foundProduct ? `/${foundProduct.category}` : '/phones'}
                  className={styles['product-details__crumbs-link']}
                >
                  {foundProduct
                    ? foundProduct.category.charAt(0).toUpperCase() +
                      foundProduct.category.slice(1)
                    : 'Phones'}
                </Link>
                <img
                  src="/react_phone-catalog/img/icons/arrowIcon.svg"
                  alt="Arrow"
                  className={styles['product-details__crumbs-separator']}
                  aria-hidden="true"
                />
                <span className={styles['product-details__crumbs-current']}>
                  {details?.name || ''}
                </span>
              </span>
            }
          />

          {/* КНОПКА ПОВЕРНЕННЯ НАЗАД */}
          <button
            type="button"
            onClick={handleGoBack}
            className={styles['product-details__back-btn']}
          >
            <img
              src="/react_phone-catalog/img/icons/arrow-left.svg"
              alt="Arrow"
              className={styles['product-details__back-icon']}
            />
            <span className={styles['product-details__back-text']}>Back</span>
          </button>
          {/* ВЕЛИКИЙ ГОЛОВНИЙ ЗАГОЛОВОК СТОРІНКИ */}
          <h1 className={styles['product-details__title']}>
            {details?.name || ''}
          </h1>
          {/* ГОЛОВНИЙ КОНТЕНТ: ЛІВА ТА ПРАВА КОЛОНКИ */}
          <div className={styles['product-details__main-content']}>
            {/* ЛІВА КОЛОНКА: ІНТЕРАКТИВНА ГАЛЕРЕЯ ФОТО */}
            <div className={styles['product-details__gallery']}>
              {/* Вертикальний ряд маленьких кнопочок-прев'ю */}
              <div className={styles['product-details__thumbnails']}>
                {(details?.images || []).map((img, index) => (
                  <button
                    key={img}
                    type="button"
                    className={`${styles['product-details__thumb-btn']} ${
                      selectedImage === img
                        ? styles['product-details__thumb-btn--active']
                        : ''
                    }`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}${img}`}
                      alt={`Thumbnail ${index + 1}`}
                      className={styles['product-details__thumb-img']}
                    />
                  </button>
                ))}
              </div>

              {/* Великий квадрат з головним вибраним фото по центру */}
              <div className={styles['product-details__main-image-container']}>
                <img
                  key={selectedImage || (details?.images?.[0] ?? '')}
                  src={`${import.meta.env.BASE_URL}${selectedImage || (details?.images?.[0] ?? '')}`}
                  alt={details?.name || ''}
                  className={styles['product-details__main-img']}
                />
              </div>
            </div>

            {/* ПРАВА КОЛОНКА: КОНФІГУРАТОР ТА КУПІВЛЯ */}
            <div className={styles['product-details__actions']}>
              {/* Блок вибору доступних кольорів */}
              <div className={styles['product-details__section']}>
                <div className={styles['product-details__section-header']}>
                  <span className={styles['product-details__section-label']}>
                    Available colors
                  </span>
                  <span className={styles['product-details__color-id']}>
                    ID: {modelNumber}
                  </span>
                </div>

                <div className={styles['product-details__color-options']}>
                  {details.colorsAvailable.map(colorName => (
                    <Link
                      key={colorName}
                      to={getNewProductUrl(colorName, undefined)}
                      className={`${styles['product-details__color-circle']} ${
                        styles[
                          `product-details__color-circle--color-${colorName}`
                        ] || ''
                      } ${
                        details.color === colorName
                          ? styles['product-details__color-circle--active']
                          : ''
                      }`}
                      style={{ backgroundColor: getValidColor(colorName) }}
                      title={colorName}
                    />
                  ))}
                </div>
              </div>

              {/* Лінія-розділювач */}
              <div className={styles['product-details__divider']} />

              {/* Блок вибору об'єму пам'яті (Capacity) */}
              <div className={styles['product-details__section']}>
                <span className={styles['product-details__section-label']}>
                  Select capacity
                </span>
                <div className={styles['product-details__capacity-options']}>
                  {details.capacityAvailable.map(cap => (
                    <Link
                      key={cap}
                      to={getNewProductUrl(undefined, cap)}
                      className={`${styles['product-details__capacity-btn']} ${
                        details.capacity === cap
                          ? styles['product-details__capacity-btn--active']
                          : ''
                      }`}
                    >
                      {cap}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Лінія-розділювач */}
              <div className={styles['product-details__divider']} />

              {/* Блок відображення актуальної та закресленої цін */}
              <div className={styles['product-details__price-container']}>
                <span className={styles['product-details__price-discount']}>
                  ${details.priceDiscount}
                </span>
                <span className={styles['product-details__price-regular']}>
                  ${details.priceRegular}
                </span>
              </div>

              {/* Блок великих кнопок дій (Add to cart та Сердечко) */}
              <div className={styles['product-details__buttons-row']}>
                <button
                  type="button"
                  className={`${styles['product-details__add-to-cart']} ${
                    isInCart
                      ? styles['product-details__add-to-cart--selected']
                      : ''
                  }`}
                  onClick={() => foundProduct && addToCart(foundProduct)}
                  disabled={isInCart}
                >
                  {isInCart ? 'Added to cart' : 'Add to cart'}
                </button>

                <button
                  type="button"
                  className={`${styles['product-details__favorite-btn']} ${
                    isFavorite
                      ? styles['product-details__favorite-btn--active']
                      : ''
                  }`}
                  onClick={() => foundProduct && toggleFavorite(foundProduct)}
                  aria-label="Add to favorites"
                >
                  <img
                    src={
                      isFavorite
                        ? 'img/icons/heart-red.svg'
                        : 'img/icons/heart.svg'
                    }
                    alt="Favorite icon"
                    className={styles['product-details__heart-icon']}
                  />
                </button>
              </div>

              {/* Короткі технічні характеристики, виведені через масив */}
              <div className={styles['product-details__short-specs']}>
                {shortSpecs.map(spec => (
                  <div
                    key={spec.label}
                    className={styles['product-details__spec-row']}
                  >
                    <span className={styles['product-details__spec-label']}>
                      {spec.label}
                    </span>
                    <span className={styles['product-details__spec-value']}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles['product-details__bottom-content']}>
            {/* СЕКЦІЯ "ABOUT" */}
            <section className={styles['product-details__about']}>
              <h2 className={styles['product-details__section-title']}>
                About
              </h2>
              <div className={styles['product-details__line']} />

              {/* Рендеримо художні блоки з JSON */}
              {details.description.map(block => (
                <article
                  key={block.title}
                  className={styles['product-details__description-block']}
                >
                  <h3 className={styles['product-details__description-title']}>
                    {block.title}
                  </h3>
                  {block.text.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className={styles['product-details__description-text']}
                    >
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}
            </section>

            {/* СЕКЦІЯ "TECH SPECS" (Повна таблиця характеристик) */}
            <section className={styles['product-details__tech-specs']}>
              <h2 className={styles['product-details__section-title']}>
                Tech specs
              </h2>
              <div className={styles['product-details__line']} />

              <div className={styles['product-details__full-specs']}>
                {fullSpecs.map(spec => (
                  <div
                    key={spec.label}
                    className={styles['product-details__spec-row']}
                  >
                    <span className={styles['product-details__spec-label']}>
                      {spec.label}
                    </span>
                    <span className={styles['product-details__spec-value']}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className={styles['product-details__recommended']}>
            <div className={styles['product-details__slider-wrapper']}>
              <ProductsSlider
                title="You may also like"
                products={recommendedProducts}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
