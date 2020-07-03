// import React from 'react';

// const AccessoriesPage = () => {
//   return (
//     <>
//       <p>AccessoriesPage</p>

//     </>
//   );
// };

// export default AccessoriesPage;

import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import BreadCrums from '../Breadcrumbs/Breadcrumbs';
import { getProducts } from '../../helpers/api';
import Sort from '../Sort/Sort';
import './AccessoriesPage.scss';
import { sortProducts } from '../../helpers/sortProducts';


type Props = { product: Product[]};

const AccessoriesPage: React.FC<Props> = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const sortBy = useMemo(() => searchParams.get('sortBy') || '', [searchParams]);

  useEffect(() => {
    getProducts()
      .then(data => setAccessories(data.filter((product: Product) => product.type === 'accessories')));
  }, []);

  const visibleAccessories = useMemo(() => {
    return accessories
      .filter((accessorie) => (
        (accessorie.name + accessorie.screen + accessorie.capacity)
          .toLowerCase()
          .includes(query.toLowerCase())
      ));
  }, [query, accessories]);

  const visibleProducts = useMemo(() => {
    return sortProducts(visibleAccessories, sortBy);
  }, [visibleAccessories, sortBy]);

  return (

    <>
      <div className="AccessoriesPage">
        <BreadCrums />
        <div className="AccessoriesPage__title">
          <p className="AccessoriesPage__name">Accessories</p>
          <span className="AccessoriesPage__quantity">
            {accessories.length}
            {' '}
            models
          </span>
        </div>
        {accessories.length > 0 ? (
          <>
            <Sort />
            <ProductList products={visibleProducts} />
          </>
        ) : (
          <div className="AccessoriesPage__notFound">
            <p className="AccessoriesPage__notFound--title">Sorry, accessories not found</p>
            <img className="AccessoriesPage__notFound--img" src="./img/notFound.png" alt="notFound" />
          </div>
        )}
      </div>
    </>
  );
};

export default AccessoriesPage;
