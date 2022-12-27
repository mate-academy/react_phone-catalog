import { FC, useContext } from 'react';
import { ProductContext } from 'src/contexts/ProductContext';
import { NoMatches } from 'src/features/NoMatches';
import { Filters } from 'src/globalSections/Filters';
import {
  ProductPagination,
} from 'src/pages/ProductsPage/sections/ProductPagination';
import {
  ProductsCatalog,
} from 'src/pages/ProductsPage/sections/ProductsCatalog';
import { Product } from 'src/types/Product';

type Props = {
  title: string,
  typeProducts: Product[],
  dropdownSortContent: string[],
  dropdownFilterContent: string[],
  favourites: Product[],
  setFavourites: React.Dispatch<React.SetStateAction<Product[]>>,
  cartProducts: Product[],
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  perPage: string,
  sortedProducts: Product[],
  currentPage: string,
};

export const ProductSection: FC<Props> = ({
  title,
  typeProducts,
  dropdownSortContent,
  dropdownFilterContent,
  favourites,
  setFavourites,
  cartProducts,
  setCartProducts,
  perPage,
  sortedProducts,
  currentPage,
}) => {
  const { visibleProducts } = useContext(ProductContext);

  return (
    <div className="products-section">
      <div className="products-section__top">
        <h1 className="products-section__title">{title}</h1>
        <div className="products-section__product-count">{`${typeProducts.length} models`}</div>
      </div>

      {visibleProducts.length > 0
        ? (
          <>
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

            <div className="product-section__catalog-wrapper">
              <ProductsCatalog
                currentProducts={visibleProducts}
                favourites={favourites}
                setFavourites={setFavourites}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
              />
            </div>
          </>
        ) : <NoMatches />}

      <div className="product-section__pagination-wrapper">
        <ProductPagination
          perPage={+perPage}
          totalProducts={sortedProducts.length}
          currentPage={+currentPage}
        />
      </div>
    </div>
  );
};
