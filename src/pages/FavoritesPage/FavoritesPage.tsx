import { useContext, useEffect } from 'react';
import { MainContext } from '../../context';
import { PathBlock } from '../../components/PathBlock';

import './favourites-page.scss';
import { ProductsList } from '../../components/ProductsList';
import { scrollToTop } from '../../helpers/scrollToTop';

export const Favorites = () => {
  const {
    products,
    currentPage,
    setCurrentPage,
  } = useContext(MainContext);

  useEffect(() => {
    setCurrentPage('Favourites');
    scrollToTop();
  }, []);

  return (
    <div className="favourites__page">
      <PathBlock
        currentPage={currentPage}
      />
      <h1 className="fvourites__title">Favourites</h1>
      <p className="favourites-items__amount">5 items</p>
      <ProductsList products={products} />
    </div>
  );
};
