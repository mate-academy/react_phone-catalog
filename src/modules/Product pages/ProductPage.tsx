import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import './ProductPage.scss';
import { ProductType } from '../../types/ProductType';
import { PhoneCard } from '../Home page/components/PhoneCard/PhoneCard';
import { Pagination } from './components/Pagination/Pagination';
import { Filter } from './components/Filter/Filter';

export const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { productType } = useParams<{ productType: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPageOptions = ['4', '8', '16', 'all'];

  const [itemsPerPage, setItemsPerPage] = useState<string>(
    searchParams.get('perPage') || '16',
  );
  const [selectedSort, setSelectedSort] = useState<string>(
    searchParams.get('sort') || 'Newest',
  );
  const [isDropdownSortOpen, setIsDropdownSortOpen] = useState<boolean>(false);
  const [isDropdownPerOpen, setIsDropdownPerOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(
    +(searchParams.get('page') || '1'),
  );
  const dropdownSortRef = useRef<HTMLDivElement>(null);
  const dropdownPerRef = useRef<HTMLDivElement>(null);

  const firstIndex: number = (currentPage - 1) * +itemsPerPage;
  const lastIndex: number = Math.min(
    currentPage * +itemsPerPage,
    products.length,
  );
  const numbers: ProductType[] =
    itemsPerPage === 'all' ? products : products.slice(firstIndex, lastIndex);
  let headerTitle = '';

  const title = () => {
    switch (productType) {
      case 'phones':
        headerTitle = 'Mobile phones';
        break;
      case 'tablets':
        headerTitle = 'Tablets';
        break;
      case 'accessories':
        headerTitle = 'Accessories';
        break;
      default:
        headerTitle = 'Products';
    }
  };

  title();

  useEffect(() => {
    const storedProducts = localStorage.getItem(`${productType}`);

    if (storedProducts) {
      const response = JSON.parse(storedProducts) as ProductType[];

      if (selectedSort === 'Alphabetically') {
        response.sort((a, b) => a.name.localeCompare(b.name));
      } else if (selectedSort === 'Cheapest') {
        response.sort((a, b) => a.price - b.price);
      } else {
        response.sort((a, b) => b.year - a.year);
      }

      setProducts(response);
    }
  }, [productType, selectedSort]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownSortRef.current &&
        !dropdownSortRef.current.contains(event.target as Node)
      ) {
        setIsDropdownSortOpen(false);
      }

      if (
        dropdownPerRef.current &&
        !dropdownPerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownPerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
      perPage: itemsPerPage,
      sort: selectedSort,
    });
  }, [currentPage, itemsPerPage, selectedSort, setSearchParams]);

  return (
    <section className="product container">
      <div className="product__history">
        <Link to="/" className="product__link">
          <img src="img/links/home.svg" alt="home" />
        </Link>
        <img src="img/links/chevron (arrow right).svg" alt="chevron_right" />
        <Link to={`/product/${productType}`} className="product__link">
          {productType
            ? productType.charAt(0).toUpperCase() + productType.slice(1)
            : 'Products'}
        </Link>
      </div>

      <h1 className="product__title">{headerTitle}</h1>
      <p className="product__description">{products.length} models</p>

      <Filter
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        isDropdownSortOpen={isDropdownSortOpen}
        setIsDropdownSortOpen={setIsDropdownSortOpen}
        isDropdownPerOpen={isDropdownPerOpen}
        setIsDropdownPerOpen={setIsDropdownPerOpen}
        dropdownSortRef={dropdownSortRef}
        dropdownPerRef={dropdownPerRef}
        setCurrentPage={setCurrentPage}
        itemsPerPageOptions={itemsPerPageOptions}
      />

      <div className="product__all">
        {numbers.map(product => (
          <PhoneCard key={product.id} product={product} />
        ))}
      </div>

      {itemsPerPage !== 'all' && (
        <Pagination
          total={products.length}
          perPage={+itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
};
