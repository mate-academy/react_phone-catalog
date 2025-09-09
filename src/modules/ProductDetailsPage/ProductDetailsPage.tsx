import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation, TFunction } from 'react-i18next';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../../components-cp/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';
import favIcon from '../../assets/icons/heart-inactive.svg';
import favActiveIcon from '../../assets/icons/heart-active.svg';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Loader } from '../../components/Loader/Loader';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';

import { baseProducts } from '../../data/products';

type ProductType = (typeof baseProducts)[0];

const RightColumn: React.FC<{
  product: ProductType;
  t: TFunction<'translation'>;
  isInCart: boolean;
  onAddToCart: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}> = ({ product, t, isInCart, onAddToCart, isFavorite, onToggleFavorite }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedMemory, setSelectedMemory] = useState(product.memory[0]);

  return (
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
                className={`${styles.colorCircle} ${
                  selectedColor === color ? styles.active : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.productId}>ID: {product.id}</div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.memoryBlock}>
        <div className={styles.blockTitle}>{t('product.selectCapacity')}</div>
        <div className={styles.memoryOptions}>
          {product.memory.map(m => (
            <div
              key={m}
              className={`${styles.memoryOption} ${
                selectedMemory === m ? styles.active : ''
              }`}
              onClick={() => setSelectedMemory(m)}
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
            onClick={onAddToCart}
          >
            {isInCart ? t('product.addedToCart') : t('product.addToCart')}
          </button>

          <button
            className={`${styles.favButton} ${isFavorite ? styles.active : ''}`}
            aria-label={t('product.addToFavorites')}
            onClick={onToggleFavorite}
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
        {product.fullSpecs.map(({ left, right }, i) => (
          <li key={i} className={styles.specItem}>
            <div className={styles.specLeft}>{t(`specs.${left}`)}</div>
            <div className={styles.specRight}>{right}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const BottomContent: React.FC<{
  product: ProductType;
  t: TFunction<'translation'>;
}> = ({ product, t }) => {
  const bottomSpecs = [
    ...product.fullSpecs,
    { left: 'builtInMemory', right: product.memory[0] },
    { left: 'camera', right: '12 Mp + 12 Mp + 12 Mp (Triple)' },
    { left: 'zoom', right: 'Optical, 2x' },
    { left: 'cell', right: 'GSM, LTE, UMTS' },
  ];

  return (
    <div className={styles.bottomContent}>
      <div className={styles.aboutBlock}>
        <h2 className={styles.sectionTitle}>{t('product.about')}</h2>
        <div className={styles.divider} />
        <div className={styles.aboutItems}>
          <div className={styles.aboutItem}>
            <h3 className={styles.aboutItemTitle}>
              {t('product.aboutProTitle')}
            </h3>
            <p className={styles.aboutItemText}>{t('product.aboutProText')}</p>
          </div>
          <div className={styles.aboutItem}>
            <h3 className={styles.aboutItemTitle}>
              {t('product.cameraTitle')}
            </h3>
            <p className={styles.aboutItemText}>{t('product.cameraText')}</p>
          </div>
          <div className={styles.aboutItem}>
            <h3 className={styles.aboutItemTitle}>{t('product.shootTitle')}</h3>
            <p className={styles.aboutItemText}>{t('product.shootText')}</p>
          </div>
        </div>
      </div>

      <div className={styles.techBlock}>
        <h2 className={styles.sectionTitle}>{t('product.techSpecs')}</h2>
        <div className={`${styles.divider} ${styles.dividerSpecs}`} />
        <ul className={styles.specList}>
          {bottomSpecs.map(({ left, right }, i) => (
            <li key={i} className={styles.specItem}>
              <div className={styles.specLeft}>{t(`specs.${left}`)}</div>
              <div className={styles.specRight}>{right}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const ProductDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const { cartItems, addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const found = baseProducts.find(p => p.id === Number(productId));

      setProduct(found || null);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [productId]);

  if (!loading && !product) {
    return (
      <div className={styles.notFoundWrapper}>
        <div className={styles.notFound}>{t('product.notFound')}</div>
      </div>
    );
  }

  const isInCart = product
    ? cartItems.some(item => item.id === product.id)
    : false;
  const isFavorite = product ? favorites.includes(product.id) : false;

  return (
    <div className={styles.page}>
      <Breadcrumbs
        currentPage={t('phones')}
        currentPageLink="/phones"
        extra={product?.title}
      />

      <div className={styles.backWrapper}>
        <BackButton />
      </div>

      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>{product?.title}</h1>
      </div>

      {loading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        product && (
          <>
            <div className={styles.content}>
              <div className={styles.galleryColumn}>
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.title} ${idx + 1}`}
                    className={`${styles.thumbnail} ${
                      img === product.images[0] ? styles.selected : ''
                    }`}
                  />
                ))}
              </div>

              <div className={styles.mainImage}>
                <img src={product.images[0]} alt={product.title} />
              </div>

              <RightColumn
                product={product}
                t={t}
                isInCart={isInCart}
                onAddToCart={() => addToCart(product)}
                isFavorite={isFavorite}
                onToggleFavorite={() => toggleFavorite(product.id)}
              />
            </div>

            <BottomContent product={product} t={t} />

            <div className={styles.recommendedSection}>
              <ProductsSlider
                title={t('product.youMayAlsoLike')}
                products={baseProducts.slice(0, 6).map(p => ({
                  id: p.id,
                  image: p.images[0],
                  title: p.title,
                  price: `$${p.price}`,
                  oldPrice: `$${p.oldPrice}`,
                  specs: p.baseSpecs,
                }))}
                visibleCountDesktop={4}
              />
            </div>
          </>
        )
      )}
    </div>
  );
};
