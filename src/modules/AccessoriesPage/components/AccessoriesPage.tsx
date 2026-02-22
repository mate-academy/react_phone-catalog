import styles from './AccessoriesPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductsList } from '../../../components/ProductsList';
import { useProducts } from '../../hooks/use-products';
import { Loader } from '../../../components/Loader';
import { useSearchParams } from 'react-router-dom';
import { SortProducts } from '../../utils/SortProducts';
import { PerPage } from '../../utils/PerPage';

export const AccessoriesPage = () => {
  const { products, loading, error } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'newest';
  const perPage = searchParams.get('perPage') || 'all';

  function handleQueryChange(
    event: ChangeEvent<HTMLSelectElement>,
    nameParam: string,
  ) {
    const params = new URLSearchParams(searchParams);

    if (event.target.value === '') {
      params.delete(nameParam);
    } else {
      params.set(nameParam, event.target.value);
    }

    setSearchParams(params);
  }

  const sortHandler = data => {
    handleQueryChange(data, 'sortBy');
  };

  const perPageHandler = data => {
    handleQueryChange(data, 'perPage');
  };

  const pageHandler = data => {
    handleQueryChange(data, 'page');
  };

  let Accessories = SortProducts(
    [...products].filter(item => item.category === 'accessories'),
    sortBy,
  );

  Accessories = PerPage(Accessories, perPage);

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
          <Breadcrumbs items={[{ label: 'Accessories', to: '/accessories' }]} />
          <ProductsList
            title="Accessories"
            products={Accessories}
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
