import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/ProductType';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Pagination } from '../../components/Pagination/Pagination';
import './PhonesPage.scss';
import { getPhones } from '../../helpers/products';
import { Loader } from '../../components/Loader/Loader';

enum SortOrder {
  Age = 'age',
  Abc = 'name',
  Price = 'price',
}

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = +(searchParams.get('perPage') || (4));
  const sortOrder = searchParams.get('sort') || SortOrder.Age;

  useEffect(() => {
    setLoading(true);

    getPhones()
      .then(setPhones)
      .finally(() => setLoading(false));
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', event.target.value);
    setSearchParams(params);
  };

  const sortedPhones = phones.slice().sort((a, b) => {
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

  const total = phones.length;
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = perPage * currentPage <= total
    ? perPage * currentPage
    : total;

  const visiblePhones = sortedPhones.slice(startItem - 1, endItem);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', event.target.value);
    setSearchParams(params);
  };

  return (
    <div className="container phones">
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
        <p className="home__text">Phones</p>
      </div>

      {loading && (<Loader />)}

      {!loading && phones && (
        <>
          <h1 className="title">Mobile phones</h1>
          <p className="models">{`${phones.length} models`}</p>

          <div className="phones__selectors">
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

            <div className="selector">
              <label htmlFor="perPageSelector" className="selector__text">
                items on page
              </label>
              <select
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
          <ProductsList
            products={visiblePhones}
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
