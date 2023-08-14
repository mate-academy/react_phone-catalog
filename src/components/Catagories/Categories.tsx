import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getProducts } from '../../functions/getProducts';
import { getPhones } from '../../functions/getPhones';

import { ApiProduct } from '../../types/ApiProduct';
import { Phone } from '../../types/Phone';

export const Categories = () => {
  const [tabletsCount, setTabletsCount] = useState(0);
  const [accessoriesCount, setAccessoriesCount] = useState(0);
  const [phonesCount, setPhonesCount] = useState(0);

  useEffect(() => {
    getProducts()
      .then((products: ApiProduct[]) => {
        setTabletsCount(products.filter(
          product => product.type === 'tablet',
        ).length);
        setAccessoriesCount(products.filter(
          product => product.type === 'accessories',
        ).length);
      })
      .catch(() => {
        throw new Error('Loading product error');
      });

    getPhones()
      .then((products: Phone[]) => {
        setPhonesCount(products.filter(
          product => product.category === 'phones',
        ).length);
      })
      .catch(() => {
        throw new Error('Loading product error');
      });

    return () => {
      setTabletsCount(0);
      setAccessoriesCount(0);
      setPhonesCount(0);
    };
  }, []);

  return (
    <div className="categories">
      <h2 className="categories__title">
        Shop by category
      </h2>

      <div
        className="categories__container"
        data-cy="categoryLinksContainer"
      >
        <Link
          to="/phones"
          className="categories__link categories__link--1"
        >
          <div className="categories__image categories__image--1" />

          <p className="categories__category">
            Mobile phones
          </p>

          <p className="categories__count">
            {`${phonesCount} models`}
          </p>
        </Link>

        <Link
          to="/tablets"
          className="categories__link categories__link--2"
        >
          <div className="categories__image categories__image--2" />

          <p className="categories__category">
            Tablets
          </p>

          <p className="categories__count">
            {`${tabletsCount} models`}
          </p>
        </Link>

        <Link
          to="/accessories"
          className="categories__link categories__link--3"
        >
          <div className="categories__image categories__image--3" />

          <p className="categories__category">
            Accessories
          </p>

          <p className="categories__count">
            {`${accessoriesCount} models`}
          </p>
        </Link>
      </div>
    </div>
  );
};
