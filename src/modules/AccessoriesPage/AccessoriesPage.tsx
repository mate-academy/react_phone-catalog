import { motion } from 'motion/react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import accessories from '../../../public/api/accessories.json';
import { Product } from '../../types/product';
import { ProductCard } from '../../components/ProductCard';
import styles from './Accessories.module.scss';
import { Pagination } from '../../components/Pagination/Pagination';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CustomSelect } from '../../components/CustomSelect';
import { fadeInDown } from '../../animations/animations';

export const AccessoriesPage = () => {
  const accessoriesList = accessories;
  const DEFAULT_PER_PAGE = 16;
  const DEFAULT_PAGE = 1;

  let filteredAccessoriesList = [...accessoriesList];

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || DEFAULT_PAGE;
  const currentFilter = searchParams.get('sort') || 'Alphabetically';
  const currentPerPageItems =
    Number(searchParams.get('perPage')) || DEFAULT_PER_PAGE;

  switch (currentFilter) {
    case 'age':
      filteredAccessoriesList = [...accessoriesList].reverse();
      break;
    case 'title':
      filteredAccessoriesList.sort((a: Product, b: Product) =>
        a.name.localeCompare(b.name),
      );
      break;
    case 'price':
      filteredAccessoriesList.sort(
        (a: Product, b: Product) =>
          (a.priceDiscount ?? a.priceRegular) -
          (b.priceDiscount ?? b.priceRegular),
      );
      break;
  }

  const [perPage, setPerPage] = useState(currentPerPageItems);

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(startItem + perPage - 1, accessoriesList.length);

  const handlePageChange = (page: number) => {
    if (page === 1) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', page.toString());
    }

    setSearchParams(searchParams);
    window.scrollTo({ top: 0 });
  };

  const handlePerPageChange = (itemsPerPage: number) => {
    searchParams.set('perPage', itemsPerPage.toString());
    searchParams.set('page', '1');

    setPerPage(Number(itemsPerPage));
    setSearchParams(searchParams);
    window.scrollTo({ top: 0 });
  };

  const handleFilterChange = (value: string | number) => {
    if (typeof value !== 'string') {
      return;
    }

    searchParams.delete('sort');

    switch (value) {
      case 'Newest':
        searchParams.set('sort', 'age');
        break;
      case 'Cheapest':
        searchParams.set('sort', 'price');
        break;
      case 'Alphabetically':
        searchParams.set('sort', 'title');
        break;
    }

    setSearchParams(searchParams);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="container">
      <motion.div {...fadeInDown}>
        <Breadcrumbs />
      </motion.div>
      <motion.h1 {...fadeInDown} className={styles.title}>
        Accessories
      </motion.h1>
      <motion.p {...fadeInDown} className={styles.quantity}>
        {accessoriesList.length} models
      </motion.p>
      <motion.div {...fadeInDown} className={styles.selects}>
        <CustomSelect
          placeholder={'Sort by'}
          options={['Cheapest', 'Newest', 'Alphabetically']}
          defaultValue={currentFilter}
          onChange={handleFilterChange}
        />
        <CustomSelect
          placeholder={'Items on page'}
          options={[4, 8, 16]}
          defaultValue={currentPerPageItems}
          onChange={handlePerPageChange}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
        }}
        className={styles.list}
      >
        {filteredAccessoriesList
          .slice(startItem - 1, endItem)
          .map((product: Product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
      </motion.div>
      <Pagination
        currentPage={currentPage}
        total={accessoriesList.length}
        perPage={perPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
