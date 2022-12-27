import {
  FC, useContext, useEffect, useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { GoBack } from 'src/components/GoBack';
import { ProductContext } from 'src/contexts/ProductContext';
import { NoItemsLeftSection } from 'src/features/NoItemsLeftSection';
import { ProductSection } from 'src/pages/ProductsPage/sections/ProductSection';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { NavHistory } from 'src/pages/ProductsPage/sections/NavHistory';
import {
  getProductsWithActualPrice,
} from 'src/utils/helpers/getProductsWithActualPrice';
import { sortProducts } from 'src/utils/helpers/sortProducts';
import { lower } from 'src/utils/shortHands';
import { Product } from 'src/types/Product';
import { hasMatches } from 'src/utils/helpers/hasMatches';

type Props = {
  title: string,
  pageType: string,
};

const dropdownSortContent = ['Newest', 'Alphabetically', 'Cheapest'];
const dropdownFilterContent = ['All', '2', '4', '8', '16'];

export const ProductsPage: FC<Props> = ({
  title,
  pageType,
}) => {
  const {
    products,
    currentProducts,
    setCurrentProducts,
    setVisibleProducts,
    visibleProducts,
  } = useContext(ProductContext);
  const [searchParams] = useSearchParams();
  const [favourites, setFavourites] = useLocalStorage('favourites', '');
  const [cartProducts, setCartProducts] = useLocalStorage('cart', '');

  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const isAll = lower(perPage) === 'all';
  const currentPage = searchParams.get('page') || '1';

  const typeProducts = products.filter(el => el.type === pageType);
  const allTypeProducts = getProductsWithActualPrice(typeProducts);

  const sortedProducts = useMemo(() => {
    return sortProducts([...allTypeProducts], sort);
  }, [sort, perPage]);

  let filteredProductsAfterPagination: Product[];

  if (isAll) {
    filteredProductsAfterPagination = sortedProducts;
  } else {
    const indexOfLastProduct = +currentPage
    * (isAll
      ? sortedProducts.length
      : +perPage);
    const indexOfFirstProduct = indexOfLastProduct
    - (isAll
      ? sortedProducts.length
      : +perPage);

    filteredProductsAfterPagination = sortedProducts
      .slice(indexOfFirstProduct, indexOfLastProduct);
  }

  useEffect(() => {
    if (query) {
      setVisibleProducts(filteredProductsAfterPagination
        .filter(el => {
          return hasMatches(el.name, query);
        }));
    } else {
      setVisibleProducts(filteredProductsAfterPagination);
    }

    setCurrentProducts(filteredProductsAfterPagination);
  }, [sort, perPage, currentPage]);

  useEffect(() => {
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      {!visibleProducts.length
        ? <GoBack />
        : (
          <NavHistory
            pageType={pageType}
          />
        )}

      {currentProducts.length > 0
      && setFavourites
        ? (
          <ProductSection
            title={title}
            typeProducts={typeProducts}
            dropdownSortContent={dropdownSortContent}
            dropdownFilterContent={dropdownFilterContent}
            favourites={favourites}
            setFavourites={setFavourites}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
            perPage={perPage}
            sortedProducts={sortedProducts}
            currentPage={currentPage}
          />
        )
        : <NoItemsLeftSection />}
    </div>
  );
};
