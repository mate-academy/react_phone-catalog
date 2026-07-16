/* eslint-disable @typescript-eslint/no-explicit-any */

//#region import
import styles from './PhonesPage.module.scss';
import 'swiper/swiper-bundle.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import Home from '../../icons/Home.svg';
import Right from '../../icons/Right.svg';
import Left from '../../icons/Left.svg';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { BrandCard } from '../../components/BrandCard';
import { Product } from '../../types';
import productsData from '../../../public/api/products.json';
import { getVisibleProducts, isValidCategory } from '../../utils/prodcuts';
import { SortType } from '../../utils/prodcuts';
import { getPagination } from '../../utils/pagination';
//#endregion

const items = [{ count: 16 }, { count: 24 }, { count: 48 }, { count: 96 }];
const sorts: { sort: SortType }[] = [
  { sort: 'new' },
  { sort: 'popular' },
  { sort: 'old' },
];
const products = productsData as Product[];

export function PhonesPage() {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  if (!category || !isValidCategory(category)) {
    return <div>Страница не найдена</div>;
  }

  const sortParam = (searchParams.get('sort') as SortType) || 'new';
  const pageParam = Number(searchParams.get('page')) || 1;
  const perPageParam = searchParams.get('perPage') || '16';
  const itemsPerPage = perPageParam === 'all' ? Infinity : Number(perPageParam);

  function handleSortChange(newSort: SortType) {
    const params = new URLSearchParams(searchParams);

    if (newSort === 'new') {
      params.delete('sort');
    } else {
      params.set('sort', newSort);
    }

    params.delete('page');
    setSearchParams(params);
  }

  function handleItemsPerPageChange(newCount: number | 'all') {
    const params = new URLSearchParams(searchParams);

    if (newCount === 16) {
      params.delete('perPage');
    } else {
      params.set('perPage', String(newCount));
    }

    params.delete('page');
    setSearchParams(params);
  }

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }

    setSearchParams(params);
  }

  const {
    items: visibleProducts,
    total,
    totalPages,
  } = getVisibleProducts({
    products,
    category: category,
    sortType: sortParam,
    itemsPerPage,
    currentPage: pageParam,
  });

  const paginationRange = getPagination(pageParam, totalPages, 1);

  return (
    <div className={styles.phonesPage}>
      <Header />

      <main className={styles.main}>
        <div className={styles.BreadCrumbs}>
          <Link to={'/'} className={styles.BreadCrumbs__link}>
            <img src={Home} alt="" className={styles.BreadCrumbs__img} />
          </Link>
          <img src={Right} alt="" />
          <Link to={`/${category}`} className={styles.BreadCrumbs__link}>
            {category}
          </Link>
        </div>
        <div className={styles.controls}>
          {category === 'phones' ? (
            <h2 className={styles.controls__title}>Mobile phones</h2>
          ) : category === 'tablets' ? (
            <h2 className={styles.controls__title}>Tablets</h2>
          ) : (
            <h2 className={styles.controls__title}>Accessories</h2>
          )}
          <p className={styles.controls__models}>{total} models</p>
        </div>

        <div className={styles.menu}>
          <div className={styles.menu__block}>
            <h2 className={styles.menu__block__title}>Sort by</h2>
            <div className={styles.listbox}>
              <Listbox value={sortParam} onChange={handleSortChange}>
                <ListboxButton className={styles.listbox__button}>
                  {sortParam}
                </ListboxButton>
                <ListboxOptions className={styles.listbox__options}>
                  {sorts.map(sort => (
                    <ListboxOption
                      key={sort.sort}
                      value={sort.sort}
                      className={styles.listbox__option}
                    >
                      {sort.sort}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>
          <div className={styles.menu__block}>
            <h2 className={styles.menu__block__title}>Items on page</h2>
            <div className={styles.listbox}>
              <Listbox
                value={perPageParam === 'all' ? 'all' : Number(perPageParam)}
                onChange={handleItemsPerPageChange}
              >
                <ListboxButton className={styles.listbox__button}>
                  {perPageParam === 'all' ? 'all' : perPageParam}
                </ListboxButton>
                <ListboxOptions className={styles.listbox__options}>
                  {items.map(item => (
                    <ListboxOption
                      key={item.count}
                      value={item.count}
                      className={styles.listbox__option}
                    >
                      {item.count}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>
        </div>
        <div className={styles.grid}>
          {visibleProducts.map(product => (
            <BrandCard key={product.id} product={product} />
          ))}
        </div>
        <div className={styles.pagination}>
          <button
            className={styles.pagination__button}
            disabled={pageParam === 1}
            onClick={() => handlePageChange(Math.max(1, pageParam - 1))}
          >
            <img src={Left} alt="" className={styles.pagination__img} />
          </button>
          <div className={styles.agination}>
            {paginationRange.map((item, index) =>
              item === '...' ? (
                <span key={`dots-${index}`} className={styles.agination__dots}>
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => handlePageChange(item)}
                  className={`${styles.agination__link} ${item === pageParam ? styles.agination__link_active : ''}`}
                >
                  {item}
                </button>
              ),
            )}
          </div>
          <button className={styles.pagination__button}>
            <img src={Right} alt="" className={styles.pagination__img} />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
