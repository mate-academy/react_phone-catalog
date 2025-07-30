import { Title } from '../../title';
import styles from './phonesPage.module.scss';
import { titles } from '../../../constants/titles';
import { useLocation } from 'react-router-dom';
import { ProductQuantity } from '../../productQuantity';
import { BreadCrumbs } from '../../breadCrumbs';
import { FilterBlock } from '../../filterBlock/filterBlock';
import { ProductCard } from '../../ProductCard';
import { useContext, useEffect } from 'react';
import { ProductContext } from '../../../context/ProductContext';
import { getAllProducts } from '../../../utils/api';

export const PhonesPage = () => {
  const location = useLocation();

  const arrLocation = location.pathname.split('/').filter(item => item !== '');
  const { products, setProduct, setIsLoading, setErrorMessage } =
    useContext(ProductContext);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');
    setProduct([]);
    getAllProducts()
      .then(setProduct)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setProduct, setErrorMessage, setIsLoading]);

  return (
    <div className={styles.phonesPage}>
      <BreadCrumbs location={arrLocation} />
      <Title title={titles.phonesPageTitle} marginBottom />
      <div className={styles.container}>
        <ProductQuantity quantity={arrLocation.length} />
        <FilterBlock />
        <ProductCard product={products} catalog />
      </div>
    </div>
  );
};
