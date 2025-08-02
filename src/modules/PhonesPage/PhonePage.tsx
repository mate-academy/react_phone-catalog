import { motion } from 'motion/react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import phones from '../../../public/api/phones.json';
import { Product } from '../../types/product';
import { ProductCard } from '../../components/ProductCard';
import styles from './PhonePage.module.scss';
import { Pagination } from '../../components/Pagination/Pagination';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CustomSelect } from '../../components/CustomSelect';
import { fadeInDown } from '../../animations/animations';

export const PhonePage = () => {
  const phoneList = phones;
  const DEFAULT_PER_PAGE = 16;
  const DEFAULT_PAGE = 1;

  let filteredPhoneList = [...phoneList];

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || DEFAULT_PAGE;
  const currentFilter = searchParams.get('sort') || 'Alphabetically';
  const currentPerPageItems =
    Number(searchParams.get('perPage')) || DEFAULT_PER_PAGE;

  switch (currentFilter) {
    case 'age':
      filteredPhoneList = [...phoneList].reverse();
      break;
    case 'title':
      filteredPhoneList.sort((a: Product, b: Product) =>
        a.name.localeCompare(b.name),
      );
      break;
    case 'price':
      filteredPhoneList.sort(
        (a: Product, b: Product) => a.priceDiscount - b.priceDiscount,
      );
      break;
  }

  const [perPage, setPerPage] = useState(currentPerPageItems);

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(startItem + perPage - 1, phoneList.length);

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
        Mobile phones
      </motion.h1>
      <motion.p {...fadeInDown} className={styles.quantity}>
        {phoneList.length} models
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
        {filteredPhoneList
          .slice(startItem - 1, endItem)
          .map((product: Product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
      </motion.div>
      <Pagination
        currentPage={currentPage}
        total={phoneList.length}
        perPage={perPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
