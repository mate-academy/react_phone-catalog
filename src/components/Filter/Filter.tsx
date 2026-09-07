import React from 'react';
import './Filter.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { Colors } from '../../constants/Colors';
import { useTranslation } from 'react-i18next';

type Props = {
  product: ProductDetails | undefined;
  products: Product[];
};

export const Filter: React.FC<Props> = React.memo(({ product, products }) => {
  const colors = product?.colorsAvailable;
  const { productId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  let path = pathname.split('-');

  const replaceColor = (newColor: string) => {
    if (
      path.some(item => {
        switch (item) {
          case 'space':
            return true;

          case 'rose':
            return true;

          case 'sky':
            return true;

          default:
            return false;
        }
      })
    ) {
      path = path.slice(0, -2);
      path.push(newColor);
    } else {
      path = path.slice(0, -1);
      path.push(newColor.replace(' ', '-'));
    }

    const newPath = path.join('-');

    navigate(newPath);
  };

  const selectedItem = products.find(
    item => item.itemId === productId?.slice(1),
  );

  return (
    <div className="filter">
      <div className="filter__top">
        <div className="filter__top-title">{t('filter.title')}</div>
        <div className="filter__top-id">{`ID: 802${selectedItem?.id}`}</div>
      </div>

      <ul className="filter__list">
        {colors?.map(item => (
          <li
            className={classNames('filter__list-item', {
              'filter__list-item_is-active': product?.color === item,
            })}
            key={item}
          >
            <div
              className="filter__list-circle"
              style={{ backgroundColor: Colors[item] }}
              onClick={() => replaceColor(item)}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
});

Filter.displayName = 'Filter';
