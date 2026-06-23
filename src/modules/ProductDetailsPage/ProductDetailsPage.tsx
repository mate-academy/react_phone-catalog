import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './ProductDetailsPage.module.scss';
import { ProductCardData } from '../../shared/types/ProductCardData';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import {
  getAccessories,
  getPhones,
  getProducts,
  getTablets,
} from '../../api/products';
import { Loader } from '../../shared/components/Loader';
import { ErrorMessage } from '../../shared/components/ErrorMessage';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import { SugProducts } from './components/SuggestedProducts';
import { Product } from '../../shared/types/Product';

export type ProductDetails = {
  id: string;
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

  description: {
    title: string;
    text: string[];
  }[];

  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productCard, setProductCard] = useState<ProductCardData | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const cartContext = useContext(CartContext);
  const favoritesContext = useContext(FavoritesContext);

  useEffect(() => {
    getProducts()
      .then((data: Product[]) => {
        const newProducts = [...data].sort((a, b) => b.year - a.year);

        setProducts(newProducts);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getProducts().then((newProducts: ProductCardData[]) => {
      const basicProduct = newProducts.find(item => item.itemId === productId);

      if (!basicProduct) {
         setIsNotFound(true);

        return;
      }

      setProductCard(basicProduct);

      let request;

      switch (basicProduct.category) {
        case 'phones':
          request = getPhones();
          break;

        case 'tablets':
          request = getTablets();
          break;

        case 'accessories':
          request = getAccessories();
          break;

        default:
          return;
      }

      request.then(data => {
        const foundProduct = data.find(
          (item: ProductDetails) => item.id === productId,
        );

        setProduct(foundProduct);
      });
    });
  }, [productId]);

  const getSuggestedProducts = (
    allProducts: Product[],
    currentItemId: string,
    amount = 10,
  ) => {
    const filtered = allProducts.filter(
      newProduct => newProduct.itemId !== currentItemId,
    );

    const shuffled = [...filtered];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, amount);
  };

  const getCategoryProducts = () => {
    switch (product?.category) {
      case 'phones':
        return getPhones();

      case 'tablets':
        return getTablets();

      case 'accessories':
        return getAccessories();

      default:
        return Promise.resolve([]);
    }
  };

  const normalizeColor = (color: string) =>
    color.toLowerCase().replaceAll('-', ' ').trim();

  const handleColorChange = (newColor: string) => {
    getCategoryProducts().then((data: ProductDetails[]) => {
      const variant = data.find(
        item =>
          item.namespaceId === product?.namespaceId &&
          normalizeColor(item.color) === normalizeColor(newColor) &&
          item.capacity === product?.capacity,
      );

      if (variant) {
        navigate(`/product/${variant.id}`);
      }
    });
  };

  const handleCapacityChange = (newCapacity: string) => {
    getCategoryProducts().then((data: ProductDetails[]) => {
      const variant = data.find(
        item =>
          item.namespaceId === product?.namespaceId &&
          item.color === product.color &&
          item.capacity === newCapacity,
      );

      if (variant) {
        navigate(`/product/${variant.id}`);
      }
    });
  };

  const suggestedProducts = useMemo(() => {
    return getSuggestedProducts(products, product?.namespaceId ?? '', 10);
  }, [products, product?.namespaceId]);

  if (!cartContext) {
    return null;
  }

  const { cart, setCart } = cartContext;

  const isExistInCart = cart.some(item => item.product.itemId === product?.id);

  if (!favoritesContext) {
    return null;
  }

  const { favorites, setFavorites } = favoritesContext;
  const isFavorite = favorites.some(
    item => item.itemId === product?.namespaceId,
  );

  const colorsMap: Record<string, string> = {
    rosegold: '#FAD7D7',
    spacegray: '#5F7170',
    'space gray': '#5F7170',
    midnight: '#171E27',

    spaceblack: '#4C4C4C',
    midnightgreen: '#5F7170',

    gold: '#F6E5D8',
    silver: '#E2E3E5',

    coral: '#FF7F50',

    graphite: '#5C5B57',

    sierrablue: '#9DB7D3',

    'sky blue': '#87CEEB',
    'titanium-black': '#2F2F2F',
    'titanium-gray': '#8A8A8A',

    obsidian: '#1F1F1F',
    porcelain: '#F5F2EA',
  };

  if (loading) {
    return <Loader />;
  }

  if (isNotFound) {
    return <ErrorMessage message="Product was not found" />;
  }

  if (error) {
    return <ErrorMessage message="Something went wrong" />;
  }

  if (!product) {
    return <Loader />;
  }

  const handleAddToCart = () => {
    if (!productCard) {
      return;
    }

    setCart(prev => {
      const existingItem = prev.find(
        item => item.product.itemId === productCard.itemId,
      );

      if (existingItem) {
        return prev.filter(item => item.product.itemId !== productCard.itemId);
      }

      return [
        ...prev,
        {
          product: productCard,
          amount: 1,
        },
      ];
    });
  };

  const handleAddToFavorites = () => {
    if (!product) {
      return;
    }

    if (isFavorite) {
      setFavorites(prev =>
        prev.filter(item => item.itemId !== product.namespaceId),
      );
    } else {
      setFavorites(prev => [
        ...prev,
        {
          id: product.id,
          itemId: product.namespaceId,
          name: product.name,
          image: product.images[0],
          category: product.category,
          price: product.priceDiscount,
          fullPrice: product.priceRegular,
          screen: product.screen,
          capacity: product.capacity,
          ram: product.ram,
        },
      ]);
    }
  };

  return (
    <div className={styles['product-details']}>
      <div className={styles['product-details__breadcrumbs']}>
        <Breadcrumbs title={product?.category} productName={product?.name} />
      </div>

      <button className={styles.back} onClick={() => navigate(`/${product.category}`)}>
        <div className={styles.back__container}>
          <img
            src={`${import.meta.env.BASE_URL}/img/buttons/arrow-left.png`}
            alt="button-arrow-left"
            className={styles.back__icon}
          />
        </div>
        <span className={styles.back__text}>Back</span>
      </button>
      <h1 className={styles[`product-details__title`]}>{product?.name}</h1>
      <div className={styles[`product-details__top`]}>
        <div className={styles[`product-details__images`]}>
          <div className={styles[`product-details__gallery`]}>
            <ul className={styles[`product-details__gallery-list`]}>
              {product?.images.map((image, index) => (
                <li
                  key={image}
                  onClick={() => setCurrentImage(index)}
                  className={`${styles['product-details__gallery-item']}
                ${currentImage === index ? styles.active : ''}`}
                >
                  <img
                    className={styles[`product-details__gallery-image`]}
                    src={`${import.meta.env.BASE_URL}/${image.startsWith('/') ? image.slice(1) : image}`}
                    alt="product-image"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles[`product-details__image-container`]}>
            <div className={styles['product-details__image-wrapper']}>
              <img
                className={styles[`product-details__image`]}
                src={
                  product?.images[currentImage]
                    ? `${import.meta.env.BASE_URL}/${
                        product.images[currentImage].startsWith('/')
                          ? product.images[currentImage].slice(1)
                          : product.images[currentImage]
                      }`
                    : ''
                }
                alt="products-image"
              />
            </div>
          </div>
        </div>
        <div className={styles[`product-details__info`]}>
          <div className={styles[`product-details__info-container`]}>
            <div className={styles[`product-details__colors`]}>
              <p className={styles[`product-details__colors-title`]}>
                Available colors
              </p>
              <ul className={styles[`product-details__colors-list`]}>
                {product?.colorsAvailable.map(color => (
                  <li
                    key={color}
                    className={`${styles['product-details__colors-item']}
                    ${
                      normalizeColor(color) === normalizeColor(product.color)
                        ? styles['product-details__colors-item--active']
                        : ''
                    }`}
                    onClick={() => handleColorChange(color)}
                  >
                    <button
                      className={styles[`product-details__colors-button`]}
                      style={{ backgroundColor: colorsMap[color] || color }}
                    ></button>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles['product-details__divider']}></div>

            <div className={styles[`product-details__capacities`]}>
              <p className={styles[`product-details__capacities-title`]}>
                Select capacity
              </p>
              <ul className={styles[`product-details__capacities-list`]}>
                {product?.capacityAvailable.map(capacity => (
                  <li
                    key={capacity}
                    onClick={() => handleCapacityChange(capacity)}
                    className={styles['product-details__capacities-item']}
                  >
                    <button
                      className={`${styles['product-details__capacities-button']}
                ${
                  capacity === product.capacity
                    ? styles['product-details__capacities-button--active']
                    : ''
                }`}
                    >
                      {capacity}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles['product-details__divider']}></div>

            <div className={styles['product-details__prices']}>
              <p className={styles['product-details__price']}>
                {`$${product?.priceDiscount}`}
              </p>
              <p className={styles['product-details__full-price']}>
                {`$${product?.priceRegular}`}
              </p>
            </div>

            <div className={styles['product-details__buttons']}>
              <button
                className={`${styles['product-details__add']} ${
                  isExistInCart ? styles['product-details__add--added'] : ''
                }`}
                onClick={handleAddToCart}
              >
                {isExistInCart ? 'Added to cart' : 'Add to card'}
              </button>
              <button
                className={styles['product-details__favourite']}
                onClick={handleAddToFavorites}
              >
                <img
                  src={
                    isFavorite
                      ? `${import.meta.env.BASE_URL}/img/buttons/heart-filled.svg`
                      : `${import.meta.env.BASE_URL}/img/buttons/heart.svg`
                  }
                  alt="button-favorite"
                />
              </button>
            </div>

            <ul className={styles['product-details__specs']}>
              <li className={styles.spec}>
                <span className={styles.spec__name}>Screen</span>
                <span className={styles.spec__value}>{product?.screen}</span>
              </li>

              <li className={styles.spec}>
                <span className={styles.spec__name}>Resolution</span>
                <span className={styles.spec__value}>
                  {product?.resolution}
                </span>
              </li>

              <li className={styles.spec}>
                <span className={styles.spec__name}>Processor</span>
                <span className={styles.spec__value}>{product?.processor}</span>
              </li>

              <li className={styles.spec}>
                <span className={styles.spec__name}>RAM</span>
                <span className={styles.spec__value}>{product?.ram}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles['product-details__bottom']}>
        <div className={styles['product-details__about']}>
          <h2 className={styles['product-details__about-title']}>About</h2>
          <div className={styles['product-details__divider']}></div>

          <div className={styles['product-details__about-content']}>
            {product.description.map(descriptionItem => (
              <>
                <div className={styles['product-details__about-subtitle']}>
                  {descriptionItem.title}
                </div>
                <div className={styles['product-details__about-text']}>
                  {descriptionItem.text}
                </div>
              </>
            ))}
          </div>
        </div>

        <div className={styles['product-details__tech-specs']}>
          <h2 className={styles['product-details__tech-specs-title']}>
            Tech specs
          </h2>
          <div className={styles['product-details__divider']}></div>
          <ul className={styles['product-details__tech-specs-list']}>
            <li className={styles['product-details__tech-specs-item']}>
              <span className={styles['product-details__tech-specs-name']}>
                Screen
              </span>
              <span className={styles['product-details__tech-specs-value']}>
                {product.screen}
              </span>
            </li>

            <li className={styles['product-details__tech-specs-item']}>
              <span className={styles['product-details__tech-specs-name']}>
                Resolution
              </span>
              <span className={styles['product-details__tech-specs-value']}>
                {product.resolution}
              </span>
            </li>

            <li className={styles['product-details__tech-specs-item']}>
              <span className={styles['product-details__tech-specs-name']}>
                Processor
              </span>
              <span className={styles['product-details__tech-specs-value']}>
                {product.processor}
              </span>
            </li>

            <li className={styles['product-details__tech-specs-item']}>
              <span className={styles['product-details__tech-specs-name']}>
                RAM
              </span>
              <span className={styles['product-details__tech-specs-value']}>
                {product.ram}
              </span>
            </li>

            <li className={styles['product-details__tech-specs-item']}>
              <span className={styles['product-details__tech-specs-name']}>
                Built in memory
              </span>
              <span className={styles['product-details__tech-specs-value']}>
                {product.capacity}
              </span>
            </li>

            <li className={styles['product-details__tech-specs-item']}>
              <span className={styles['product-details__tech-specs-name']}>
                Camera
              </span>
              <span className={styles['product-details__tech-specs-value']}>
                {product.camera}
              </span>
            </li>

            <li className={styles['product-details__tech-specs-item']}>
              <span className={styles['product-details__tech-specs-name']}>
                Zoom
              </span>
              <span className={styles['product-details__tech-specs-value']}>
                {product.zoom}
              </span>
            </li>

            <li className={styles['product-details__tech-specs-item']}>
              <span className={styles['product-details__tech-specs-name']}>
                Cell
              </span>
              <span className={styles['product-details__tech-specs-value']}>
                {product.cell.join(', ')}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <SugProducts suggestedProducts={suggestedProducts} />
    </div>
  );
};
