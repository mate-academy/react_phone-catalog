import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageType, Product } from '../helpers/Types';
import { ProductList } from '../components/ProductList';
import { fetchTypeDevice } from '../helpers/Api';
import { Loader } from '../components/Loader';
import { NoItems } from '../components/NoItems';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[] | null>(null);

  useEffect(() => {
    const feathPhonesData = async () => {
      const jsonData = await fetchTypeDevice(PageType.Phones);

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
      <p className="page__title h1">Mobile phones</p>

      {!phones && (<Loader />)}
      {phones && phones.length > 0 && (
        <ProductList
          products={phones}
        />
      )}
      {phones && phones.length === 0
      && (<NoItems page={PageType.Phones} />)}
    </div>
  );
};
