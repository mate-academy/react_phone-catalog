import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import './GoodsList.scss';
import { GoodItem } from './GoodItem';
import { sectionsLinks } from '../../helpers';

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
    <section className="section">
      <h1>
        {sectionProp?.title || sectionProp?.name}
      </h1>
      <div className="GoodsList">
        {filteredGoods.map(good => (
          <GoodItem good={good} key={good.id} />
        ))}
      </div>
    </section>
  );
};
