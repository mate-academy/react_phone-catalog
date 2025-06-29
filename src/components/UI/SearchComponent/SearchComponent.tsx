import { useState, useRef, useEffect } from 'react';
import styles from './SearchComponent.module.scss';

interface Product {
  id: number;
  itemId: string;
  name: string;
  price: number;
  image: string;
}

interface SearchProps {
  products: Product[];
  onSelect: (itemId: string) => void;
  onToggleExpand: (isExpanded: boolean) => void;
}

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export const SearchComponent: React.FC<SearchProps> = ({
  products,
  onSelect,
  onToggleExpand,
}) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = products.filter(product => {
    const lowerCaseQuery = query.toLowerCase().trim();

    if (!lowerCaseQuery) {
      return true;
    }

    return (
      product.name.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const handleIconClick = () => {
    setIsExpanded(true);
    onToggleExpand(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
      if (!query.trim()) {
        setIsExpanded(false);
        onToggleExpand(false);
      }
    }, 200);
  };

  const handleSelect = (itemId: string) => {
    setQuery(itemId);
    setIsDropdownOpen(false);
    onSelect(itemId);
  };

  const handleClose = () => {
    setQuery('');
    setIsExpanded(false);
    setIsDropdownOpen(false);
    onToggleExpand(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        if (!query.trim()) {
          setIsExpanded(false);
          onToggleExpand(false);
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [query, onToggleExpand]);

  return (
    <div className={styles.container} ref={dropdownRef}>
      {!isExpanded ? (
        <button
          className={styles.searchIcon}
          onClick={handleIconClick}
          type="button"
          aria-label="Open search"
        >
          <SearchIcon />
        </button>
      ) : (
        <div className={styles.searchExpanded}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Search..."
            className={styles.input}
          />
          <button
            className={styles.closeButton}
            onClick={handleClose}
            type="button"
            aria-label="Close search"
          >
            ×
          </button>
        </div>
      )}

      {isExpanded && isDropdownOpen && filteredProducts.length > 0 && (
        <div className={styles.dropdown}>
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className={styles.option}
              onClick={() => handleSelect(product.itemId)}
            >
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <div className={styles.productId}>{product.name}</div>
                <div className={styles.productPrice}>${product.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
