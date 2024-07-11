import { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { getProducts } from '../services/products';
import { Link } from 'react-router-dom';
import { ProductsList } from '../components/ProductsList';
import { ProductType } from '../types/ProductType';
import { Gadget } from '../types/Gadget';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Gadget[]>([]);

  useEffect(() => {
    getProducts()
      .then(products => {
        const filteredAccessories = products.filter(
          (product: Gadget) => product.category === ProductType.accessories,
        );

        setAccessories(filteredAccessories);
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
            <Link to="/accessories" className="selected-cat__active--name">
              Accessories
            </Link>
          </div>
          <h1 className="selected-cat__title">Accessories</h1>
          <p className="selected-cat__text">
            {!!accessories.length && `${accessories.length} models`}
          </p>
          {!!accessories.length ? (
            <ProductsList products={accessories} />
          ) : (
            <p className="selected-cat__no-product">
              There are no accessories yet
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
