import { useEffect, useState } from 'react';
import { useComponentLoading } from '../../app/hooks';
import { Product } from '../../features/types/Product';
import { Loader } from '../Loader';
import { ShownRoute, ShownRouteOrigin } from '../ShownRoute';
import { CustomSelect } from './CustomSelect';
import cl from './ProductPage.module.scss';
import { ProductCard } from '../cards/ProductCard';
import { Pagination } from './Pagination';

export enum ProductPageOrigin {
  PHONES = 'Mobile phones',
  TABLETS = 'Tablets',
  ACCESSORIES = 'Accessories',
}

type Props = {
  origin: ProductPageOrigin;
  list: Product[];
};

export const ProductPage: React.FC<Props> = ({ origin, list }) => {
  const isLoading = useComponentLoading(300);
  const [isListLoading, setIsListLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortBy, setSortBy] = useState('Year');
  const [itemsOnPage, setItemsOnPage] = useState(8);
  const [order, setOrder] = useState('Descending');

  const totalPages = Math.ceil(list.length / itemsOnPage);

  useEffect(() => {
    setIsListLoading(true);
    const timer = setTimeout(() => {
      setIsListLoading(false);
    }, 300);

    setCurrentPage(1);

    return () => clearTimeout(timer);
  }, [sortBy, itemsOnPage, order]);

  const sortedList = list.sort((a, b) => {
    switch (sortBy) {
      case 'Discount': {
        const discountA = 100 - Math.round((a.price / a.fullPrice) * 100);
        const discountB = 100 - Math.round((b.price / b.fullPrice) * 100);

        return order === 'Ascending'
          ? discountA - discountB
          : discountB - discountA;
      }

      case 'Price':
        return order === 'Ascending' ? a.price - b.price : b.price - a.price;

      case 'Year':
        return order === 'Ascending' ? a.year - b.year : b.year - a.year;

      case 'Capacity':
        const capacityA = parseInt(a.capacity);
        const capacityB = parseInt(b.capacity);

        return order === 'Ascending'
          ? capacityA - capacityB
          : capacityB - capacityA;

      case 'RAM':
        const ramA = parseInt(a.ram);
        const ramB = parseInt(b.ram);

        return order === 'Ascending' ? ramA - ramB : ramB - ramA;
      default:
        return 0;
    }
  });

  const showableProducts = sortedList.slice(
    (currentPage - 1) * itemsOnPage,
    currentPage * itemsOnPage,
  );

  return isLoading ? (
    <Loader />
  ) : (
    <div className={`container ${cl.pageContainer}`}>
      <ShownRoute origin={ShownRouteOrigin.ONPRODUCTPAGE} />

      <div className={cl.titleContainer}>
        <h2 className={cl.titleContainerTitle}>{origin}</h2>
        <small
          className={cl.titleContainerInfo}
        >{`${list.length} items`}</small>
      </div>

      <div className={cl.selectAndListContainer}>
        <nav className={cl.selects}>
          <CustomSelect
            name="Sort by"
            value={sortBy}
            setValue={setSortBy}
            options={['Discount', 'Price', 'Year', 'Capacity', 'RAM']}
            className={cl.selects__select1}
          />
          <CustomSelect
            name="Items on page"
            value={itemsOnPage}
            setValue={setItemsOnPage}
            options={[8, 16, 24]}
            className={cl.selects__select2}
          />
          <CustomSelect
            name="Order"
            value={order}
            setValue={setOrder}
            options={['Ascending', 'Descending']}
            className={cl.selects__select3}
          />
        </nav>

        {isListLoading ? (
          <Loader />
        ) : (
          <section className={cl.prodList}>
            {showableProducts.map(prod => (
              <ProductCard
                product={prod}
                className={cl.prodList__card}
                key={prod.id}
              />
            ))}
          </section>
        )}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        className={cl.pagination}
      />
    </div>
  );
};
