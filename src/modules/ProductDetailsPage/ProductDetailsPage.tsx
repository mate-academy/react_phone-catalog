import { useEffect, useState } from 'react';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { PhonesSlider } from '../../components/PhonesSlider/PhonesSlider';
import { getNewProducts } from '../../services/getNewProducts';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setProducts } from '../../features/productsSlice';
import { getProductsDetails } from '../../services/getProductDetails';
import { ProductDetails } from '../../types/ProductDetails';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ProductDetailsCard } from '../../components/ProductDetailsCard';
import { Loader } from '../../components/Loader';
import styles from './ProductDetailsPage.module.scss';
import { useTranslation } from 'react-i18next';
import { GoBackButton } from '../../components/GoBackButton';
import { Product } from '../../types/Product';

export const ProductDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState<ProductDetails[]>([]);
  const { products } = useAppSelector(state => state.products);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const slash = true;
  const { productId = '' } = useParams();
  const { pathname } = useLocation();
  const newId = productId.slice(1);

  const selectedProduct: ProductDetails | undefined = details.find(
    item => item.id === newId,
  );

  const path = pathname.slice(1);
  const category = path.split('/').slice(0, 1).join();

  useEffect(() => {
    setIsLoading(true);

    getNewProducts()
      .then(response => {
        dispatch(setProducts(response));
      })
      .catch(
        () =>
          // eslint-disable-next-line max-len
          'Oops! Something went wrong while loading data. Please try again later.',
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    getProductsDetails(category).then(setDetails);
  }, [category, newId]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [newId]);

  const getRandomProducts = (productsRandom: Product[]) => {
    const shuffled = [...productsRandom].sort(() => 0.5 - Math.random());

    return shuffled;
  };

  const randomProducts = getRandomProducts(products);

  if (isLoading) {
    return (
      <div className={styles.mainLoader}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.productDetailsPage} id="productDetailsPage">
      <BreadCrumbs />
      <div className={styles.goBackBtn}>
        <GoBackButton
          className={styles.customBackButton}
          iconClassName={styles.customIcon}
          title={t('buttonBack.back')}
          onClick={() => navigate(-1)}
        />
      </div>
      <h2 className={styles.productTitle}>{selectedProduct?.name}</h2>
      <ProductDetailsCard
        selectedProduct={selectedProduct}
        products={products}
      />
      <PhonesSlider
        title={t('productDetailsPage.suggestionsTitle')}
        products={randomProducts}
        slash={slash}
      />
    </div>
  );
};
