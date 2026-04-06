import ProductList from '../ProductList/ProductList';
import './PhonesCatalog.scss';
import { useState, useEffect } from 'react';
import { getProducts } from '../../api';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import CatalogSort1 from './CatalogSort1/CatalogSort1';
import CatalogSort2 from './CatalogSort2/CatalogSort2';
import CatalogSlider from './CatalogSlider/CatalogSlider';

type CatalogProps = {
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  favorites: Product[];
};

const Catalog = ({ setFavorites, favorites }: CatalogProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState<'newest' | 'oldest'>('newest');
  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [IsSortOpen, setIsSortOpen] = useState(false);
  const [IsPageOpen, setIsPageOpen] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const productPhones = products.filter(
    product => product.category === 'phones',
  );
  const sortedProducts = [...productPhones].sort((product1, product2) => {
    if (sortType === 'newest') {
      return product2.year - product1.year;
    }

    return product1.year - product2.year;
  });

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
        <Link to="/" className="catalog__icon--home"></Link>
        <Link to="/" className="catalog__icon--slider--right--gray"></Link>
        <p className="catalog__top--text">Phones</p>
      </div>
      <h1 className="catalog__title">Mobile Phones</h1>
      <p className="catalog__models--counter">{productPhones.length} models</p>
      <div className="catalog__sorts">
        <CatalogSort1
          sortType={sortType}
          setSortType={setSortType}
          IsSortOpen={IsSortOpen}
          setIsSortOpen={setIsSortOpen}
        />
        <CatalogSort2
          IsPageOpen={IsPageOpen}
          setIsPageOpen={setIsPageOpen}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <ProductList
        products={visibleProducts}
        setFavorites={setFavorites}
        favorites={favorites}
      />
      <CatalogSlider
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        visiblePageButtons={visiblePageButtons}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Catalog;
