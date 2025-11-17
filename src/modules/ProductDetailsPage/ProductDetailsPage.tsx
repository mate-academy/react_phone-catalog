/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ProductDetailsPage.module.scss';
import { Product } from '../shared/types';
import { useCart } from '../shared/context/CartContext';
import { useFavorites } from '../shared/context/FavoriteContext';
import { Button } from '../../components/UI/Button/Button';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';
// eslint-disable-next-line max-len
import { SliderSection } from '../HomePage/components/SliderSection/SliderSection';

export const ProductDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const { addToCart, cart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const [baseProduct, setBaseProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const currentProduct = useMemo(() => {
    if (!baseProduct || !allProducts.length) {
      return null;
    }

    const variantId = `${baseProduct.namespaceId}-${selectedCapacity.toLowerCase()}-${selectedColor.toLowerCase()}`;

    return allProducts.find(p => p.id === variantId) || baseProduct;
  }, [baseProduct, allProducts, selectedCapacity, selectedColor]);

  const isFavorite = currentProduct
    ? favorites.some(f => f.id === currentProduct.id)
    : false;

  const isInCart = currentProduct
    ? cart.some(item => item.product.id === currentProduct.id)
    : false;

  const recommendedProducts = useMemo(() => {
    if (!allProducts.length || !currentProduct) {
      return [];
    }

    return allProducts
      .filter(
        p =>
          p.id !== currentProduct.id && p.category === currentProduct.category,
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, 8);
  }, [allProducts, currentProduct]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const categories = ['phones', 'tablets', 'accessories'];
        const results = await Promise.all(
          categories.map(cat =>
            fetch(`/api/${cat}.json`).then(res => (res.ok ? res.json() : [])),
          ),
        );
        const all = results.flat();

        setAllProducts(all);

        const found = all.find(p => p.id === productId);

        if (!found) {
          throw new Error(t('productNotFound'));
        }

        setBaseProduct(found);
        setSelectedColor(found.color || found.colorsAvailable?.[0] || '');
        setSelectedCapacity(
          found.capacity || found.capacityAvailable?.[0] || '',
        );
      } catch (err) {
        setError(
          t('errorLoading') + (err instanceof Error ? `: ${err.message}` : ''),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [productId, t]);

  useEffect(() => {
    if (currentProduct) {
      setSelectedImageIndex(0);
    }
  }, [currentProduct]);

  if (loading) {
    return <div className={styles.loading}>...Loading</div>;
  }

  if (error || !currentProduct) {
    return (
      <div className={styles.error}>
        <img src="/img/product-not-found.png" alt={t('productNotFound')} />
        <p>{error || t('productNotFound')}</p>
      </div>
    );
  }

  const hasDiscount =
    currentProduct.priceDiscount &&
    currentProduct.priceDiscount < currentProduct.priceRegular;

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(currentProduct);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs />
        <BackButton />

        <h1 className={styles.title}>{currentProduct.name}</h1>

        <div className={styles.grid}>
          <div className={styles.gallery}>
            {currentProduct.images?.map((img, i) => (
              <img
                key={i}
                src={`/${img}`}
                alt=""
                className={`${styles.thumb} ${i === selectedImageIndex ? styles.active : ''}`}
                onClick={() => setSelectedImageIndex(i)}
              />
            ))}
          </div>

          <div className={styles.mainImage}>
            <img
              src={`/${currentProduct.images?.[selectedImageIndex] || 'img/product-not-found.png'}`}
              alt={currentProduct.name}
            />
          </div>

          <div className={styles.rightPanel}>
            <div className={styles.id}>ID: {currentProduct.id}</div>

            {baseProduct?.colorsAvailable && (
              <div className={styles.option}>
                <h3>{t('avColor')}</h3>
                <div className={styles.colors}>
                  {baseProduct.colorsAvailable.map(color => (
                    <div
                      key={color}
                      className={`${styles.color} ${selectedColor === color ? styles.selected : ''}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
                <hr className={styles.divider} />
              </div>
            )}

            {baseProduct?.capacityAvailable && (
              <div className={styles.option}>
                <h3>{t('avCapacity')}</h3>
                <div className={styles.capacities}>
                  {baseProduct.capacityAvailable.map(cap => (
                    <button
                      key={cap}
                      className={`${styles.capacityBtn} ${selectedCapacity === cap ? styles.selected : ''}`}
                      onClick={() => setSelectedCapacity(cap)}
                    >
                      {cap}
                    </button>
                  ))}
                </div>
                <hr className={styles.divider} />
              </div>
            )}

            <div className={styles.price}>
              <span className={styles.discount}>
                $
                {hasDiscount
                  ? currentProduct.priceDiscount
                  : currentProduct.priceRegular}
              </span>
              {hasDiscount && (
                <span className={styles.regular}>
                  ${currentProduct.priceRegular}
                </span>
              )}
            </div>

            <div className={styles.actions}>
              <Button
                variant="primary"
                onClick={handleAddToCart}
                className={`${styles.addBtn} ${isInCart ? styles.added : ''}`}
                disabled={isInCart}
              >
                {isInCart ? t('addedToCart') : t('addToCart')}
              </Button>
              <Button
                // variant="icon"
                onClick={() => toggleFavorite(currentProduct)}
                className={isFavorite ? styles.favorite : ''}
              >
                {isFavorite ? '❤️' : '🤍'}
              </Button>
            </div>

            <div className={styles.specs}>
              <div className={styles.specGrid}>
                {currentProduct.screen && (
                  <>
                    <div>Screen</div>
                    <div>{currentProduct.screen}</div>
                  </>
                )}
                {currentProduct.resolution && (
                  <>
                    <div>Resolution</div>
                    <div>{currentProduct.resolution}</div>
                  </>
                )}
                {currentProduct.processor && (
                  <>
                    <div>Processor</div>
                    <div>{currentProduct.processor}</div>
                  </>
                )}
                {currentProduct.ram && (
                  <>
                    <div>RAM</div>
                    <div>{currentProduct.ram}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.aboutSpecs}>
          <div className={styles.about}>
            <h2>{t('about')}</h2>
            <hr className={styles.divider} />
            {currentProduct.description?.map((section, i) => (
              <div key={i} className={styles.section}>
                <h3>{section.title}</h3>
                {section.text.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.techSpecs}>
            <h2>{t('specs')}</h2>
            <hr className={styles.divider} />
            <div className={styles.specsGrid}>
              {[
                { label: 'Screen', value: currentProduct.screen },
                { label: 'Resolution', value: currentProduct.resolution },
                { label: 'Processor', value: currentProduct.processor },
                { label: 'Ram', value: currentProduct.ram },
                { label: 'Storage', value: currentProduct.storage },
                { label: 'Camera', value: currentProduct.camera },
                { label: 'Zoom', value: currentProduct.zoom },
                { label: 'Cell', value: currentProduct.cell?.join(', ') },
                { label: 'Year', value: currentProduct.year },
                { label: 'Capacity', value: currentProduct.capacity },
                { label: 'Color', value: currentProduct.color },
              ]
                .filter(s => s.value)
                .map((s, i) => (
                  <div key={i} className={styles.specRow}>
                    <span className={styles.specLabel}>{t(s.label)}</span>
                    <span className={styles.specValue}>{s.value}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <section className={styles.recommendations}>
          <SliderSection
            title={t('youMayLike')}
            products={recommendedProducts}
            isHot={false}
          />
        </section>
      </div>
    </div>
  );
};
