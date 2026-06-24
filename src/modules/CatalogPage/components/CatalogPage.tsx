import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductsList } from '../../../components/ProductsList';
import { useProducts } from '../../../hooks/use-products';
import { Loader } from '../../../components/Loader';
import { useSearchParams } from 'react-router-dom';
import { SortProducts } from '../../../utils/SortProducts';
import { PerPage } from '../../../utils/PerPage';
import { BaseProduct } from '../../../types';

type Props = { category: 'phones' | 'tablets' | 'accessories'; title: string };

export const CatalogPage: React.FC<Props> = ({ category, title }) => {
  const { products, loading, error } = useProducts<BaseProduct>();

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = (searchParams.get('sortBy') || 'newest') as
    | 'newest'
    | 'alphabetically'
    | 'cheapest';
  const perPage = (searchParams.get('perPage') || 'all') as
    | '4'
    | '8'
    | '16'
    | 'all';
  const currentPage = Number(searchParams.get('page') || '1');
  const page = searchParams.get('page') || '1';

  function handleQueryChange(changes: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  }

  const sortHandler = (value: string) => {
    handleQueryChange({ sortBy: value, page: null });
  };

  const perPageHandler = (value: string) => {
    handleQueryChange({ perPage: value, page: null });
  };

  const pageHandler = (value: number) => {
    handleQueryChange({ page: String(value) });
  };

  const allProducts = SortProducts(
    [...products].filter(item => item.category === category),
    sortBy,
  );

  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(allProducts.length / Number(perPage));

  const Products = PerPage(allProducts, perPage, page);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Breadcrumbs items={[{ label: title, to: `/${category}` }]} />
      <ProductsList
        title={title}
        products={Products}
        totalPages={totalPages}
        currentPage={currentPage}
        sortBy={sortBy}
        perPage={perPage}
        onSortChange={sortHandler}
        onPerPageChange={perPageHandler}
        onPageChange={pageHandler}
      />
    </>
  );
};
