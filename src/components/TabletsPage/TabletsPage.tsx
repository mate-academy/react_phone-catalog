// import React from 'react';

// const TabletsPage = () => {
//   return (
//     <>
//       <p>TabletsPage</p>

//     </>
//   );
// };

// export default TabletsPage;

import React, { useState, useEffect } from 'react';
import ProductList from '../ProductList/ProductList';
import { getProducts } from '../../helpers/api';
import Sort from '../Sort/Sort';


type Props = { product: Product[]};
const TabletsPage: React.FC<Props> = () => {
  const [tablets, setTablets] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(data => setTablets(data.filter((product: Product) => product.type === 'tablet')));
  }, []);

  return (

    <>

      <div className="TabletsPage__title">
        <p className="TabletsPage__name">Tabetsl</p>
        <span className="TabletsPage__quantity">
          {tablets.length}
          {' '}
          models
        </span>
      </div>
      <Sort />
      <ProductList products={tablets} />

    </>
  );
};

export default TabletsPage;
