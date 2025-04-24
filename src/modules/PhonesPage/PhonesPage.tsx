import { useCategories } from '../../store/CategoryContext';
import { useFilters } from '../../store/FilterContext';
import { useProduct } from '../../store/ProductContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Filter } from '../shared/components/Filter';
import { Loader } from '../shared/components/Loader';
import { Pagination } from '../shared/components/Pagination/Pagination';
import { PaginationFilter } from '../shared/components/PaginationFilter';
import { ProductsList } from '../shared/components/ProductsList';
import { CategoryType } from '../shared/types/CategoryType';

export const PhonesPage = () => {
  const { products, isLoading, errorMsg } = useProduct();
  const { categories } = useCategories();
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    searchParams,
    handlePageChange,
    getNumbers,
    filter,
    sortProducts,
    searchQuery,
  } = useFilters();

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const category: CategoryType | undefined = categories.find(
    item => item.page === 'phones',
  );

  let filteredProducts = products;

  if (category) {
    filteredProducts = products.filter(item => item.category === category.page);
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  const sortedProducts = sortProducts(filteredProducts, filter);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && errorMsg.length > 0) {
    return (
      <div>
        <p>{errorMsg}</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  return (
    <section className="App__section" id="phones">
      <div className="App__section-content App__section-content">
        <Breadcrumbs category={category} />

        {category && <h1 className="App__h App__h--h1">{category.fullName}</h1>}

        <div className="App__product_counter">{`${products.length} models`}</div>

        <div className="App__filter">
          <Filter filter={filter} />
        </div>

        <div className="App__pagination_filter">
          <PaginationFilter
            products={products}
            searchParams={searchParams}
            setCurrentPage={setCurrentPage}
            getNumbers={getNumbers}
          />
        </div>

        {category && sortedProducts.length > 0 ? (
          <ProductsList
            products={sortedProducts}
            category={category}
            itemsPerPage={itemsPerPage}
          />
        ) : (
          <p>There are no {category?.name} yet</p>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};
