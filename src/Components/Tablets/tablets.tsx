import React, {
  useState, useEffect, ChangeEvent, useCallback,
} from 'react';
import ProductCard from '../ProductCard/Productcard';
import './tablets.scss';
import { Product } from '../ProductCard/types';

interface Tablet {
  id: string;
  type: string;
  name: string;
  price: number;
  discount?: number;
}
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const fetchData = async (): Promise<Product[]> => {
  const response = await fetch(
    'https://mate-academy.github.io/react_phone-catalog/api/products.json',
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
  }

  const data: Product[] = await response.json();

  return data;
};

const filterTablets = (data: Product[], searchInput: string): Product[] => {
  return data.filter((tablet) => tablet.type === 'tablet'
    && tablet.name.toLowerCase().includes(searchInput.toLowerCase()));
};

const calculateProductCounts = (data: Product[]): {
  tablets: number; phones: number; accessories: number
} => {
  return data.reduce((acc, item) => {
    if (item.type === 'tablet') {
      return { ...acc, tablets: acc.tablets + 1 };
    }

    if (item.type === 'phone') {
      return { ...acc, phones: acc.phones + 1 };
    }

    if (item.type === 'accessory') {
      return { ...acc, accessories: acc.accessories + 1 };
    }

    return acc;
  }, { tablets: 0, phones: 0, accessories: 0 });
};

const Tablets: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);
  const [sortBy, setSortBy] = useState<string>('name');
  const [productCounts, setProductCounts] = useState({
    tablets: 0,
    phones: 0,
    accessories: 0,
  });
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedFavoritesString = localStorage.getItem('favorites');
    const storedFavorites = storedFavoritesString
      ? JSON.parse(storedFavoritesString)
      : [];

    setFavoriteProducts(storedFavorites);
  }, []);

  const handleFetchError = () => {
    // Handle loading error
    setLoading(false);
  };

  const fetchDataDebounced = useCallback(
    debounce(async () => {
      try {
        setLoading(true);
        const data = await fetchData();
        const tabletProducts = data.filter(
          (product: Product) => product.type === 'tablet',
        );
        const filteredTablets = filterTablets(tabletProducts, searchInput);

        setTablets(filteredTablets);

        const counts = calculateProductCounts(data);

        setProductCounts(counts);
        setLoading(false);
      } catch (error) {
        handleFetchError();
      }
    }, 500),
    [searchInput],
  );

  useEffect(() => {
    fetchDataDebounced();
  }, [fetchDataDebounced]);

  const handleAddToFavorite = (productId: string) => {
    if (!favoriteProducts.includes(productId)) {
      const updatedFavorites = [...favoriteProducts, productId];

      setFavoriteProducts(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const sortProducts = (data: Tablet[]): Tablet[] => {
    return data.sort((a, b) => {
      const calculateDiscountedPrice = (product: Tablet) => (
        product.price - (product.price * (product.discount || 0)) / 100);

      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === 'price') {
        const discountedPriceA = calculateDiscountedPrice(a);
        const discountedPriceB = calculateDiscountedPrice(b);

        return discountedPriceA - discountedPriceB;
      }

      if (sortBy === 'discount') {
        return ((b.price / 100) * (b.discount || 0))
          - ((a.price / 100) * (a.discount || 0));
      }

      return 0;
    });
  };

  const getRangeForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return { startIndex, endIndex };
  };

  const shouldRenderPagination = Math.ceil(tablets.length / itemsPerPage) > 1;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(
      prevPage + 1, Math.ceil(tablets.length / itemsPerPage),
    ));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <div className="folder-holder">
        <button type="button" className="home-button">
          <img src={`${process.env.PUBLIC_URL}/img/Home.svg`} alt="Home" />
        </button>
        <img src={`${process.env.PUBLIC_URL}/img/Chevron-right.svg`} alt="Chevron" />
        <p className="page-name">Tablets</p>
      </div>
      <h3 className="page-title">Tablets</h3>
      <p className="product-counter">
        {productCounts.tablets}
        {' '}
        models
      </p>
      <div className="page-container">
        <div className="sort">
          <label htmlFor="sort" className="label-text">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="select-sorter"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="discount">Discount</option>
          </select>
        </div>
        <div className="items">
          <label
            htmlFor="itemsPerPage"
            className="label-text"
          >
            Items per Page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="select-items"
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
          </select>
        </div>
      </div>
      {loading && (
        <div className="loader-container">
          <div className="loader" />
        </div>
      )}
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search in tablets..."
          style={{ width: '327px', height: '64px' }}
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="products-container">
        {sortProducts(tablets).slice(
          getRangeForCurrentPage().startIndex,
          getRangeForCurrentPage().endIndex,
        ).map((tablet) => (
          <ProductCard
            key={tablet.id}
            productId={tablet.id}
            onAddToFavorite={handleAddToFavorite}
            onAddToCart={() => { }}
          />
        ))}
      </div>
      {shouldRenderPagination && (
        <div className="slider-holder">
          <button
            className="slider-button left"
            onClick={handlePrevPage}
            type="button"
            aria-label="Previous Page"
          />
          {Array.from({
            length: Math.ceil(tablets.length / itemsPerPage),
          }, (_, index) => index + 1).map((page) => (
            <button
              className={`slider-button ${currentPage === page ? 'selected' : ''}`}
              key={page}
              onClick={() => handlePageChange(page)}
              type="button"
              aria-label={`Go to Page ${page}`}
            >
              {page}
            </button>
          ))}
          <button
            className="slider-button right"
            onClick={handleNextPage}
            type="button"
            aria-label="Next Page"
          />
        </div>
      )}
    </>
  );
};

export default Tablets;
