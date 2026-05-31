import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import classNames from 'classnames';
import { ProductDetail, Product } from '../types';
import {
  getProductDetail,
  getSuggestedProducts,
  getProducts,
} from '../utils/api';
import { Loader } from '../shared/components/Loader';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import styles from './ProductDetailsPage.module.scss';

const colorMap: Record<string, string> = {
  black: '#1F1F1F',
  white: '#F9F6EF',
  gold: '#FAD7BD',
  silver: '#C0C0C0',
  red: '#BA0C2F',
  'product red': '#BA0C2F',
  'space gray': '#717378',
  'midnight green': '#4E5851',
  green: '#ADE1B9',
  yellow: '#FAE56A',
  purple: '#E8D9FF',
  blue: '#BDDAF5',
  pink: '#F9C0CB',
  midnight: '#1F1F1F',
  starlight: '#FAF6EF',
  'deep purple': '#4E3A6B',
  'sky blue': '#A8C8E8',
  'rose gold': '#F4C2C2',
};

const categoryLabels: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const resolveImg = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const ProductDetailsPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.pathname.split('/')[1];

  const [detail, setDetail] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!category || !itemId) {
      return;
    }

    setLoading(true);
    setNotFound(false);
    setActiveImage(0);

    Promise.all([
      getProductDetail(category, itemId),
      getSuggestedProducts(itemId),
      getProducts(),
    ])
      .then(([d, sugg, prods]) => {
        if (!d) {
          setNotFound(true);
        } else {
          setDetail(d);
          setSuggested(sugg);
          setProducts(prods);
        }
      })
      .finally(() => setLoading(false));
  }, [category, itemId]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Loader />
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.notFound}>Product was not found</p>
          <Link to={`/${category}`} className={styles.backLink}>
            ← Back to {category}
          </Link>
        </div>
      </main>
    );
  }

  if (!detail) {
    return null;
  }

  const categoryPath = `/${category}`;
  const productInProducts = products.find(p => p.itemId === itemId);
  const inCart = productInProducts ? isInCart(productInProducts.itemId) : false;
  const inFav = productInProducts
    ? isFavorite(productInProducts.itemId)
    : false;

  const handleColorChange = (color: string) => {
    const newId = detail.id.replace(
      detail.color.replace(/\s+/g, '-'),
      color.replace(/\s+/g, '-'),
    );

    navigate(`${categoryPath}/${newId}`);
  };

  const handleCapacityChange = (cap: string) => {
    const oldCap = detail.capacity.toLowerCase().replace(/\s+/g, '');
    const newCap = cap.toLowerCase().replace(/\s+/g, '');
    const newId = detail.id.replace(oldCap, newCap);

    navigate(`${categoryPath}/${newId}`);
  };

  const specs = [
    { label: 'Screen', value: detail.screen },
    { label: 'Resolution', value: detail.resolution },
    { label: 'Processor', value: detail.processor },
    { label: 'RAM', value: detail.ram },
    ...(detail.camera ? [{ label: 'Camera', value: detail.camera }] : []),
    ...(detail.zoom ? [{ label: 'Zoom', value: detail.zoom }] : []),
    ...(detail.cell ? [{ label: 'Cell', value: detail.cell.join(', ') }] : []),
  ];

  const shortSpecs = specs.slice(0, 4);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs
          items={[
            {
              label: categoryLabels[category || 'phones'] || 'Phones',
              to: categoryPath,
            },
            { label: detail.name },
          ]}
        />

        <button className={styles.back} onClick={() => navigate(-1)}>
          <i className="fa-solid fa-chevron-left" />
          Back
        </button>

        <h1 className={styles.title}>{detail.name}</h1>

        <div className={styles.main}>
          <div className={styles.gallery}>
            <div className={styles.thumbs}>
              {detail.images.map((imgPath, i) => (
                <button
                  key={imgPath}
                  className={classNames(styles.thumb, {
                    [styles.thumbActive]: i === activeImage,
                  })}
                  onClick={() => setActiveImage(i)}
                >
                  <img
                    src={resolveImg(imgPath)}
                    alt={`${detail.name} view ${i + 1}`}
                  />
                </button>
              ))}
            </div>

            <div className={styles.mainImage}>
              <img
                src={resolveImg(detail.images[activeImage])}
                alt={detail.name}
              />
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.infoSection}>
              <div className={styles.optionHeader}>
                <span className={styles.optionLabel}>Available colors</span>
                <span className={styles.optionId}>
                  ID: {detail.id.slice(-6).toUpperCase()}
                </span>
              </div>
              <div className={styles.colors}>
                {detail.colorsAvailable.map(color => (
                  <button
                    key={color}
                    className={classNames(styles.colorBtn, {
                      [styles.colorBtnActive]: color === detail.color,
                    })}
                    onClick={() => handleColorChange(color)}
                    title={color}
                    aria-label={color}
                  >
                    <span
                      className={styles.colorInner}
                      style={{ backgroundColor: colorMap[color] || color }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.infoSection}>
              <span className={styles.optionLabel}>Select capacity</span>
              <div className={styles.capacities}>
                {detail.capacityAvailable.map(cap => (
                  <button
                    key={cap}
                    className={classNames(styles.capBtn, {
                      [styles.capBtnActive]: cap === detail.capacity,
                    })}
                    onClick={() => handleCapacityChange(cap)}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.prices}>
              <span className={styles.priceDiscount}>
                ${detail.priceDiscount}
              </span>
              <span className={styles.priceRegular}>
                ${detail.priceRegular}
              </span>
            </div>

            <div className={styles.actions}>
              <button
                className={classNames(styles.cartBtn, {
                  [styles.cartBtnAdded]: inCart,
                })}
                onClick={() =>
                  productInProducts && !inCart && addToCart(productInProducts)
                }
              >
                {inCart ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                className={classNames(styles.favBtn, {
                  [styles.favBtnActive]: inFav,
                })}
                onClick={() =>
                  productInProducts && toggleFavorite(productInProducts)
                }
                aria-label={
                  inFav ? 'Remove from favorites' : 'Add to favorites'
                }
              >
                {inFav ? (
                  <i className="fa-solid fa-heart" />
                ) : (
                  <i className="fa-regular fa-heart" />
                )}
              </button>
            </div>

            <div className={styles.shortSpecs}>
              {shortSpecs.map(spec => (
                <div key={spec.label} className={styles.shortSpec}>
                  <span className={styles.shortSpecLabel}>{spec.label}</span>
                  <span className={styles.shortSpecValue}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sections}>
          <section className={styles.about}>
            <h2 className={styles.sectionTitle}>About</h2>
            <div className={styles.dividerFull} />
            {detail.description.map(section => (
              <div key={section.title} className={styles.descSection}>
                <h3 className={styles.descTitle}>{section.title}</h3>
                {section.text.map((para, i) => (
                  <p key={i} className={styles.descText}>
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </section>

          <section className={styles.techSpecs}>
            <h2 className={styles.sectionTitle}>Tech specs</h2>
            <div className={styles.dividerFull} />
            {specs.map(spec => (
              <div key={spec.label} className={styles.techSpec}>
                <span className={styles.techSpecLabel}>{spec.label}</span>
                <span className={styles.techSpecValue}>{spec.value}</span>
              </div>
            ))}
          </section>
        </div>

        {suggested.length > 0 && (
          <ProductsSlider title="You may also like" products={suggested} />
        )}
      </div>
    </main>
  );
};
