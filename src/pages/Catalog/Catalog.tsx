import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getProducts } from '../../api/api';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Dropdown } from '../../components/Dropdown';
import { ProductCard } from '../../components/ProductCard';
import { ProductType } from '../../types/ProductType';
import { SortType } from '../../types/SortType';
import { Category } from '../../types/CategoryType';
import './Catalog.scss';
import { useSearchParams } from 'react-router-dom';

const DEFAULT_SORT_BY = 'Newest';
const DEFAULT_PER_PAGE = 16;

type Props = {
  category: Category;
};

export const Catalog: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  const [sortBy, setSortBy] = useState<keyof typeof SortType>(DEFAULT_SORT_BY);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);

  const handleSortBy = (value: string) => {
    setSortBy(value as keyof typeof SortType);
  };

  const handlePerPage = (value: string) => {
    setPerPage(parseInt(value));
  };

  const fetchProducts = async () => {
    const response = await getProducts(
      {
        page,
        sortBy: SortType[sortBy],
        perPage,
      },
      category,
    );

    setPageCount(response.pages);
    setProducts(response.products);
  };

  useEffect(() => {
    fetchProducts();
  }, [category, page, perPage, sortBy]);

  useEffect(() => {
    setPage(1);
    setSortBy('Newest');
    setPerPage(16);
  }, [category]);

  useEffect(() => {
    const savedSortBy = searchParams.get('sortBy');
    const savedPerPage = searchParams.get('perPage');

    if (savedSortBy) {
      setSortBy(savedSortBy as keyof typeof SortType);
    }

    if (savedPerPage) {
      const toInt = parseInt(savedPerPage);

      if (toInt) {
        setPerPage(toInt);
      }
    }
  }, []);

  useEffect(() => {
    const newParams: { [key: string]: string } = {};

    if (perPage !== DEFAULT_PER_PAGE) {
      newParams['perPage'] = perPage.toString();
    }

    if (sortBy !== DEFAULT_SORT_BY) {
      newParams['sortBy'] = sortBy;
    }

    setSearchParams(newParams);
  }, [perPage, sortBy]);

  return (
    <div className="catalog">
      <Breadcrumbs paths={['Phones']} />

      <h1 className="catalog__title">Mobile phones</h1>
      <p className="catalog__count body-text">95 models</p>

      <div className="catalog__filters">
        <div className="catalog__filters-filter">
          <p className="catalog__filters-filter-text small-text">Sort by</p>
          <Dropdown
            options={Object.keys(SortType)}
            value={sortBy}
            onChange={handleSortBy}
          />
        </div>

        <div className="catalog__filters-filter catalog__filters-filter--small">
          <p className="catalog__filters-filter-text small-text">
            Items on page
          </p>
          <Dropdown
            options={['16', '32', '64']}
            value={perPage}
            onChange={handlePerPage}
          />
        </div>
      </div>

      <div className="catalog__container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} wideButton={true} />
        ))}
      </div>

      <div className="catalog__pagination">
        <div className="button--arrow">
          <img src="/icons/arrow_left.svg" alt="Arrow left" />
        </div>

        <div className="catalog__pagination-pages">
          {Array.from(Array(pageCount)).map((_, index) => {
            const pageIndex = index + 1;

            const handlePage = () => {
              setPage(pageIndex);
            };

            return (
              <div
                key={pageIndex}
                className={classNames(
                  'catalog__pagination-page-button  button--arrow',
                  {
                    'catalog__pagination-page-button--selected':
                      page === pageIndex,
                  },
                )}
                onClick={handlePage}
              >
                <p className="body-text">{pageIndex}</p>
              </div>
            );
          })}
        </div>

        <div className="button--arrow">
          <img src="/icons/arrow_right.svg" alt="Arrow right" />
        </div>
      </div>
    </div>
  );
};
