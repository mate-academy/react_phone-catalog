import { FC } from 'react';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import { Breadcrumbs } from './Breadcrumbs';
import './Catalog.scss';
import { Dropdowns } from './Dropdowns';
import { ProductAllType } from '../../types/Product';
import { NameCategory } from '../../types/NameProducts';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../../types/Sort';
import { scrollToTop } from '../../utils/utils';

type Props = {
  products: ProductAllType[];
  dropdown?: boolean;
  pagination?: boolean;
  categoryName: NameCategory;
};

export const Catalog: FC<Props> = ({
  products,
  dropdown = true,
  pagination = true,
  categoryName,
}) => {
  const [searchParams, setSearchParams] = useSearchParams('');

  function sortBy(parametrs: string, sortItems: ProductAllType[]) {
    const productsToSort = [...sortItems];

    switch (parametrs) {
      case 'name':
        return productsToSort.sort((a, b) => a.name.localeCompare(b.name));
      case 'cheaper':
        return productsToSort.sort((a, b) => a.price - b.price);
      case 'newest':
        return productsToSort.sort((a, b) => b.year - a.year);
      default:
        return productsToSort;
    }
  }

  function infoObject(categoryItem: NameCategory): {
    name: NameCategory;
    quantity: number;
  } {
    let name = '';

    switch (categoryItem) {
      case 'phones':
        name = 'Mobile phones';
        break;
      case 'tablets':
        name = 'Tablets';
        break;
      case 'accessories':
        name = 'Accessories';
        break;
      default:
        break;
    }

    return {
      name: name as NameCategory,
      quantity: products.length | 0,
    };
  }

  const { name, quantity } = infoObject(categoryName);

  // Pagination logic can be added here in the future

  const perPage = +(searchParams.get('sortPage') || '16');
  const currentPage = +(searchParams.get('currentPage') || 1);
  const sortByName = searchParams.get('sortBy') || SortBy.Newest;

  const sortedProducts = sortBy(sortByName, products);
  const firstItemIndex = (currentPage - 1) * perPage;
  const lastItemIndex = firstItemIndex + perPage;
  const filteredPage = sortedProducts.slice(firstItemIndex, lastItemIndex);

  const onPageChange = (page: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('currentPage', page.toString());

      return params;
    });
    scrollToTop();
  };

  return (
    <section className="catalog">
      <div className="container catalog__container">
        <Breadcrumbs />

        <h2 className="catalog__title">{name}</h2>
        <div className="catalog__counter">
          {quantity} model{quantity !== 1 ? 's' : ''}
        </div>

        {dropdown && <Dropdowns />}

        <div className="catalog__wrapper">
          {filteredPage.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        {pagination && (
          <Pagination
            total={products.length}
            perPage={perPage}
            currentPage={currentPage}
            onPageChange={page => onPageChange(page)}
          />
        )}
      </div>
    </section>
  );
};
