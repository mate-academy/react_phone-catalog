import ProductList from '../ProductList/ProductList';
import '../CatalogPhones/PhonesCatalog.scss';
import { useState, useEffect } from 'react';
import { getProducts } from '../../api';
import { Product } from '../../types/Product';
import HomeIcon from '../../../public/img/icons/icon--home.png';
import { Link } from 'react-router-dom';

const TabletsCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState<'newest' | 'oldest'>('newest');
  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(4);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as 'newest' | 'oldest');
  };

  const productTablets = products.filter(
    product => product.category === 'tablets',
  );
  const sortedProducts = [...productTablets].sort((product1, product2) => {
    if (sortType === 'newest') {
      return product2.year - product1.year;
    }

    return product1.year - product2.year;
  });

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setItemsPerPage(value === 'all' ? 'all' : Number(value));
    setCurrentPage(1);
  };

  const totalItems = sortedProducts.length;

  const totalPages =
    itemsPerPage === 'all' ? 1 : Math.ceil(totalItems / itemsPerPage);

  const visibleProducts =
    itemsPerPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage,
        );

  const pagesPerBlock = 4;
  const currentBlock = Math.floor((currentPage - 1) / pagesPerBlock);
  const startPage = currentBlock * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);
  const visiblePageButtons = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="catalog">
      <div className="catalog__top--icons">
        <Link to="/">
          <img src={HomeIcon} alt="" className="catalog__icon--home" />
        </Link>
        <Link to="" className="catalog__icon--slider--right--gray"></Link>
        <p className="catalog__top--text">Tablets</p>
      </div>
      <h1 className="catalog__title">Mobile Tablets</h1>
      <p className="catalog__models--counter">{productTablets.length} models</p>
      <div className="catalog__sorts">
        <div className="catalog__sort sort--1">
          <label className="catalog__title--sort" htmlFor="sort">
            Sort by
          </label>
          <div className="catalog__select-wrapper">
            <select id="sort" value={sortType} onChange={handleSortChange}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <div className="catalog__sort sort--2">
          <label className="catalog__title--sort" htmlFor="items-per-page">
            Items on page
          </label>

          <div className="catalog__select-wrapper">
            <select onChange={handlePageChange}>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
      </div>
      <ProductList products={visibleProducts} />
      <div className="catalog__sliders">
        <button
          className="catalog__slider--left--icon"
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
        />

        {visiblePageButtons.map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`catalog__slider--number ${
              currentPage === page ? 'catalog__slider--number--active' : ''
            }`}
          >
            {page}
          </button>
        ))}

        <button
          className="catalog__slider--right--icon"
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
        />
      </div>
    </div>
  );
};

export default TabletsCatalog;
