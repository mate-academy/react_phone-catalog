import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export type SearchParams = {
  [key: string]: string | string[] | null,
};

export const Selector: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortValue = searchParams.get('sort') || 'Standart';
  const countItems = searchParams.get('count') || '4';

  return (
    <div className="conteiner_sector">
      <div className="Selector">
        <span className="Selector_title">
          <p className="Selector_title_text">
            Sort by
          </p>
        </span>
        <select
          className="Selector_button"
          value={sortValue}
          onChange={(e) => setSearchParams(
            getSearchWith(searchParams, {
              sort: e.target.value === 'Standart' ? null : e.target.value,
            }),
          )}
        >
          {['Standart', 'Newest', 'Сheapest', 'Еxpensive'].map(
            item => (
              <option
                className="Selector_item"
                key={item}
                value={item}
              >
                {item}
              </option>
            ),
          )}
        </select>
      </div>
      <div className="Selector">
        <span className="Selector_title">
          <p className="Selector_title_text">
            Items on page
          </p>
        </span>
        <select
          className="Selector_button"
          value={countItems}
          onChange={(e) => setSearchParams(
            getSearchWith(searchParams, {
              count: e.target.value === '4' ? null : e.target.value,
            }),
          )}
        >
          {['4', '8', '12', '16'].map(
            item => (
              <option
                className="Selector_item"
                key={item}
                value={item}
              >
                {item}
              </option>
            ),
          )}
        </select>
      </div>
    </div>
  );
};
