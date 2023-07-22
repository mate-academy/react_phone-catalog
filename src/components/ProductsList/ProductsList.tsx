// import { Link } from 'react-router-dom';
import { useMemo } from 'react';
// import { useSearchParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductSection } from '../../types/ProductSection';
import { sortParam, itemsOnPage } from '../../types/SortTypes';
import { DropDown } from '../DropDown/DropDown';
import { getSortedProducts } from '../../helpers/getSortedProducts';
import { Pagination } from '../Pagination/Pagination';

type Props = {
  isError: boolean,
  isLoading: boolean,
  products: Product[]
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || products.length;
  const start = currentPage * perPage - perPage;
  const end = Math.min(currentPage * perPage, products.length);
  const sortBy = searchParams.get('sortBy');

  // const sortValues = sortParam.map(param => param.value);
  // const itemsOnPageValues = itemsOnPage.map(item => item.value);

  const sortedProducts: Product[] = useMemo(() => (
    getSortedProducts(products, sortBy)
  ), [products, sortBy]);

  const visibleProducts = sortedProducts.slice(start, end);

  return (
    <div className="product-list">
      <div className="product-list__drop-downs">
        <div className="product-list__drop-down">
          <DropDown
            options={sortParam}
            label="Sort by"
            startValue="Choose option"
            searchName="sortBy"
          />
        </div>

        <div className="phones-page__dropDown">
          <DropDown
            options={itemsOnPage}
            label="Items on page"
            startValue="All"
            searchName="perPage"
          />
        </div>
      </div>

      <ul
        data-cy="productList"
        className="product-list__items"
      >
        {visibleProducts.map(product => {
          return (
            <li
              className="product-list__item"
              key={product.id}
            >

              <ProductCard
                title={ProductSection.HotPrice}
                product={product}
              />
            </li>
          );
        })}
      </ul>
      {perPage < products.length && (
        <div className="product-list__pagination">
          <Pagination
            totalItems={products.length}
            perPage={perPage}
            currentPage={currentPage}
          />
        </div>
      )}

    </div>

  );
};
