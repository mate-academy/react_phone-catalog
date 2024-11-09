import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Pagination.module.scss';
import icons from '../../../assets/icons/icons.svg';

// type PaginationProps = {
//   totalItems: number;
// };

export const Pagination: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(location.search);
  const currentPage = parseInt(urlParams.get('page') || '1');
  const currentPerPage = urlParams.get('perPage') || 'all';

  const [page, setPage] = useState(currentPage);
  const [perPage, setPerPage] = useState(currentPerPage);

  // const itemsPerPage = perPage === 'all' ? totalItems : parseInt(perPage);
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const params = new URLSearchParams();

    if (page > 1) {
      params.set('page', page.toString());
    }

    if (perPage !== 'all') {
      params.set('perPage', perPage);
    }

    navigate({ search: params.toString() });
  }, [page, perPage, navigate]);

  // const handlePageChange = (newPage: number) => {
  //   if (newPage > 0 && newPage <= totalPages) {
  //     setPage(newPage);
  //   }
  // };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(e.target.value);
    setPage(1);
  };

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.paginationControls}>
        <span className={styles.sortName}>Items on page</span>
        <select
          onChange={handlePerPageChange}
          value={perPage}
          className={styles.dropDownMenu}
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="all">All</option>
        </select>

        <span className={styles.arrow}>
          <svg>
            <use href={`${icons}#arrow-down-icon`}></use>
          </svg>
        </span>
      </div>
    </div>
  );
};
