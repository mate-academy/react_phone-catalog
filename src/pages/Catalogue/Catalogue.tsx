import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import s from './Catalogue.module.scss';
import { Crumb } from '../../components/Crumb';
import { Dropdown } from '../../components/Dropdown';
import { Pagination } from '../../components/Pagination/Pagination';
import { ProductList } from '../../components/ProductList';
import { useProductContext } from '../../context/ShopContext/ProductContext';
import { Empty } from '../../components/Empty';
import { Error } from '../../components/Error';
import { Loader } from '../../components/Loader';

type Props = {
  type: 'phones' | 'tablets' | 'accessories';
  title: string;
};

export const Catalogue: React.FC<Props> = ({ type, title }) => {
  const { products, error, isLoading, fetchData } = useProductContext();
  const [searchParams] = useSearchParams();
  const [openFilter, setOpenFilter] = useState('');
  const filtredProducts = products.filter(product => product.category === type);
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemPerPage =
    Number(searchParams.get('perPage')) || filtredProducts.length;
  const sortValue = searchParams.get('sort');
  const totalPages = Math.ceil(filtredProducts.length / itemPerPage);

  const lastItem = itemPerPage * currentPage;
  const firstItem = lastItem - itemPerPage;

  const sortedProducts = useMemo(() => {
    return [...filtredProducts].sort((a, b) => {
      switch (sortValue) {
        case 'Newest':
          return b.year - a.year;
        case 'Alphabetically':
          return a.name.localeCompare(b.name);
        default:
          return a.price - b.price;
      }
    });
  }, [filtredProducts, sortValue]);

  if (error) {
    return <Error errorMEssage="Something went wrong" action={fetchData} />;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <main className={s.catalogue}>
      <Crumb />

      <h1 className={s.catalogue__title}>{title}</h1>

      <div className={s.catalogue__count}>{filtredProducts?.length} models</div>

      {filtredProducts.length ? (
        <div className={s['catalogue__product-container']}>
          <div className={s['catalogue__filter-sort']}>
            <label className={s['catalogue__filter-label']}>Sort by</label>
            <Dropdown
              type={'sort'}
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
            />
          </div>

          <div className={s['catalogue__filter-perPage']}>
            <label className={s['catalogue__filter-label']}>
              Items on page
            </label>
            <Dropdown
              type={'perPage'}
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
            />
          </div>

          <div className={s['catalogue__product-list']}>
            <ProductList
              products={sortedProducts}
              firstItem={firstItem}
              lastItem={lastItem}
            />
          </div>
        </div>
      ) : (
        <Empty message={`There are no ${type} yet`} img="catalogue" />
      )}

      {totalPages > 1 && (
        <nav className={s.catalogue__pagination}>
          {<Pagination totalPages={totalPages} currentPage={currentPage} />}
        </nav>
      )}
    </main>
  );
};
