import React from 'react';
import './CatalogViewSettings.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/utils/getSearchWith';

type Props = {};

const ITEM_NAME = 'item';
const SORT_NAME = 'sort';

export const CatalogViewSettings: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortValue = searchParams.get('sort') || 'newest';
  const itemsValue = searchParams.get('item') || '4';

  const change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name: key, value, name } = e.target;

    const params = getSearchWith({ [key]: value }, searchParams);

    const newParams = new URLSearchParams(params);

    switch (name) {
      case SORT_NAME:
        break;

      case ITEM_NAME:
        newParams.set('page', '1');
        break;

      default:
        break;
    }

    setSearchParams(newParams);
  };

  return (
    <section className="selectors">
      <div className="selector">
        <span className="selector__title">Sort by</span>
        <div className="selector__container">
          {/* eslint-disable-next-line */}
          <div className="selector__arrow"></div>

          <select
            name={SORT_NAME}
            id="sort"
            className="selector__body"
            value={sortValue}
            onChange={change}
          >
            <option value="newest" className="selector__option">
              Newest
            </option>
            <option value="ascending" className="selector__option">
              Ascending
            </option>
            <option value="descending" className="selector__option">
              Descending
            </option>
          </select>
        </div>
      </div>

      <div className="selector">
        <span className="selector__title">Sort by</span>

        <div className="selector__container">
          {/* eslint-disable-next-line */}
          <div className="selector__arrow"></div>

          <select
            name={ITEM_NAME}
            id="item"
            className="selector__body"
            value={itemsValue}
            onChange={change}
          >
            <option value="4" className="selector__option">
              4
            </option>
            <option value="8" className="selector__option">
              8
            </option>
            <option value="16" className="selector__option">
              16
            </option>
            <option value="all" className="selector__option">
              all
            </option>
          </select>
        </div>
      </div>
    </section>
  );
};
