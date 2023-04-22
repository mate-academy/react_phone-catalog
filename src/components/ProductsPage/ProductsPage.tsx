import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ProductsPage.scss';

import { Sort } from '../../types/Sort';
import { Product } from '../../types/Product';

import { sortProducts } from '../../helpers/sortProducts';
import { findValue } from '../../helpers/findValue';

import Select from '../Select/Select';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import Search from '../SearchPage/SearchPage';

const sortOptions = [
  { name: 'Newest', value: 'age' },
  { name: 'Alphabetically', value: 'name' },
  { name: 'Cheapest', value: 'price' },
];

const itemsOptions = [
  { name: '4', value: '4' },
  { name: '8', value: '8' },
  { name: '16', value: '16' },
  { name: 'All', value: 'all' },
];

type Props = {
  products: Product[];
  title: string;
  isDisPag?: boolean;
  isDisSelects?: boolean;
};

const ProductsPage: React.FC<Props> = ({
  products,
  title,
  isDisSelects,
  isDisPag,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || sortOptions[0].value;
  const items = searchParams.get('items') || itemsOptions[0].value;
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';
  const sortedProducts = useMemo(() => {
    if (isDisSelects) {
      return products;
    }

    return sortProducts(products, sort as Sort);
  }, [sort, products, sortProducts, isDisSelects]);
  const visibleProducts = useMemo(() => {
    if (items === 'all' || isDisPag) {
      return sortedProducts;
    }

    return sortedProducts.slice((+items * (+page - 1)), +items * +page);
  }, [items, page, sortedProducts, isDisPag]);
  const pages = useMemo(() => {
    return Math.ceil(products.length / +items);
  }, [items, products]);

  if (query.length) {
    return <Search products={sortedProducts} />;
  }

  return (
    <section className="page__section products">
      <div className="container">
        <h2 className="page__title products__title">
          {title}
        </h2>

        <span className="products__subtitle">
          {`${products.length} models`}
        </span>

        {products.length === 0
          ? <p className="products__no">Not found</p>
          : (
            <>
              {!isDisSelects && (
                <div className="products__selects">
                  <Select
                    width={176}
                    height={40}
                    subTitle="Sort by"
                    options={sortOptions}
                    paramsName="sort"
                    initialName={findValue(sortOptions, sort)}
                  />
                  <Select
                    width={128}
                    height={40}
                    subTitle="Items on page"
                    options={itemsOptions}
                    paramsName="items"
                    initialName={findValue(itemsOptions, items)}
                  />
                </div>
              )}
              <ul className="products__list" data-cy="productList">
                {visibleProducts.map(product => (
                  <li key={product.name} className="products__item">
                    <Card product={product} />
                  </li>
                ))}
              </ul>

              {!isDisPag && (
                <Pagination pages={pages} />
              )}
            </>
          )}
      </div>
    </section>
  );
};

export default ProductsPage;
