import style from './ProductList.module.scss';
import { ItemPreview } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Link, useSearchParams } from 'react-router-dom';
import home from '../../../public/icons/Home.svg';
import arrow from '../../../public/icons/Arrow.svg';
import { getSearchWith } from '../../styles/utils/searchHelper';
import { SearchLink } from '../SearchLink';

interface ProductListProps {
  list: ItemPreview[];
  type: string;
}

export const ProductList = ({ list, type }: ProductListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'newest';
  const perPage = searchParams.get('perPage') || 'all';
  const page = searchParams.get('page') || '1';
  const itemsPerPage = perPage === 'all' ? list.length : Number(perPage);
  const pagesNumber = Math.ceil(list.length / itemsPerPage);
  const pagesList: number[] = [];
  const start =
    Number(page) > 4
      ? Number(page) - 3
      : Math.floor((Number(page) - 1) / 4) * 4 + 1;

  for (let i = 1; i <= pagesNumber; i++) {
    pagesList.push(i);
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;

    const newSearch = getSearchWith(searchParams, {
      sort: selectedSort === 'newest' ? null : selectedSort,
    });

    setSearchParams(newSearch);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPerPage = event.target.value;

    const newSearch = getSearchWith(searchParams, {
      perPage: selectedPerPage === 'all' ? null : selectedPerPage,
      page: null,
    });

    setSearchParams(newSearch);
  };

  const handleSort = (a: ItemPreview, b: ItemPreview): number => {
    switch (sort) {
      case 'alphabetically':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return (a.price ?? 0) - (b.price ?? 0);
      default:
        return b.year - a.year;
    }
  };

  const handleSlice = (): [number, number] => {
    const startIndex = (Number(page) - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return [startIndex, endIndex];
  };

  return (
    <div className={style.main}>
      <div className={style.icons}>
        <Link to={'/home'}>
          <img src={home} alt="homeIcon" />
        </Link>
        <img src={arrow} alt="homeIcon" className={style.disabled} />
        <span className={style.disabledText}>{type}</span>
      </div>
      <h1 className={style.title}>{type} page</h1>
      <p className={style.text}>{list.length} models</p>
      <div className={style.sorters}>
        <div className={style.sorter}>
          <span>Sort by</span>
          <div className={style.selectWrapper}>
            <select
              className={style.select}
              name="sorter"
              id="sort-by"
              value={sort}
              onChange={handleSortChange}
            >
              <option value="newest">Newest</option>
              <option value="alphabetically">Alphabetically</option>
              <option value="cheapest">Cheapest</option>
            </select>

            <img className={style.selectArrow} src={arrow} alt="" />
          </div>
        </div>
        <div className={style.sorter}>
          <span>Items on page</span>
          <div className={`${style.selectWrapper} ${style.selectWrapperSmall}`}>
            <select
              name="itemsOnPage"
              id="items-on-page"
              className={style.select}
              value={perPage}
              onChange={handlePerPageChange}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">All</option>
            </select>

            <img className={style.selectArrow} src={arrow} alt="" />
          </div>
        </div>
      </div>
      <div className={style.container}>
        {[...list]
          .sort(handleSort)
          .slice(...handleSlice())
          .map(item => (
            <ProductCard key={item.id} item={item} discount={true} />
          ))}
      </div>
      {list.length >= 5 && (
        <div className={style.pagination}>
          <SearchLink
            params={{
              page: Number(page) - 1 === 1 ? null : `${Number(page) - 1}`,
            }}
          >
            <button
              disabled={Number(page) === 1}
              className={style.paginationBox}
            >
              <img src={arrow} alt="leftArrow" className={style.leftArrow} />
            </button>
          </SearchLink>
          {pagesList.slice(start - 1, start + 3).map(number => (
            <SearchLink
              className={`${style.paginationBox}${page === `${number}` ? ` ${style.paginationBoxChoosen}` : ''}`}
              key={number}
              params={{ page: number === 1 ? null : `${number}` }}
            >
              {number}
            </SearchLink>
          ))}
          {pagesList.length !== Number(page) && (
            <div className={style.paginationBox}>...</div>
          )}
          <SearchLink params={{ page: `${Number(page) + 1}` }}>
            <button
              className={style.paginationBox}
              disabled={page === `${pagesNumber}`}
            >
              <img src={arrow} alt="rightArrow" />
            </button>
          </SearchLink>
        </div>
      )}
    </div>
  );
};
