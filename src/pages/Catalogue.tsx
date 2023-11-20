/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import { Link, Outlet, useParams } from 'react-router-dom';
import Select, { StylesConfig, ClassNamesConfig } from 'react-select';

import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../Contexts/AppContext';
import type {
  OptionPaginationType,
  OptionSortType,
} from '../Contexts/AppContext';
import { typographyStyle } from '../CustomStyles/Typography';
import { ProductCard } from '../Components/ProductCard';
import { scrollToTop } from '../utils/scrollToTop';
import { Pagintaion } from '../Components/Pagintaion';
import { PaginationHelper } from '../utils/PaginationHelper';

const paginationOptions: OptionPaginationType[] = [
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: '32', label: '32' },
  { value: 'All', label: 'All' },
];

const sortOptions: OptionSortType[] = [
  { value: 'year', label: 'Newest' },
  { value: 'name', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

export const Catalogue = () => {
  const {
    visibleProducts,
    categoryProducts,
    currentItem,
    setSearchParams,
    searchParams,
  } = useContext(appContext);
  const currentPage = searchParams.get('page');
  const perPage = searchParams.get('per-page');
  const sortBy = searchParams.get('sort-by');
  const { catalogueId, itemId } = useParams();
  const [sortOption, setSortOption] = useState<OptionSortType>({
    value: sortBy || 'year',
    label: 'Newest',
  });
  const [paginationOption, setPaginationOption]
    = useState<OptionPaginationType>({
      value: perPage || '8',
      label: perPage || '8',
    });

  const pagination = new PaginationHelper(
    visibleProducts,
    +paginationOption.value,
  );

  const pages = Array.from({ length: pagination.pageCount() })
    .fill(0)
    .map((_, i) => i + 1);

  const handlePagintaionChange = (item: OptionPaginationType) => {
    setSearchParams(params => {
      params.set('per-page', item.value.toString());

      return params;
    });

    setPaginationOption(() => {
      switch (item.value) {
        case '8': {
          return {
            value: item.value,
            label: item.value,
          };
        }

        case '16': {
          return {
            value: item.value,
            label: item.value,
          };
        }

        case '32': {
          return {
            value: item.value,
            label: item.value,
          };
        }

        default:
          return {
            value: '8',
            label: '8',
          };
      }
    });
  };

  const handleSortChange = (item: OptionSortType) => {
    setSearchParams(params => {
      params.set('sort-by', item.value.toString());

      return params;
    });

    setSortOption(() => {
      switch (item.value) {
        case 'year': {
          return {
            value: item.value,
            label: 'Newest',
          };
        }

        case 'name': {
          return {
            value: item.value,
            label: 'Alphabetically',
          };
        }

        case 'price': {
          return {
            value: item.value,
            label: 'Cheapest',
          };
        }

        default:
          return {
            value: item.value,
            label: 'Newest',
          };
      }
    });
  };

  const customStyles: StylesConfig = {
    control: state => ({
      ...state,
      borderRadius: 0,
      border: '1px solid #B4BDC3',
      boxShadow: 'none',
      padding: '0 12px',
      ':hover': {
        borderColor: '#89939A',
      },
      ':focus-within': {
        borderColor: '#313237',
      },
    }),
    menu: state => ({ ...state, borderRadius: '0' }),
    option: state => ({
      ...state,
      display: 'flex',
      padding: '0 12px',
    }),
  };

  const customClasses: ClassNamesConfig = {
    menuList: () => `text-Secondary border py-2 border-Elements bg-white ${typographyStyle.bodyText}`,
    option: state => classNames(
      'flex items-center h-8 hover:text-Primary hover:bg-Background',
      {
        'text-Primary bg-Background': state.isSelected,
      },
    ),
    dropdownIndicator: state => classNames('transition-all', {
      'rotate-180': state.selectProps.menuIsOpen,
    }),
  };

  useEffect(() => {
    scrollToTop();

    if (!currentPage) {
      setSearchParams(params => {
        params.set('page', '1');

        return params;
      });
    }

    if (!perPage) {
      setPaginationOption({
        value: '8',
        label: '8',
      });
    }

    if (!sortBy) {
      setSortOption({
        value: 'year',
        label: 'Newest',
      });
    }
  }, [searchParams]);

  useEffect(() => {
    setSearchParams(params => {
      params.set('page', '1');

      return params;
    });
  }, [perPage]);

  return (
    <>
      <hr className="col-span-full mb-6 border-0" />

      <div
        className={`col-span-full flex h-4 items-center gap-x-2 ${typographyStyle.smallText}`}
      >
        <Link to="/">
          <img src="./Icons/Home.svg" alt="home" />
        </Link>

        <img src="./Icons/Chevron (Arrow Right).svg" alt="home" />

        <Link className="capitalize" to={`/catalogue/${catalogueId}`}>
          {catalogueId}
        </Link>

        {!!itemId && (
          <>
            <img src="./Icons/Chevron (Arrow Right).svg" alt="home" />

            <span className="text-Secondary">{currentItem?.name}</span>
          </>
        )}
      </div>

      <hr className="col-span-full mb-10 border-0" />

      {itemId ? (
        <Outlet />
      ) : (
        <>
          <h1 className={`col-span-full capitalize ${typographyStyle.h1}`}>
            {catalogueId}
          </h1>

          <p
            className={`col-span-full text-Secondary ${typographyStyle.bodyText}`}
          >
            {`${categoryProducts.length} ${
              categoryProducts.length === 1 ? 'model' : 'models'
            }`}
          </p>

          <hr className="col-span-full mb-10 border-0" />

          <form className="col-span-full flex">
            <div className="flex gap-x-4">
              <div className="flex flex-col gap-y-1">
                <label
                  className={`block text-Secondary ${typographyStyle.smallText}`}
                  id="aria-label"
                  htmlFor="aria-example-input"
                >
                  Sort by
                </label>

                <Select
                  value={sortOption}
                  isSearchable={false}
                  unstyled
                  aria-labelledby="aria-label"
                  inputId="aria-example-input"
                  styles={customStyles}
                  className={`h-10 w-[176px] appearance-none text-Primary ${typographyStyle.button}`}
                  classNames={customClasses}
                  defaultValue={sortOptions[0]}
                  options={sortOptions}
                  onChange={e => handleSortChange(e as OptionSortType)}
                />
              </div>

              <div className="flex flex-col gap-y-1">
                <label
                  className={`block text-Secondary ${typographyStyle.smallText}`}
                  id="aria-label"
                  htmlFor="aria-example-input"
                >
                  Per page
                </label>

                <Select
                  value={paginationOption}
                  isSearchable={false}
                  unstyled
                  aria-labelledby="aria-label"
                  inputId="aria-example-input"
                  styles={customStyles}
                  className={`h-10 w-[128px] appearance-none text-Primary ${typographyStyle.button}`}
                  classNames={customClasses}
                  onChange={e => handlePagintaionChange(e as OptionPaginationType)}
                  defaultValue={paginationOptions[0]}
                  options={paginationOptions}
                />
              </div>
            </div>
          </form>

          <hr className="col-span-full mb-6 border-0" />

          {currentPage && perPage && !Number.isNaN(+perPage) && (
            <Pagintaion currentPage={+currentPage} pages={pages} />
          )}

          <hr className="col-span-full mb-6 border-0" />

          <div className="col-span-full grid grid-cols-4 gap-4">
            {!!visibleProducts
              && currentPage
              && perPage
              && visibleProducts
                .slice(
                  (+currentPage - 1) * +perPage,
                  (+currentPage - 1) * +perPage + +perPage,
                )
                .map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          <hr className="col-span-full mb-10 border-0" />
        </>
      )}

      <hr className="col-span-full mb-20 border-0" />
    </>
  );
};
