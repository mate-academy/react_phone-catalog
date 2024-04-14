import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../servises/ProductsDetails';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { getChevronIconSrc } from '../../servises/iconSrc';
import { useTheme } from '../../context/ThemeContext';
import { Product } from '../../types/Product';
import { getAllProducts } from '../../servises/Products';
import { ImageGallery } from './components/ImageGallery';
import { TechSpecs } from './components/TechSpecs';
import { Description } from './components/Description';
import { MainControls } from './components/MainControls';
import { Loader } from '../../components/Loader';

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{
    productId: string;
  }>();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [allVariants] = useState<ProductDetails[]>([]);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const chevronIconSrc = getChevronIconSrc(theme);

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        const allProducts: Product[] = await getAllProducts();
        const productMatch = allProducts.find(p => p.itemId === productId);

        setProduct(productMatch);

        if (productId) {
          const detailedProduct = await getProductDetails(productId);

          setProductDetails(detailedProduct);
        } else {
          setProductDetails(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!productDetails || !product) {
    return <div>No product found or failed to load product details.</div>;
  }

  return (
    <div className={styles.productDetailsPage}>
      <Breadcrumbs product={productDetails} />
      <button onClick={() => navigate(-1)} className={styles.goBackButton}>
        <img src={chevronIconSrc} alt="home" className={styles.chevronIcon} />
        <div className={styles.goBackText}>
          <p>Back</p>
        </div>
      </button>
      <h2 className={styles.title}>{productDetails.name}</h2>

      <ImageGallery images={productDetails.images} productName={product.name} />

      <MainControls
        productDetails={productDetails}
        setProductDetails={setProductDetails}
        product={product}
        allVariants={allVariants}
      />

      {/* <div className={styles.mainControls}>
        <div className={styles.selector}>
          <label className={styles.label} htmlFor="capacity">
            Available colors
          </label>
          <div className={styles.buttons}>
            {productDetails.colorsAvailable.map(color => (
              <div
                className={classNames(styles.colorButtonContainer, {
                  [styles.activeColorsAvailable]:
                    productDetails.color === color,
                })}
                key={color}
              >
                <button
                  value={color}
                  onClick={() =>
                    setProductDetails({ ...productDetails, color })
                  }
                  style={{ backgroundColor: color }}
                  className={styles.colorButton}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.selector}>
          <label className={styles.label} htmlFor="capacity">
            Select Capacity
          </label>
          <div className={styles.buttons}>
            {productDetails.capacityAvailable.map(capacity => (
              <button
                key={capacity}
                value={capacity}
                onClick={() =>
                  setProductDetails({ ...productDetails, capacity })
                }
                className={classNames(styles.capacityButton, {
                  [styles.active]: productDetails.capacity === capacity,
                })}
              >
                {capacity}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.divider}></div>

        <div className={styles.price}>
          <div className={styles.existPrice}>${product.fullPrice}</div>
          <div className={styles.hotPrice}>${product.price}</div>
        </div>
        {product && <ActionButtons product={product} />}

        <section className={styles.section}>
          <div className={styles.specs}>
            <p className={styles.specsKey}>Screen</p>
            <p className={styles.specsValue}>{productDetails.screen}</p>
          </div>
          <div className={styles.specs}>
            <p className={styles.specsKey}>Resolution</p>
            <p className={styles.specsValue}>{productDetails.resolution}</p>
          </div>
          <div className={styles.specs}>
            <p className={styles.specsKey}>Processor</p>
            <p className={styles.specsValue}>{productDetails.processor}</p>
          </div>
          <div className={styles.specs}>
            <p className={styles.specsKey}>Ram</p>
            <p className={styles.specsValue}>{productDetails.ram}</p>
          </div>
        </section>
      </div> */}

      <Description description={productDetails.description} />

      <TechSpecs productDetails={productDetails} />
    </div>
  );
};

export default ProductDetailsPage;
