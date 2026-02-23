import styles from './PhonesPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductsList } from '../../../components/ProductsList';
import { Loader } from '../../../components/Loader';
import { useProducts } from '../../../hooks/use-products';
import { useSearchParams } from 'react-router-dom';
import { SortProducts } from '../../../utils/SortProducts';
import { PerPage } from '../../../utils/PerPage';

export const PhonesPage = () => {
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

  const allPhones = SortProducts(
    [...products].filter(item => item.category === 'phones'),
    sortBy,
  );

  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(allPhones.length / Number(perPage));

  const Phones = PerPage(allPhones, perPage, page);

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
          <Breadcrumbs items={[{ label: 'Phones', to: '/phones' }]} />
          <ProductsList
            title="Mobile phones"
            products={Phones}
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
