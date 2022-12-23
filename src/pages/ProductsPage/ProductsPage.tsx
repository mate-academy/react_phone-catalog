import { FC, useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GoBack } from 'src/components/GoBack';
import { ProductContext } from 'src/contexts/ProductContext';
import { NoItemsLeftSection } from 'src/globalSections/NoItemsLeftSection';
import { ProductSection } from 'src/globalSections/ProductSection';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { NavHistory } from 'src/pages/PhonesPage/sections/NavHistory';
import {
  getProductsWithActualPrice,
  lower,
  sortProducts,
} from 'src/utils/helpers';

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
  const products = useContext(ProductContext);
  const [searchParams] = useSearchParams();
  const [favourites, setFavourites] = useLocalStorage('favourites', '');
  const [cartProducts, setCartProducts] = useLocalStorage('cart', '');

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const isAll = lower(perPage) === 'all';
  const currentPage = searchParams.get('page') || '1';

  const typeProducts = products.filter(el => el.type === pageType);
  const allTypeProducts = getProductsWithActualPrice(typeProducts);

  const sortedProducts = useMemo(() => {
    return sortProducts([...allTypeProducts], sort);
  }, [sort, perPage]);

  let visibleProducts;

  if (isAll) {
    visibleProducts = sortedProducts;
  } else {
    const indexOfLastProduct = +currentPage
    * (isAll
      ? sortedProducts.length
      : +perPage);
    const indexOfFirstProduct = indexOfLastProduct
    - (isAll
      ? sortedProducts.length
      : +perPage);

    visibleProducts = sortedProducts
      .slice(indexOfFirstProduct, indexOfLastProduct);
  }

  return (
    <div className="container">
      {!visibleProducts.length
        ? <GoBack />
        : (
          <NavHistory
            pageType={pageType}
          />
        )}

      {visibleProducts.length > 0 && setFavourites
        ? (
          <ProductSection
            title={title}
            typeProducts={typeProducts}
            visibleProducts={visibleProducts}
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
