import { useEffect, useRef, useState } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Filter } from '../../components/Filter';
import { Pagination } from '../../components/Pagination';
import { ProductsList } from '../../components/ProductsList';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../types/SearchParams';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { ProductCategories } from '../../types/ProductCategories';
import { SortBy } from '../../types/SortBy';
import { PerPage } from '../../types/PerPage';
import './ProductsPage.scss';

const DEF_SORT = SortBy.NEWEST;
const DEF_DISPLAYED = PerPage.EIGHT;

export const ProductsPage = () => {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagesNumber, setPagesNumber] = useState(1);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [category, setCategory] = useState<ProductCategories>(
    location.pathname.slice(1) as ProductCategories,
  );

  const perPage = +(searchParams.get(SearchParams.PER_PAGE) ?? DEF_DISPLAYED);
  const query = searchParams.get(SearchParams.QUERY) ?? '';

  const listRef = useRef<HTMLDivElement>(null);

  let titleText = '';

  switch (category) {
    case ProductCategories.PHONES:
      titleText = 'Mobile phones';
      break;

    case ProductCategories.ACCESSORIES:
      titleText = 'Accessories';
      break;

    case ProductCategories.TABLETS:
      titleText = 'Tablets';
      break;
  }

  const loadProducts = async () => {
    setIsLoading(true);

    try {
      const productsFromServer = await getProducts();

      const preparedCategoryProducts = productsFromServer.filter(
        productFromServer => productFromServer.category === category,
      );

      setCategoryProducts(preparedCategoryProducts);
      setFilteredProducts(preparedCategoryProducts);
      setError('');
      setIsLoading(false);
    } catch (fetchError) {
      setError('Products loading failed. Please try again.');
      throw fetchError;
    }
  };

  const filterProducts = () => {
    setError('');

    let preparedProducts = categoryProducts;

    if (query) {
      preparedProducts = categoryProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (preparedProducts.length === 0 && !isLoading) {
      setError('No matching products');
    }

    setFilteredProducts(preparedProducts);
  };

  useEffect(() => {
    setCategory(location.pathname.slice(1) as ProductCategories);
  }, [location]);

  useEffect(() => {
    setCategoryProducts([]);
    loadProducts();
  }, [category]);

  useEffect(() => {
    if (perPage === 0) {
      setPagesNumber(1);

      return;
    }

    setPagesNumber(Math.ceil(filteredProducts.length / perPage) || 1);
  }, [perPage, filteredProducts.length]);

  useEffect(() => {
    filterProducts();
  }, [query, categoryProducts]);

  const scrollToTop = () => {
    if (listRef.current) {
      const list = listRef.current as HTMLDivElement;

      list.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="products-page container">
      <div className="products-page__breadcrumbs">
        <Breadcrumbs />
      </div>

      <h1 className="products-page__title">{titleText}</h1>
      <p className="products-page__models-count">
        {categoryProducts.length > 0
          ? `${filteredProducts.length} models`
          : 'Loading...'}
      </p>

      <div className="products-page__filter">
        <Filter DEF_DISPLAYED={DEF_DISPLAYED} DEF_SORT={DEF_SORT} />
      </div>

      <div className="products-page__product-list" ref={listRef}>
        <ProductsList products={filteredProducts} error={error} />
      </div>

      {pagesNumber > 1 && perPage > 0 && (
        <Pagination pagesNumber={pagesNumber} scrollToTop={scrollToTop} />
      )}
    </main>
  );
};
