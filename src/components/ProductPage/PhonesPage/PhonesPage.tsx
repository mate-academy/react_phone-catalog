/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import '../ProductsPage.scss';
import { Pagination } from '../Pagitation';
import { BreadCrumbs } from '../../BreadCrumbs';
import { getProducts } from '../../../api/api';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<ProductItem[]>([]);
  const [sortedPhones, setSortedPhones] = useState([...phones]);

  useEffect(() => {
    getProducts()
      .then(data => {
        setPhones(data.filter((product: ProductItem) => product.type === 'phone'));
      });
  }, []);

  const perPageOption = ['All', '2', '4', '8', '16'];
  const sortOption = [
    { value: 'age', text: 'Newest' },
    { value: 'name', text: 'Alphabetically' },
    { value: 'price', text: 'Cheapest' },
  ];

  const location = useLocation();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [sortIsOpen, setSortIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState<string>();
  const [selectSortType, setSelectSortType] = useState<string>();

  const searchParams = new URLSearchParams(location.search);

  const perPage = Number(searchParams.get('perPage') || `${phones.length}`);
  const sortType = searchParams.get('sort') || 'age';

  const page = Number(searchParams.get('page')) || 1;
  const start = (page - 1) * perPage;
  let pageCount = Math.ceil(phones.length / perPage) || 1;

  const query = searchParams.get('query') || '';
  const lowerQuery = query.toLowerCase();

  useEffect(() => {
    if (searchParams.get('sortType')) {
      setSelectSortType(sortOption
        .filter(item => item.value === searchParams.get('sortType'))[0].text);
    }
  }, [searchParams, sortOption]);

  const handleSortProduct2 = (value: string, text: string) => {
    setSelectSortType(text);
    setSortIsOpen(false);
    searchParams.set('sort', value);
    history.push({
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    if (!searchParams.get('perPage')) {
      setSelectValue('All');
    } else {
      setSelectValue(searchParams.get('perPage') || undefined);
    }
  }, [searchParams]);

  const handleQuantityChange = (value: string) => {
    searchParams.set('perPage', value);
    searchParams.set('page', '1');
    history.push({
      search: searchParams.toString(),
    });
    setIsOpen(false);
    setSelectValue(value);
  };

  useEffect(() => {
    const pattern = new RegExp(query, 'i');
    const result = phones
      .filter(item => pattern.test(item.name));

    switch (sortType) {
      case 'name':
        setSortedPhones(result
          .sort((a, b) => a[sortType].localeCompare(b[sortType])));
        break;
      case 'age':
      case 'price':
        setSortedPhones(result
          .sort((a, b) => a[sortType] - b[sortType]));
        break;
      default: setSortedPhones([...phones]);
    }
  }, [phones, sortType, perPage, query, lowerQuery, pageCount]);

  if (query !== '') {
    pageCount = Math.ceil(sortedPhones.length / perPage);
  }

  const visibleItemsOnPage = sortedPhones.slice(start, start + perPage);

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (event.target === document
        .querySelector('.perPage__select')) {
        setIsOpen(!isOpen);
      }

      if (event.target === document.querySelector('.sortBy__select')) {
        setSortIsOpen(!sortIsOpen);
      }

      if (event.target !== document
        .querySelector('.perPage__select')
        && event.target !== document
          .querySelector('.perPage__option')) {
        setIsOpen(false);
      }

      if (event.target !== document.querySelector('.sortBy__select')
      && event.target !== document.querySelector('.sortBy__option')) {
        setSortIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return (
    <div className="products__container products container">
      <BreadCrumbs />
      <h1 className="products__title">Mobile phones</h1>
      <p className="products__quantity">
        {phones.length}
        {' '}
        <span className="products__quantityText">models</span>
      </p>
      <div className="products__filter filter">
        <div className="sortBy">
          <p className="sortBy__legend">
            Sort by
          </p>
          <div
            className={sortIsOpen
              ? 'sortBy__select sortBy__select--open'
              : 'sortBy__select'}
          >
            {!selectSortType
              ? sortOption[0].text
              : selectSortType}
            <div
              className={sortIsOpen
                ? 'sortBy__options-wrapper'
                : 'sortBy__options-wrapper sortBy__options-wrapper--invisible'}
            >
              {sortOption.map(item => (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div
                  onClick={() => {
                    handleSortProduct2(item.value, item.text);
                  }}
                  className="sortBy__option"
                  key={item.value}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sortBy">
          <p className="sortBy__legend">
            Items on page
          </p>

          <div
            className={isOpen
              ? 'perPage__select perPage__select--open'
              : 'perPage__select'}
          >
            {selectValue}
            <div
              className={isOpen
                ? 'perPage__options-wrapper'
                : 'perPage__options-wrapper perPage__options-wrapper--invisible'}
            >
              {perPageOption.map(item => (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div
                  onClick={() => {
                    if (item !== 'All') {
                      handleQuantityChange(item);
                    } else {
                      handleQuantityChange(`${phones.length}`);
                    }
                  }}
                  className="perPage__option"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <div className="products__list">
        {visibleItemsOnPage.map(product => {
return (<ProductCard product={product} type={product.type} />
)
          }
        )}
      </div>
      <Pagination pageCount={pageCount} />
    </div>
  );
};
