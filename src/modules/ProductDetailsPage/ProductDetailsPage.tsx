import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../servises/ProductsDetails';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { getChevronIconSrc } from '../../servises/iconSrc';
import { useTheme } from '../../context/ThemeContext';
import { Product } from '../../types/Product';
import { getAllProducts, getSuggestedProducts } from '../../servises/Products';
import { ImageGallery } from './components/ImageGallery';
import { TechSpecs } from './components/TechSpecs';
import { Description } from './components/Description';
import { MainControls } from './components/MainControls';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider';

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{
    productId: string;
  }>();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
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

        const cugettedProducts: Product[] = await getSuggestedProducts();

        setSuggestedProducts(cugettedProducts);

        if (productId && productMatch) {
          const detailedProduct = await getProductDetails(
            productId,
            productMatch.category,
          );

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
      <div className={styles.container}>
        <Breadcrumbs product={productDetails} />
        <button onClick={() => navigate(-1)} className={styles.goBackButton}>
          <img src={chevronIconSrc} alt="home" className={styles.chevronIcon} />
          <div className={styles.goBackText}>
            <p>Back</p>
          </div>
        </button>
        <h2 className={styles.title}>{productDetails.name}</h2>
        <ImageGallery
          images={productDetails.images}
          productName={productDetails.name}
        />
        <MainControls
          productDetails={productDetails}
          setProductDetails={setProductDetails}
          product={product}
        />
        <Description description={productDetails.description} />
        <TechSpecs productDetails={productDetails} />
      </div>

      <ProductsSlider title="You may also like" products={suggestedProducts} />
    </div>
  );
};

export default ProductDetailsPage;
