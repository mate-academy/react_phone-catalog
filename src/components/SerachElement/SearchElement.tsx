import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styles from './SearchElement.module.scss';
import { Product } from '../../api/type/ProductCart';
import { getProducts } from '../../api/api';
import { Link, useParams } from 'react-router-dom';
import { RoutesPathes } from '../../utils/RoutesPathes';
import { ProductCategories } from '../../utils/ProductCategories';
import { debounce } from '../../utils/debounce';
import { AutoSizer, List } from 'react-virtualized';
import classNames from 'classnames';
import { FavoritesContext } from '../../context/FavoritesContext';

export const SearchElement: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isShown, setIsShown] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const { theme } = useContext(FavoritesContext)

  const toggleSearch = () => {
    setIsVisible(!isVisible);
    if (isVisible) {
      inputRef.current?.blur();
      setIsShown(false);
      setSearchTerm('');
      setProducts([]);
    } else {
      inputRef.current?.focus();
      setIsShown(true);
    }
  };

  const fetchProducts = (query: string) => {
    const preparedQuery = query.trim().toLocaleLowerCase();

    getProducts().then((productsFromServer) => {
      productsFromServer = productsFromServer.filter((product) => {
        if (preparedQuery === '') {
          return false;
        } else {
          return product.name.toLowerCase().includes(preparedQuery);
        }
      });
      setProducts(productsFromServer);
    });
  };

  const fetchProductsWithDelay = useCallback(debounce(fetchProducts, 500), []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    fetchProductsWithDelay(event.target.value);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (window.innerWidth > 1200) {
        setIsShown(false);
      }
    }, 150);
  };

  const handleSearchClose = () => {
    setSearchTerm('');
    setIsVisible(false);
    setProducts([]);
  };

  useEffect(() => {
    if (Object.entries(params).length !== 0) {
      setIsShown(false);
      setSearchTerm('');
      setIsVisible(false);
      setProducts([]);
    }
  }, [params]);

  const renderRow = ({
    index,
    key,
    style,
  }: {
    index: number;
    key: string;
    style: React.CSSProperties;
  }) => {
    const route =
      products[index].category === ProductCategories.PHONES
        ? RoutesPathes.PHONES
        : products[index].category === ProductCategories.TABLETS
          ? RoutesPathes.TABLETS
          : RoutesPathes.ACCESSORIES;

    return (
      <Link
        to={`${route}/${products[index].itemId}`}
        key={key}
        style={style}
        className={`${styles.searchOption} ${styles.link} `}
      >
        <div>
          <img src={products[index].image} alt="product" className={styles.image} />
        </div>

        <div>
          <div className={styles.text}>{products[index].name}</div>
        </div>
      </Link>
    );
  };

  return (
    <div className={styles.searchContainer}>
      <div className={classNames(styles.icon, {
         [styles.dark]: theme === 'dark',
      })} onClick={toggleSearch}></div>
      <div className={`${styles.searchInput} ${isVisible ? styles.slideDown : styles.slideUp}`}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          ref={inputRef}
          onFocus={() => setIsShown(true)}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
        />
        <span className={styles.searchClose} onClick={handleSearchClose}>
          &#x2716;
        </span>
      </div>
      {isShown && products.length !== 0 && (
        <div className={styles.optionsContainer}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                rowCount={products.length}
                rowHeight={100}
                rowRenderer={renderRow}
                className={styles.productList}
              />
            )}
          </AutoSizer>
        </div>
      )}
    </div>
  );
};
