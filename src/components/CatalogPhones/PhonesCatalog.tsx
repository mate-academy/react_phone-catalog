import ProductList from '../ProductList/ProductList';
import './PhonesCatalog.scss';
import { useState, useEffect } from 'react';
import { getProducts } from '../../api';
import { Link, useSearchParams } from 'react-router-dom';
import CatalogSort1 from './CatalogSort1/CatalogSort1';
import CatalogSort2 from './CatalogSort2/CatalogSort2';
import CatalogSlider from './CatalogSlider/CatalogSlider';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';
import { Product } from '../../types/Product';

type CatalogProps = {
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  favorites: FavoriteProduct[];
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
};

const Catalog = ({
  setFavorites,
  favorites,
  baskets,
  setBaskets,
}: CatalogProps) => {
  const [IsSortOpen, setIsSortOpen] = useState(false);
  const [IsPageOpen, setIsPageOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortType =
    (searchParams.get('sort') as
      | 'newest'
      | 'oldest'
      | 'mostExpensive'
      | 'cheapest') || 'newest';

  const itemsPerPage =
    searchParams.get('perPage') === 'all'
      ? 'all'
      : Number(searchParams.get('perPage')) || 4;
  const currentPage = Number(searchParams.get('page')) || 1;
  const updateSearchParams = (paramsUpdated: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(paramsUpdated).forEach(([keyBy, value]) => {
      params.set(keyBy, value);
    });
    setSearchParams(params);
  };

  const setSortType = (value: string) => {
    updateSearchParams({ sort: value, page: '1' });
  };

  const setItemsPerPage = (value: number | 'all') => {
    updateSearchParams({
      perPage: value.toString(),
      page: '1',
    });
  };

  const setCurrentPage = (value: number) => {
    updateSearchParams({ page: value.toString() });
  };

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

    if (sortType === 'oldest') {
      return product1.year - product2.year;
    }

    if (sortType === 'mostExpensive') {
      return product2.price - product1.price;
    }

    if (sortType === 'cheapest') {
      return product1.price - product2.price;
    }

    return 0;
  });

  const perPage =
    itemsPerPage === 'all' ? sortedProducts.length : Number(itemsPerPage);

  const totalPages = Math.ceil(sortedProducts.length / perPage);

  const visibleProducts = sortedProducts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
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
        baskets={baskets}
        setBaskets={setBaskets}
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
