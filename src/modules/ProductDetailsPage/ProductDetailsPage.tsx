import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import {
  getProductDetails,
  getSuggestedProducts,
  getProducts,
} from '../../api/products';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Loader } from '../shared/components/Loader';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [catalogProduct, setCatalogProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const { cart, addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);

    Promise.all([
      getProductDetails(productId),
      getProducts(),
      getSuggestedProducts(),
    ])
      .then(([details, allProducts, suggested]) => {
        setProduct(details);
        if (details) {
          setSelectedImage(details.images[0]);
          const found = allProducts.find(p => p.itemId === details.id);

          setCatalogProduct(found || null);
        }

        setSuggestedProducts(suggested);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h2>Product was not found</h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.backBtn}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const isInCart = catalogProduct
    ? cart.some(item => item.product.id === catalogProduct.id)
    : false;
  const favorite = catalogProduct ? isFavorite(catalogProduct.id) : false;

  const handleAddToCart = () => {
    if (catalogProduct) {
      addToCart(catalogProduct);
    }
  };

  const handleToggleFavorite = () => {
    if (catalogProduct) {
      toggleFavorite(catalogProduct);
    }
  };

  const getCapacityLink = (newCapacity: string) => {
    const parts = product.id.split('-');
    const currentCap = product.capacity.toLowerCase();
    //const currentColor = product.color.toLowerCase();

    return parts
      .map(p => (p === currentCap ? newCapacity.toLowerCase() : p))
      .join('-');
  };

  const getColorLink = (newColor: string) => {
    const parts = product.id.split('-');
    const currentColor = product.color.toLowerCase();

    return parts
      .map(p => (p === currentColor ? newColor.toLowerCase() : p))
      .join('-');
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs category="Phones" productName={product.name} />

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.mainGrid}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product.images.map(img => (
              <button
                key={img}
                type="button"
                className={`${styles.thumbBtn} ${selectedImage === img ? styles.thumbBtnActive : ''}`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={`./${img}`} alt="" className={styles.thumbImg} />
              </button>
            ))}
          </div>
          <div className={styles.mainImgBox}>
            <img
              src={`./${selectedImage}`}
              alt={product.name}
              className={styles.mainImg}
            />
          </div>
        </div>

        <div className={styles.actionsBox}>
          <div className={styles.selectorSection}>
            <span className={styles.selectorTitle}>Available colors</span>
            <div className={styles.colorList}>
              {product.colorsAvailable.map(color => (
                <Link
                  key={color}
                  to={`/product/${getColorLink(color)}`}
                  className={`${styles.colorCircle} ${product.color === color ? styles.colorActive : ''}`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className={styles.selectorSection}>
            <span className={styles.selectorTitle}>Select capacity</span>
            <div className={styles.capacityList}>
              {product.capacityAvailable.map(cap => (
                <Link
                  key={cap}
                  to={`/product/${getCapacityLink(cap)}`}
                  className={`${styles.capacityBtn} ${product.capacity === cap ? styles.capacityActive : ''}`}
                >
                  {cap}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.prices}>
            <span className={styles.price}>${product.priceDiscount}</span>
            {product.priceRegular > product.priceDiscount && (
              <span className={styles.regularPrice}>
                ${product.priceRegular}
              </span>
            )}
          </div>

          <div className={styles.buttonsRow}>
            <button
              type="button"
              onClick={handleAddToCart}
              className={`${styles.addBtn} ${isInCart ? styles.addedBtn : ''}`}
            >
              {isInCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              onClick={handleToggleFavorite}
              className={`${styles.favBtn} ${favorite ? styles.favBtnActive : ''}`}
              aria-label="Add to favorites"
            >
              ♥
            </button>
          </div>

          <div className={styles.specsPreview}>
            <div className={styles.specRow}>
              <span>Screen</span>
              <span>{product.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span>Resolution</span>
              <span>{product.resolution}</span>
            </div>
            <div className={styles.specRow}>
              <span>Processor</span>
              <span>{product.processor}</span>
            </div>
            <div className={styles.specRow}>
              <span>RAM</span>
              <span>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.aboutCol}>
          <h2 className={styles.sectionHeading}>About</h2>
          {product.description.map(item => (
            <div key={item.title} className={styles.aboutItem}>
              <h3 className={styles.aboutTitle}>{item.title}</h3>
              {item.text.map((paragraph, idx) => (
                <p key={idx} className={styles.aboutText}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.specsCol}>
          <h2 className={styles.sectionHeading}>Tech specs</h2>
          <div className={styles.specsTable}>
            <div className={styles.specRow}>
              <span>Screen</span>
              <span>{product.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span>Resolution</span>
              <span>{product.resolution}</span>
            </div>
            <div className={styles.specRow}>
              <span>Processor</span>
              <span>{product.processor}</span>
            </div>
            <div className={styles.specRow}>
              <span>RAM</span>
              <span>{product.ram}</span>
            </div>
            <div className={styles.specRow}>
              <span>Built in memory</span>
              <span>{product.capacity}</span>
            </div>
            <div className={styles.specRow}>
              <span>Camera</span>
              <span>{product.camera}</span>
            </div>
            <div className={styles.specRow}>
              <span>Zoom</span>
              <span>{product.zoom}</span>
            </div>
            <div className={styles.specRow}>
              <span>Cell</span>
              <span>{product.cell.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      <ProductsSlider title="You may also like" products={suggestedProducts} />
    </div>
  );
};
