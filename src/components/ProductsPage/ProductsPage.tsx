import { useLocation, useSearchParams } from 'react-router-dom';

import './ProductsPage.scss';

import { Dropdown } from '../DropDown';
import { PageSlider } from '../PageSlider';
import { Product } from '../../types/Product';

type Props = {
  products: Product[],
};

export const ProductsPage: React.FC<Props> = ({ products }) => {
  const location = useLocation().pathname;
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const perPage = searchParams.get('perPage') || '4';
  const sortBy = searchParams.get('sort') || 'newest';
  const currentPage = searchParams.get('page') || '1';

  const optionsSorBy = [
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Price high-to-low', value: 'high-to-low' },
    { label: 'Price low-to-high', value: 'low-to-high' },
    { label: 'Alphabetically', value: 'name' },
  ];

  const optionsPerPage = [
    { label: '4', value: '4' },
    { label: '8', value: '8' },
    { label: '16', value: '16' },
    { label: 'all', value: `${products.length}` },
  ];

  const theLastIndex = +currentPage * +perPage;
  const theFirstIndex = theLastIndex - +perPage;

  const productsForShowing = products
    .sort((p1, p2) => {
      switch (sortBy) {
        case 'newest':
          return p2.year - p1.year;

        case 'oldest':
          return p1.year - p2.year;

        case 'high-to-low':
          return p2.price - p1.price;

        case 'low-to-high':
          return p1.price - p2.price;

        case 'name':
          return p1.name.toLowerCase().localeCompare(p2.name.toLowerCase());

        default: return p1.year - p2.year;
      }
    }).slice(theFirstIndex, theLastIndex);

  const productsSearch = products
    .sort((p1, p2) => {
      switch (sortBy) {
        case 'newest':
          return p2.year - p1.year;

        case 'oldest':
          return p1.year - p2.year;

        case 'high-to-low':
          return p2.price - p1.price;

        case 'low-to-high':
          return p1.price - p2.price;

        case 'name':
          return p1.name.toLowerCase().localeCompare(p2.name.toLowerCase());

        default: return p1.year - p2.year;
      }
    });

  const theLastPage = Math
    .ceil(products.length / +perPage);

  const pageNumbers = [];

  for (let i = 1; i <= theLastPage; i += 1) {
    pageNumbers.push(i);
  }

  return (
    <div className="products">
      {!query && (
        <div className="products__sort-container">
          <div className="products__sort-sortBy">
            <p className="products__sort-title">Sort by</p>
            <Dropdown
              options={optionsSorBy}
              param="sort"
              selectedOption={
                optionsSorBy.find(o => o.value === sortBy) || optionsSorBy[0]
              }
            />
          </div>

          <div className="products__sort-items-number">
            <p className="products__sort-title">Items on page</p>
            <Dropdown
              options={optionsPerPage}
              param="perPage"
              selectedOption={
                optionsPerPage.find(o => o.value === perPage)
                  || optionsPerPage[0]
              }
            />
          </div>
        </div>
      )}

      {productsForShowing.length
        ? (
          <PageSlider
            products={!query ? productsForShowing : productsSearch}
            theLastPage={theLastPage}
            pageNumbers={pageNumbers}
            section={location}
          />
        ) : (
          <h2 className="products__error">
            No product matches your request
          </h2>
        )}

    </div>
  );
};
