/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import { Link, Outlet, useParams } from 'react-router-dom';
import Select, { StylesConfig, ClassNamesConfig } from 'react-select';

import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../Contexts/AppContext';
import { typographyStyle } from '../CustomStyles/Typography';
import { ProductCard } from '../Components/ProductCard';
import { scrollToTop } from '../utils/scrollToTop';
import { Pagintaion } from '../Components/Pagintaion';
import { PaginationHelper } from '../utils/PaginationHelper';
import { Loader } from '../Components/Loader';

type OptionPaginationType = { value: string; label: string };
type OptionSortType = {
  value: string;
  label: string;
};

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

  const { catalogueId, itemId } = useParams();

  const searchQuery = searchParams.get('query');
  const currentPage = searchParams.get('page') || 1;
  const perPage = searchParams.get('per-page');
  const sortBy = searchParams.get('sort-by');

  const defaultSortOption: OptionSortType = {
    value: sortBy || 'year',
    label: sortBy
      ? sortOptions.find(option => option.value === sortBy)?.label || 'Newest'
      : 'Newest',
  };

  const defaultPaginationOption: OptionPaginationType = {
    value: perPage || '8',
    label: perPage || '8',
  };

  const [sortOption, setSortOption]
    = useState<OptionSortType>(defaultSortOption);
  const [paginationOption, setPaginationOption]
    = useState<OptionPaginationType>(defaultPaginationOption);

  const pagination = new PaginationHelper(
    categoryProducts,
    +paginationOption.value,
  );
  const pages = Array.from({ length: pagination.pageCount() })
    .fill(0)
    .map((_, i) => i + 1);

  const setSearchAndSetOption = (
    item: OptionPaginationType | OptionSortType,
    key: string,
  ) => {
    setSearchParams(params => {
      params.set(key, item.value.toString());

      return params;
    });

    switch (key) {
      case 'per-page':
        setPaginationOption(item as OptionPaginationType);
        break;
      case 'sort-by':
        setSortOption(item as OptionSortType);
        break;
      default:
        break;
    }
  };

  const handlePagintaionChange = (item: OptionPaginationType) => {
    setSearchAndSetOption(item, 'per-page');
  };

  const handleSortChange = (item: OptionSortType) => {
    setSearchAndSetOption(item, 'sort-by');
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

    if (!perPage) {
      setPaginationOption(defaultPaginationOption);
    }

    if (!sortBy) {
      setSortOption(defaultSortOption);
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
            {searchQuery && `found ${visibleProducts.length} models`}

            {!searchQuery && categoryProducts.length === 0 && 'not found'}

            {!searchQuery
              && categoryProducts.length !== 0
              && `${categoryProducts.length} ${
                categoryProducts.length === 1 ? 'model' : 'models'
              }`}
          </p>

          {!searchQuery && !!visibleProducts.length && (
            <>
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
                      options={sortOptions}
                      onChange={e => handleSortChange(e as OptionSortType)}
                      value={sortOption}
                      isSearchable={false}
                      unstyled
                      aria-labelledby="aria-label"
                      inputId="aria-example-input"
                      styles={customStyles}
                      className={`h-10 w-[176px] appearance-none text-Primary ${typographyStyle.button}`}
                      classNames={customClasses}
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
                      options={paginationOptions}
                    />
                  </div>
                </div>
              </form>
            </>
          )}

          <hr className="col-span-full mb-6 border-0" />

          {!visibleProducts.length ? (
            <Loader />
          ) : (
            <div className="col-span-full grid grid-cols-4 gap-4">
              {!!visibleProducts.length
                && visibleProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          )}

          <hr className="col-span-full mb-10 border-0" />
        </>
      )}

      <hr className="col-span-full mb-20 border-0" />

      {currentPage
        && !!pages.length
        && !searchQuery
        && !itemId
        && !Number.isNaN(perPage || 8) && (
        <Pagintaion currentPage={+currentPage} pages={pages} />
      )}
    </>
  );
};
