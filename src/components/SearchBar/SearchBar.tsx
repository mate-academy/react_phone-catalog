import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { Good } from '../../types/Good';
import { makeAlt } from '../../helpers/makeAlt';

import './SearchBar.scss';
import { giveCurrency } from '../../helpers/giveCurrency';

type Props = {
  className: string,
  goods: Good[],
  setIsSearchOpened?: (
    param: boolean | ((prevState: boolean) => boolean)
  ) => void,
};

export const SearchBar: React.FC<Props> = React.memo(({
  className,
  goods,
  setIsSearchOpened = () => { },
}) => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const currentLanguage = searchParams.get('lang') || 'en';

  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const filterArray = (
    items: Good[],
    filterParam: string,
  ) => {
    return items.filter(
      item => t(item.translationSlug).toLowerCase()
        .includes(filterParam.toLowerCase()),
    );
  };

  return (
    <div className={`searchBar ${className}`}>
      <div className="container">
        <input
          className="searchBar__input"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={`${t('searchPlaceholder')}`}
        />

        {!!filterArray(goods, appliedQuery).length && !!appliedQuery.length && (
          <ul
            className="searchBar__list"
          >
            {filterArray(goods, query).map(good => {
              const {
                images,
                translationSlug,
                price,
                sale,
                id,
                seoUrl,
              } = good;

              return (
                <li
                  className="searchBar__list-item"
                  key={id}
                >
                  <Link
                    className="searchBar__list-item-link"
                    to={{
                      pathname: seoUrl,
                      search: `?lang=${currentLanguage}`,
                    }}
                    onClick={() => setIsSearchOpened(false)}
                  >
                    <img
                      className="searchBar__list-item-image"
                      src={images[0]}
                      alt={makeAlt(images[0])}
                    />

                    <div className="searchBar__list-item-info">
                      <h3
                        className="searchBar__list-item-info-title"
                      >
                        {t(translationSlug)}
                      </h3>

                      <p
                        className="searchBar__list-item-info-price"
                      >
                        {sale ? (
                          price - (price * sale)
                        ) : (
                          price
                        )}
                        {' '}
                        {giveCurrency(currentLanguage)}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {!(filterArray(goods, appliedQuery).length) && appliedQuery.length && (
          <p>
            {t('noFilteredGoods')}
          </p>
        )}
      </div>
    </div>
  );
});
