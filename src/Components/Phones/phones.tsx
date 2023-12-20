import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../ProductCard/Productcard';
import './Phones.scss';

interface Phone {
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

const fetchData = async (): Promise<Phone[]> => {
  const response = await fetch(
    'https://mate-academy.github.io/react_phone-catalog/api/products.json',
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
  }

  const data: Phone[] = await response.json();

  return data;
};

const filterPhones = (data: Phone[], searchInput: string): Phone[] => {
  return data.filter((phone) => phone.type === 'phone'
    && phone.name.toLowerCase().includes(searchInput.toLowerCase()));
};

const calculateProductCounts = (data: Phone[]): {
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

const Phones: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);
  const [sortBy, setSortBy] = useState<string>('name');
  const [productCounts, setProductCounts]
    = useState({ tablets: 0, phones: 0, accessories: 0 });
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    const storedFavorites: string[]
      = JSON.parse(localStorage.getItem('favorites') ?? '[]');

    setFavoriteProducts(storedFavorites);
  }, []);

  const handleFetchError = () => {
    <p>Loading error.</p>;
  };

  const fetchDataDebounced = useCallback(
    debounce(async () => {
      try {
        const data = await fetchData();
        const phoneProducts = data.filter(
          (product) => product.type === 'phone',
        );
        const filteredPhones = filterPhones(phoneProducts, searchInput);

        setPhones(filteredPhones);
        const counts = calculateProductCounts(data);

        setProductCounts(counts);
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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const sortProducts = (data: Phone[]): Phone[] => {
    return data.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === 'price') {
        return a.price - b.price;
      }

      if (sortBy === 'discount') {
        return (b.discount || 0) - (a.discount || 0);
      }

      return 0;
    });
  };

  const getRangeForCurrentPage = (): {
    startIndex: number; endIndex: number
  } => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return { startIndex, endIndex };
  };

  const shouldRenderPagination = Math.ceil(phones.length / itemsPerPage) > 1;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1,
      Math.ceil(phones.length / itemsPerPage)));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <div className="folder-holder">
        <button type="button" className="home-button">
          <img src={`${process.env.PUBLIC_URL}/img/Home.svg`} alt="Home" className="home-button" />
        </button>
        <img src={`${process.env.PUBLIC_URL}/img/Chevron-right.svg`} alt="Chevron" />
        <p className="page-name">Phones</p>
      </div>
      <h3 className="page-title">Mobile phones</h3>
      <p className="product-counter">
        {productCounts.phones}
        {' '}
        models
      </p>
      <div className="page-container">
        <div className="sort">
          <label htmlFor="sort" className="label-text">Sort by:</label>
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
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search in phones..."
          style={{ width: '327px', height: '64px' }}
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="products-container">
        {sortProducts(phones)
          .slice(getRangeForCurrentPage().startIndex,
            getRangeForCurrentPage().endIndex)
          .map((phone) => (
            <ProductCard
              key={phone.id}
              productId={phone.id}
              onAddToFavorite={handleAddToFavorite}
              onAddToCart={() => { }}
            />
          ))}
      </div>
      {shouldRenderPagination && (
        <div className="slider-holder">
          <button
            type="button"
            className="slider-button left"
            aria-label="Previous Page"
            onClick={handlePrevPage}
          />
          {Array.from(
            { length: Math.ceil(phones.length / itemsPerPage) },
            (_, index) => index + 1,
          ).map((page) => (
            <button
              type="button"
              className={`slider-button ${currentPage === page ? 'selected' : ''}`}
              key={page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className="slider-button right"
            aria-label="Next Page"
            onClick={handleNextPage}
          />
        </div>
      )}
    </>
  );
};

export default Phones;
