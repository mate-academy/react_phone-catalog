import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import {
  getProductByIdFromCategory,
  getProductByParams,
  getSuggestedProducts,
} from '../../services/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { Spinner } from '../../components/Spinner/Spinner';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Gallery } from './components/Gallery/Gallery';
import { CardButtons } from '../../components/CardButtons';
import { ColorButtons } from './components/ColorButtons/ColorButtons';
import { CapacityButtons } from './components/CapacityButtons/CapacityButtons';
import { Category } from '../../types/Category';
import { TechSpecs } from './components/TechSpecs/TechSpecs';
import { About } from './components/About/About';
import { Product } from '../../types/Product';
import { ProductSlider } from '../../components/ProductSlider';
import { NotFoundProduct } from '../../components/NotFoundProduct';
import { BackButton } from '../../components/BackButton';

type Params = {
  productId: string;
};

export const ProductDetailsPage: FC = ({}) => {
  const navigate = useNavigate();
  const { productId } = useParams<Params>();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductDetails>();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const category = location.pathname.split('/').slice(1, 2).join();

  useEffect(() => {
    setIsLoading(true);
    const fetchDetails = async () => {
      try {
        if (productId && category) {
          const data = await getProductByIdFromCategory(
            productId,
            category as Category,
          );

          setProductDetails(data);
          const cugettedProducts: Product[] = await getSuggestedProducts();

          setSuggestedProducts(cugettedProducts);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.container}>
        <div className={styles.detailsTop}>
          {productDetails ? (
            <>
              <Breadcrumbs product={productDetails} />
              <BackButton />
              <h2 className={styles.title}>{productDetails.name}</h2>
              <div className={styles.detailsMain}>
                <div className={styles.detailsInfo}>
                  <div className={styles.gallery}>
                    <Gallery images={productDetails.images} />
                  </div>
                  <div className={styles.actionPanel}>
                    <div className={styles.actionBox}>
                      <div className={styles.topPanel}>
                        Available colors
                        <p>ID: 3424234</p>
                      </div>
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
                          <p className={styles.specValue}>
                            {productDetails.screen}
                          </p>
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
                          <p className={styles.specValue}>
                            {productDetails.ram}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.description}>
                  <About description={productDetails.description} />
                  <TechSpecs product={productDetails} />
                </div>
              </div>
            </>
          ) : (
            <NotFoundProduct />
          )}
        </div>
      </div>
      {productDetails && (
        <ProductSlider
          mb
          products={suggestedProducts}
          title={'You may also like'}
          discount={true}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
