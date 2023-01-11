import {
  FC, useContext, useEffect, useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { GoBack } from 'src/components/GoBack';
import { ProductContext } from 'src/contexts/ProductContext';
import {
  NoItemsLeftSection,
} from 'src/features/NoItemsLeft/NoItemsLeftSection';
import {
  ProductSection,
} from 'src/pages/ProductsPage/sections/ProductSection/ProductSection';
import { NavHistory } from 'src/pages/ProductsPage/NavHistory/NavHistory';
import { sortProducts } from 'src/utils/helpers/sortProducts';

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
    setCurrentProducts,
    setVisibleProducts,
  } = useContext(ProductContext);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const page = searchParams.get('page') || '1';
  const typeProducts = products.filter(el => el.category === pageType);

  const sortedProducts = useMemo(() => {
    return sortProducts([...typeProducts], sort);
  }, [sort, perPage, page]);

  useEffect(() => {
    setCurrentProducts(sortedProducts);
    setVisibleProducts(sortedProducts);
  }, []);

  useEffect(() => {
    if (!query) {
      setCurrentProducts(sortedProducts);
      setVisibleProducts(sortedProducts);
    }
  }, [sort, perPage, page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="container">
      {!query && (
        !sortedProducts.length
          ? (
            <div className="no-items-left__go-back">
              <GoBack />
            </div>
          )
          : (
            <NavHistory
              pageType={pageType}
            />
          )
      )}

      {typeProducts.length > 0
        ? (
          <ProductSection
            title={title}
            typeProducts={typeProducts}
            dropdownSortContent={dropdownSortContent}
            dropdownFilterContent={dropdownFilterContent}
            perPage={perPage}
            sortedProducts={sortedProducts}
          />
        )
        : <NoItemsLeftSection />}
    </div>
  );
};
