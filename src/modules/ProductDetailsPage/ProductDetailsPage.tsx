import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import {
  getProductDetails,
  getProducts,
  normalizePath,
} from '../../api/products';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getBgColor } from '../../utils/colors';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { category = 'phones', productId } = useParams<{
    category?: string;
    productId: string;
  }>();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');

  const { addToCart, cart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);

    Promise.all([getProductDetails(productId), getProducts()])
      .then(([details, allProducts]) => {
        setProduct(details);
        if (details && details.images && details.images.length > 0) {
          setSelectedImage(details.images[0]);
        }

        const randomProducts = [...allProducts].sort(() => Math.random() - 0.5);

        setSuggestedProducts(randomProducts);
      })
      .finally(() => setIsLoading(false));
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <p className={styles.notFound}>Product not found</p>;
  }

  const isAdded = cart.some(item => item.product.id === Number(product.id));
  const favorite = isFavorite(Number(product.id));

  const cartProduct: Product = {
    id: Number(product.id),
    category,
    itemId: product.id,
    name: product.name,
    fullPrice: product.priceRegular,
    price: product.priceDiscount,
    screen: product.screen,
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,
    year: 2022,
    image: product.images[0],
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <span> &gt; </span>
        <Link to={`/${category}`} className={styles.link}>
          {category}
        </Link>
        <span> &gt; </span>
        <span>{product.name}</span>
      </div>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.mainContent}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product.images.map(img => (
              <button
                key={img}
                type="button"
                className={classNames(styles.thumbBtn, {
                  [styles.active]: selectedImage === img,
                })}
                onClick={() => setSelectedImage(img)}
              >
                <img src={normalizePath(img)} alt={product.name} />
              </button>
            ))}
          </div>
          <div className={styles.mainImage}>
            <img src={normalizePath(selectedImage)} alt={product.name} />
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.colorBlock}>
            <p className={styles.label}>Available colors</p>
            <div className={styles.colorsList}>
              {product.colorsAvailable.map(color => {
                const targetColorSlug = color
                  .toLowerCase()
                  .replace(/\s+/g, '-');

                const parts = product.id.split('-');

                parts[parts.length - 1] = targetColorSlug;
                const targetSlug = parts.join('-');

                const isSelected = color === product.color;

                return (
                  <Link
                    key={color}
                    to={`/${category}/${targetSlug}`}
                    className={classNames(styles.colorCircle, {
                      [styles.selectedColor]: isSelected,
                    })}
                    style={{ backgroundColor: getBgColor(color) }}
                  />
                );
              })}
            </div>
          </div>

          <div className={styles.capacityBlock}>
            <p className={styles.label}>Select capacity</p>
            <div className={styles.capacityList}>
              {product.capacityAvailable.map(cap => {
                const targetCapSlug = cap.toLowerCase();

                const parts = product.id.split('-');
                const currentCapNum = product.capacity.replace(/\D/g, '');
                const capIndex = parts.findIndex(p =>
                  p.includes(currentCapNum),
                );

                if (capIndex !== -1) {
                  parts[capIndex] = targetCapSlug;
                } else if (parts.length >= 2) {
                  parts[parts.length - 2] = targetCapSlug;
                }

                const targetSlug = parts.join('-');
                const isSelected = cap === product.capacity;

                return (
                  <Link
                    key={cap}
                    to={`/${category}/${targetSlug}`}
                    className={classNames(styles.capacityBtn, {
                      [styles.selectedCapacity]: isSelected,
                    })}
                  >
                    {cap}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.priceDiscount}>
              ${product.priceDiscount}
            </span>
            <span className={styles.priceRegular}>${product.priceRegular}</span>
          </div>

          <div className={styles.buttonsRow}>
            <button
              type="button"
              className={classNames(styles.addBtn, {
                [styles.inCard]: isAdded,
              })}
              onClick={() => addToCart(cartProduct)}
            >
              {isAdded ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              className={classNames(styles.favBtn, {
                [styles.favActive]: favorite,
              })}
              onClick={() => toggleFavorite(cartProduct)}
            >
              {favorite ? '❤️' : '🤍'}
            </button>
          </div>

          <div className={styles.shortSpecs}>
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
          </div>
        </div>
      </div>

      <div className={styles.bottomContent}>
        <div className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>About</h2>
          {product.description.map(item => (
            <div key={item.title} className={styles.descriptionBlock}>
              <h3 className={styles.descTitle}>{item.title}</h3>
              <p className={styles.descText}>{item.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.techSpecsSection}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <div className={styles.fullSpecs}>
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
            <div className={styles.specRow}>
              <span className={styles.specName}>Built in memory</span>
              <span className={styles.specValue}>{product.capacity}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Camera</span>
              <span className={styles.specValue}>{product.camera}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Zoom</span>
              <span className={styles.specValue}>{product.zoom}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Cell</span>
              <span className={styles.specValue}>
                {product.cell.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.youMayAlsoLike}>
        <ProductsSlider
          title="You may also like"
          products={suggestedProducts}
        />
      </div>
    </div>
  );
};
