import { useTheme } from '../../context/ThemeContext';
import { getArrowLeftActiveIcon } from '../../utils/getIcons';
import styles from './ProductDetailsPage.module.scss';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { getProducts, getSuggestedProducts } from '../../utils/fetchClient';
import { getProductDetails } from '../../utils/getProductDetails';
import { ImageGallery } from '../../components/ImageGallery/ImageGallery';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { TechSpecs } from '../../components/TechSpecs/TechSpecs';
/* eslint-disable-next-line max-len */
import { AvailableModelsInfo } from '../../components/AvailableModelsInfo/AvailableModelsInfo';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

export const ProductDetailsPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<Product>();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);

      try {
        const products: Product[] = await getProducts();
        const match = products.find(p => p.itemId === productId);

        setProduct(match);

        const suggested: Product[] = await getSuggestedProducts();

        setSuggestedProducts(suggested);

        if (match && productId) {
          const details = await getProductDetails(productId, match.category);

          setProductDetails(details);
        } else {
          setProductDetails(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (!productDetails || !product) {
    return <h2 className={styles.noProduct}>No product found.</h2>;
  }

  const arrowLeftActiveIcon = getArrowLeftActiveIcon(theme);

  return (
    <div className={styles.productDetailsPage}>
      <Breadcrumbs productDetails={productDetails} />

      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <img src={arrowLeftActiveIcon} alt="arrowleftactive" />
        <p className={styles.backButtonText}>Back</p>
      </button>

      <h2 className={styles.title}>{productDetails.name}</h2>

      {isLoading && <Loader />}

      {!isLoading && (
        <div className={styles.container}>
          <ImageGallery product={productDetails} />

          <AvailableModelsInfo
            product={product}
            productDetails={productDetails}
          />

          <div className={styles.descriptionWrapper}>
            <h3 className={styles.descriptionTitle}>About</h3>
            <div className={styles.divider}></div>

            {productDetails.description.map(description => (
              <div
                className={styles.descriptionDetails}
                key={description.title}
              >
                <h4 className={styles.descriptionSubtitle}>
                  {description.title}
                </h4>

                {description.text.map(text => (
                  <p key={text} className={styles.descriptionText}>
                    {text}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <TechSpecs productDetails={productDetails} />

          <div className={styles.sliderWrapper}>
            <ProductSlider
              title="You may also like"
              products={suggestedProducts}
            />
          </div>
        </div>
      )}
    </div>
  );
};
