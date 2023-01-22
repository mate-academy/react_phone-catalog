import {
  FC, useContext, useEffect, useState,
} from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { ProductContext } from 'src/contexts/ProductContext';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { Product } from 'src/types/Product';
import { getSearchWith } from 'src/utils/helpers/searchHelper';
import { NextButton } from '../../subsections/NextButton';
import { PreviousButton } from '../../subsections/PreviousButton';
import { ProductsCatalog } from '../ProductsCatalog/ProductsCatalog';
import './PaginatedProducts.scss';

type Props = {
  sortedProducts: Product[],
  itemsPerPage: number,
};

export const PaginatedProducts: FC<Props> = ({
  sortedProducts,
  itemsPerPage,
}) => {
  const [favourites, setFavourites] = useLocalStorage('favourites', '[]');
  const [cartProducts, setCartProducts] = useLocalStorage('cart', '[]');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const page = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage');
  const [itemOffset, setItemOffset] = useState(0);

  const { visibleProducts } = useContext(ProductContext);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = sortedProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);

  useEffect(() => {
    if (perPage) {
      setItemOffset(0);
    }
  }, [perPage]);

  const handlePageClick = (event: { selected: number; }) => {
    const newOffset = (event.selected * itemsPerPage) % sortedProducts.length;

    setSearchParams(
      getSearchWith(searchParams, { page: `${+event.selected + 1}` || null }),
    );

    setItemOffset(newOffset);
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
        <div data-cy="pagination">
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
        </div>
      )}
    </>
  );
};
