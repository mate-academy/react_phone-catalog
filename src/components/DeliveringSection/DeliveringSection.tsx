import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeArray } from '../../helpers/makeArray';

type Props = {
  rootName: string,
  rootClassName: string,
  numberOfItems: number,
};

export const DeliveringSection: React.FC<Props> = React.memo(({
  rootName,
  rootClassName,
  numberOfItems,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`${rootClassName}__section`}
    >
      <strong className={`${rootClassName}__header`}>
        {t(rootName)}
      </strong>

      <br />

      <ul className={`${rootClassName}__list`}>
        {makeArray(numberOfItems).map(item => (
          <li
            key={item}
            className={`${rootClassName}__list-item`}
          >
            {t(`${rootName}${item + 1}`)}
          </li>
        ))}
      </ul>
    </div>
  );
});
