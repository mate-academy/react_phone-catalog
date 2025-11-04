import React, { useContext } from 'react';
import './LayoutSort.scss';
import { Dropdown } from '../../../../shared/components/Dropdown';
import { TranslationContext } from '../../../../../i18next/shared';

type LayoutSortProps = {};

export const LayoutSort: React.FC<LayoutSortProps> = ({}) => {
  const { sortTitle, sortBy, sortByAmount } = useContext(TranslationContext);

  return (
    <section className="layout-sort">
      {sortTitle.map(sortItem => (
        <div className="layout-sort__item" key={sortItem.sort}>
          <Dropdown
            content={{
              title: sortItem.title,
              typeOfSort: sortItem.sort,
              options: sortItem.sort === 'sortBy' ? sortBy : sortByAmount,
            }}
          />
        </div>
      ))}
    </section>
  );
};
