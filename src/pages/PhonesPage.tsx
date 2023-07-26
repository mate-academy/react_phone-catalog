import { FC } from 'react';
import Breadcrumbs from './components/Breadcrumbs';
import { ProductsList } from './components/ProductsList';
import '../styles/blocks/phones-page.scss';

export const PhonesPage: FC = () => {
  const breadcrumbItems = [
    { text: 'Home', link: '/' },
    { text: 'Category', link: '/category' },
    { text: 'Subcategory', link: '/category/subcategory' },
    { text: 'Current Page', link: '/category/subcategory/current-page' },
  ];

  return (
    <div className="phone-page">
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="phone-page__title">Mobile phones</h1>
      <p className="phone-page__amount-phone-text">95 models</p>
      <div className="phone-page__filter filter">
        <div className="filter__container">
          <h2 className="filter__title">Sort by</h2>
          <select
            className="filter__selector"
            name="sort-by"
            id="sort"
          >
            <option
              className="filter__selector--items"
              value="age"
              selected
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
          </select>
        </div>
        <div className="filter__container">
          <h2 className="filter__title">Items on page</h2>
          <select
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
              selected
            >
              16
            </option>
            <option
              className="filter__selector--items"
              value="all"
            >
              ALL
            </option>
          </select>
        </div>
      </div>
      <ProductsList />
    </div>
  );
};
