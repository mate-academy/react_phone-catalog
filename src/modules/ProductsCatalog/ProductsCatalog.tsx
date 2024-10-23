import { Product } from '../../types/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Pagination } from './components/Pagination';
import styles from './ProductsCatalog.module.scss';
import { Selector } from './components/Selector';
import { Grid } from '../../components/Grid';
import { useUpdateSearchParams } from '../../hooks';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsCatalog: React.FC<Props> = ({ title, products }) => {
  const { searchParams, updateSearchParams } = useUpdateSearchParams();

  const SORT_OPTIONS = [
    { name: 'newest', value: 'age' },
    { name: 'alphabetically', value: 'title' },
    { name: 'cheapest', value: 'price' },
  ];

  const PER_PAGE_OPTIONS = [
    { name: '4', value: '4' },
    { name: '8', value: '8' },
    { name: '16', value: '16' },
    { name: 'all', value: 'all' },
  ];

  const perPage =
    PER_PAGE_OPTIONS.find(item => item.value === searchParams.get('perPage'))
      ?.value || PER_PAGE_OPTIONS[0].value;

  const sort = searchParams.get('sort') || SORT_OPTIONS[0].value;

  const sortProducts = (p: Product[]) => {
    return p.slice().sort((a, b) => {
      switch (sort) {
        case 'age':
          return b.year - a.year;
        case 'title':
          return a.name.localeCompare(b.name);
        case 'price':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  };

  const sortedProducts = sortProducts(products);

  const getCurrentPage = () => {
    const page = Number(searchParams.get('page')) || 1;
    const maxPages = Math.ceil(sortedProducts.length / +perPage);

    return page > maxPages ? maxPages : page;
  };

  const currentPage = getCurrentPage();

  const getVisibleProducts = (p: Product[]) => {
    if (perPage === 'all') {
      return p;
    }

    const startIndex = (currentPage - 1) * +perPage;
    const endIndex =
      currentPage * +perPage > p.length ? p.length : currentPage * +perPage;

    return p.slice(startIndex, endIndex);
  };

  const visibleProducts = getVisibleProducts(sortedProducts);

  return (
    <section className={styles['products-catalog']}>
      <Breadcrumbs />
      <div>
        <h1 className={styles['products-catalog__title']}>{title}</h1>
        <p className={styles['products-catalog__text']}>
          {products.length} models
        </p>
      </div>
      <div>
        <div className={styles['products-catalog__selectors-wrapper']}>
          <Selector title="Sort by" type="sort" items={SORT_OPTIONS} />
          <Selector
            title="Items per page"
            type="perPage"
            items={PER_PAGE_OPTIONS}
          />
        </div>
        <Grid products={visibleProducts} />
      </div>
      <Pagination
        total={sortedProducts.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => updateSearchParams('page', page)}
        className={styles['products-catalog__pagination']}
      />
    </section>
  );
};
