import { useParams, useSearchParams } from 'react-router-dom';
import './CatalogPage.scss';
import { Category, Product } from '../../types';
import { useAppState } from '../../store/Store';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
// eslint-disable-next-line max-len
import PreviewProductCard from '../../components/ui/PreviewProductCard/PreviewProductCard';
import Breadcrumbs from '../../components/ui/Breadcrumbs/Breadcrumbs';
import Select from '../../components/ui/Select/Select';
import Pagination from '../../components/ui/Pagination/Pagination';

const titleFromCategory = {
  phones: 'Mobile Phones',
  accessories: 'Accessories',
  tablets: 'Tablets',
};

const optionsSortBy = ['Newest', 'Alphabetically', 'Cheapest'];
const optionsItemsOnPage = ['4', '8', '16', 'all'];

export default function CatalogPage() {
  const { catalog } = useParams();
  const { products } = useAppState();

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'Newest';
  const perPage = searchParams.get('perPage') || '16';
  const page = searchParams.get('page') || '1';

  const handleFilterChange = (key: string) => (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);

    if (key === 'perPage') {
      params.set('page', '1');
    }

    setSearchParams(params);
  };

  const handleChangePage = (pageChange: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(pageChange));
    setSearchParams(params);
  };

  function isCategory(value: string | undefined): value is Category {
    return value === 'phones' || value === 'tablets' || value === 'accessories';
  }

  if (!isCategory(catalog)) {
    return <NotFoundPage />;
  }

  const productsFromCategory = products.filter(
    product => product.category === catalog,
  );

  const productsSortBy = [...productsFromCategory].sort(
    (a: Product, b: Product) => {
      switch (sort) {
        case 'Newest':
          return b.year - a.year;
        case 'Alphabetically':
          return a.name.localeCompare(b.name);
        case 'Cheapest':
          return a.price - b.price;
        default:
          return 0;
      }
    },
  );

  const startIndex = (Number(page) - 1) * Number(perPage);
  const endIndex = startIndex + Number(perPage);

  const productsToShow =
    perPage === 'all'
      ? productsSortBy
      : productsSortBy.slice(startIndex, endIndex);
  const title = titleFromCategory[catalog];
  const countModels = productsFromCategory.length;

  const pagesToShow = countModels / Number(perPage);

  return (
    <div className="CatalogPage">
      <div className="CatalogPage__breadcrumbs">
        <Breadcrumbs category={catalog} />
      </div>

      <h1 className="CatalogPage__title">{title}</h1>
      <div className="CatalogPage__models">{countModels} models</div>

      <div className="CatalogPage__filters">
        <Select
          label="Sort By"
          options={optionsSortBy}
          value={sort}
          onChange={handleFilterChange('sort')}
        />
        <Select
          label="Per page"
          options={optionsItemsOnPage}
          value={perPage}
          onChange={handleFilterChange('perPage')}
        />
      </div>

      <div className="CatalogPage__products">
        {productsToShow.map(item => {
          return <PreviewProductCard product={item} key={item.id} />;
        })}
      </div>

      {perPage !== 'all' && (
        <Pagination
          pages={pagesToShow}
          activeIndex={Number(page)}
          onPageChange={handleChangePage}
        />
      )}
    </div>
  );
}
