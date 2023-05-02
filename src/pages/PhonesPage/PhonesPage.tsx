import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPhones } from '../../api';
import { EmptyCategory } from '../../components/EmptyCategory';
import { Loader } from '../../components/Loader';
import { ProductFilter } from '../../components/ProductFilter';
import { ProductList } from '../../components/ProductList';
import {
  ReactComponent as IconArrowRight,
} from '../../images/icons/arrow_right.svg';
import { ReactComponent as IconHome } from '../../images/icons/home.svg';
import '../../styles/Path.scss';
import '../../styles/ProductPage.scss';
import { Product } from '../../types/Product';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const phonesData = await getPhones();

        setPhones(phonesData);
        setIsLoading(false);
      } catch {
        if (!phones.length) {
          setPhones([]);
        }
      }
    };

    fetchData();
  }, []);

  const phonesAmount = useMemo(() => phones.length, [phones]);

  if (isLoading) {
    return <Loader />;
  }

  if (phones.length === 0) {
    return <EmptyCategory />;
  }

  return (
    <>
      <div className="product-page">
        <div className="product-page__container">
          <div className="path">
            <Link to="/" className="path__link">
              <IconHome />
            </Link>

            <IconArrowRight className="arrow--default" />

            <Link to="/phones" className="path__link">
              <div className="path__text">Phones</div>
            </Link>
          </div>

          <h1 className="product-page__title">Mobile phones</h1>

          <div className="product-page__amount">
            {phonesAmount === 1 ? '1 model' : `${phonesAmount} models`}
          </div>

          <ProductFilter />
          <ProductList products={phones} />
        </div>
      </div>
    </>
  );
};
