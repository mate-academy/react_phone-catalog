import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './ProductDetailsPage.module.scss';
import { Product, ProductDetails } from '../../types';
import {
  getProducts,
  getProductDetails,
  getSuggestedProducts,
} from '../../utils/fetchClient';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { ProductsSlider } from '../../components/ProductsSlider';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';

const COLOR_MAP: Record<string, string> = {
  black: '#1f2020',
  green: '#ade1cd',
  yellow: '#ffe681',
  white: '#f9f6ef',
  purple: '#d1cddb',
  red: '#ba0c2e',
  spacegray: '#4c4c4c',
  midnightgreen: '#004953',
  gold: '#fcdbc1',
  silver: '#e2e6e9',
  rosegold: '#e6c7c2',
  coral: '#ee7762',
  midnight: '#171e27',
  spaceblack: '#2e3034',
  blue: '#215e7c',
  pink: '#fadadd',
  graphite: '#41424c',
  sierrablue: '#69abce',
  starlight: '#faf7f2',
  'space gray': '#4c4c4c',
};

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [productFromList, setProductFromList] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, isInCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    setLoading(true);
    setSelectedImage(0);

    Promise.all([getProductDetails(productId || ''), getProducts()])
      .then(([details, products]) => {
        setProduct(details);
        setAllProducts(products);

        const found = products.find(p => p.itemId === productId) || null;

        setProductFromList(found);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  const suggested = useMemo(
    () => getSuggestedProducts(allProducts, productId || ''),
    [allProducts, productId],
  );

  if (loading) {
    return <Loader />;
  }

  if (!product || !productFromList) {
    return (
      <div className={styles.page}>
        <Breadcrumbs items={[{ label: 'Product not found' }]} />
        <BackButton />
        <div className={styles.notFound}>
          <img
            src="/img/product-not-found.png"
            alt="Product not found"
            className={styles.notFoundImage}
          />
          <h2 className={styles.notFoundTitle}>Product was not found</h2>
        </div>
      </div>
    );
  }

  const categoryPath = `/${product.category}`;
  const categoryName =
    product.category === 'phones'
      ? 'Phones'
      : product.category === 'tablets'
        ? 'Tablets'
        : 'Accessories';

  const inCart = isInCart(productFromList.id);
  const favorited = isFavorite(productFromList.id);

  const buildLink = (color: string, capacity?: string) => {
    const cap = (capacity || product.capacity).toLowerCase();
    const col = color.replace(/\s+/g, '-');

    return `/product/${product.namespaceId}-${cap}-${col}`;
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: categoryName, path: categoryPath },
          { label: product.name },
        ]}
      />

      <BackButton />

      <h2>{product.name}</h2>

      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={cn(styles.thumbnail, {
                    [styles.thumbnailActive]: index === selectedImage,
                  })}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>

            <div className={styles.mainImage}>
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.options}>
            <p className={styles.optionLabel}>Available colors</p>
            <div className={styles.colors}>
              {product.colorsAvailable.map(color => (
                <Link
                  key={color}
                  to={buildLink(color)}
                  className={cn(styles.colorOption, {
                    [styles.colorOptionActive]: color === product.color,
                  })}
                >
                  <span
                    className={styles.colorCircle}
                    style={{
                      backgroundColor: COLOR_MAP[color.toLowerCase()] || color,
                    }}
                  />
                </Link>
              ))}
            </div>

            <p className={styles.optionLabel}>Select capacity</p>
            <div className={styles.capacities}>
              {product.capacityAvailable.map(cap => (
                <Link
                  key={cap}
                  to={buildLink(product.color, cap)}
                  className={cn(styles.capacityOption, {
                    [styles.capacityOptionActive]: cap === product.capacity,
                  })}
                >
                  {cap}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.prices}>
            <span className={styles.price}>${product.priceDiscount}</span>
            {product.priceRegular !== product.priceDiscount && (
              <span className={styles.fullPrice}>${product.priceRegular}</span>
            )}
          </div>

          <div className={styles.actions}>
            {inCart ? (
              <button type="button" className={styles.addToCartAdded}>
                Added to cart
              </button>
            ) : (
              <button
                type="button"
                className={styles.addToCart}
                onClick={() => addToCart(productFromList)}
              >
                Add to cart
              </button>
            )}

            <button
              type="button"
              className={styles.favButton}
              onClick={() => toggleFavorite(productFromList)}
            >
              <img
                src={
                  favorited
                    ? '/img/icons/heart-filled.svg'
                    : '/img/icons/heart.svg'
                }
                alt="Favorites"
              />
            </button>
          </div>

          <div className={styles.specs}>
            <div className={styles.spec}>
              <span className={styles.specName}>Screen</span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
            <div className={styles.spec}>
              <span className={styles.specName}>Resolution</span>
              <span className={styles.specValue}>{product.resolution}</span>
            </div>
            <div className={styles.spec}>
              <span className={styles.specName}>Processor</span>
              <span className={styles.specValue}>{product.processor}</span>
            </div>
            <div className={styles.spec}>
              <span className={styles.specName}>RAM</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.about}>
        <h3 className={styles.sectionTitle}>About</h3>
        {product.description.map(desc => (
          <div key={desc.title} className={styles.aboutBlock}>
            <h4 className={styles.aboutTitle}>{desc.title}</h4>
            {desc.text.map(paragraph => (
              <p key={paragraph.slice(0, 30)} className={styles.aboutText}>
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.techSpecs}>
        <h3 className={styles.sectionTitle}>Tech specs</h3>
        <div className={styles.techSpec}>
          <span className={styles.techSpecName}>Screen</span>
          <span className={styles.techSpecValue}>{product.screen}</span>
        </div>
        <div className={styles.techSpec}>
          <span className={styles.techSpecName}>Resolution</span>
          <span className={styles.techSpecValue}>{product.resolution}</span>
        </div>
        <div className={styles.techSpec}>
          <span className={styles.techSpecName}>Processor</span>
          <span className={styles.techSpecValue}>{product.processor}</span>
        </div>
        <div className={styles.techSpec}>
          <span className={styles.techSpecName}>RAM</span>
          <span className={styles.techSpecValue}>{product.ram}</span>
        </div>
        {product.camera && (
          <div className={styles.techSpec}>
            <span className={styles.techSpecName}>Camera</span>
            <span className={styles.techSpecValue}>{product.camera}</span>
          </div>
        )}
        {product.zoom && (
          <div className={styles.techSpec}>
            <span className={styles.techSpecName}>Zoom</span>
            <span className={styles.techSpecValue}>{product.zoom}</span>
          </div>
        )}
        <div className={styles.techSpec}>
          <span className={styles.techSpecName}>Cell</span>
          <span className={styles.techSpecValue}>
            {product.cell.join(', ')}
          </span>
        </div>
      </div>

      {suggested.length > 0 && (
        <div className={styles.suggested}>
          <ProductsSlider title="You may also like" products={suggested} />
        </div>
      )}
    </div>
  );
};
