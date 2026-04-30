import ProductList from '../../ProductList/ProductList';
import '../CatalogPhones/PhoneCatalog.scss';
import { useState, useEffect } from 'react';
import { getProducts } from '../../../api';
import { Product } from '../../../types/Product';
import { Link } from 'react-router-dom';
import CatalogSort1 from '../CatalogPhones/CatalogSort1/CatalogSort1';
import CatalogSort2 from '../CatalogPhones/CatalogSort2/CatalogSort2';
import CatalogSlider from '../CatalogPhones/CatalogSlider/CatalogSlider';
import { useSearchParams } from 'react-router-dom';

type SortType = 'newest' | 'oldest' | 'mostExpensive' | 'cheapest';

const TabletsCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [IsSortOpen, setIsSortOpen] = useState(false);
  const [IsPageOpen, setIsPageOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortType =
    (searchParams.get('sort') as 'newest' | 'oldest') || 'newest';

  const itemsPerPageParam = searchParams.get('perPage');

  const itemsPerPage =
    itemsPerPageParam === 'all' ? 'all' : Number(itemsPerPageParam) || 4;

  const currentPage = Number(searchParams.get('page')) || 1;

  const updateParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, value);
    });

    setSearchParams(newParams);
  };

  const handleSortChange = (value: SortType) => {
    updateParams({ sort: value, page: '1' });
  };

  const handleItemsChange = (value: number | 'all') => {
    updateParams({
      perPage: String(value),
      page: '1',
    });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: String(page) });
  };

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const productTablets = products.filter(
    product => product.category === 'tablets',
  );
  const sortedProducts = [...productTablets].sort((product1, product2) => {
    if (sortType === 'newest') {
      return product2.year - product1.year;
    }

    return product1.year - product2.year;
  });

  const totalItems = sortedProducts.length;

  const totalPages =
    itemsPerPage === 'all' ? 1 : Math.ceil(totalItems / itemsPerPage);

  const getVisibleProducts = () => {
    if (itemsPerPage === 'all') {
      return sortedProducts;
    }

    return sortedProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  };

  const visibleProducts = getVisibleProducts();

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
          <img
            src="../../../public/img/icons/icon--home.svg"
            alt=""
            className="catalog__icon--home"
          />
        </Link>
        <Link to="" className="catalog__icon--slider--right--gray"></Link>
        <p className="catalog__top--text">Tablets</p>
      </div>
      <h1 className="catalog__title">Mobile Tablets</h1>
      <p className="catalog__models--counter">{productTablets.length} models</p>
      <div className="catalog__sorts">
        <CatalogSort1
          sortType={sortType}
          handleSortChange={handleSortChange}
          IsSortOpen={IsSortOpen}
          setIsSortOpen={setIsSortOpen}
        />
        <CatalogSort2
          IsPageOpen={IsPageOpen}
          setIsPageOpen={setIsPageOpen}
          itemsPerPage={itemsPerPage}
          handleItemsChange={handleItemsChange}
        />
      </div>
      <ProductList products={visibleProducts} />
      <CatalogSlider
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        visiblePageButtons={visiblePageButtons}
        totalPages={totalPages}
      />
    </div>
  );
};

export default TabletsCatalog;
