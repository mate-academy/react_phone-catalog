import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './index.scss';
import { ProductExtended } from '../../types/ProductExtended';
import { getFilteredProducts } from '../../helpers/getFilteredProducts';
import { Sorting } from '../../types/Sorting';
import { PerPage } from '../../types/PerPage';
import { ICONS } from '../../images';
import { ProductsList } from '../ProductsList/ProductsList';
import { Pagination } from '../Pagination/Pagination';
import { NoSearchResults } from '../NoSearchResults/NoSearchResults';
import { SortingDropdown } from '../Dropdowns/SortingDropdown';
import { PerPageDropdown } from '../Dropdowns/PerPageDropdown';

type Props = {
  title: string;
  products: ProductExtended[];
};

export const ProductsBlock: React.FC<Props> = ({ title, products }) => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('query') || '';
  const sortByParam = searchParams.get('sort') || 'age';
  const perPageParam = searchParams.get('perPage') || '16';
  const pageParam = searchParams.get('page') || 1;

  const [page, setPage] = useState(Number(pageParam));

  const [filteredProducts, count] = getFilteredProducts(
    products,
    queryParam,
    +page,
    perPageParam as PerPage,
    sortByParam as keyof typeof Sorting,
  );

  useEffect(() => {
    setPage(1);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParam, perPageParam]);

  const navigationPath = pathname.slice(1);

  const paginationCounter = Math.ceil(count / +perPageParam) || 1;

  return (
    <div className="productsBlock">
      <section className="productsBlock__navigation">
        <Link to="/" className="productsBlock__navigation--link">
          <img src={ICONS.home} alt="Home" />
        </Link>
        <img src={ICONS.arrowRightDisabled} alt="Arrow right" />

        <p className="productsBlock__navigation--path text">{navigationPath}</p>
      </section>

      <section className="productsBlock__description">
        <h1 className="productsBlock__description--title">{title}</h1>
        <p className="productsBlock__description--models text">
          {`${count} models`}
        </p>
      </section>

      <section className="productsBlock__content">
        <div className="productsBlock__content--sort">
          <SortingDropdown />
          <PerPageDropdown />
        </div>
        <div className="productsBlock__content--table" data-cy="productList">
          <ProductsList products={filteredProducts} />
        </div>
      </section>

      {paginationCounter > 1 && (
        <Pagination total={paginationCounter} page={page} setPage={setPage} />
      )}

      {!filteredProducts.length && <NoSearchResults />}
    </div>
  );
};
