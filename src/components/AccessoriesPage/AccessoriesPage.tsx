// import React from 'react';

// const AccessoriesPage = () => {
//   return (
//     <>
//       <p>AccessoriesPage</p>

//     </>
//   );
// };

// export default AccessoriesPage;

import React, { useState, useEffect } from 'react';
import ProductList from '../ProductList/ProductList';
import { getProducts } from '../../helpers/api';
import Sort from '../Sort/Sort';
import './AccessoriesPage.scss';


type Props = { product: Product[]};
const AccessoriesPage: React.FC<Props> = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(data => setAccessories(data.filter((product: Product) => product.type === 'accessories')));
  }, []);

  return (

    <>
      <div className="AccessoriesPage">
        <div className="AccessoriesPage__title">
          <p className="AccessoriesPage__title--name">Accessories</p>
          <span className="AccessoriesPage__title--quantity">
            {accessories.length}
            {' '}
            models
          </span>
        </div>
        {accessories.length > 0 ? (
          <>
            <Sort />
            <ProductList products={accessories} />
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
