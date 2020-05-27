import React, { useState, useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getProducts } from '../../helpers/api';
import { Card } from '../Card/Card';
import './MobilePhonesPage.scss';
import Select from '../Select/Select';
import { OPTIONS_SORT_BY } from '../../helpers/config';

export const MobilePhonesPage: React.FC = () => {
  const [phonesOnly, setPhonesOnly] = useState<Slide[]>([]);

  useEffect(() => {
    getProducts().then(data => setPhonesOnly(data.filter((product: Slide) => product.type === 'phone')));
  }, []);

  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const [dropdownOptionValue, setDropdownOptionValue] = useState<string>(sortBy);

  const setSearchParams = (selectOptionValue: string) => {
    setDropdownOptionValue(selectOptionValue);
    searchParams.set('sortBy', selectOptionValue);
    history.push({ search: searchParams.toString() });
  };

  const visiblePhones = useMemo(
    () => {
      const result = [...phonesOnly];

      switch (sortBy) {
        case 'name':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;

        case 'price':
          result.sort((a, b) => a.price - b.price);
          break;

        case 'age':
          result.sort((a, b) => a.age - b.age);
          break;
        default:
          result.sort((a, b) => b.price - a.price);
      }

      return result;
    },
    [sortBy, phonesOnly],
  );

  return (
    <>
      <div className="phones-container">
        <h1 className="phones__title">Mobile phones</h1>
        <span className="phones__sum">
          {phonesOnly.length}
          {' '}
          models
        </span>
        <div className="phones__dropdown">
          <div className="phones__dropdown--sortBy">
            <p className="title">Sort By</p>
            <Select
              options={OPTIONS_SORT_BY}
              value={dropdownOptionValue}
              onChange={(selectOptionValue) => (
                setSearchParams(selectOptionValue)
              )}
            />

          </div>
          <div className="phones__dropdown--sortItemInPage">
            <p className="title">Items on page</p>
          </div>
        </div>


        <div className="phones-wrap">
          {visiblePhones.map(product => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};
