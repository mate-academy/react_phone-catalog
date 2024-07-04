/* eslint-disable no-console */
import { useContext, useEffect, useState } from 'react';
import styles from './ProductDetail.module.scss';
import { Link, useParams } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { BASE_URL } from '../../utils/const';
import { ImageGallery } from '../ImageGallery';
import { ProductDetails } from '../../types/ProductDetail';
import { getProductDetail } from '../../services/ProductDetail';
import { Description } from '../Description';
import { Techspecs } from '../Techspecs';
import { ProductControls } from '../ProductControls';
import { Loader } from '../Loader';
import { ProductSlider } from '../ProductSlider';

interface ProductDetailProps {
  category: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ category }) => {
  const { productId } = useParams<{ productId: string }>();
  const {
    allProducts,
    setLoading,
    loading,
    setError,
    reloading,
    error,
    suggestedProducts,
  } = useContext(ProductContext);

  const matchProduct = allProducts.find(
    product => product.itemId === productId && product.category === category,
  );

  const [detailedProduct, setDetailedProduct] = useState<ProductDetails | null>(
    null,
  );

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setTimeout(async () => {
        try {
          if (productId && matchProduct) {
            const detaileProduct = await getProductDetail(
              productId,
              matchProduct.category,
            );

            setDetailedProduct(detaileProduct);
          } else {
            setDetailedProduct(null);
          }
        } catch (errors) {
          console.error('Error fetching product details:', error);
          setError(true);
        } finally {
          setLoading(false);
        }
      }, 100);
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, matchProduct, setLoading, setError, error]);

  if (loading || !detailedProduct || !matchProduct) {
    return <Loader />;
  }

  if (error) {
    const shouldReload = window.confirm(
      'An error occurred. Do you want to reload?',
    );

    if (shouldReload) {
      reloading();
    }
  }

  return (
    <section className={styles.container}>
      <Breadcrumbs />
      <Link to="/" className={styles.goBackButton}>
        <img
          src={`${BASE_URL}/icons/ArrowLeft.svg`}
          alt="home"
          className={styles.chevronIcon}
        />
        <p className={styles.goBackText}>Back</p>
      </Link>
      <h2 className={styles.title}>{detailedProduct.name}</h2>
      <div className={styles.wrap}>
        <ImageGallery
          images={detailedProduct.images}
          name={detailedProduct.name}
        />
        <ProductControls
          productDetails={detailedProduct}
          setProductDetails={setDetailedProduct}
          product={matchProduct}
        />
      </div>
      <div className={styles.block}>
        <Description description={detailedProduct.description} />
        <Techspecs productDetails={detailedProduct} />
      </div>

      <div className={styles.slider}>
        <ProductSlider products={suggestedProducts} title="You may also like" />
      </div>
    </section>
  );
};

export default ProductDetail;
