import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import './GoodsSection.scss';
import { GoodsList } from '../GoodsList';
import { sectionsLinks, sortType } from '../../helpers';

type Props = {
  goods: Good[];
};

export const GoodsSection: React.FC<Props> = ({ goods }) => {
  const { section } = useParams();
  const sectionProp = sectionsLinks.find(link => link.url === `/${section}`);
  const filteredGoods = useMemo(
    () => goods.filter(good => good.type === sectionProp?.type),
    [goods, sectionProp],
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
        {/* {sortType.map(type = )} */}
        {console.log(sortType)}
      </div>
      <div className="GoodsSection__Container">
        <GoodsList goods={filteredGoods} />
      </div>
      <div className="Pagination">
        123
      </div>
    </section>
  );
};
