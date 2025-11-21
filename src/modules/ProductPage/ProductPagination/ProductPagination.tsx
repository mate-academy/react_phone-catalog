import styles from './ProductPagination.module.scss';
import { useState } from 'react';
import Icon from '../../shared/Icon';
import { Link } from 'react-router-dom';

const PAGES_IN_REGION = 4;

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const ProductPagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
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
        onClick={handleDecreaseRegion}
        iconStyles={
          increaseDisabled
            ? { image: ['arrowLeft', 'disabled'] }
            : { icon: 'border', image: ['arrowLeft'] }
        }
        disabled={increaseDisabled}
      />
      {numbers.map(number => (
        <Link
          key={number}
          className={styles.pagination__link}
          to={`?page=${number}`}
        >
          {number}
        </Link>
      ))}
      <Icon
        onClick={handleIncreaseRegion}
        iconStyles={
          decreaseDisabled
            ? { image: ['arrowRight', 'disabled'] }
            : { icon: 'border', image: ['arrowRight'] }
        }
        disabled={decreaseDisabled}
      />
    </div>
  );
};

export default ProductPagination;

/*

  total={42} // total number of items to paginate
  perPage={5} // number of items per page
  currentPage={1} // optional with 1 by default 
  onPageChange={(page) => { ... }}

*/
