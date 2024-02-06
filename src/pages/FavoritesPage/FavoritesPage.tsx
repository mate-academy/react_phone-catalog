import { useContext, useEffect } from 'react';
import { MainContext } from '../../context';
import { PathBlock } from '../../components/PathBlock';

import './favourites-page.scss';
import { ProductsList } from '../../components/ProductsList';
import { scrollToTop } from '../../helpers/scrollToTop';
import { NotFoundProducts } from '../../components/NotFoundProducts';

export const Favorites = () => {
  const {
    currentPage,
    setCurrentPage,
    favoutitesItems,
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
      {favoutitesItems.length === 0 && <NotFoundProducts />}
      {favoutitesItems.length === 1 && <p className="favourites-items__amount">{`${favoutitesItems.length} item`}</p>}
      {favoutitesItems.length > 1 && <p className="favourites-items__amount">{`${favoutitesItems.length} items`}</p>}
      <ProductsList products={favoutitesItems} />
    </div>
  );
};
