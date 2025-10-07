import { useEffect, useState } from 'react';
import styles from './DropDowns.module.scss';
import { Link, useSearchParams } from 'react-router-dom';

export const DropDowns = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const sortBy = searchParams.get('sort');
  const items = searchParams.get('items');

  useEffect(() => {
    if (!searchParams.get('sort')) {
      const newParams = new URLSearchParams(searchParams);

      newParams.set('sort', 'newest');
      setSearchParams(newParams);
    }
  }, [searchParams, setSearchParams]);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  const getItemsLink = (field: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('items', field);
    newParams.set('page', '1');

    return `?${newParams.toString()}`;
  };

  const getSortLink = (field: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', field);

    return `?${newParams.toString()}`;
  };

  return (
    <div className={styles.dropdowns}>
      <div className={styles.dropdown}>
        <p className={styles['small-text']}>Sort by</p>
        <button className={styles.dropdown__trigger} onClick={() => toggleDropdown('sort')}>
          <span className={styles.dropdown__sort}>{searchParams.get('sort')}</span>
          <svg
            className={`${styles.dropdown__icon} ${openDropdown === 'sort' ? styles.rotate : ''}`}
            width="16"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
              fill="#B4BDC4"
            />
          </svg>
        </button>
        <div
          className={`${styles.dropdown__content} ${openDropdown !== 'sort' ? styles.hide : ''}`}
        >
          <Link
            to={getSortLink('newest')}
            className={`${styles['dropdown__item-container']} ${sortBy === 'newest' ? styles['active-item-container'] : ''}`}
            onClick={() => setOpenDropdown(null)}
          >
            <p
              className={`${styles.dropdown__item} ${sortBy === 'newest' ? styles['active-item'] : ''} body-text`}
            >
              Newest
            </p>
          </Link>
          <Link
            to={getSortLink('alphabetically')}
            className={`${styles['dropdown__item-container']} ${sortBy === 'alphabetically' ? styles['active-item-container'] : ''}`}
            onClick={() => setOpenDropdown(null)}
          >
            <p
              className={`${styles.dropdown__item} ${sortBy === 'alphabetically' ? styles['active-item'] : ''} body-text`}
            >
              Alphabetically
            </p>
          </Link>
          <Link
            to={getSortLink('cheapest')}
            className={`${styles['dropdown__item-container']} ${sortBy === 'cheapest' ? styles['active-item-container'] : ''}`}
            onClick={() => setOpenDropdown(null)}
          >
            <p
              className={`${styles.dropdown__item} ${sortBy === 'cheapest' ? styles['active-item'] : ''} body-text`}
            >
              Cheapest
            </p>
          </Link>
        </div>
      </div>
      <div className={styles.dropdown}>
        <p className={styles['small-text']}>Items on page</p>
        <button className={styles.dropdown__trigger} onClick={() => toggleDropdown('items')}>
          <span className={styles.dropdown__sort}>{searchParams.get('items') || 'all'}</span>
          <svg
            className={`${styles.dropdown__icon} ${openDropdown === 'items' ? styles.rotate : ''}`}
            width="16"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
              fill="#B4BDC4"
            />
          </svg>
        </button>
        <div
          className={`${styles.dropdown__content} ${openDropdown !== 'items' ? styles.hide : ''}`}
        >
          <Link
            to={getItemsLink('4')}
            className={`${styles['dropdown__item-container']} ${items === '4' ? styles['active-item-container'] : ''}`}
            onClick={() => setOpenDropdown(null)}
          >
            <p
              className={`${styles.dropdown__item} ${items === '4' ? styles['active-item'] : ''} body-text`}
            >
              4
            </p>
          </Link>
          <Link
            to={getItemsLink('8')}
            className={`${styles['dropdown__item-container']} ${items === '8' ? styles['active-item-container'] : ''}`}
            onClick={() => setOpenDropdown(null)}
          >
            <p
              className={`${styles.dropdown__item} ${items === '8' ? styles['active-item'] : ''} body-text`}
            >
              8
            </p>
          </Link>
          <Link
            to={getItemsLink('16')}
            className={`${styles['dropdown__item-container']} ${items === '16' ? styles['active-item-container'] : ''}`}
            onClick={() => setOpenDropdown(null)}
          >
            <p
              className={`${styles.dropdown__item} ${items === '16' ? styles['active-item'] : ''} body-text`}
            >
              16
            </p>
          </Link>
          <Link
            to="/phones"
            className={`${styles['dropdown__item-container']} ${items ? '' : styles['active-item-container']}`}
            onClick={() => setOpenDropdown(null)}
          >
            <p
              className={`${styles.dropdown__item} ${items ? '' : styles['active-item']} body-text`}
            >
              all
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
