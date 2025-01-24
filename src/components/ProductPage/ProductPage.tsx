import { useEffect, useState } from 'react';
import { useAppSelector, useComponentLoading } from '../../app/hooks';
import { Product } from '../../features/types/Product';
import { Loader } from '../ui/Loader';
import { ShownRoute, ShownRouteOrigin } from '../ui/ShownRoute';
import { CustomSelect } from './CustomSelect';
import cl from './ProductPage.module.scss';
import { ProductCard } from '../cards/ProductCard';
import { Pagination } from './Pagination';
import { PageTitle } from '../titles/PageTitle';

type Props = {
  list: Product[];
  pageTitle: string;
};

const textContent = {
  items: {
    en: 'Items',
    ua: 'Моделей',
  },
  sortBy: {
    title: {
      en: 'Sort by',
      ua: 'Сортувати за',
    },
    options: {
      en: ['Discount', 'Price', 'Year', 'Capacity', 'RAM'],
      ua: ['Знижка', 'Ціна', 'Рік', 'Сховище', "Оперативна пам'ять"],
    },
  },
  itemsOnPage: {
    title: {
      en: 'Items on page',
      ua: 'Моделей на сторінці',
    },
  },
  order: {
    title: {
      en: 'Order',
      ua: 'Порядок',
    },
    options: {
      en: ['Ascending', 'Descending'],
      ua: ['Зростаючий', 'Спадаючий'],
    },
  },
};

export const ProductPage: React.FC<Props> = ({ list, pageTitle }) => {
  const isLoading = useComponentLoading(300);
  const { language } = useAppSelector(st => st.global);
  const [isListLoading, setIsListLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortBy, setSortBy] = useState(language === 'en' ? 'Year' : 'Рік');
  const [itemsOnPage, setItemsOnPage] = useState(8);
  const [order, setOrder] = useState(
    language === 'en' ? 'Descending' : 'Спадаючий',
  );

  const totalPages = Math.ceil(list.length / itemsOnPage);

  useEffect(() => {
    setIsListLoading(true);
    const timer = setTimeout(() => {
      setIsListLoading(false);
    }, 300);

    setCurrentPage(1);

    return () => clearTimeout(timer);
  }, [sortBy, itemsOnPage, order]);

  const convertCapacity = (capacity: string) => {
    if (capacity.includes('TB')) {
      return parseInt(capacity) * 1024;
    } else if (capacity.includes('GB')) {
      return parseInt(capacity);
    } else if (capacity.includes('mm')) {
      return parseInt(capacity);
    }

    return 0;
  };

  const sortedList = list.sort((a, b) => {
    switch (sortBy) {
      case 'Discount': {
        const discountA = 100 - Math.round((a.price / a.fullPrice) * 100);
        const discountB = 100 - Math.round((b.price / b.fullPrice) * 100);

        return order === 'Ascending'
          ? discountA - discountB
          : discountB - discountA;
      }

      case 'Знижка': {
        const discountA = 100 - Math.round((a.price / a.fullPrice) * 100);
        const discountB = 100 - Math.round((b.price / b.fullPrice) * 100);

        return order === 'Зростаючий'
          ? discountA - discountB
          : discountB - discountA;
      }

      case 'Price':
        return order === 'Ascending' ? a.price - b.price : b.price - a.price;

      case 'Ціна':
        return order === 'Зростаючий' ? a.price - b.price : b.price - a.price;

      case 'Year':
        return order === 'Ascending' ? a.year - b.year : b.year - a.year;

      case 'Рік':
        return order === 'Зростаючий' ? a.year - b.year : b.year - a.year;

      case 'Capacity':
        const capacityA = convertCapacity(a.capacity);
        const capacityB = convertCapacity(b.capacity);

        return order === 'Ascending'
          ? capacityA - capacityB
          : capacityB - capacityA;

      case 'Сховище': {
        const capacityA2 = convertCapacity(a.capacity);
        const capacityB2 = convertCapacity(b.capacity);

        return order === 'Зростаючий'
          ? capacityA2 - capacityB2
          : capacityB2 - capacityA2;
      }

      case 'RAM':
        const ramA = parseInt(a.ram);
        const ramB = parseInt(b.ram);

        return order === 'Ascending' ? ramA - ramB : ramB - ramA;

      case "Оперативна пам'ять":
        const ramA2 = parseInt(a.ram);
        const ramB2 = parseInt(b.ram);

        return order === 'Зростаючий' ? ramA2 - ramB2 : ramB2 - ramA2;

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
        <PageTitle text={pageTitle} />
        <small
          className={cl.titleContainerInfo}
        >{`${list.length} ${textContent.items[language]}`}</small>
      </div>

      <div className={cl.selectAndListContainer}>
        <nav className={cl.selects}>
          <CustomSelect
            name={textContent.sortBy.title[language]}
            value={sortBy}
            setValue={setSortBy}
            options={textContent.sortBy.options[language]}
            className={cl.selects__select1}
          />
          <CustomSelect
            name={textContent.itemsOnPage.title[language]}
            value={itemsOnPage}
            setValue={setItemsOnPage}
            options={[8, 16, 24]}
            className={cl.selects__select2}
          />
          <CustomSelect
            name={textContent.order.title[language]}
            value={order}
            setValue={setOrder}
            options={textContent.order.options[language]}
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
