import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageType, Product } from '../helpers/Types';
import { ProductList } from '../components/ProductList';
import { fetchTypeDevice } from '../helpers/Api';
import { Loader } from '../components/Loader';
import { NoResults } from '../components/NoResults';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[] | null>(null);

  useEffect(() => {
    const feathPhonesData = async () => {
      const jsonData = await fetchTypeDevice(PageType.Tablets);

      setTablets(() => jsonData);
    };

    feathPhonesData();
  }, []);

  return (
    <div className="page">
      <div className="page__path">
        <Link to="/" className="page__path--home">
          <img
            alt="arrowTop"
            src="./img/home.svg"
            className="page__path--home-image"
          />
        </Link>
        <img
          alt="arrowTop"
          src="./img/arrowRight.svg"
          className="page__path--prev"
        />
        <span className="page__path--page SmallText">Phones</span>
      </div>
      <h1 className="page__title h1">Mobile phones</h1>

      {!tablets && (<Loader />)}
      {tablets && tablets.length > 0 && (
        <ProductList products={tablets} />

      )}
      {tablets && tablets.length === 0
      && (<NoResults />)}
    </div>
  );
};
