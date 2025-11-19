import React, { useEffect, useState } from 'react';
import { Product } from '../../../../types/ProductTypes/Product';
import Loader from '../../../shared/components/Loader/Loader';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import SortSelect from '../SortSelect/SortSelect';
import Pagination from '../Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import ProductsList from '../ProductList/ProductList';
import FloatingButtons from '../../../shared/components/FloatingButtons/FloatingButtons';

const AllProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

 
  const sortFromUrl = searchParams.get('sort') || 'age';
  const [sortValue, setSortValue] = useState(sortFromUrl);


  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const perPageFromUrl = parseInt(searchParams.get('perPage') || '8', 10);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState(perPageFromUrl);


  const fetchAllProducts = () => {
    setLoading(true);
    setError(false);

    fetch('/api/products.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);


  const handleSortChange = (value: string) => {
    setSortValue(value);
    searchParams.set('sort', value);
    setSearchParams(searchParams);
  };


  useEffect(() => {
    if (currentPage !== 1) searchParams.set('page', currentPage.toString());
    else searchParams.delete('page');

    if (perPage !== 8) searchParams.set('perPage', perPage.toString());
    else searchParams.delete('perPage');

    setSearchParams(searchParams);
  }, [currentPage, perPage]);

 
  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage onReload={fetchAllProducts} />;
  if (products.length === 0) return <p>There are no products yet.</p>;

  const sortedAllProducts = [...products].sort((a, b) => {
    if (sortValue === 'age') return (b.year || 0) - (a.year || 0);
    if (sortValue === 'title') return a.name.localeCompare(b.name);
    if (sortValue === 'price') return a.fullPrice - b.fullPrice;
    return 0;
  });

  const start = (currentPage - 1) * perPage;
  const end = perPage === 0 ? sortedAllProducts.length : start + perPage;
  const visibleProducts = perPage === 0 ? sortedAllProducts : sortedAllProducts.slice(start, end);

  return (
    <div>
      <FloatingButtons />
    <div>
    <div className="stars-background">
        <div className="stars"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
    </div>

    <div className='allProductsPage'>
      <h1>All Products Page</h1>
      <div className='sortSelectWrapper'>
      <SortSelect onSortChange={handleSortChange} value={sortValue} />
      </div>
      <div className='productList'>
      <ProductsList products={visibleProducts} />
      </div>
      <div className='paginationWrapper'>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        perPage={perPage}
        setPerPage={setPerPage}
        total={sortedAllProducts.length}
        
      />
      </div>
    </div>
    </div>
    </div>
  );
};

export default AllProductsPage;
