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
import { useSearchParams } from 'react-router-dom';

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

export const ProductPage: React.FC<Props> = ({ list, pageTitle }) => {
  const isLoading = useComponentLoading(300);
  const [isListLoading, setIsListLoading] = useState(false);
  const { language } = useAppSelector(st => st.global);

  //#region searchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy =
    searchParams.get('sortBy') || (language === 'en' ? 'Year' : 'Рік');
  const order =
    searchParams.get('order') ||
    (language === 'en' ? 'Descending' : 'Спадаючий');
  const itemsOnPage = +(searchParams.get('itemsOnPage') || 8);
  const currentPage = +(searchParams.get('currentPage') || 1);
  //#endregion

  const totalPages = Math.ceil(list.length / itemsOnPage);

  // fix bug when currentPage is bigger than totalPages
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (currentPage > totalPages) {
      params.set('currentPage', '1');
      setSearchParams(params);
    }
  }, [itemsOnPage, currentPage, searchParams, setSearchParams, totalPages]);

  useEffect(() => {
    setIsListLoading(true);
    const timer = setTimeout(() => {
      setIsListLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [sortBy, itemsOnPage, order]);

  //#region sort and set shown list
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
  //#endregion

  //#region search params manipulation handlers
  function handleSortOptionChange(key: string) {
    return (ev: React.MouseEvent<HTMLDivElement>) => {
      const params = new URLSearchParams(searchParams);

      params.set(key, ev.currentTarget.textContent || '');
      setSearchParams(params);
    };
  }

  function handleArrowClick(toValue: number) {
    return () => {
      const params = new URLSearchParams(searchParams);

      params.set('currentPage', String(toValue));
      setSearchParams(params);
    };
  }

  function handlePageChange(ev: React.MouseEvent<HTMLLIElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('currentPage', ev.currentTarget.textContent || '1');
    setSearchParams(params);
  }
  //#endregion

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
            onOptionClick={handleSortOptionChange('sortBy')}
            options={textContent.sortBy.options[language]}
            className={cl.selects__select1}
          />

          <CustomSelect
            name={textContent.itemsOnPage.title[language]}
            value={itemsOnPage}
            onOptionClick={handleSortOptionChange('itemsOnPage')}
            options={[8, 16, 24]}
            className={cl.selects__select2}
          />

          <CustomSelect
            name={textContent.order.title[language]}
            value={order}
            onOptionClick={handleSortOptionChange('order')}
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
        currentPage={+currentPage}
        onArrowLeftClick={handleArrowClick(currentPage - 1)}
        onPageClick={handlePageChange}
        onArrowRightClick={handleArrowClick(currentPage + 1)}
        className={cl.pagination}
      />
    </div>
  );
};
