/* eslint-disable no-console */
import styles from './ProductDetails.module.scss';
import { FiChevronLeft } from 'react-icons/fi';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IconTextButton } from 'components/IconTextButton';
import { NavHistory } from 'components/NavHistory';
import { CustomSection } from 'components/CustomSection';
import { ImagesDisplay } from './components/ImagesDisplay';
import { CustomSelectorsArea } from './components/CustomSelectorsArea';
import { AboutArea } from './components/AboutArea';
import { TechSpecsArea } from './components/TechSpecsArea';
import { useContext, useEffect, useState } from 'react';
import { AppSpinner } from 'components/AppSpinner';
import { ProductDetailsContext } from 'store/ProductDetailsContext';
import {
  Category,
  getProductDetails,
  getProducts,
} from 'datasources/productsDatasource';
import { shuffleArray } from 'utils/shuffleArray';
import { Product } from 'types/Product';

export const ProductDetailsPage = () => {
  const { type, id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const { product, setProduct } = useContext(ProductDetailsContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      if (!id || !type) {
        return;
      }

      try {
        setIsLoading(true);
        const data = await getProductDetails(id, type as Category);
        const productsList = await getProducts();

        setProducts(productsList);
        setProduct(data);
      } catch (error) {
        console.error('Error loading product details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id, type, setProduct]);

  if (!type || !id) {
    return <Navigate to="/not-found" />;
  }

  if (isLoading) {
    return <AppSpinner />;
  }

  if (!isLoading && !product) {
    return <p>Error fetching product details</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__nav}>
        <NavHistory productName={product?.name} />
        <IconTextButton
          label="Back"
          icon={<FiChevronLeft size={14} />}
          onClick={() => navigate(`/${type}`)}
        />
      </div>

      <span className={styles.container__title}>{product?.name}</span>

      <div className={styles.container__grid}>
        <ImagesDisplay />
        <CustomSelectorsArea />
      </div>

      <div className={styles.container__grid__info}>
        <AboutArea />
        <TechSpecsArea />
      </div>

      {!!products && (
        <div className={styles.container__list}>
          <CustomSection
            title="You may also like"
            products={shuffleArray<Product>(products)}
          />
        </div>
      )}
    </div>
  );
};
