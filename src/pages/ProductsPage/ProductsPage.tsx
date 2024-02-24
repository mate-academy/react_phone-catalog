import { useSelector } from 'react-redux';
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PhonesPageView } from './ProductsPageView';
import { selectProducts } from '../../store/selectors/ProductsSlice';
import { useAppDispatch } from '../../store/hooks/redux';
import { getProducts } from '../../store/reducers/ProductsSlice';
import { Spinner } from '../../components/Spinner';
import { Error } from '../../components/Error';
import { ProductsPageProps } from './types';

export const ProductsPage = memo<ProductsPageProps>(({ searchQuery }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts(searchQuery));
  }, [dispatch, searchQuery]);

  const {
    products,
    isLoading,
    error,
    searchbar,
  } = useSelector(selectProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsOnPage, setItemsOnPage] = useState(16);
  const [option, setOption] = useState('');

  const lastItemIndex = currentPage * itemsOnPage;
  const firstItemIndex = lastItemIndex - itemsOnPage;

  const onChangeItemsPerPage = useCallback((itemPerPage: string) => {
    if (itemPerPage === 'All' && products) {
      setItemsOnPage(products.length);

      return;
    }

    setItemsOnPage(+itemPerPage);
  }, [products]);

  const onSortItems = useCallback((query: string) => {
    setOption(query);
  }, []);

  const setCurrentItems = useMemo(() => {
    return [...products || []].sort((a, b) => {
      switch (option) {
        case 'Newest':
          return b.year - a.year;
        case 'Alphabetically':
          return a.name.localeCompare(b.name);
        case 'Cheapest':
          return a.price - b.price;
        default:
          return 0;
      }
    })
      .slice(firstItemIndex, lastItemIndex);
  }, [option, products, firstItemIndex, lastItemIndex]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchbar, itemsOnPage]);

  if (products && products.length === 0 && searchbar === '') {
    return (
      <Error
        error="Apologies, products in this category are currently out of stock"
      />
    );
  }

  if (products && products.length === 0 && searchbar !== '') {
    return (
      <Error
        error="Unable to locate products matching your search criteria."
      />
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <PhonesPageView
      totalItems={products?.length || 0}
      itemsOnPage={itemsOnPage}
      changeItemsPerPage={onChangeItemsPerPage}
      currentItems={setCurrentItems}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      sortItems={onSortItems}
    />

  );
});
