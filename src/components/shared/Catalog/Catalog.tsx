import './Catalog.style.scss';

import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { useAppSelector } from '../../../app/hooks';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Button } from '../Buttons/Buttons';
import {
  IsSelecting,
  SearchParams,
  SearchParamsKeys,
} from '../../../types/CatalogTypes';

type Props = {
  items: Product[];
  category: 'phones' | 'tablets' | 'accessories';
};

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
  pageNumber: string,
  sortBy: string = 'newest',
  itemsOnPage: string = '16',
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

  if (itemsOnPage === 'all') {
    return newProducts;
  }

  const firstItemOnPage = (+pageNumber - 1) * +itemsOnPage;
  const lastItemOnPage = firstItemOnPage + +itemsOnPage;

  return newProducts.slice(firstItemOnPage, lastItemOnPage);
}

export const Catalog: React.FC<Props> = ({ items, category }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearchParams: SearchParams = {
    activePageNumber: searchParams.get('activePageNumber') || '1',
    firstVisiblePage: searchParams.get('firstVisiblePage') || '1',
    sortBy: searchParams.get('sortBy') || 'newest',
    itemsOnPage: searchParams.get('itemsOnPage') || '16',
  };

  const maxNumberOfPages = Math.ceil(
    items.length / +currentSearchParams.itemsOnPage,
  );

  const pages = Array.from(
    { length: maxNumberOfPages },
    (_, index) => index + 1,
  );

  const lastVisiblePage =
    pages.length < 4 ? pages.length : +currentSearchParams.firstVisiblePage + 3;

  const visiblePages = pages.slice(
    +currentSearchParams.firstVisiblePage - 1,
    lastVisiblePage,
  );

  const sortedItems = useMemo(
    () =>
      sortBySearchParams(
        items,
        currentSearchParams.activePageNumber,
        currentSearchParams.sortBy,
        currentSearchParams.itemsOnPage,
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

  const handleSearchParams = (param: Partial<SearchParams>) => {
    const newSearchParams = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(param)) {
      const shouldAnimate = key === 'sortBy' || key === 'itemsOnPage';

      if (shouldAnimate) {
        const prevState = isSelecting[key];

        setCanSelectionTransform(prev => ({ ...prev, [key]: !prevState }));
        setTimeout(() => {
          setIsSelecting(prev => ({ ...prev, [key]: !prevState }));
        }, 300);


        setSearchParams({[key]: value});

        return;
      } else {
        newSearchParams.set(key, value);

        setSearchParams(newSearchParams);
      }
    }
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
                  {currentSearchParams[key as SearchParamsKeys]
                    .slice(0, 1)
                    .toUpperCase()
                    .concat(
                      currentSearchParams[key as SearchParamsKeys].slice(1),
                    )}
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
                    onClick={() => handleSearchParams({ [key]: option })}
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
          sortedItems.map((item: Product) => (
            <ProductCard key={item.id} product={item} />
          ))}
      </div>

      {currentSearchParams.itemsOnPage !== 'all' && (
        <div className="catalog__pagination">
          <Button
            direction={'back'}
            disabled={currentSearchParams.activePageNumber === '1'}
            handleClick={() => {
              if (
                currentSearchParams.activePageNumber ===
                currentSearchParams.firstVisiblePage
              ) {
                handleSearchParams({
                  firstVisiblePage: (
                    +currentSearchParams.firstVisiblePage - 1
                  ).toString(),
                  activePageNumber: (
                    +currentSearchParams.activePageNumber - 1
                  ).toString(),
                });
              } else {
                handleSearchParams({
                  activePageNumber: (
                    +currentSearchParams.activePageNumber - 1
                  ).toString(),
                });
              }
            }}
          />

          <div className="catalog__pages">
            {visiblePages.map(page => (
              <div
                key={page}
                className={classNames('catalog__page', {
                  'catalog__page--active':
                    +currentSearchParams.activePageNumber === page,
                })}
                onClick={() =>
                  handleSearchParams({ activePageNumber: page.toString() })
                }
              >
                <p className="catalog__page__content">{page}</p>
              </div>
            ))}
          </div>

          <Button
            direction={'forward'}
            disabled={
              +currentSearchParams.activePageNumber === maxNumberOfPages
            }
            handleClick={() => {
              if (+currentSearchParams.activePageNumber === lastVisiblePage) {
                handleSearchParams({
                  firstVisiblePage: (
                    +currentSearchParams.firstVisiblePage + 1
                  ).toString(),
                  activePageNumber: (
                    +currentSearchParams.activePageNumber + 1
                  ).toString(),
                });
              } else {
                handleSearchParams({
                  activePageNumber: (
                    +currentSearchParams.activePageNumber + 1
                  ).toString(),
                });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};



// 🧠 Mental Model: How to break it down without breaking everything
// 🔄 What’s actually repeated?
// You use searchParams.get(...) in multiple places

// You handle state animations (isSelecting) in 2 selectors

// You render dropdowns that follow the same pattern

// You render a paginated list (with forward/back buttons)

// So the goal is: “Lift the logic up” into custom hooks or utilities, and “Push the display down” into smaller dumb components.

// ✅ What to break and how
// 1. 🔌 useCatalogSearchParams.ts
// What goes here?

// Getting and setting search params

// Calculating derived values like activePage, itemsOnPageNumber, visiblePages

// ts
// Копировать
// Редактировать
// // useCatalogSearchParams.ts
// export function useCatalogSearchParams(totalItems: number) {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const activePageNumber = +(searchParams.get('activePageNumber') || '1');
//   const itemsOnPageRaw = searchParams.get('itemsOnPage') || '16';
//   const itemsOnPage = itemsOnPageRaw === 'all' ? Infinity : +itemsOnPageRaw;
//   const sortBy = searchParams.get('sortBy') || 'newest';

//   const totalPages = Math.ceil(totalItems / itemsOnPage);

//   const firstVisiblePage = +(searchParams.get('firstVisiblePage') || '1');
//   const lastVisiblePage =
//     totalPages < 4 ? totalPages : firstVisiblePage + 3;

//   const visiblePages = Array.from(
//     { length: lastVisiblePage - firstVisiblePage + 1 },
//     (_, i) => firstVisiblePage + i,
//   );

//   const updateParams = (params: Partial<SearchParams>) => {
//     const newParams = new URLSearchParams(searchParams);
//     for (const [key, value] of Object.entries(params)) {
//       newParams.set(key, value);
//     }
//     setSearchParams(newParams);
//   };

//   return {
//     activePageNumber,
//     itemsOnPage,
//     sortBy,
//     visiblePages,
//     totalPages,
//     updateParams,
//     firstVisiblePage,
//     lastVisiblePage,
//   };
// }
// 2. 🧭 Pagination.tsx
// This component just gets props like:

// ts
// Копировать
// Редактировать
// <Pagination
//   current={activePageNumber}
//   visiblePages={visiblePages}
//   totalPages={totalPages}
//   onChangePage={handlePageChange}
// />
// It doesn't need to know about searchParams — that’s handled above 👆

// 3. ⬇️ SelectDropdown.tsx
// Props:

// ts
// Копировать
// Редактировать
// <SelectDropdown
//   title="Sort by"
//   options={['newest', 'alphabetically', 'cheapest']}
//   currentValue="alphabetically"
//   onSelect={(val) => updateParams({ sortBy: val })}
// />
// Then it can manage its own animation state internally (no need to pass isSelecting from parent).

// 4. 🧼 utils/sortProducts.ts
// ts
// Копировать
// Редактировать
// export function sortProducts(
//   products: Product[],
//   sortBy: string
// ): Product[] {
//   return [...products].sort((a, b) => {
//     switch (sortBy) {
//       case 'newest': return b.year - a.year;
//       case 'alphabetically': return a.name.localeCompare(b.name);
//       case 'cheapest': return a.price - b.price;
//       default: return b.year - a.year;
//     }
//   });
// }
// Then in your component:

// ts
// Копировать
// Редактировать
// const sortedItems = useMemo(() => {
//   const sorted = sortProducts(items, sortBy);
//   if (itemsOnPage === Infinity) return sorted;
//   const start = (activePageNumber - 1) * itemsOnPage;
//   return sorted.slice(start, start + itemsOnPage);
// }, [items, sortBy, activePageNumber, itemsOnPage]);
// ✨ The result?
// Now your Catalog.tsx is:

// One useCatalogSearchParams() call

// One useMemo() for sortedItems

// <Pagination />

// <SelectDropdown /> twice

// items.map(...)

// No animation state, no raw URLSearchParams, no spaghetti logic.

// Want me to actually start breaking this into files/components for you, or generate some of the refactored code?







// Вы сказали:
//  const updateParams = (params: Partial<SearchParams>) => {
//     const newParams = new URLSearchParams(searchParams);
//     for (const [key, value] of Object.entries(params)) {
//       newParams.set(key, value);
//     }
//     setSearchParams(newParams);
//   };

// here you're ommitting o much that I depend on? for example I need to change the state? and more over I have to regect all other params except items on page or the way I sort? so I can't just set


// ChatGPT сказал:
// I understand your concern about managing URL search parameters without unintentionally overriding existing ones. To address this, you can update specific parameters while preserving others by following these steps:

// Clone the Current Parameters: Create a new instance of URLSearchParams based on the existing searchParams.​

// Modify the Desired Parameters: Use the set method to update or add specific parameters.​

// Apply the Updated Parameters: Use setSearchParams to update the URL with the modified parameters.​
// Reddit

// Here's how you can implement this:

// jsx
// Копировать
// Редактировать
// const updateParams = (params: Partial<SearchParams>) => {
//   const newParams = new URLSearchParams(searchParams);

//   Object.entries(params).forEach(([key, value]) => {
//     if (value === null || value === undefined) {
//       newParams.delete(key); // Remove the parameter if the value is null or undefined
//     } else {
//       newParams.set(key, value.toString()); // Update or add the parameter
//     }
//   });

//   setSearchParams(newParams);
// };
// Explanation:

// Cloning Existing Parameters: new URLSearchParams(searchParams) creates a new instance containing all current parameters, ensuring you don't mutate the original searchParams.​

// Updating Specific Parameters: By iterating over the params object, you can set new values or delete parameters as needed. This approach ensures that only the specified parameters are modified, leaving others intact.​

// Applying Changes: setSearchParams(newParams) updates the URL with the modified parameters without affecting other existing parameters.​

// This method allows you to manage URL parameters effectively, ensuring that updates to specific parameters don't inadvertently override others.​



// Источники






// Вы сказали:
// Thanks I will refactor it))


// ChatGPT сказал:
// You're welcome! Refactoring your code to manage URL search parameters more effectively is a great step. If you have any further questions or need assistance during the process, feel free to ask. Happy coding!


// Источники







