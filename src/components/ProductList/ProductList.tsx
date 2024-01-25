import { useContext, useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../type/Product';
import { Pagination } from '../Pagination/Pagination';
import { AppContext } from '../../context/AppContext';
import { Breadcrumbs } from '../BreadCrumbs/BreadCrumbs';
import { useSearchParams } from 'react-router-dom';
import './ProductList.scss';

interface ProductListProps {
  products: Product[];
  sortBy: string;
  onSortChange: (selectedSort: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  sortBy,
  onSortChange,
}) => {
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
  const [productsPerPage, setProductsPerPage] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const {
    phonesCount,
  } = useContext(AppContext);

  useEffect(() => {
    const filteredProducts = products
    .filter(product => product.name.toLowerCase()
    .includes(query.toLowerCase())
    || product.color.toLowerCase()
    .includes(query.toLowerCase()));

    const sortProducts = (productsToSort: Product[]) => {
      if (sortBy === 'age') {
        return [...productsToSort]
        .sort((a, b) => new Date(b.year)
        .getTime() - new Date(a.year).getTime());
      }

      if (sortBy === 'name') {
        return [...productsToSort]
        .sort((a, b) => a.name.localeCompare(b.name));
      }

      if (sortBy === 'price') {
        return [...productsToSort]
        .sort((a, b) => a.price - b.price);
      }

      return productsToSort;
    };

    setSortedProducts(sortProducts(filteredProducts));
  }, [products, sortBy, query]);

  const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedSort = e.target.value;

    onSortChange(selectedSort);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowAllProductsChange:
  React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target;

    if (value === 'all') {
      setShowAllProducts(true);
      setProductsPerPage(sortedProducts.length);
    } else {
      setShowAllProducts(false);
      setProductsPerPage(parseInt(value, 10));
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts
    .slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="ProductList" data-cy="productList">
      <Breadcrumbs />

      <div className="ProductList__top">
        <h1 className="ProductList__top--name">Mobile Phones</h1>
        <div className="ProductList__top--count">
          {phonesCount}
        </div>
      </div>

      <div className="ProductList_container--select">
        <div className="ProductList__sort ProductList__display ">
          <h4 className="ProductList__title">Sort By</h4>
          <select
            id="sortSelect"
            onChange={handleSortChange}
            value={sortBy}
            className="ProductList__select"
          >
            <option value="age">Newest</option>
            <option value="name">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className="ProductList__show ProductList__display">
          <h4 className="ProductList__title">Items on page</h4>
          <select
            id="showAllSelect"
            onChange={handleShowAllProductsChange}
            value={showAllProducts ? 'all' : productsPerPage.toString()}
            className="ProductList__select ProductList__select-page"
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">all</option>
          </select>
        </div>

      </div>

      <div className="ProductList__grid">
        {(!showAllProducts ? currentProducts : sortedProducts).length > 0 ? (
          (!showAllProducts
            ? currentProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
            : sortedProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            )))
        ) : (
          <div className="ProductList__no-results" />
        )}
      </div>

      {!showAllProducts && sortedProducts.length > 0 ? (
        <Pagination
          total={sortedProducts.length}
          perPage={productsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ) : null}
    </div>
  );
};
