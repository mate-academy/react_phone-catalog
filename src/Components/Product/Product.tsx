import React, { useMemo } from 'react';
import { Pagination } from '../Pagination';
import { getNumberOfPages } from '../../utils/getNumberOfPages';
import { ProductCard } from '../ProductCard';
import { Dropdown } from '../Dropdown';
import '../../Components/Product/Product.scss';
import { prepareProducts } from '../../utils/prepareProducts';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { ProductGeneral } from '../../types/ProductGeneral';
import { useSearchParams } from 'react-router-dom';

type Props = {
  product: ProductGeneral[];
  title: string;
};

export const Product = ({ product, title }: Props) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'Newest';
  const itemsOnPage = searchParams.get('perPage') || 'all';
  const currentPage = +(searchParams.get('page') || 1);
  const query = searchParams.get('query') || '';

  const start = itemsOnPage === 'all' ? 0 : (currentPage - 1) * +itemsOnPage;
  const end =
    itemsOnPage === 'all' ? product.length : currentPage * +itemsOnPage;
  const total = getNumberOfPages(product.length);

  const preparedPhones = useMemo(
    () => prepareProducts(product, sortBy, query),
    [query, product, sortBy],
  );

  return (
    <>
      <div className="products container">
        <Breadcrumbs />
        <h1 className="products__title">{title}</h1>
        <p className="products__amount-models">{product.length} models</p>
        <div className="products__container">
          <div className="products__sort">
            <Dropdown
              title={'Sort by'}
              items={['Newest', 'Alphabetically', 'Cheapest']}
              initialItem={sortBy}
              isForItemsOnPage={false}
            />
          </div>

          <div className="products__items">
            <Dropdown
              title={'Items on page'}
              items={['4', '8', '16', 'all']}
              initialItem={itemsOnPage}
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

        {itemsOnPage !== 'all' && <Pagination total={total} />}
      </div>
    </>
  );
};
