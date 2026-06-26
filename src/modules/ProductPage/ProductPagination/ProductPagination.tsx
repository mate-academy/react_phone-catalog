import styles from './ProductPagination.module.scss';
import { useState } from 'react';
import Icon from '../../shared/Icon';
import { Link, useLocation } from 'react-router-dom';

const PAGES_IN_REGION = 4;
const PAGE_PARAM_NAME = 'page';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
}

const ProductPagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const location = useLocation();
  const currentSearchParams = new URLSearchParams(location.search);

  const getSearchParams = (pageNumber: number) => {
    if (pageNumber === 1) {
      currentSearchParams.delete(PAGE_PARAM_NAME);
    } else {
      currentSearchParams.set(PAGE_PARAM_NAME, String(pageNumber));
    }

    return currentSearchParams.toString();
  };

  const [region, setRegion] = useState<number>(
    Math.floor((currentPage - 1) / PAGES_IN_REGION),
  );
  const lastPage = Math.ceil(total / perPage);
  const firstNumber = region * PAGES_IN_REGION + 1;
  const lastNumber = Math.min((region + 1) * PAGES_IN_REGION, lastPage);
  const numbers = Array.from(
    { length: lastNumber - firstNumber + 1 },
    (_, i) => i + firstNumber,
  );

  const increaseDisabled = firstNumber === 1;
  const decreaseDisabled = lastNumber === lastPage;

  const handleDecreaseRegion = () => {
    setRegion(region - 1);
  };

  const handleIncreaseRegion = () => {
    setRegion(region + 1);
  };

  return (
    <div className={styles.pagination}>
      <Icon
        className={styles.pagination__button_marginRight}
        onClick={handleDecreaseRegion}
        /* eslint-disable @typescript-eslint/indent */
        iconStyles={
          increaseDisabled
            ? {
                icon: ['type_slider__disabled'],
                image: ['arrowLeft', 'disabled'],
              }
            : { icon: ['border', 'type_slider'], image: ['arrowLeft'] }
        }
        /* eslint-enable @typescript-eslint/indent */
        disabled={increaseDisabled}
      />
      {numbers.map(number => (
        <Link
          key={number}
          className={
            styles.pagination__link +
            ' ' +
            (number === currentPage && styles.pagination__link_active)
          }
          to={{
            pathname: location.pathname,
            search: getSearchParams(number),
          }}
        >
          {number}
        </Link>
      ))}
      <Icon
        className={styles.pagination__button_marginLeft}
        onClick={handleIncreaseRegion}
        /* eslint-disable @typescript-eslint/indent */
        iconStyles={
          decreaseDisabled
            ? {
                icon: ['type_slider__disabled'],
                image: ['arrowRight', 'disabled'],
              }
            : { icon: ['border', 'type_slider'], image: ['arrowRight'] }
        }
        /* eslint-enable @typescript-eslint/indent */
        disabled={decreaseDisabled}
      />
    </div>
  );
};

export default ProductPagination;
