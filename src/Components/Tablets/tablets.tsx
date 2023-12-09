// Tablets.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/Productcard';
import './tablets.scss';
import home from './Home.svg';
import chevron from './Chevron-right.svg';

const Tablets = () => {
  const [tablets, setTablets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [sortBy, setSortBy] = useState('name');
  const [productCounts, setProductCounts] = useState({ tablets: 0, phones: 0, accessories: 0 });
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteProducts(storedFavorites);
  }, []);

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
      .then((response) => response.json())
      .then((data) => {
        const tabletProducts = data.filter((product) => product.type === 'tablet');

        const filteredTablets = tabletProducts.filter((tablet) =>
          tablet.name.toLowerCase().includes(searchInput.toLowerCase())
        );

        setTablets(filteredTablets);

        const counts = data.reduce((acc, item) => {
          if (item.type === 'tablet') {
            acc.tablets += 1;
          } else if (item.type === 'phone') {
            acc.phones += 1;
          } else if (item.type === 'accessory') {
            acc.accessories += 1;
          }
          return acc;
        }, { tablets: 0, phones: 0, accessories: 0 });

        setProductCounts(counts);
      })
      .catch((error) => console.error('Error fetching tablet list:', error));
  }, [searchInput]);

  const handleAddToFavorite = (productId) => {
    if (!favoriteProducts.includes(productId)) {
      const updatedFavorites = [...favoriteProducts, productId];
      setFavoriteProducts(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const sortProducts = (data, sortBy) => {
    return data.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'discount') {
        return (b.discount || 0) - (a.discount || 0);
      }
      return 0;
    });
  };

  const getRangeForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(tablets.length / itemsPerPage)));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className='folder-holder'>
        <button className='home-button'>
          <img src={home} alt="Home" />
        </button>
        <img src={chevron} alt="Chevron" />
        <p className='page-name'>Tablets</p>
      </div>
      <h3 className='page-title'>Tablets</h3>
      <p className='product-counter'>{productCounts.tablets} models</p>
      <div className='page-container'>
        <div className='sort'>
          <label htmlFor="sort" className='label-text'>Sort by:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange} className='select-sorter'>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="discount">Discount</option>
          </select>
        </div>
        <div className='items'>
          <label htmlFor="itemsPerPage" className='label-text'>Items per Page:</label>
          <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} className='select-items'>
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
          </select>
        </div>
      </div>
      <div className='search-container'>
        <input
          className='search-input'
          type='text'
          placeholder='Search in tablets...'
          style={{ width: '327px', height: '64px' }}
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className='products-container'>
        {sortProducts(tablets, sortBy)
          .slice(getRangeForCurrentPage().startIndex, getRangeForCurrentPage().endIndex)
          .map((tablet) => (
            <ProductCard
              key={tablet.id}
              productId={tablet.id}
              onAddToFavorite={handleAddToFavorite}
              onAddToCart={() => {}} // Add your implementation for onAddToCart
            />
          ))}
      </div>
      <div className='slider-holder'>
        <button className='slider-button left' onClick={handlePrevPage}></button>
        {Array.from({ length: Math.ceil(tablets.length / itemsPerPage) }, (_, index) => index + 1).map((page) => (
          <button
            className={`slider-button ${currentPage === page ? 'selected' : ''}`}
            key={page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button className='slider-button right' onClick={handleNextPage}></button>
      </div>
    </>
  );
};

export default Tablets;
