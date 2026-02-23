import styles from './TabletsPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductsList } from '../../../components/ProductsList';
import { useProducts } from '../../../hooks/use-products';
import { Loader } from '../../../components/Loader';
import { SortProducts } from '../../../utils/SortProducts';
import { PerPage } from '../../../utils/PerPage';
import { useSearchParams } from 'react-router-dom';

export const TabletsPage = () => {
  const { products, loading, error } = useProducts();

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
    handleQueryChange(value, 'perPage');
  };

  const pageHandler = (value: number) => {
    handleQueryChange(String(value), 'page');
  };

  const allTablets = SortProducts(
    [...products].filter(item => item.category === 'tablets'),
    sortBy,
  );

  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(allTablets.length / Number(perPage));

  const Tablets = PerPage(allTablets, perPage, page);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Breadcrumbs items={[{ label: 'Tablets', to: '/tablets' }]} />
          <ProductsList
            title="Tablets"
            products={Tablets}
            totalPages={totalPages}
            currentPage={currentPage}
            sortBy={sortBy}
            perPage={perPage}
            onSortChange={sortHandler}
            onPerPageChange={perPageHandler}
            onPageChange={pageHandler}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};
