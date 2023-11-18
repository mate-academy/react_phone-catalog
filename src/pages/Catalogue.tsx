/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import { Link, Outlet, useParams } from 'react-router-dom';
import Select, { StylesConfig, ClassNamesConfig } from 'react-select';

import classNames from 'classnames';
import { useContext, useEffect } from 'react';
import { appContext, OptionType } from '../Contexts/AppContext';
import { typographyStyle } from '../CustomStyles/Typography';
import { ProductCard } from '../Components/ProductCard';
import { ArrowButton } from '../Components/ArrowButton';
import { scrollToTop } from '../utils/scrollToTop';
import { StylishTextButton } from '../Components/StylishTextButton';

const options: OptionType[] = [
  { value: 8, label: '8' },
  { value: 16, label: '16' },
  { value: 32, label: '32' },
];

export const Catalogue = () => {
  const {
    products, perPage, setPerPage, currentItem,
  } = useContext(appContext);
  const { catalogueId, itemId } = useParams();

  const handleOptionChange = (item: unknown) => {
    setPerPage(item as OptionType);
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
    menuList: () => `text-Secondary border py-2 border-Elements bg-white  ${typographyStyle.bodyText}`,
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
  }, []);

  return (
    <>
      <hr className="col-span-full mb-6 border-0" />

      <div
        className={`col-span-full flex h-4 items-center gap-x-2 ${typographyStyle.smallText}`}
      >
        <Link to="/">
          <img src="/Icons/Home.svg" alt="home" />
        </Link>

        <img src="/Icons/Chevron (Arrow Right).svg" alt="home" />

        <Link className="capitalize" to={`/catalogue/${catalogueId}`}>
          {catalogueId}
        </Link>

        {!!itemId && (
          <>
            <img src="/Icons/Chevron (Arrow Right).svg" alt="home" />

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
            {`${products.length} ${products.length === 1 ? 'model' : 'models'}`}
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
                  unstyled
                  aria-labelledby="aria-label"
                  inputId="aria-example-input"
                  styles={customStyles}
                  className={`h-10 w-[176px] appearance-none text-Primary ${typographyStyle.button}`}
                  classNames={customClasses}
                  defaultValue={{ value: 'newest', label: 'Newest' }}
                  options={[{ value: 'newest', label: 'Newest' }]}
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
                  value={perPage}
                  unstyled
                  aria-labelledby="aria-label"
                  inputId="aria-example-input"
                  styles={customStyles}
                  className={`h-10 w-[128px] appearance-none text-Primary ${typographyStyle.button}`}
                  classNames={customClasses}
                  onChange={handleOptionChange}
                  defaultValue={options[0]}
                  options={options}
                />
              </div>
            </div>
          </form>

          <hr className="col-span-full mb-6 border-0" />

          <div className="col-span-full grid grid-cols-4 gap-4">
            {!!products.length
              && products
                .sort((a, b) => b.year - a.year)
                .slice(0, perPage.value)
                .map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          <hr className="col-span-full mb-10 border-0" />

          <div className="col-span-full flex justify-center gap-x-2">
            <ArrowButton direction="left" />

            <StylishTextButton active>1</StylishTextButton>
            <StylishTextButton>2</StylishTextButton>

            <ArrowButton direction="right" />
          </div>
        </>
      )}

      <hr className="col-span-full mb-20 border-0" />
    </>
  );
};
