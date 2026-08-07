// .. CatalogPage.tsx
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '../../components/Dropdown';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import styles from './CatalogPage.module.scss';
import type { Product } from '../../types/Product';
import { Pagination } from '../../components/Pagination';

const SORT_OPTIONS = ['Newest', 'Alphabetically', 'Cheapest'];
const PER_PAGE_OPTIONS = ['4', '8', '16', 'All'];

interface CatalogPageProps {
  products: Product[];
  category: string;
  title: string;
}

export const CatalogPage = ({
  products,
  category,
  title,
}: CatalogPageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get('sort') || 'Newest';
  const currentPerPage = searchParams.get('perPage') || 'All';

  const currentPage = Number(searchParams.get('page')) || 1;

  // 1. Функція для зміни сортування
  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams);

    if (newSort === 'Newest') {
      params.delete('sort');
    } else {
      params.set('sort', newSort);
    }

    setSearchParams(params); // Оновлюємо URL
  };

  // 2. Функція для зміни кількості товарів
  const handlePerPageChange = (newPerPage: string) => {
    const params = new URLSearchParams(searchParams);

    if (newPerPage === 'All') {
      params.delete('perPage');
    } else {
      params.set('perPage', newPerPage);
    }

    params.delete('page');

    setSearchParams(params);
  };

  // 'category' автоматично підставиться як "accessories", "phones" або "tablets"
  // залежно від того, на якій сторінці знаходиться користувач!
  const filteredProducts = products.filter(
    product => product.category.toLowerCase() === category.toLowerCase(),
  );

  const productArr = filteredProducts;

  const sortedProducts = (arr: Product[]) => {
    const copy = [...arr];

    if (currentSort === 'Alphabetically') {
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (currentSort === 'Cheapest') {
      return copy.sort((a, b) => a.price - b.price);
    }

    return copy.sort((a, b) => b.year - a.year);
  };

  const sortedPpoducts = sortedProducts(productArr);

  const visibleProducts = (arr: Product[]) => {
    const copy = [...arr];

    if (currentPerPage === 'All') {
      return copy;
    }

    const limit = Number(currentPerPage);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;

    return copy.slice(startIndex, endIndex);
  };

  const paginationSort = visibleProducts(sortedPpoducts);
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    // Записуємо новий номер сторінки в URL
    params.set('page', newPage.toString());

    // Оновлюємо URL у браузері
    setSearchParams(params);
  };

  return (
    <section className={styles.catalogPage}>
      <div className="catalogPage__container">
        <Breadcrumbs category={category} />
        <h1 className={`section-title-h1 ${styles.title}`}>{title}</h1>
        <p className={`mb-32-40 ${styles.quantityGoods}`}>
          <span>{productArr.length}</span> models
        </p>
        <div className={styles.sortBlock}>
          <Dropdown
            label="Sort by"
            options={SORT_OPTIONS}
            selectedOption={currentSort}
            onSelect={handleSortChange}
          />
          <Dropdown
            label="Items on page"
            options={PER_PAGE_OPTIONS}
            selectedOption={currentPerPage}
            onSelect={handlePerPageChange}
            variant="pagination"
          />
        </div>
        <ProductsList products={paginationSort} />
        <Pagination
          total={productArr.length}
          perPage={currentPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
