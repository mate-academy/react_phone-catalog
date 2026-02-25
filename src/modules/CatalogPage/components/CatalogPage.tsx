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

  function handleQueryChange(value: string, nameParam: string) {
    const params = new URLSearchParams(searchParams);

    if (value === '') {
      params.delete(nameParam);
    } else {
      params.set(nameParam, value);
    }

    setSearchParams(params);
  }

  const sortHandler = (value: string) => {
    handleQueryChange(value, 'sortBy');
  };

  const perPageHandler = (value: string) => {
    handleQueryChange('', 'page');
    handleQueryChange(value, 'perPage');
  };

  const pageHandler = (value: number) => {
    handleQueryChange(String(value), 'page');
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
