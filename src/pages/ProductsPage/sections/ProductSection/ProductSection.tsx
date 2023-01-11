import { FC, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductContext } from 'src/contexts/ProductContext';
import { NoMatches } from 'src/features/NoMatches/NoMatches';
import { Filters } from 'src/pages/ProductsPage/subsections/Filters/Filters';
import { Product } from 'src/types/Product';
import { PaginatedProducts } from '../PaginatedProducts/PaginatedProducts';
import './ProductSection.scss';

type Props = {
  title: string,
  typeProducts: Product[],
  dropdownSortContent: string[],
  dropdownFilterContent: string[],
  perPage: string,
  sortedProducts: Product[],
};

export const ProductSection: FC<Props> = ({
  title,
  typeProducts,
  dropdownSortContent,
  dropdownFilterContent,
  perPage,
  sortedProducts,
}) => {
  const { visibleProducts, isProductsFetched } = useContext(ProductContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const foundProducts = query ? visibleProducts.length : typeProducts.length;
  let perPageInNumber;

  if (perPage === 'all') {
    perPageInNumber = sortedProducts.length;
  } else {
    perPageInNumber = perPage;
  }

  return (
    <div className="products-section">
      <div className="products-section__top">
        {!query && (
          <h1 className="products-section__title">{title}</h1>
        )}
        <div className="products-section__product-count">{`${foundProducts} models`}</div>
      </div>

      {visibleProducts.length > 0 && isProductsFetched && (
        <>
          {!query && (
            <div className="products-section__selects">
              <Filters
                typeProducts={typeProducts}
                isSort
                dropDownContent={dropdownSortContent}
                title="Sort by"
              />
              <Filters
                typeProducts={typeProducts}
                isSort={false}
                dropDownContent={dropdownFilterContent}
                title="Items on page"
              />
            </div>
          )}

          <div className="product-section__catalog-wrapper">
            <PaginatedProducts
              sortedProducts={sortedProducts}
              itemsPerPage={+perPageInNumber}
            />
          </div>
        </>
      )}

      {visibleProducts.length === 0 && isProductsFetched && (
        <NoMatches />
      )}
    </div>
  );
};
