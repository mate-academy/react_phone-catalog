import React, { useMemo } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';

import './GoodsSection.scss';
import { GoodsList } from '../GoodsList';
import { Pagination, SelectPerPage } from '../Pagination';
import {
  sectionsLinks,
  sortTypes,
  sortBy,
  perPageSettings,
} from '../../helpers';
import { Select } from '../Select';

type Props = {
  goods: Good[];
};

export const GoodsSection: React.FC<Props> = ({ goods }) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const currentPage = Number(searchParams.get('page'));
  const perPageDefault = perPageSettings[0].name;
  const perPageParam = useMemo(() => searchParams.get('perPage'), [searchParams]);
  let perPage = Number(perPageDefault);

  if (perPageSettings.find(item => item.name === perPageParam)) {
    perPage = Number(perPageSettings.find(item => item.name === perPageParam)?.name);
  } else {
    searchParams.set('perPage', perPageDefault);
    history.push({
      search: searchParams.toString(),
    });
  }

  const sortParam = searchParams.get('sortBy');
  const sortType = sortTypes.find((sort: SortType) => sort.type === sortParam) || sortTypes[1];

  if (!sortType) {
    searchParams.set('sortBy', sortTypes[1].type);
    history.push({
      search: searchParams.toString(),
    });
  }

  const { section } = useParams();
  const sectionProp = sectionsLinks.find(link => link.url === `/${section}`);

  const filteredGoods = useMemo(
    () => goods.filter(good => good.type === sectionProp?.type),
    [goods, sectionProp],
  );

  const searchedGoods = useMemo(
    () => filteredGoods.filter(good => {
      return `${good.name} ${good.snippet}`.toLowerCase().includes(query);
    }),
    [query, filteredGoods],
  );

  const sortedGoods = useMemo(
    () => sortBy(searchedGoods, sortType),
    [searchedGoods, sortType],
  );

  const paginatedGoods = sortedGoods.slice(
    (currentPage || 1) * perPage - perPage,
    (currentPage || 1) * perPage,
  );

  return (
    <section className="section GoodsSection">
      <h1 className="GoodsSection__Heading">
        {sectionProp?.title || sectionProp?.name}
      </h1>
      <div className="GoodsSection__Qty">{`${filteredGoods.length} models`}</div>

      <div className="GoodsSection__Control">
        {filteredGoods.length > 1 && (
          <>
            <div className="GoodsSection__Select">
              <div className="GoodsSection__SelectName">
                Sort by
              </div>
              <Select options={sortTypes} />
            </div>

            <div className="GoodSection__Select">
              <div className="GoodsSection__SelectName">
                Items on page
              </div>
              <SelectPerPage options={perPageSettings} />
            </div>
          </>
        )}
      </div>

      <div className="GoodsSection__Container">
        <GoodsList goods={paginatedGoods} />
      </div>
      {filteredGoods.length > perPage && (
        <div className="Pagination">
          <Pagination qty={searchedGoods.length} perPage={perPage} />
        </div>
      )}
    </section>
  );
};
