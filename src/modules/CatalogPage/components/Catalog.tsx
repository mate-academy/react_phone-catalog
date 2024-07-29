import React, { useEffect, useState } from 'react';
import styles from './Catalog.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { ProductsList } from '../../shared/ProductsList/ProductsList';
import { Product } from './../../../types/Product';
import Select, { components, SingleValue } from 'react-select';

interface OptionsSortByType {
  value: string;
  label: string;
}

interface OptionsQuantityType {
  value: string;
  label: string;
}

const optionsSortBy: OptionsSortByType[] = [
  { value: 'Newest', label: 'Newest' },
  { value: 'Alphabetically', label: 'Alphabetically' },
  { value: 'Cheapest', label: 'Cheapest' },
];
const optionsQuantity: OptionsQuantityType[] = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'all' },
];

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <img
        src={
          props.selectProps.menuIsOpen
            ? '/icons/arrow-up-light-ico.svg'
            : '/icons/arrow-down-light-ico.svg'
        }
        alt="dropdown-indicator"
        style={{ width: '16px', height: '16px' }}
      />
    </components.DropdownIndicator>
  );
};

export const Catalog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [itemsOnPage, setItemsOnPage] = useState(4);
  const [sortBy, setSortBy] = useState('Newest');
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [models, setModels] = useState<number>(0);
  const [pagesWithProducts, setPagesWithProducts] = useState<number[]>([]);
  const [startShowFrom, setStartShowFrom] = useState(0);
  const location = useLocation();

  const productsFromServer = useAppSelector(state => state.products.objects);

  useEffect(() => {
    if (models !== null) {
      const pages = Math.abs(Math.ceil(models / itemsOnPage));

      const array = [];

      for (let i = 1; i <= pages; i++) {
        array.push(i);
      }

      setPagesWithProducts(array);
    }
  }, [models, itemsOnPage]);

  const prepereToShow = (categ: string) => {
    const filteredProduct = productsFromServer.filter(
      prod => prod.category === categ,
    );

    setModels(filteredProduct.length);

    switch (sortBy) {
      case 'Alphabetically':
        return filteredProduct
          .slice()
          .sort((el1, el2) => {
            return el1.name.localeCompare(el2.name);
          })
          .slice(startShowFrom, startShowFrom + itemsOnPage);

      case 'Cheapest':
        return filteredProduct
          .slice()
          .sort((el1, el2) => {
            return el1.price - el2.price;
          })
          .slice(startShowFrom, startShowFrom + itemsOnPage);

      default:
        return filteredProduct
          .slice()
          .sort((el1, el2) => {
            return el2.year - el1.year;
          })
          .slice(startShowFrom, startShowFrom + itemsOnPage);
    }
  };

  useEffect(() => {
    if (location.pathname === '/phones') {
      setTitle('Mobile phones');
      setDisplayedProducts(prepereToShow('phones'));
    } else if (location.pathname === '/tablets') {
      setTitle('Tablets');
      setDisplayedProducts(prepereToShow('tablets'));
    } else if (location.pathname === '/accessories') {
      setTitle('Accessories');
      setDisplayedProducts(prepereToShow('accessories'));
    }
  }, [
    location.pathname,
    productsFromServer,
    itemsOnPage,
    sortBy,
    startShowFrom,
  ]);

  const handleSortBySelect = (option: SingleValue<OptionsSortByType>) => {
    if (option) {
      const value = option.value;

      setSortBy(value);
    }
  };

  const handleQuantitySelect = (option: SingleValue<OptionsQuantityType>) => {
    if (option) {
      const value = option.value;

      if (value.toUpperCase() === value.toLowerCase()) {
        setItemsOnPage(+value);
      } else {
        setItemsOnPage(models);
      }
    }
  };

  function handlePageButton(page: number) {
    setStartShowFrom(itemsOnPage * (page - 1));
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__path}>
        <Link to="/">
          <img src="/icons/home-ico.svg" alt="home" />
        </Link>

        <img src="/icons/arrow-right-light-ico.svg" alt="arrow-right" />

        <p className={styles.catalog__pathCategory}>
          {location.pathname.slice(1)}
        </p>
      </div>
      <h1 className={styles.catalog__title}>{title}</h1>
      <p className={styles.catalog__quantity}>{`${models} models`}</p>
      <div className={styles.catalog__filters}>
        <div
          className={`${styles.catalog__filterBlock} ${styles.catalog__filterBlockSortBy}`}
        >
          <p className={styles.catalog__filterText}>Sort by</p>

          <Select
            onChange={handleSortBySelect}
            options={optionsSortBy}
            defaultValue={optionsSortBy[0]}
            components={{ DropdownIndicator }}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: '1px solid #B4BDC4',
                borderRadius: 0,
                height: '40px',
                width: '100%',
                fontFamily: 'Montserrat',
                fontSize: '14px',
                color: '#313237',
                fontWeight: '700',
                lineHeight: '21px',
                letterSpacing: '0%',
                textAlign: 'left',
                cursor: 'pointer',

                boxShadow: state.isFocused ? '0 0 0 1px #313237' : 'none',

                '&:hover': {
                  border: '1px solid #89939A',
                },

                '&:focus': {
                  border: '1px solid #313237',
                },
              }),

              option: baseStyles => ({
                ...baseStyles,
                color: '#89939a',
                fontFamily: 'Montserrat',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '21px',
                letterSpacing: '0%',
                textAlign: 'left',
                cursor: 'pointer',
                backgroundColor: 'none',

                '&:hover': {
                  color: '#313237',
                },
              }),

              menu: baseStyles => ({
                ...baseStyles,
                borderRadius: '0',
                border: '1px solid #E2E6E9',
                boxShadow: '0px 2px 15px 0px rgba(0, 0, 0, 0.05)',
              }),

              indicatorSeparator: () => ({
                display: 'none',
              }),
            }}
          />
        </div>

        <div
          className={`${styles.catalog__filterBlock} ${styles.catalog__filterBlockQuantity}`}
        >
          <p className={styles.catalog__filterText}>Items on page</p>

          <Select
            onChange={handleQuantitySelect}
            options={optionsQuantity}
            defaultValue={optionsQuantity[0]}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: '1px solid #B4BDC4',
                borderRadius: 0,
                height: '40px',
                width: '100%',
                fontFamily: 'Montserrat',
                fontSize: '14px',
                color: '#313237',
                fontWeight: '700',
                lineHeight: '21px',
                letterSpacing: '0%',
                textAlign: 'left',
                cursor: 'pointer',

                boxShadow: state.isFocused ? '0 0 0 1px #313237' : 'none',

                '&:hover': {
                  border: '1px solid #89939A',
                },

                '&:focus': {
                  border: '1px solid #313237',
                },
              }),

              option: baseStyles => ({
                ...baseStyles,
                color: '#89939a',
                fontFamily: 'Montserrat',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '21px',
                letterSpacing: '0%',
                textAlign: 'left',
                cursor: 'pointer',
                backgroundColor: 'none',

                '&:hover': {
                  color: '#313237',
                },
              }),

              menu: baseStyles => ({
                ...baseStyles,
                borderRadius: '0',
                border: '1px solid #E2E6E9',
                boxShadow: '0px 2px 15px 0px rgba(0, 0, 0, 0.05)',
              }),

              indicatorSeparator: () => ({
                display: 'none',
              }),
            }}
          />
        </div>
      </div>

      <ProductsList gadgets={displayedProducts} />

      <div className={styles.pages}>
        <button className={styles.pages__arrowButton}>
          <img src="/icons/arrow-left-ico.svg" alt="arrow-left" />
        </button>

        <div className={styles.pages__numbers}>
          {pagesWithProducts?.map(page => (
            <button
              onClick={() => handlePageButton(page)}
              key={page}
              className={`${styles.pages__number} ${page - 1 === startShowFrom / itemsOnPage ? styles.numberOn : styles.numberOff}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button className={styles.pages__arrowButton}>
          <img src="/icons/aroow-right-ico.svg" alt="arrow-right" />
        </button>
      </div>
    </div>
  );
};
