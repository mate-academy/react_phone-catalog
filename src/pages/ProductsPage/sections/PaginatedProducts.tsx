import { FC, useContext, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { ProductContext } from 'src/contexts/ProductContext';
import { Product } from 'src/types/Product';
import { getSearchWith } from 'src/utils/helpers/searchHelper';
import { NextButton } from '../subsections/NextButton';
import { PreviousButton } from '../subsections/PreviousButton';
import { ProductsCatalog } from './ProductsCatalog';

type Props = {
  sortedProducts: Product[],
  favourites: Product[],
  setFavourites:React.Dispatch<React.SetStateAction<Product[]>>,
  cartProducts: Product[],
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  itemsPerPage: number,
};

export const PaginatedProducts: FC<Props> = ({
  sortedProducts,
  favourites,
  setFavourites,
  cartProducts,
  setCartProducts,
  itemsPerPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const page = searchParams.get('page') || 1;
  const { visibleProducts } = useContext(ProductContext);
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = sortedProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);

  const handlePageClick = (event: { selected: number; }) => {
    const newOffset = (event.selected * itemsPerPage) % sortedProducts.length;

    setItemOffset(newOffset);

    setSearchParams(
      getSearchWith(searchParams, { page: `${+event.selected + 1}` || null }),
    );
  };

  const itemsToSet = query ? visibleProducts : currentItems;

  return (
    <>
      <ProductsCatalog
        currentItems={itemsToSet}
        favourites={favourites}
        setFavourites={setFavourites}
        cartProducts={cartProducts}
        setCartProducts={setCartProducts}
      />
      {!query && (
        <ReactPaginate
          breakLabel="..."
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          pageRangeDisplayed={7}
          pageCount={pageCount}
          nextLabel={<NextButton />}
          previousLabel={<PreviousButton />}
          forcePage={+page - 1}
          containerClassName="pagination"
          pageClassName="pagination__page-number"
          breakClassName="pagination__page-number"
          disabledClassName="pagination__button--disabled"
        />
      )}
    </>
  );
};
