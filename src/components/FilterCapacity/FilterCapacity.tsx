import React from 'react';
import './FilterCapacity.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

type Props = {
  product: ProductDetails | undefined;
};

export const FilterCapacity: React.FC<Props> = React.memo(({ product }) => {
  const capacityArr = product?.capacityAvailable;

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const replaceCapacity = (newCapacity: string) => {
    const path = pathname.split('-');

    if (
      path.some(item => {
        switch (item) {
          case '38mm':
            return true;

          case '40mm':
            return true;

          case '42mm':
            return true;

          case '44mm':
            return true;

          default:
            return false;
        }
      })
    ) {
      const indexCapacity = path.findIndex(
        item =>
          item.includes('38mm') ||
          item.includes('42mm') ||
          item.includes('40mm') ||
          item.includes('44mm'),
      );

      path[indexCapacity] = newCapacity.toLowerCase();
    } else {
      path[path.length - 2] = newCapacity.toLowerCase();
    }

    const newPath = path.join('-');

    navigate(newPath);
  };

  return (
    <div className="filterCapacity">
      <div className="filterCapacity__top-title">
        {t('filterCapacity.title')}
      </div>

      <ul className="filterCapacity__list">
        {capacityArr?.map(item => (
          <li
            className={classNames('filterCapacity__list-item', {
              'is-active': product?.capacity === item,
            })}
            key={item}
            onClick={() => replaceCapacity(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

FilterCapacity.displayName = 'FilterCapacity';
