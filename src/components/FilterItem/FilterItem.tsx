import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Good } from '../../types/Good';
import { getUniqueArray } from '../../helpers/getUniqueArray';
import { findKeyByValue } from '../../helpers/findKeyByValue';

type Props = {
  rootClassName: string,
  item: string,
  goods: Good[],
};

export const FilterItem: React.FC<Props> = React.memo(({
  rootClassName,
  item,
  goods,
}) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const isParamInUrl = (
    nameOfParam: string,
    param: string,
  ) => {
    const params = searchParams.getAll(`${nameOfParam.toLowerCase()}`) || [];

    return !!params.includes(param);
  };

  const toggleType = (
    nameOfParam: string,
    param: string,
  ) => {
    const typeParams = searchParams.getAll(nameOfParam) || [];
    const newTypes = typeParams.includes(param)
      ? typeParams.filter(typeParam => typeParam !== param)
      : [...typeParams, param];

    const updatedParams = new URLSearchParams(searchParams.toString());

    updatedParams.delete(nameOfParam);

    newTypes.forEach(newType => {
      updatedParams.append(nameOfParam, newType);
    });

    return updatedParams.toString();
  };

  return (
    <li
      className={`${rootClassName}__filter-list-item`}
      key={item}
    >
      <h3 className={`${rootClassName}__filter-list-item-title`}>
        {t(item)}
      </h3>

      <ul
        className={`${rootClassName}__filter-list-item-options-list`}
      >
        {getUniqueArray(goods.map(good => good[item])).map(type => (
          <li
            className={`${rootClassName}__filter-list-item-options-list-item`}
            key={type}
          >
            <Link
              className={classNames(
                `${rootClassName}__filter-list-item-button`,
                `${rootClassName}__filter-list-item-button--${type}`,
                {
                  [`${rootClassName}__filter-list-item-button--active`]: isParamInUrl(
                    findKeyByValue(goods, type),
                    type,
                  ),
                },
              )}
              to={{
                search: toggleType(
                  findKeyByValue(goods, type),
                  type,
                ),
              }}
            >
              {type === 'sizes'
                || type === 'colors'
                || type === 'year' ? (
                  type
                ) : (
                  t(type)
                )}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
});
