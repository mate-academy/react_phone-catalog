import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../store/slices/productsSlice';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types/product';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './BrandNewModels.module.scss';
import { useNavigate } from 'react-router-dom';
import { setSelectedProduct } from '../../store/slices/selectedProductSlice';

const BrandNewModels = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, products, error } = useSelector(
    (state: RootState) => state.product,
  );

  useEffect(() => {
    dispatch(fetchProducts('phones'));
  }, [dispatch]);

  const [startIndex, setStartIndex] = useState(4);
  const phonesPerPage = 4;
  const maxPages = 3;
  const phones = products.phones || [];

  const totalPhones = phones.length;

  const handleNext = () => {
    if (
      startIndex + phonesPerPage < totalPhones &&
      startIndex / phonesPerPage < maxPages - 1
    ) {
      setStartIndex(prevStartIndex => prevStartIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(prevStartIndex => prevStartIndex - 1);
    }
  };

  const handlePhoneClick = (phone: Product) => {
    dispatch(setSelectedProduct(phone));
    navigate(`/phones/${phone.id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className={styles.brandNewModels__header}>
        <h1 className={styles.brandNewModels__title}>Brand new models</h1>
        <div className={styles.brandNewModels__arrows}>
          <div
            className={`${styles.brandNewModels__arrow} ${startIndex === 0 && styles['brandNewModels__arrow-disabled']}`}
            onClick={handlePrevious}
          >
            <ArrowBackIosNewIcon />
          </div>
          <div
            className={`${styles.brandNewModels__arrow} ${startIndex + phonesPerPage >= totalPhones || startIndex / phonesPerPage >= maxPages - 1 ? styles['brandNewModels__arrow-disabled'] : ''}`}
            onClick={handleNext}
          >
            <ArrowForwardIosIcon />
          </div>
        </div>
      </div>

      <div className={styles.brandNewModels__main}>
        <div className={styles.brandNewModels__phones}>
          {phones
            .slice(startIndex, startIndex + phonesPerPage)
            .map((phone: Product) => (
              <ProductCard
                key={phone.id}
                product={phone}
                onClick={() => handlePhoneClick(phone)}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default BrandNewModels;
