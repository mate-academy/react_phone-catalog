import { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { getProducts } from '@api/products';
import { Product } from '@/types/Product';
import styles from './Search.module.scss';
import searchIcon from '@assets/icons/search.svg';
import closeIcon from '@assets/icons/close.svg';

export const Search = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const [hotkeyText] = useState(() => {
    if (typeof window !== 'undefined') {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      return isMac ? 'Opt + S' : 'Alt + S';
    }
    return 'Alt + S';
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    loadAllProducts();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => {
      clearTimeout(handler);
      setSelectedIndex(-1);
    };
  }, [query]);

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[
        selectedIndex
      ] as HTMLElement;
      selectedElement?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = debouncedQuery.toLowerCase().trim();
    if (!normalizedQuery) return [];

    const fuse = new Fuse(products, {
      keys: ['name'],
      threshold: 0.4,
      distance: 100,
      ignoreLocation: true,
      useExtendedSearch: true,
    });

    const searchTerms = {
      $or: [
        { name: normalizedQuery },
        {
          $and: normalizedQuery
            .split(/\s+/)
            .filter((term) => term.length > 1)
            .map((term) => ({ name: `'${term}` })),
        },
      ],
    };

    return fuse
      .search(searchTerms)
      .map((r) => r.item)
      .slice(0, 15);
  }, [debouncedQuery, products]);

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    inputRef.current?.focus();
  };

  const handleFieldClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobile) return;

      if (e.altKey && e.code === 'KeyS') {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }

      if (e.key === 'Escape') {
        if (query.length > 0) {
          handleClear();
          setSelectedIndex(-1);
        } else {
          inputRef.current?.blur();
        }
        return;
      }

      if (!query || filteredItems.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : prev,
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        const item = filteredItems[selectedIndex];
        navigate(`/${item.category || 'phones'}/${item.itemId || item.id}`);
        setQuery('');
        setDebouncedQuery('');
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [query, filteredItems, selectedIndex, navigate, isMobile]);

  const placeholderText =
    isMobile ?
      t('search.placeholder')
    : t('search.placeholder_hotkey', { hotkey: hotkeyText });

  return (
    <div
      className={styles.search}
      ref={searchRef}
    >
      <div
        className={styles.search__field}
        onClick={handleFieldClick}
      >
        <input
          ref={inputRef}
          type="text"
          className={styles.search__input}
          placeholder={placeholderText}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className={styles.search__button}
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
          type="button"
          aria-label={t('search.clear')}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={query ? 'close' : 'search'}
              src={query ? closeIcon : searchIcon}
              className={styles.search__icon}
              initial={{ opacity: 0, scale: 0.5, rotate: query ? -90 : 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: query ? 0 : 90 }}
              transition={{ duration: 0.15 }}
            />
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {query && (
          <motion.div
            className={styles.search__dropdown}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {filteredItems.length > 0 ?
              <ul
                className={styles.search__list}
                ref={listRef}
              >
                {filteredItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    className={`${styles.search__item} ${
                      selectedIndex === index ?
                        styles['search__item--selected']
                      : ''
                    }`}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <Link
                      to={`/${item.category || 'phones'}/${item.itemId || item.id}`}
                      className={styles.search__link}
                      onClick={() => {
                        setQuery('');
                        setDebouncedQuery('');
                      }}
                    >
                      <div className={styles.search__img_wrapper}>
                        <img
                          src={`/${Array.isArray(item.image) ? item.image[0] : item.image}`}
                          className={styles.search__item_img}
                          alt=""
                        />
                      </div>
                      <div className={styles.search__item_info}>
                        <p className={styles.search__item_name}>{item.name}</p>
                        <span className={styles.search__item_category}>
                          {item.category}
                        </span>
                      </div>
                      <div className={styles.search__item_price}>
                        ${item.price}
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            : <div className={styles.search__empty}>
                {t('search.no_results', { query })}
              </div>
            }
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
