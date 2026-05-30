import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/ProductType';
import { Pagination } from '../../components/Pagination/Pagination';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import './TabletsPage.scss';
import { getTablets } from '../../helpers/products';
import { NoResults } from '../../components/NoResults/NoResults';

enum SortOrder {
  Age = 'age',
  Abc = 'name',
  Price = 'price',
}

export const TabletsPage: React.FC = () => {
  const { pathname } = useLocation();

  const [tablets, setTablets] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = +(searchParams.get('perPage') || (4));
  const sortOrder = searchParams.get('sort') || SortOrder.Age;

  useEffect(() => {
    getTablets()
      .then(setTablets);
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', event.target.value);
    setSearchParams(params);
  };

  const sortedTablets = tablets.slice().sort((a, b) => {
    switch (sortOrder) {
      case SortOrder.Age:
        return b.year - a.year;
      case SortOrder.Abc:
        return a.name.localeCompare(b.name);
      case SortOrder.Price:
        return a.price - b.price;
      default:
        return 0;
    }
  });

  const total = tablets.length;
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = perPage * currentPage <= total
    ? perPage * currentPage
    : total;

  const visibleTablets = sortedTablets.slice(startItem - 1, endItem);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', event.target.value);
    setSearchParams(params);
  };

  return (
    <div className="container tablets">
      <div className="home">
        <Link to="/" className="card__image">
          <img
            className="home__icon"
            src="/icons/buttons-icons/Home.svg"
            alt="home"
          />
        </Link>

        <img
          src="/icons/buttons-icons/ChevronDisabled(Right).svg"
          alt="right"
        />
        <p className="home__text">Tablets</p>
      </div>

      {tablets.length === 0 ? (
        <NoResults pathname={pathname} />
      ) : (
        <>
          <h1 className="title">Tablets</h1>
          <p className="models">{`${tablets.length} models`}</p>

          <div className="tablets__selectors">
            <div className="selector">
              <label htmlFor="perPageSelector" className="selector__text">
                sort by
              </label>
              <select
                id="perPageSelector"
                value={sortOrder}
                className="selector__field"
                onChange={handleSortChange}
              >
                <option className="selector__option" value="age">Newest</option>
                <option className="selector__option" value="name">
                  Alphabetically
                </option>
                <option
                  className="selector__option"
                  value="price"
                >
                  Cheapest
                </option>
              </select>
            </div>

            <div className="tablets__selector">
              <label htmlFor="perPageSelector" className="selector__text">
                items on page
              </label>
              <div className="">
                <select
                  data-cy="perPageSelector"
                  id="perPageSelector"
                  className="selector__field"
                  value={perPage}
                  onChange={handlePerPageChange}
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value={total}>all</option>
                </select>
              </div>

            </div>
          </div>
          <ProductsList
            products={visibleTablets}
          />

          <Pagination
            total={total}
            perPage={perPage}
            currentPage={currentPage}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};
