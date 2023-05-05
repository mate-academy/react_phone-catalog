import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAccessories } from '../../api';
import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/Product';

import {
  ReactComponent as IconArrowRight,
} from '../../images/icons/arrow_right.svg';
import { ReactComponent as IconHome } from '../../images/icons/home.svg';

import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Loader } from '../../components/Loader';
import { ProductFilter } from '../../components/ProductFilter';

import {
  emptyCategoryErrorMessage, somethingWentWrongErrorMessage,
} from '../../helpers/consts';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const tabletsData = await getAccessories();

        setAccessories(tabletsData);

        setIsLoading(false);
      } catch {
        setError(true);

        if (!accessories.length) {
          setAccessories([]);
        }
      }
    };

    fetchData();
  }, []);

  const phonesAmount = useMemo(() => accessories.length, [accessories]);

  if (error) {
    return <ErrorMessage message={somethingWentWrongErrorMessage} reload />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (accessories.length === 0) {
    return <ErrorMessage message={emptyCategoryErrorMessage} />;
  }

  return (
    <>
      <div className="product-page">
        <div className="product-page__container">
          <div className="path">
            <Link to="/" className="path__link">
              <IconHome />
            </Link>

            <IconArrowRight className="path__arrow" />

            <Link to="/tablets" className="path__link">
              <div className="path__text">Tablets</div>
            </Link>
          </div>

          <h1 className="product-page__title">Tablets</h1>

          <div className="product-page__amount">
            {phonesAmount === 1 ? '1 model' : `${phonesAmount} models`}
          </div>

          <ProductFilter />

          <ProductList products={accessories} />
        </div>
      </div>
    </>
  );
};
