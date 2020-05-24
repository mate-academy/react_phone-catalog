import React, { useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import './GoodsSection.scss';
import { GoodsList } from '../GoodsList';
import { Pagination } from '../Pagination';
import { sectionsLinks, perPageDefault } from '../../helpers';

type Props = {
  goods: Good[];
};

export const GoodsSection: React.FC<Props> = ({ goods }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentPage = Number(params.get('page'));
  const perPage = Number(params.get('perPage')) || perPageDefault;

  const { section } = useParams();
  const sectionProp = sectionsLinks.find(link => link.url === `/${section}`);

  const filteredGoods = useMemo(
    () => goods.filter(good => good.type === sectionProp?.type),
    [goods, sectionProp],
  );
  const paginatedGoods = filteredGoods.slice(
    (currentPage || 1) * perPage - perPage,
    (currentPage || 1) * perPage,
  );

  return (
    <section className="section GoodsSection">
      <h1 className="GoodsSection__Heading">
        {sectionProp?.title || sectionProp?.name}
      </h1>
      <div className="GoodsSection__Qty">
        {`${filteredGoods.length} models`}
      </div>
      <div className="GoodsSection__Sort">
        /
      </div>
      <div className="GoodsSection__Container">
        <GoodsList goods={paginatedGoods} />
      </div>
      {filteredGoods.length > perPage && (
        <div className="Pagination">
          <Pagination qty={filteredGoods.length} perPage={perPage} />
        </div>
      )}
    </section>
  );
};
