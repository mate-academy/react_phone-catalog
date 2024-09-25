import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import {
  getProductByIdFromCategory,
  getProductByParams,
} from '../../services/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { Spinner } from '../../components/Spinner/Spinner';
import { useIconSrc } from '../../utils/hooks/useIconSrc';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Gallery } from './components/Gallery/Gallery';
import { CardButtons } from '../../components/CardButtons';
import { ColorButtons } from './components/ColorButtons/ColorButtons';
import { CapacityButtons } from './components/CapacityButtons/CapacityButtons';
import { Category } from '../../types/Category';

export const ProductDetailsPage: FC = () => {
  const navigate = useNavigate();
  const { category, productId } = useParams<{
    category: Category;
    productId: string;
  }>();

  const { arrowLeftUrl } = useIconSrc();

  const [isLoading, setIsLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductDetails>();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (productId && category) {
          const data = await getProductByIdFromCategory(productId, category);

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
  }, [productId, category]);

  const filterChange = async (color: string, capacity: string) => {
    try {
      if (productDetails) {
        const newProduct = await getProductByParams(
          productDetails.category,
          productDetails.namespaceId,
          color,
          capacity,
        );

        if (newProduct) {
          navigate(`/${newProduct.category}/${newProduct.id}`, {
            replace: true,
          });
          setProductDetails(newProduct);
        }
      }
    } catch (error) {}
  };

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
            <div className={styles.actionPanel}>
              <div className={styles.topPanel}>
                Available colors
                <p>ID: 3424234</p>
              </div>
              <div className={styles.actionBox}>
                <ColorButtons
                  product={productDetails}
                  filterChange={filterChange}
                />
                <hr className={styles.divider} />
                <CapacityButtons
                  productDetails={productDetails}
                  filterChange={filterChange}
                />
                <hr className={styles.divider} />
                <div className={styles.price}>
                  <div className={styles.existPrice}>
                    ${productDetails.priceRegular}
                  </div>
                  <div className={styles.hotPrice}>
                    ${productDetails.priceDiscount}
                  </div>
                </div>
                <CardButtons />
                <div className={styles.specification}>
                  <div className={styles.spec}>
                    Screen
                    <p className={styles.specValue}>{productDetails.screen}</p>
                  </div>
                  <div className={styles.spec}>
                    Resolution
                    <p className={styles.specValue}>
                      {productDetails.resolution}
                    </p>
                  </div>
                  <div className={styles.spec}>
                    Processor
                    <p className={styles.specValue}>
                      {productDetails.processor}
                    </p>
                  </div>
                  <div className={styles.spec}>
                    RAM
                    <p className={styles.specValue}>{productDetails.ram}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.description}>cvbcvbcvb</div>
        </div>
      </div>
    </div>
  );
};
