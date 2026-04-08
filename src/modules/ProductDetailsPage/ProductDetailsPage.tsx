import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllProducts, getProductById } from '../../api';
import { ProductsList } from '../../shared/components/ProductsList';
import type { CartItem, Product, ProductDetails } from '../../types';

import { Container } from '../../shared/components/Container';
import { Loader } from '../../shared/components/Loader';
import { ErrorMessage } from '../../shared/components/ErrorMessage';
import styles from './ProductDetailsPage.module.scss';
import { ProductActions } from '../../shared/components/ProductActions';
import { Breadcrumbs } from '../../shared/components/Breadcrums';
import { getColor } from '../../utils/getColor';

type Props = {
  cart: CartItem[];
  favorites: Product[];
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
};

export const ProductDetailsPage: React.FC<Props> = ({
  cart,
  favorites,
  onAddToCart,
  onToggleFavorite,
}) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setError('');

    getProductById(productId)
      .then(setProduct)
      .catch(() => setError('Product was not found'))
      .finally(() => setIsLoading(false));
  }, [productId]);

  useEffect(() => {
    setActiveImage(0);
  }, [productId]);

  useEffect(() => {
    getAllProducts()
      .then(setAllProducts)
      .catch(() => {});
  }, []);

  const suggested = useMemo(() => {
    if (!product) {
      return [];
    }

    return allProducts
      .filter(p => p.category === product.category && p.itemId !== product.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 12);
  }, [allProducts, product]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => navigate(-1)} />;
  }

  if (!product) {
    return null;
  }

  const onSelectColor = (newColor: string) => {
    if (newColor.trim().toLowerCase() === product.color.trim().toLowerCase()) {
      return;
    }

    const normalize = (str: string) => str.replace(/[-\s]/g, '').toLowerCase();

    const target = allProducts.find(
      p =>
        p.itemId.includes(product.namespaceId) &&
        p.capacity === product.capacity &&
        normalize(p.color) === normalize(newColor),
    );

    if (target) {
      navigate(`/product/${target.itemId}`);
    }
  };

  const onSelectCapacity = (newCapacity: string) => {
    const target = allProducts.find(
      p =>
        p.itemId.includes(product.namespaceId) &&
        p.color === product.color &&
        p.capacity === newCapacity,
    );

    if (target) {
      navigate(`/product/${target.itemId}`);
    }
  };

  const imgSrc = (path: string) => {
    if (!path) {
      return '';
    }

    return path.startsWith('/') ? path : `/${path}`;
  };

  const cartIds = new Set(cart.map(item => item.product.itemId));
  const favoriteIds = new Set(favorites.map(item => item.itemId));
  const isInCart = cart.some(item => item.product.itemId === product?.id);

  const isFavorite = favorites.some(item => item.itemId === product?.id);

  const mappedProduct = {
    id: product.id,
    itemId: product.id,
    name: product.name,
    category: product.category,
    fullPrice: product.priceRegular,
    price: product.priceDiscount ?? product.priceRegular,
    year: Number(product.year),
    image: product.images[0],
    screen: product.screen,
    capacity: String(product.capacity),
    ram: String(product.ram),
    color: product.color,
  };

  const currentProduct = allProducts.find(p =>
    p.itemId.includes(product.namespaceId),
  );

  return (
    <Container>
      <Breadcrumbs product={product} />
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.back}
      >
        <span className={styles.arrow}>{'<'}</span>
        Back
      </button>

      <h1>{product.name}</h1>

      <div className={styles.top}>
        <div className={styles.gallery}>
          <div className={styles.thumbs}>
            {product.images.map((img, index) => {
              return (
                <img
                  key={img}
                  src={imgSrc(img)}
                  alt={`${product.name}-${index}`}
                  className={`${styles.thumbBtn} ${index === activeImage ? styles.active : ''}`}
                  onClick={() => setActiveImage(index)}
                />
              );
            })}
          </div>
          <div className={styles.main}>
            <img
              className={styles.mainImage}
              src={imgSrc(product.images[activeImage])}
              alt={product.name}
            />
          </div>
        </div>
        <div className={styles.topRow}>
          <div className={styles.info}>
            <div>
              <div className={styles.colorsHeader}>
                <p className={styles.titleLeft}>Available colors</p>
                <div className={styles.id__tabl}>ID: {currentProduct?.id}</div>
              </div>
              <div className={styles.colorList}>
                {product.colorsAvailable.map(c => {
                  const normalize = (str: string) =>
                    str.replace(/[-\s]/g, '').toLowerCase();
                  const isActive = normalize(c) === normalize(product.color);

                  return (
                    <button
                      key={c}
                      type="button"
                      disabled={isActive}
                      className={`${styles.colorBtn} ${isActive ? styles.colorActive : ''}`}
                      onClick={() => onSelectColor(c)}
                    >
                      <div
                        className={styles.colorBtnInner}
                        style={{ backgroundColor: getColor(c) }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className={styles.titleLeft}>Select capacity</p>
              <div className={styles.capacityList}>
                {product.capacityAvailable.map(cap => (
                  <button
                    key={cap}
                    type="button"
                    className={`${styles.capacityBtn} ${cap === product.capacity ? styles.capacityActive : ''}`}
                    onClick={() => onSelectCapacity(cap)}
                    aria-pressed={cap === product.capacity}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>
            <p className={styles.price}>
              <strong>${product.priceDiscount ?? product.priceRegular}</strong>
              {product.priceRegular && product.priceDiscount && (
                <span className={styles.fullPrice}>
                  ${product.priceRegular}
                </span>
              )}
            </p>
            <ProductActions
              product={mappedProduct}
              isInCart={isInCart}
              isFavorite={isFavorite}
              onAddToCart={() => onAddToCart(mappedProduct)}
              onToggleFavorite={onToggleFavorite}
            />
            <ul className={styles.specs}>
              <li className={styles.spec}>
                <span className={styles.spec__label}>Screen</span>
                <span className={styles.spec__value}>{product.screen}</span>
              </li>
              <li className={styles.spec}>
                <span className={styles.spec__label}>Resolution</span>
                <span className={styles.spec__value}>{product.resolution}</span>
              </li>
              <li className={styles.spec}>
                <span className={styles.spec__label}>Processor</span>
                <span className={styles.spec__value}>{product.processor}</span>
              </li>
              <li className={styles.spec}>
                <span className={styles.spec__label}>RAM</span>
                <span className={styles.spec__value}>{product.ram}</span>
              </li>
            </ul>
          </div>
          <div className={styles.id}>ID: {currentProduct?.id}</div>
        </div>
      </div>
      <section className={styles.bottom}>
        <div className={styles.about}>
          <h2 className={styles.blockTitle}>About</h2>

          {product.description?.map(block => (
            <div key={block.title} className={styles.aboutBlock}>
              <h3 className={styles.aboutTitle}>{block.title}</h3>

              {block.text.map(text => (
                <p key={text} className={styles.aboutText}>
                  {text}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.specs}>
          <h2 className={styles.blockTitle}>Tech specs</h2>

          <ul className={styles.specList}>
            <li className={styles.specRow}>
              <span className={styles.specKey}>Screen</span>
              <span className={styles.specVal}>{product.screen}</span>
            </li>

            <li className={styles.specRow}>
              <span className={styles.specKey}>Resolution</span>
              <span className={styles.specVal}>{product.resolution}</span>
            </li>

            <li className={styles.specRow}>
              <span className={styles.specKey}>Processor</span>
              <span className={styles.specVal}>{product.processor}</span>
            </li>

            <li className={styles.specRow}>
              <span className={styles.specKey}>RAM</span>
              <span className={styles.specVal}>{product.ram}</span>
            </li>

            {product.camera && (
              <li className={styles.specRow}>
                <span className={styles.specKey}>Camera</span>
                <span className={styles.specVal}>{product.camera}</span>
              </li>
            )}

            {product.zoom && (
              <li className={styles.specRow}>
                <span className={styles.specKey}>Zoom</span>
                <span className={styles.specVal}>{product.zoom}</span>
              </li>
            )}

            {product.cell?.length ? (
              <li className={styles.specRow}>
                <span className={styles.specKey}>Cell</span>
                <span className={styles.specVal}>
                  {product.cell.join(', ')}
                </span>
              </li>
            ) : null}
          </ul>
        </div>
      </section>

      {suggested.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <h2>You may also like</h2>
          <ProductsList
            products={suggested}
            cartIds={cartIds}
            favoriteIds={favoriteIds}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
          />
        </section>
      )}
    </Container>
  );
};
