import { FC, useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { getProductByIdFromCategory } from '../../services/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { Spinner } from '../../components/Spinner/Spinner';
import { useIconSrc } from '../../utils/hooks/useIconSrc';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Gallery } from './components/Gallery/Gallery';
// import { CardButtons } from '../../components/CardButtons';

export const ProductDetailsPage: FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { productId } = useParams();

  const { arrowLeftUrl } = useIconSrc();

  const [isLoading, setIsLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductDetails>();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (productId && state) {
          const data = await getProductByIdFromCategory(
            productId,
            state.category,
          );

          setProductDetails(data);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    const delay = setTimeout(() => {
      fetchDetails();
    }, 250);

    return () => {
      clearTimeout(delay);
    };
  }, [productId, state]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (!productDetails) {
    return <div className={styles.container}>Product was not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.detailsTop}>
        <Breadcrumbs product={productDetails} />
        <button onClick={() => navigate(-1)} className={styles.goBackButton}>
          <img src={arrowLeftUrl} alt="back" className={styles.chevronIcon} />
          <div className={styles.goBackText}>
            <p>Back</p>
          </div>
        </button>
        <h2 className={styles.title}>{productDetails.name}</h2>
        <div className={styles.detailsMain}>
          <div className={styles.detailsInfo}>
            <div className={styles.gallery}>
              <Gallery images={productDetails.images} />
            </div>
            <div className={styles.actionPanel}>{/* <CardButtons /> */}</div>
          </div>
          <div className={styles.description}>cvbcvbcvb</div>
        </div>
      </div>
    </div>
  );
};
