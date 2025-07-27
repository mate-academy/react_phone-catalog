import React, { useEffect, useState } from 'react';
import type { Product } from '../../types/products';
import { CartItemCard } from '../CartItemCard';
import './ProductSearchInput.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { useThemeState } from '../../stateManagers/themeState';
import { useTranslationState } from '../../stateManagers/languageState';

type ProductSearchInputProps = {
  products: Product[];
};

export const ProductSearchInput: React.FC<ProductSearchInputProps> = ({
  products,
}) => {
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();
  const { theme } = useThemeState();
  const { translate } = useTranslationState();

  useEffect(() => {
    setQuery('');
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const filteredProducts = (products: Product[], query: string) => {
    const normalizedQuery = query.toLowerCase().trim();
    return products
      .filter((product) => product.name.toLowerCase().includes(normalizedQuery))
      .slice(0, 3);
  };

  const filtered = filteredProducts(products, query);
  const showDropdown =
    filtered.length > 0 && query.length > 0 && isDropdownOpen;

  return (
    <div
      className={`product-search-container product-search-container-${theme}`}
    >
      <input
        type="text"
        className="product-search-input small-text"
        placeholder={translate('Search by category...')}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
      />

      {showDropdown && (
        <div className="product-search-dropdown">
          {filtered.map((product) => (
            <NavLink
              key={product.id}
              to={`/${product.category}/${product.itemId}`}
              className="product-search-item"
            >
              <CartItemCard
                key={product.id}
                product={{ ...product, quantity: 1 }}
                onDelete={() => {}}
                addCount={() => {}}
                subCount={() => {}}
                hideCountControls={true}
              />
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};
