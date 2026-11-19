import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getProductDetails,
  getSuggestedProducts,
  normalizePath,
} from '../../api/products';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { getBgColor } from '../../utils/colors';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const { cart, addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (productId) {
      getProductDetails(productId).then(data => {
        if (data) {
          setProduct(data);
          setSelectedImage(data.images[0]);
        }
      });

      getSuggestedProducts(productId).then(suggested => {
        setSuggestedProducts(suggested);
      });
    }
  }, [productId]);

  if (!product) {
    return <div className={styles.loader}>Loading...</div>;
  }

  const category = productId?.includes('tablet')
    ? 'tablets'
    : productId?.includes('accessory')
      ? 'accessories'
      : 'phones';

  const buildItemId = (capacity: string, color: string) => {
    const normalizedCapacity = capacity.toLowerCase().replace(/\s+/g, '');
    const normalizedColor = color.toLowerCase().replace(/\s+/g, '-');

    return `${product.namespaceId}-${normalizedCapacity}-${normalizedColor}`;
  };

  const isInCart = cart.some(
    item =>
      item.product.itemId === product.id ||
      String(item.product.id) === product.id,
  );

  const productForActions: Product = {
    id: Number(product.id) || Date.now(),
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

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(productForActions);
    }
  };

  const favorite = isFavorite(productForActions.id);

  return (
    <div className={styles.productDetails}>
      <div className={styles.container}>
        <Breadcrumbs />
        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.mainContent}>
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {product.images.map(img => (
                <button
                  key={img}
                  type="button"
                  className={`${styles.thumbBtn} ${
                    selectedImage === img ? styles.active : ''
                  }`}
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
            <div>
              <span className={styles.label}>Available colors</span>
              <div className={styles.colorsList}>
                {product.colorsAvailable.map(colorItem => {
                  const isSelected = colorItem === product.color;
                  const targetItemId = buildItemId(product.capacity, colorItem);

                  return (
                    <Link
                      key={colorItem}
                      to={`/${category}/${targetItemId}`}
                      className={`${styles.colorCircle} ${
                        isSelected ? styles.selectedColor : ''
                      }`}
                      style={{ backgroundColor: getBgColor(colorItem) }}
                      title={colorItem}
                    />
                  );
                })}
              </div>
            </div>

            <div>
              <span className={styles.label}>Select capacity</span>
              <div className={styles.capacityList}>
                {product.capacityAvailable.map(cap => {
                  const isSelected = cap === product.capacity;
                  const targetItemId = buildItemId(cap, product.color);

                  return (
                    <Link
                      key={cap}
                      to={`/${category}/${targetItemId}`}
                      className={`${styles.capacityBtn} ${
                        isSelected ? styles.selectedCapacity : ''
                      }`}
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
              <span className={styles.priceRegular}>
                ${product.priceRegular}
              </span>
            </div>

            <div className={styles.buttonsRow}>
              <button
                type="button"
                className={`${styles.addBtn} ${isInCart ? styles.inCart : ''}`}
                onClick={handleAddToCart}
              >
                {isInCart ? 'Added to cart' : 'Add to cart'}
              </button>

              <button
                type="button"
                className={styles.favBtn}
                onClick={() => toggleFavorite(productForActions)}
                aria-label="Favorites"
              >
                <span
                  className={favorite ? styles.favIconActive : styles.favIcon}
                />
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
            {product.description.map(desc => (
              <div key={desc.title} className={styles.descriptionBlock}>
                <h3 className={styles.descTitle}>{desc.title}</h3>
                {desc.text.map((paragraph, idx) => (
                  <p key={idx} className={styles.descText}>
                    {paragraph}
                  </p>
                ))}
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

        <div className={styles.youMayLike}>
          <ProductsSlider
            title="You may also like"
            products={suggestedProducts}
          />
        </div>
      </div>
    </div>
  );
};

export * from './ProductDetailsPage';
