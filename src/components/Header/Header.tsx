import { Link, useSearchParams } from 'react-router-dom';
import { Nav } from '../Nav';
import styles from './Header.module.scss';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [currQuery, setCurrQuery] = useState<string>(query);
  const searchContext = useContext(SearchContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams(prevParams => {
        if (currQuery.length === 0) {
          prevParams.delete('query');
        } else {
          prevParams.set('query', currQuery);
        }

        prevParams.delete('page');

        return prevParams;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [currQuery]);

  if (!searchContext) {
    throw new Error('Must be used within a SearchProvider');
  }

  const { search } = searchContext;

  return (
    <header>
      <div className={styles.wrapper}>
        <Link to="/" className={styles.logo}>
          <img
            className={styles.img}
            src="/img/Logo.png"
            alt="Nice gadgets logo"
          />
        </Link>

        {search && (
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search"
            value={currQuery}
            onChange={e => setCurrQuery(e.target.value)}
          />
        )}

        <Nav />
      </div>
    </header>
  );
};
