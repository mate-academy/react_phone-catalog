import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import CatalogFilters from '../CatalogFilters/CatalogFilters';
import './Catalog.scss';

interface Product {
  id: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  images: string[];
  screen: string;
  capacity: string;
  ram: string;
  category: string;
}

interface CatalogProps {
  products: Product[];
}

const TITLES_MAP: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const Catalog: React.FC<CatalogProps> = ({ products }) => {
  const { category } = useParams<{ category: string }>();
  const title = category ? (TITLES_MAP[category] ?? 'Catalog') : 'Catalog';

  const [sort, setSort] = useState('newest');
  const [perPage, setPerPage] = useState<'all' | number>(8);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSort('newest');
    setPerPage(8);
    setCurrentPage(1);
  }, [category]);

  if (!category) {
    return <p>No category selected</p>;
  }

  const filteredProducts = products.filter(p => p.category === category);
  const totalCount = filteredProducts.length;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'alphabet':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return a.priceDiscount - b.priceDiscount;
      case 'expensive':
        return b.priceDiscount - a.priceDiscount;
      default:
        return 0;
    }
  });

  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(sortedProducts.length / Number(perPage));
  const visibleProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(
        (currentPage - 1) * Number(perPage),
        currentPage * Number(perPage),
      );

  const handlePerPageChange = (value: 'all' | number) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  return (
    <section className="catalog">
      <Breadcrumbs />
      <h1 className="catalog-title">{title}</h1>
      <p className="catalog-count">
        {totalCount} {totalCount === 1 ? 'model' : 'models'}
      </p>

      <CatalogFilters
        sort={sort}
        perPage={perPage}
        onSortChange={setSort}
        onPerPageChange={handlePerPageChange}
      />

      <div className="catalog-grid">
        {visibleProducts.length ? (
          visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} showDiscount />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {perPage !== 'all' && totalPages > 1 && (
        <div className="catalog-pagination">
          {/* Prev */}
          <button
            className="pagination-arrow"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            aria-label="Previous page"
          >
            <img src="/img/Arrow_Left.svg" alt="Previous" />
          </button>

          {/* Pages */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`pagination-button ${
                currentPage === i + 1 ? 'active' : ''
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <button
            className="pagination-arrow"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            aria-label="Next page"
          >
            <img src="/img/Arrow_Right.svg" alt="Next" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Catalog;
