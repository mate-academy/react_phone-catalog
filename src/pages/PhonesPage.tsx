import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductType, Product } from '../helpers/Types';
import { ProductList } from '../components/ProductList';
import { fetchTypeDevice } from '../helpers/Api';
import { Loader } from '../components/Loader';
import { NoResults } from '../components/NoResults';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[] | null>(null);

  useEffect(() => {
    const feathPhonesData = async () => {
      const jsonData = await fetchTypeDevice(ProductType.Phones);

      setPhones(() => jsonData);
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

      {phones && phones.length === 0
        ? (<NoResults title="Phones" />)
        : (<h1 className="page__title h1">Mobile phones</h1>)}
      {!phones && (<Loader />)}
      {phones && phones.length > 0 && (
        <ProductList products={phones} />
      )}
    </div>
  );
};
