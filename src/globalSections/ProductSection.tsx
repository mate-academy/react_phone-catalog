import { FC } from 'react';
import {
  ProductPagination,
} from 'src/pages/PhonesPage/sections/ProductPagination';
import { ProductsCatalog } from 'src/pages/PhonesPage/sections/ProductsCatalog';
import { Product } from 'src/types/Product';
import { Filters } from './Filters';

type Props = {
  title: string,
  typeProducts: Product[],
  visibleProducts: Product[],
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
  visibleProducts,
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
  return (
    <div className="products-section">
      <div className="products-section__top">
        <h1 className="products-section__title">{title}</h1>
        <div className="products-section__product-count">{`${typeProducts.length} models`}</div>
      </div>

      <div className="products-section__selects">
        <Filters
          visibleProducts={visibleProducts}
          isSort
          dropDownContent={dropdownSortContent}
          title="Sort by"
        />
        <Filters
          visibleProducts={visibleProducts}
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
