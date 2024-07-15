import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom';
import '../styles/page.scss';
import { ProductsSort } from '../components/ProductsSort';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/products';
import { Gadget } from '../types/Gadget';
import { ProductType } from '../types/ProductType';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Gadget[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(products => {
        const filteredPhones = products.filter(
          (product: Gadget) => product.category === ProductType.phones,
        );

        setPhones(filteredPhones);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="selected-cat">
          <div className="selected-cat__active">
            <Link to="/" className="selected-cat__active--link">
              <svg className="icon icon-home">
                <use href="img/icons.svg#icon-home"></use>
              </svg>
            </Link>
            <div className="selected-cat__active--arrow">
              <svg className="icon icon-arrow-right">
                <use href="img/icons.svg#icon-arrow-right"></use>
              </svg>
            </div>
            <Link to="/phones" className="selected-cat__active--name">
              Phones
            </Link>
          </div>
          <h1 className="selected-cat__title">Mobile phones</h1>
          <p className="selected-cat__text">
            {!!phones.length && `${phones.length} models`}
          </p>
          {!!phones.length ? (
            <ProductsSort products={phones} />
          ) : (
            <p className="selected-cat__no-product">There are no phones yet</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
