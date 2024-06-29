import React, { useContext, useMemo } from 'react';
import { Pagination } from '../Pagination';
import { ProductContext } from '../../store/ProductContext';
import { getNumberOfPages } from '../../utils/getNumberOfPages';
import { Dropdown } from '../Dropdown';
import { ProductCard } from '../ProductCard';
import '../PhonePage/PhonePage.scss';
import { prepareProducts } from '../../utils/prepareProducts';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

export const AccessoriesPage = () => {
  const { accessories, itemsOnPage, sortBy, currentPage } =
    useContext(ProductContext);

  const total = getNumberOfPages(accessories.length);

  const start = itemsOnPage === 'all' ? 0 : (currentPage - 1) * +itemsOnPage;
  const end =
    itemsOnPage === 'all' ? accessories.length : currentPage * +itemsOnPage;

  const preparedPhones = useMemo(
    () => prepareProducts(accessories, sortBy),
    [accessories, sortBy],
  );

  return (
    <>
      <div className="products container">
        <Breadcrumbs />
        <h1 className="products__title">Accessories</h1>
        <p className="products__amount-models">{accessories.length}</p>
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
          {preparedPhones.slice(start, end).map(accessory => (
            <React.Fragment key={`${accessory.id}`}>
              <div className="products__item">
                <ProductCard product={accessory} key={accessory.id} />
              </div>
            </React.Fragment>
          ))}
        </section>

        <Pagination total={total} />
      </div>
    </>
  );
};
