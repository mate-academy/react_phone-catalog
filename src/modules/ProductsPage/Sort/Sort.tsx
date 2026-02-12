import { useEffect, useRef, useState } from 'react';
import styles from './Sort.module.scss';
import { useSearchParams } from 'react-router-dom';

const options = ['Newest', 'Alphabetically', 'Cheapest'];

const paginations = ['All', 16, 8, 4];

export const Sort = () => {
  const [openOpt, setOpenOpt] = useState(false);
  const [openPag, setOpenPag] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [option, setOption] = useState(searchParams.get('sort') || options[0]);
  const [pagination, setPagination] = useState(
    Number(searchParams.get('perPage')) || paginations[0],
  );
  const optRef = useRef(null);
  const pagRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = e => {
      if (optRef.current && !optRef.current.contains(e.target)) {
        setOpenOpt(false);
      }

      if (pagRef.current && !pagRef.current.contains(e.target)) {
        setOpenPag(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionChange = (opt: string) => {
    setOption(opt);
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('sort', String(opt));

      return params;
    });

    setOpenOpt(false);
  };

  const handlePaginationChange = (pag: string | number) => {
    setPagination(pag);

    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (pag === 'All') {
        params.delete('perPage');
        params.delete('page');

        return params;
      }

      params.set('perPage', String(pag));

      return params;
    });
    setOpenPag(false);
  };

  return (
    <div className={styles.sort}>
      <div className={styles.sort__by}>
        <p>Sort by</p>

        <div
          className={styles.dropdown}
          onClick={() => setOpenOpt(!openOpt)}
          ref={optRef}
        >
          <span>{option}</span>

          {openOpt && (
            <ul className={styles.list}>
              {options.map(opt => (
                <li key={opt} onClick={() => handleOptionChange(opt)}>
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.sort__items}>
        <p>Items on page</p>

        <div
          className={styles.dropdown}
          onClick={() => setOpenPag(!openPag)}
          ref={pagRef}
        >
          <span>{pagination}</span>

          {openPag && (
            <ul className={styles.list}>
              {paginations.map(pag => (
                <li key={pag} onClick={() => handlePaginationChange(pag)}>
                  {pag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
