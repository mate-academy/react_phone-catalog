/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import productsRaw from '../../../../public/api/products.json';
import { CatalogList } from '../CatalogList/CatalogList';
import './Catalog.scss';
import { useEffect } from 'react';
import { ProductBase } from '../../../types/ProductBase';
import { PhoneShort } from '../../../types/PhoneShort';

export const Catalog = () => {
  const location = useLocation();
  const path = location.pathname.replace('/', '');

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'newest';
  const page = Number(searchParams.get('page') || 1);
  const perPage = Number(searchParams.get('perPage') || 16);

  function getTitle(category: string) {
    switch (category) {
      case 'phones':
        return 'Mobile phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return 'Catalog';
    }
  }

  const title = getTitle(path);

  const products: ProductBase[] = productsRaw
    .filter(product => product.category === path)
    .map(product => ({
      id: product.id,
      itemId: product.itemId,
      category: product.category,
      name: product.name,
      price: product.price,
      fullPrice: product.fullPrice,
      image: product.image,
      screen: product.screen,
      capacity: product.capacity,
      ram: product.ram,
    }));
  const productsFull: PhoneShort[] = productsRaw.filter(
    product => product.category === path,
  );

  const sortedProducts = [...productsFull].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.year - a.year;
      case 'oldest':
        return a.year - b.year;
      case 'priceUp':
        return a.price - b.price;
      case 'priceDown':
        return b.price - a.price;
      case 'nameAZ':
        return a.name.localeCompare(b.name);
      case 'nameZA':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / perPage);

  const visibleProducts = sortedProducts.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, sortBy, perPage]);

  return (
    <div className="catalog">
      <div className="container">
        <div className="catalog__breadcrumb">
          <Link to="/">
            <img src="img/Home.png" alt="home" />
          </Link>
          <img src="img/ChevronRight.png" alt="arrow" />
          <span>{title}</span>
        </div>

        <h1 className="catalog__title">{title}</h1>

        <p className="catalog__models">{products.length} models</p>

        <div className="catalog__controls">
          <div className="catalog__control">
            <label>Sort by</label>
            <select
              value={sortBy}
              onChange={e => {
                setSearchParams({
                  sort: e.target.value,
                  page: '1',
                  perPage: String(perPage),
                });
              }}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="priceUp">Price: Low → High</option>
              <option value="priceDown">Price: High → Low</option>
              <option value="nameAZ">Name A → Z</option>
              <option value="nameZA">Name Z → A</option>
            </select>
          </div>

          <div className="catalog__control">
            <label>Items on page</label>
            <select
              value={perPage}
              onChange={e => {
                setSearchParams({
                  sort: sortBy,
                  page: '1',
                  perPage: e.target.value,
                });
              }}
            >
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
            </select>
          </div>
        </div>

        <CatalogList products={visibleProducts} />

        {totalPages > 1 && (
          <div className="catalog__pagination">
            <button
              disabled={page === 1}
              onClick={() =>
                setSearchParams({
                  sort: sortBy,
                  page: String(page - 1),
                  perPage: String(perPage),
                })
              }
            >
              {'<'}
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={page === index + 1 ? 'active' : ''}
                onClick={() =>
                  setSearchParams({
                    sort: sortBy,
                    page: String(index + 1),
                    perPage: String(perPage),
                  })
                }
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() =>
                setSearchParams({
                  sort: sortBy,
                  page: String(page + 1),
                  perPage: String(perPage),
                })
              }
            >
              {'>'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
