import React, { useContext, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { FavoritesContext } from './FavoritesContext';
import { GoodsList } from '../GoodsList';
import { Pagination, SelectPerPage } from '../Pagination';
import { PER_PAGE_SETTINGS } from '../../helpers';

interface Props {
  goods: Good[];
}

export const Favorites: React.FC<Props> = ({ goods }) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { favorites } = useContext(FavoritesContext);
  const favoritesProducts = useMemo(
    () => [...goods].filter(product => favorites.some(id => id === product.id)),
    [favorites, goods],
  );

  const currentPage = Number(searchParams.get('page'));
  const perPageDefault = PER_PAGE_SETTINGS[0].name;
  const perPageParam = useMemo(() => searchParams.get('perPage'), [searchParams]);
  let perPage = Number(perPageDefault);

  if (PER_PAGE_SETTINGS.find(item => item.name === perPageParam)) {
    perPage = Number(PER_PAGE_SETTINGS.find(item => item.name === perPageParam)?.name);
  } else {
    searchParams.set('perPage', perPageDefault);
    history.push({
      search: searchParams.toString(),
    });
  }

  const paginatedGoods = favoritesProducts.slice(
    (currentPage || 1) * perPage - perPage,
    (currentPage || 1) * perPage,
  );

  return (
    <section className="section GoodsSection">
      <Helmet>
        <title>Favorite Goods</title>
      </Helmet>
      <h1 className="GoodsSection__Heading">
        Favorite Goods
      </h1>
      <div className="GoodsSection__Qty">{`${favorites.length} items`}</div>
      <div className="GoodsSection__Control">
        {favoritesProducts.length > 1 && (
          <div className="GoodSection__Select">
            <div className="GoodsSection__SelectName">
              Items on page
            </div>
            <SelectPerPage options={PER_PAGE_SETTINGS} />
          </div>
        )}
      </div>
      <GoodsList goods={paginatedGoods} />
      {favoritesProducts.length > perPage && (
        <div className="Pagination">
          <Pagination qty={favoritesProducts.length} perPage={perPage} />
        </div>
      )}
    </section>
  );
};
