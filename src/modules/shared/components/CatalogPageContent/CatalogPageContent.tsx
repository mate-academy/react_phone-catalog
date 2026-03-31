import React, { useState } from 'react';
import { Product, SortType, ItemsPerPage } from '../../../../types/Product';
import { Breadcrumbs } from '../Breadcrumbs';
import styles from './CatalogPageContent.module.scss';
import { getSortedProducts } from '../../../../utils/products';
import { ProductList } from '../ProductList/ProductList';
import { Pagination } from '../Pagination';

type Props = {
  title: string;
  breadcrumb: string;
  products: Product[];
  favourites: Product[];
  onToggleFavourite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

export const CatalogPageContent: React.FC<Props> = ({
  title,
  breadcrumb,
  products,
  favourites,
  onToggleFavourite,
  onAddToCart,
}) => {
  const [sortBy, setSortBy] = useState<SortType>('newest');
  const [perPage, setPerPage] = useState<ItemsPerPage>(4);
  const [currentPage, setCurrentPage] = useState(1);
  const maxVisiblePages = 4;
  let startPage = 1;

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as SortType);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setPerPage(value === 'all' ? 'all' : (Number(value) as ItemsPerPage));
  };

  const sortedProducts = getSortedProducts(products, sortBy);
  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(sortedProducts.length / perPage);

  let visibleProducts;

  if (perPage === 'all') {
    visibleProducts = sortedProducts;
  } else {
    visibleProducts = sortedProducts.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage,
    );
  }

  if (currentPage >= maxVisiblePages) {
    startPage = currentPage - maxVisiblePages + 2;
  }

  const maxStartPage = Math.max(1, totalPages - maxVisiblePages + 1);

  if (startPage > maxStartPage) {
    startPage = maxStartPage;
  }

  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  const visiblePages = [];

  for (let page = startPage; page <= endPage; page++) {
    visiblePages.push(page);
  }

  return (
    <main>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <h1 className={styles.pageTitle}>{title}</h1>
      <p className={styles.modelsCount}>{`${products.length} models`}</p>

      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="sortBy" className={styles.controlLabel}>
            Sort by
          </label>
          <select
            id="sortBy"
            className={styles.controlSelect}
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="newest">Newest</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>

        <div className={styles.control}>
          <label htmlFor="perPage" className={styles.controlLabel}>
            Items on page
          </label>
          <select
            id="perPage"
            className={styles.controlSelect}
            value={String(perPage)}
            onChange={handlePerPageChange}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <ProductList
        products={visibleProducts}
        favourites={favourites}
        onToggleFavourite={onToggleFavourite}
        onAddToCart={onAddToCart}
      />

      {perPage !== 'all' && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          visiblePages={visiblePages}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
};

// import React, { useState } from 'react';
// import { Product, SortType, ItemsPerPage } from '../../../../types/Product';
// import { Breadcrumbs } from '../Breadcrumbs';
// import styles from './CatalogPageContent.module.scss';
// import { getSortedProducts } from '../../../../utils/products';
// import { ProductList } from '../ProductList/ProductList';
// import { Pagination } from '../Pagination';
// import { Select } from '../Select';

// type Props = {
//   title: string;
//   breadcrumb: string;
//   products: Product[];
// };

// export const CatalogPageContent: React.FC<Props> = ({
//   title,
//   breadcrumb,
//   products,
// }) => {
//   const [sortBy, setSortBy] = useState<SortType>('newest');
//   const [perPage, setPerPage] = useState<ItemsPerPage>(4);
//   const [currentPage, setCurrentPage] = useState(1);
//   const maxVisiblePages = 4;
//   let startPage = 1;

//   const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSortBy(event.target.value as SortType);
//   };

//   const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = event.target.value;

//     setPerPage(value === 'all' ? 'all' : (Number(value) as ItemsPerPage));
//   };

//   const sortedProducts = getSortedProducts(products, sortBy);
//   const totalPages =
//     perPage === 'all' ? 1 : Math.ceil(sortedProducts.length / perPage);

//   const visibleProducts =
//     perPage === 'all'
//       ? sortedProducts
//       : sortedProducts.slice(
//           (currentPage - 1) * perPage,
//           currentPage * perPage,
//         );

//   if (currentPage >= maxVisiblePages) {
//     startPage = currentPage - maxVisiblePages + 2;
//   }

//   const maxStartPage = Math.max(1, totalPages - maxVisiblePages + 1);

//   if (startPage > maxStartPage) {
//     startPage = maxStartPage;
//   }

//   const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

//   const visiblePages = [];

//   for (let page = startPage; page <= endPage; page++) {
//     visiblePages.push(page);
//   }

//   return (
//     <main>
//       <Breadcrumbs breadcrumb={breadcrumb} />
//       <h1 className={styles.pageTitle}>{title}</h1>
//       <p className={styles.modelsCount}>{`${products.length} models`}</p>

//       <div className={styles.controls}>
//         <Select
//           id="sortBy"
//           label="Sort by"
//           value={sortBy}
//           onChange={value => setSortBy(value as SortType)}
//         />
//         <Select
//           id="perPage"
//           label="Items on page"
//           value={String(perPage)}
//           onChange={value =>
//             setPerPage(value === 'all' ? 'all' : (Number(value) as ItemsPerPage))
//           }
//         />
//       </div>

//       <ProductList products={visibleProducts} />

//       {perPage !== 'all' && totalPages > 1 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           visiblePages={visiblePages}
//           onPageChange={setCurrentPage}
//         />
//       )}
//     </main>
//   );
// };

// type Option = {
//   value: string;
//   label: string;
// };
