import './Catalog.style.scss';

import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { useAppSelector } from '../../../app/hooks';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Button } from '../Buttons/Buttons';

type Props = {
  items: Product[];
  category: 'phones' | 'tablets' | 'accessories';
};

interface CurrentSearchParams {
  [key: string]: string;
}

interface IsSelecting {
  [key: string]: boolean;
}

const selectors = {
  sortBy: ['newest', 'alphabetically', 'cheapest'],
  itemsOnPage: ['4', '8', '16', 'all'],
};

const isSelectingInitialState: IsSelecting = {
  sortBy: false,
  itemsOnPage: false,
};

function sortBySearchParams(
  products: Product[],
  pageNumber: number,
  sortBy: string = 'newest',
  itemsOnPage: number = 16,
) {
  const newProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.year - a.year;
      case 'alphabetically':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return a.price - b.price;
      default:
        return b.year - a.year;
    }
  });
  const firstItemOnPage = (pageNumber - 1) * itemsOnPage;
  const lastItemOnPage = firstItemOnPage + itemsOnPage;

  return newProducts.slice(firstItemOnPage, lastItemOnPage);
}

export const Catalog: React.FC<Props> = ({ items, category }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearchParams: CurrentSearchParams = {
    activePageNumber: searchParams.get('activePageNumber') || '1',
    firstVisiblePage: searchParams.get('firstVisiblePage') || '1',
    sortBy: searchParams.get('sortBy') || 'newest',
    itemsOnPage: searchParams.get('itemsOnPage') || '16',
  };

  const maxNumberOfPages = items.length / +currentSearchParams.itemsOnPage;
  const pages = Array.from({ length: maxNumberOfPages }, (_, index) => index);
  const lastVisiblePage = +currentSearchParams.firstVisiblePage + 4;
  const visiblePages = pages.slice(
    +currentSearchParams.firstVisiblePage,
    lastVisiblePage,
  );

  const sortedItems = useMemo(
    () =>
      sortBySearchParams(
        items,
        +currentSearchParams.activePageNumber,
        currentSearchParams.sortBy,
        +currentSearchParams.itemsOnPage,
      ),
    [items, currentSearchParams],
  );

  const [isSelecting, setIsSelecting] = useState(isSelectingInitialState);
  const [canSelectionTransform, setCanSelectionTransform] = useState(
    isSelectingInitialState,
  );

  const productNumber = {
    phones: useAppSelector(state => state.phones.phones).length,
    tablets: useAppSelector(state => state.tablets.tablets).length,
    accessories: useAppSelector(state => state.accessories.accessories).length,
  };

  const handleSelectionOpen = (param: string) => {
    const prevState = isSelecting[param];

    if (prevState) {
      setCanSelectionTransform(prev => ({ ...prev, [param]: !prevState }));
      setTimeout(() => {
        setIsSelecting(prev => ({ ...prev, [param]: !prevState }));
      }, 300);
    } else {
      setIsSelecting(prev => ({ ...prev, [param]: !prevState }));
      setTimeout(() => {
        setCanSelectionTransform(prev => ({ ...prev, [param]: !prevState }));
      }, 1);
    }
  };

  const handleSearchParams = (param: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (param === 'sortBy' || param === 'itemsOnPage') {
      const prevState = isSelecting[param];

      setCanSelectionTransform(prev => ({ ...prev, [param]: !prevState }));
      setTimeout(() => {
        setIsSelecting(prev => ({ ...prev, [param]: !prevState }));
      }, 300);
    }

    newSearchParams.set(param, value);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="catalog">
      <Breadcrumbs />

      <div className="catalog__title">
        <h1 className="catalog__title__heading">
          {category === 'phones'
            ? 'Mobile phones'
            : category.slice(0, 1).toUpperCase().concat(category.slice(1))}
        </h1>

        <p className="catalog__title__subtitle">
          {`${productNumber[category]} models`}
        </p>
      </div>

      <div className="catalog__selectors">
        {Object.entries(selectors).map(([key, value]) => (
          <div
            key={key}
            className={classNames(
              'catalog__selectors__selector',
              'selector',
              {
                selector__sortBy: key === 'sortBy',
              },
              { 'selector__items-on-page': key === 'itemsOnPage' },
            )}
          >
            <p className="selector__title">
              {key === 'sortBy' ? 'Sort by' : 'Items on page'}
            </p>

            <div className="selector__selection">
              <div
                className={classNames('selector__current-option', {
                  'selector__current-option__focused': isSelecting[key],
                })}
              >
                <p className="selector__current-option__name">
                  {currentSearchParams[key]
                    .slice(0, 1)
                    .toUpperCase()
                    .concat(currentSearchParams[key].slice(1))}
                </p>

                <div
                  className={classNames('selector__choose-option', {
                    'selector__choose-option__focused':
                      canSelectionTransform[key],
                  })}
                  onClick={() => handleSelectionOpen(key)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.52876 10.4714C3.26841 10.211 3.26841 9.7889 3.52876 9.52855L7.52876 5.52856C7.78911 5.26821 8.21122 5.26821 8.47157 5.52856L12.4716 9.52856C12.7319 9.78891 12.7319 10.211 12.4716 10.4714C12.2112 10.7317 11.7891 10.7317 11.5288 10.4714L8.00016 6.94277L4.47157 10.4714C4.21122 10.7317 3.78911 10.7317 3.52876 10.4714Z"
                      fill="#B4BDC4"
                    />
                  </svg>
                </div>
              </div>

              <div
                className={classNames(
                  'selector__all-options',
                  {
                    'selector__all-options__open': isSelecting[key],
                  },
                  {
                    'selector__all-options__transform':
                      canSelectionTransform[key],
                  },
                )}
              >
                {value.map(option => (
                  <div
                    key={option}
                    className="selector__option"
                    onClick={() => handleSearchParams(key, option)}
                  >
                    <p className="selector__option__name">
                      {option.slice(0, 1).toUpperCase().concat(option.slice(1))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="catalog__items">
        {sortedItems.length > 0 &&
          sortedItems.map((item: Product) => {
            return <ProductCard key={item.id} product={item} />;
          })}
      </div>

      <div className="catalog__pagination">
        <Button
          direction={'back'}
          disabled={currentSearchParams.firstVisiblePage === '1'}
          handleClick={() =>
            handleSearchParams(
              'firstVisiblePage',
              (+currentSearchParams.firstVisiblePage - 1).toString(),
            )
          }
        />

        <div className="catalog__pages">
          {visiblePages.map(page => (
            <div
              className={classNames('catalog__page', {
                'catalog__page--active':
                  +currentSearchParams.activePageNumber === page,
              })}
              onClick={() =>
                handleSearchParams('activePageNumber', page.toString())
              }
            >
              <p className="catalog__page__content">{page}</p>
            </div>
          ))}
        </div>

        <Button
          direction={'forward'}
          disabled={lastVisiblePage === maxNumberOfPages}
          handleClick={() =>
            handleSearchParams(
              'firstVisiblePage',
              (+currentSearchParams.firstVisiblePage + 1).toString(),
            )
          }
        />
      </div>
    </div>
  );
};
