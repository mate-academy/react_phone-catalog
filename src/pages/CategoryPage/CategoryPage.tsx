/* eslint-disable max-len */
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { NavigationWay } from '../../components/NavigationWay/NavigationWay';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SelectOptions } from '../../components/SelectOptions/SelectOptions';
import { Pagination } from '../../components/Pagination/Pagination';
import { useGlobalContext } from '../../context/GlobalContext';
import { Product } from '../../types/Product';

import './CategoryPage.scss';

export const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const location = useLocation();
  const { allProducts, loading, error } = useGlobalContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const sortBy = searchParams.get('sort') || 'Newest';
  const itemsParam = searchParams.get('items') || '16';

  const getCategoryFromPath = () => {
    const path = location.pathname;

    if (path.includes('/phones')) {
      return 'phones';
    }

    if (path.includes('/tablets')) {
      return 'tablets';
    }

    if (path.includes('/accessories')) {
      return 'accessories';
    }

    return category || '';
  };

  const currentCategory = getCategoryFromPath();

  const sortProducts = (products: Product[], sortType: string): Product[] => {
    const sorted = [...products];

    switch (sortType) {
      case 'Newest':
        return sorted.sort((a, b) => b.year - a.year);

      case 'Alphabetically':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));

      case 'Cheapest':
        return sorted.sort((a, b) => a.price - b.price);

      default:
        return sorted;
    }
  };

  const categoryProducts = useMemo(() => {
    const filtered = allProducts.filter(
      product => product.category === currentCategory,
    );

    return sortProducts(filtered, sortBy);
  }, [allProducts, currentCategory, sortBy]);

  const itemsPerPage =
    itemsParam === 'all' ? categoryProducts.length : Number(itemsParam);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return itemsPerPage === categoryProducts.length
      ? categoryProducts
      : categoryProducts.slice(startIndex, endIndex);
  }, [categoryProducts, currentPage, itemsPerPage]);

  const handleSortChange = (newSort: string) => {
    searchParams.set('sort', newSort);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handleItemsPerPageChange = (newItems: string | number) => {
    searchParams.set(
      'items',
      newItems === categoryProducts.length ? 'all' : String(newItems),
    );
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePageChange = (page: number) => {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  };

  const getCategoryTitle = (cat: string) => {
    const titles: { [key: string]: string } = {
      phones: 'Phones',
      tablets: 'Tablets',
      accessories: 'Accessories',
    };

    return titles[cat] || 'Category';
  };

  const categoryTitle = getCategoryTitle(currentCategory);
  const modelsCount = `${categoryProducts.length} models`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentCategory]);

  if (loading) {
    return (
      <div className="grid">
        <div className="market container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid">
        <div className="market container">
          <div className="error">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid">
      <div className="market container">
        <NavigationWay category={categoryTitle} />
        <h2 className="market__title">{categoryTitle}</h2>

        <div className="market__available">{modelsCount}</div>

        <SelectOptions
          onSortChange={handleSortChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          initialSort={sortBy}
          initialItemsPerPage={itemsParam === 'all' ? 'all' : itemsPerPage}
        />

        <div className="market__products">
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <ProductCard key={product.itemId} product={product} />
            ))
          ) : (
            <div className="no-products">
              <p>No products found in category {currentCategory}</p>
            </div>
          )}
        </div>

        {categoryProducts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={categoryProducts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};
