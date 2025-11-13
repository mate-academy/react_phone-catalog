import React, { useCallback, useContext, useState } from 'react';
import './LayoutSort.scss';
import { Dropdown } from '../../../../shared/components/Dropdown';
import { TranslationContext } from '../../../../../i18next/shared';
import debounce from 'lodash.debounce';
import { SortContext } from '../../../../shared/context/SortContext';
import { icons } from '../../../../../global-assets/static';

export const LayoutSort: React.FC = () => {
  const { additionalText } = useContext(TranslationContext);
  const { setSearchWith } = useContext(SortContext);
  const { sortTitle, sortBy, sortByAmount } = useContext(TranslationContext);
  const [queryTitle, setQueryTitle] = useState('');
  const CancelIcon = icons.cancel.valuePath;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleApplyQuery = useCallback(debounce(setSearchWith, 1000), [
    setSearchWith,
  ]);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQueryTitle(value);

    if (value.length === 0) {
      handleApplyQuery.cancel();
      setSearchWith({ query: null });
    } else {
      handleApplyQuery({ query: value });
    }
  };

  const handleClearQuery = () => {
    setQueryTitle('');
    setSearchWith({ query: null });
  };

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
      <div className="layout-sort__input">
        <button>
          <CancelIcon
            className="layout-sort__input__icon layout-sort__input__icon--cancel"
            onClick={handleClearQuery}
          />
        </button>
        <input
          className="layout-sort__input-text"
          value={queryTitle}
          type="text"
          name="query"
          placeholder={additionalText.searchPlaceholder}
          onChange={e => handleQuery(e)}
        ></input>
      </div>
    </section>
  );
};
