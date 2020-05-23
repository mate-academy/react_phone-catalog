import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import './GoodsList.scss';
import { GoodItem } from './GoodItem';
import { sectionsLinks, sortType } from '../../helpers';

type Props = {
  goods: Good[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  const { section } = useParams();
  const sectionProp = sectionsLinks.find(link => link.url === `/${section}`);
  const filteredGoods = useMemo(
    () => goods.filter(good => good.type === sectionProp?.type),
    [goods, sectionProp],
  );

  return (
    <section className="section GoodsList">
      <h1 className="GoodsList__Heading">
        {sectionProp?.title || sectionProp?.name}
      </h1>
      <div className="GoodsList__Qty">
        {`${filteredGoods.length} models`}
      </div>
      <div className="GoodList__Sort">
        {/* {sortType.map(type = )} */}
        {console.log(sortType)}
      </div>
      <div className="GoodsList__Container">
        {filteredGoods.map(good => (
          <GoodItem good={good} key={good.id} />
        ))}
      </div>
    </section>
  );
};
