import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageType, Product } from '../helpers/Types';
import { ProductList } from '../components/ProductList';
import { NoResults } from '../components/NoResults';
import { Loader } from '../components/Loader';
import { fetchTypeDevice } from '../helpers/Api';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[] | null>(null);

  useEffect(() => {
    const feathPhonesData = async () => {
      const jsonData = await fetchTypeDevice(PageType.Accessories);

      setAccessories(() => jsonData);
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
        <span className="page__path--page SmallText">Accessories</span>
      </div>
      {accessories && accessories.length === 0
        ? (<NoResults title="Accessories" />)
        : (<h1 className="page__title h1">Accessories</h1>)}

      {!accessories && (<Loader />)}
      {accessories && accessories.length > 0 && (
        <ProductList products={accessories} />

      )}
    </div>
  );
};
