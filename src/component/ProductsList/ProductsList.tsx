import { useUpdateSearchParams } from '../../hooks/UpdateSearchParams';
import { GridFavourites } from '../modules/GridFavourites/GridFavourites';
import { Products } from './../../types/Products';
import style from './ProductsList.module.scss';
import { useCategoryCount } from '../../hooks/UseCategoryCount';
type Props = {
  products: Products[];
  title: string;
  loading: boolean;
  error: string;
  category?: {
    category: string;
    path: string;
  };
};

export const ProductList: React.FC<Props> = ({ title, products, category }) => {
  const { searchParams } = useUpdateSearchParams();
  const { count } = useCategoryCount(category);

  const sortPerPage = [
    { name: '4', value: '4' },
    { name: '8', value: '8' },
    { name: '16', value: '16' },
    { name: 'All', value: 'all' },
  ];

  const perPage =
    sortPerPage.find(item => item.value === searchParams.get('perPage'))
      ?.value || sortPerPage[0].value;

  const sort = searchParams.get('sort') || sortPerPage[0].value;
  const query = searchParams.get('query');

  const sortItems = (items: Products[]) => {
    let currentItems = items.slice();

    if (query) {
      currentItems = currentItems.filter(a =>
        a.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return currentItems.sort((a, b) => {
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

  const finishedProducts = sortItems(products);

  const getCurrentPage = () => {
    const page = Number(searchParams.get('page')) || 1;
    const maxPage = Math.ceil(finishedProducts.length / +perPage);

    return page > maxPage ? maxPage : page;
  };

  const currentPage = getCurrentPage();
  const getVisibleProducts = (p: Products[]) => {
    if (perPage === 'all') {
      return p;
    }

    const startIndex = (currentPage - 1) * +perPage;
    const lastIndex =
      currentPage * +perPage > p.length ? p.length : currentPage * +perPage;

    return p.slice(startIndex, lastIndex);
  };

  const visibleProducts = getVisibleProducts(finishedProducts);

  return (
    <div className={style['product-list']}>
      <div>
        <h1 className={style['product-list__title']}>{title}</h1>
        {category && (
          <p className={style['product-list__text']}>
            {category.category} ({count})
          </p>
        )}
        <p className={style['product-list__text']}>
          {' '}
          {finishedProducts.length} models
        </p>
      </div>
      <div className={style['product-list__select']}>
        {finishedProducts.length ? (
          <GridFavourites products={visibleProducts} />
        ) : (
          <p className={style['products-catalog__no-found']}>
            No matches found
          </p>
        )}
      </div>
    </div>
  );
};
