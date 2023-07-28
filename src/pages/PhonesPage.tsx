import { FC, useState } from 'react';
import Breadcrumbs from './components/Breadcrumbs';
import { ProductsList } from './components/ProductsList';
// eslint-disable-next-line import/no-cycle
import CustomSelect from './components/CustomSelect';
import { Phone } from '../types/Phone';

import '../styles/styles.scss';

type Props = {
  phones: Phone[];
};

export enum SortByOptions {
  AGE = 'age',
  NAME = 'name',
  PRICE = 'price',
}

export const PhonesPage: FC<Props> = ({ phones }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    sortBy: 'age',
    itemsShow: '16',
  });

  const breadcrumbItems = [
    { text: 'Home', link: '/' },
    { text: 'Phones', link: '/phones' },
  ];

  const sortByOptions = ['age', 'name', 'price'];
  const itemsOnPageOptions = ['4', '8', '16', 'all'];

  function getVisiblePhones(arr: Phone[]) {
    let result: Phone[] = [];

    switch (selectedOptions.sortBy) {
      case SortByOptions.AGE:
        result = arr.sort((a, b) => a.year - b.year);
        break;
      case SortByOptions.NAME:
        result = arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortByOptions.PRICE:
        result = arr.sort((a, b) => a.price - b.price);
        break;

      default:
        break;
    }

    switch (selectedOptions.itemsShow) {
      case '4':
        result = result.filter((_, index) => index < 4);
        break;
      case '8':
        result = result.filter((_, index) => index < 8);

        break;
      case '16':
        result = result.filter((_, index) => index < 16);
        break;
      case 'all':
      default:
        return result;
    }

    return result;
  }

  const visiblePhones = getVisiblePhones(phones);

  return (
    <div className="phones-page">
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="phones-page__title">Mobile phones</h1>
      <p className="phones-page__amount-phone-text">95 models</p>
      <div className="phones-page__filter filter">
        <div className="filter__container">
          <h2 className="filter__title">Sort by</h2>
          <CustomSelect
            options={sortByOptions}
            defaultOption="Select an option"
            onChange={setSelectedOptions}
          />
          {/* <select
            className="filter__selector"
            name="sort-by"
            id="sort"
          >
            <option
              className="filter__selector--items"
              value="age"
              // selected
            >
              Newest
            </option>
            <option
              className="filter__selector--items"
              value="name"
            >
              Alphabetically
            </option>
            <option
              className="filter__selector--items"
              value="price"
            >
              Cheapest
            </option>
          </select> */}
        </div>
        <div className="filter__container">
          <h2 className="filter__title">Items on page</h2>
          <CustomSelect
            options={itemsOnPageOptions}
            defaultOption="Select an option"
            onChange={setSelectedOptions}
          />
          {/* <select
            className="filter__selector"
            name="items-on-page"
            id="sort"
          >
            <option className="filter__selector--items" value="4">4</option>
            <option
              className="filter__selector--items"
              value="8"
            >
              8
            </option>
            <option
              className="filter__selector--items"
              value="16"
              // selected
            >
              16
            </option>
            <option
              className="filter__selector--items"
              value="all"
            >
              ALL
            </option>
          </select> */}
        </div>
      </div>
      <ProductsList products={visiblePhones} />
    </div>
  );
};
