import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../../components-cp/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';
import favIcon from '../../assets/icons/heart-inactive.svg';
import favActiveIcon from '../../assets/icons/heart-active.svg';
import { Loader } from '../../components/Loader/Loader';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';

interface RawProduct {
  id: string;
  namespaceId: string;
  category: string;
  name: string;
  capacityAvailable?: string[];
  capacity?: string;
  priceRegular: number;
  priceDiscount?: number;
  colorsAvailable?: string[];
  color?: string;
  images: string[];
  description?: { title: string; text: string[] }[];
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
}

interface NumericProduct {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen?: string;
  capacity?: string;
  color?: string;
  ram?: string;
  year?: number;
  image?: string;
}

interface ProductType {
  id: string;
  namespaceId: string;
  category: string;
  title: string;
  price: number;
  oldPrice?: number;
  images: string[];
  colors: string[];
  color: string;
  memory: string[];
  capacity: string;
  fullSpecs: { left: string; right: string }[];
  description: { title: string; text: string[] }[];
}

interface ProductDetailsPageProps {
  theme: 'light' | 'dark';
}

const transformProduct = (p: RawProduct): ProductType => ({
  id: p.id,
  namespaceId: p.namespaceId,
  category: p.category,
  title: p.name,
  price: p.priceDiscount ?? p.priceRegular,
  oldPrice: p.priceDiscount ? p.priceRegular : undefined,
  images: p.images.map(img => (img.startsWith('/') ? img.substring(1) : img)),
  colors: p.colorsAvailable ?? [],
  color: p.color ?? '',
  memory: p.capacityAvailable ?? [],
  capacity: p.capacity ?? '',
  fullSpecs: [
    { left: 'screen', right: p.screen ?? '-' },
    { left: 'resolution', right: p.resolution ?? '-' },
    { left: 'processor', right: p.processor ?? '-' },
    { left: 'ram', right: p.ram ?? '-' },
    { left: 'camera', right: p.camera ?? '-' },
    { left: 'zoom', right: p.zoom ?? '-' },
    { left: 'cell', right: (p.cell ?? []).join(', ') },
  ],
  description: p.description ?? [],
});

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  theme,
}) => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const { cartItems, addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<RawProduct[]>([]);
  /* eslint-disable @typescript-eslint/indent */
  const [allNumericProducts, setAllNumericProducts] = useState<
    NumericProduct[]
  >([]);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const [phonesRes, tabletsRes, accessoriesRes] = await Promise.all([
          fetch('api/phones.json'),
          fetch('api/tablets.json'),
          fetch('api/accessories.json'),
        ]);

        if (!phonesRes.ok || !tabletsRes.ok || !accessoriesRes.ok) {
          throw new Error('Failed to fetch');
        }

        const [phones, tablets, accessories]: RawProduct[][] =
          await Promise.all([
            phonesRes.json(),
            tabletsRes.json(),
            accessoriesRes.json(),
          ]);

        setAllProducts([...phones, ...tablets, ...accessories]);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, []);

  useEffect(() => {
    const fetchNumericProducts = async () => {
      try {
        const res = await fetch('api/products.json');

        if (!res.ok) {
          throw new Error('Failed to fetch products.json');
        }

        const data: NumericProduct[] = await res.json();

        setAllNumericProducts(data);
      } catch (err) {}
    };

    fetchNumericProducts();
  }, []);

  useEffect(() => {
    if (!allProducts.length) {
      return;
    }

    const found = allProducts.find(
      p => p.id === productId || p.namespaceId === productId,
    );

    if (found) {
      const transformed = transformProduct(found);

      setProduct(transformed);
      setSelectedImage(transformed.images[0]);

      if (window.location.pathname.split('/')[1] !== transformed.category) {
        navigate(`/${transformed.category}/${found.id}`, { replace: true });
      }
    }
  }, [allProducts, productId, navigate]);

  const productNumericId = allNumericProducts.find(
    p => p.itemId === product?.namespaceId || p.itemId === product?.id,
  )?.id;

  const handleChangeColor = (color: string) => {
    if (!product) {
      return;
    }

    const newProd = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === color &&
        p.capacity === product.capacity,
    );

    if (newProd) {
      const transformed = transformProduct(newProd);

      setProduct(transformed);
      setSelectedImage(transformed.images[0]);
      navigate(`/${transformed.category}/${newProd.id}`, { replace: true });
    }
  };

  const handleChangeMemory = (capacity: string) => {
    if (!product) {
      return;
    }

    const newProd = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.capacity === capacity &&
        p.color === product.color,
    );

    if (newProd) {
      const transformed = transformProduct(newProd);

      setProduct(transformed);
      setSelectedImage(transformed.images[0]);
      navigate(`/${transformed.category}/${newProd.id}`, { replace: true });
    }
  };

  if (loading || !product) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  const isInCart = cartItems.some(item => item.id === product.id);
  const isFavorite = favorites.includes(product.id);

  const mainSpecs = [
    {
      left: 'screen',
      right: product.fullSpecs.find(s => s.left === 'screen')?.right,
    },
    {
      left: 'resolution',
      right: product.fullSpecs.find(s => s.left === 'resolution')?.right,
    },
    {
      left: 'processor',
      right: product.fullSpecs.find(s => s.left === 'processor')?.right,
    },
    {
      left: 'ram',
      right: product.fullSpecs.find(s => s.left === 'ram')?.right,
    },
  ];

  return (
    <div className={styles.page}>
      <Breadcrumbs
        theme={theme}
        currentPage={product.category}
        currentPageLink={`/${product.category}`}
        extra={product.title}
      />
      <div className={styles.backWrapper}>
        <BackButton />
      </div>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>{product.title}</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.galleryColumn}>
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.title} ${idx + 1}`}
              className={`${styles.thumbnail} ${img === selectedImage ? styles.selected : ''}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        <div className={styles.mainImage}>
          <img src={selectedImage} alt={product.title} />
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.block}>
            <div className={styles.leftSide}>
              <div className={styles.blockTitle}>
                {t('product.availableColors')}
              </div>
              <div className={styles.colors}>
                {product.colors.map(color => (
                  <div
                    key={color}
                    className={`${styles.colorCircle} ${product.color === color ? styles.active : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleChangeColor(color)}
                  />
                ))}
              </div>
            </div>
            <div className={styles.rightSide}>
              <div className={styles.productId}>
                ID: {productNumericId ?? 'N/A'}
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.memoryBlock}>
            <div className={styles.blockTitle}>
              {t('product.selectCapacity')}
            </div>
            <div className={styles.memoryOptions}>
              {product.memory.map(m => (
                <div
                  key={m}
                  className={`${styles.memoryOption} ${product.capacity === m ? styles.active : ''}`}
                  onClick={() => handleChangeMemory(m)}
                >
                  {m}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.pricesBlock}>
            <div className={styles.prices}>
              <span className={styles.price}>${product.price}</span>
              {product.oldPrice && (
                <span className={styles.oldPrice}>${product.oldPrice}</span>
              )}
            </div>

            <div className={styles.productActions}>
              <button
                className={styles.buyButton}
                disabled={isInCart}
                onClick={() => addToCart(product)}
              >
                {isInCart ? t('product.addedToCart') : t('product.addToCart')}
              </button>

              <button
                className={`${styles.favButton} ${isFavorite ? styles.active : ''}`}
                aria-label={t('product.addToFavorites')}
                onClick={() => toggleFavorite(product.id)}
              >
                <img
                  src={isFavorite ? favActiveIcon : favIcon}
                  alt="Favorite"
                  className={styles.favIcon}
                />
              </button>
            </div>
          </div>

          <ul className={styles.specList}>
            {mainSpecs.map(({ left, right }) => (
              <li key={left} className={styles.specItem}>
                <div className={styles.specLeft}>{t(`specs.${left}`)}</div>
                <div className={styles.specRight}>{right}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottomContent}>
        <div className={styles.aboutBlock}>
          <h3 className={styles.sectionTitle}>{t('product.about')}</h3>
          <div className={styles.aboutItems}>
            {product.description.slice(0, 3).map((desc, i) => (
              <div key={i} className={styles.aboutItem}>
                <h4 className={styles.aboutItemTitle}>{desc.title}</h4>
                {desc.text.map((line, idx) => (
                  <p key={idx} className={styles.aboutItemText}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.techBlock}>
          <h3 className={styles.sectionTitle}>{t('product.techSpecs')}</h3>
          <div className={styles.divider} />
          <ul className={styles.specList}>
            {product.fullSpecs.map(({ left, right }) => (
              <li key={left} className={styles.specItem}>
                <span className={styles.specLeft}>{t(`specs.${left}`)}</span>
                <span className={styles.specRight}>{right}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ProductsSlider
        category={product.category}
        excludeId={product.id}
        title="You may also like"
      />
    </div>
  );
};
