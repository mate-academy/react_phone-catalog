import React, { useContext, useMemo } from 'react';
import { Pagination } from '../Pagination';
import { ProductContext } from '../../store/ProductContext';
import { getNumberOfPages } from '../../utils/getNumberOfPages';
import { Dropdown } from '../Dropdown';
import { ProductCard } from '../ProductCard';
import './PhonePage.scss';
import { prepareProducts } from '../../utils/prepareProducts';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

export const PhonePage = () => {
  const { phones, itemsOnPage, sortBy, currentPage } =
    useContext(ProductContext);

  const total = getNumberOfPages(phones.length);

  const start = itemsOnPage === 'all' ? 0 : (currentPage - 1) * +itemsOnPage;
  const end =
    itemsOnPage === 'all' ? phones.length : currentPage * +itemsOnPage;

  const preparedPhones = useMemo(
    () => prepareProducts(phones, sortBy),
    [phones, sortBy],
  );

  return (
    <>
      <div className="container">
        <div className="products">
          <Breadcrumbs />
          <h1 className="products__title">Mobile phones</h1>
          <p className="products__amount-models">{phones.length}</p>
          <div className="products__container">
            <div className="products__sort">
              <Dropdown
                title={'Sort by'}
                items={['Newest', 'Alphabetically', 'Cheapest']}
                initialItem={'Newest'}
                isForItemsOnPage={false}
              />
            </div>

            <div className="products__items">
              <Dropdown
                title={'Items on page'}
                items={['4', '8', '16', 'all']}
                initialItem={'all'}
                isForItemsOnPage={true}
              />
            </div>
          </div>
          <section className="products__cards">
            {preparedPhones.slice(start, end).map(phone => (
              <React.Fragment key={`${phone.id}`}>
                <div className="products__item">
                  <ProductCard product={phone} key={phone.id} />
                </div>
              </React.Fragment>
            ))}
          </section>

          <Pagination total={total} />
        </div>
      </div>
    </>
  );
};
