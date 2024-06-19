import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { IconLeft } from '../../ui/IconLeft';
import { IconRight } from '../../ui/IconRight';

import { DEFAULT_PAGE } from '../../constants/default-values';

import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: number;
  defaultPage?: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  defaultPage = DEFAULT_PAGE,
}) => {
  const amountPages = Math.floor(total / perPage);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = +(searchParams.get('page') || defaultPage);

  const handleChangePage = (page: number) => {
    const urlParams = new URLSearchParams(searchParams);

    urlParams.set('page', page.toString());

    setSearchParams(urlParams);
  };

  const handleNextPage = () => {
    if (currentPage < amountPages) {
      handleChangePage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > DEFAULT_PAGE) {
      handleChangePage(currentPage - 1);
    }
  };

  return (
    <div className={styles.PaginationWrapper}>
      <button onClick={handlePrevPage} className={styles.ButtonPrimary}>
        <IconLeft fill="white" />
      </button>
      <div className={styles.Inner}>
        {Array.from({ length: amountPages }, (_item, index) => index + 1).map(
          page => (
            <button
              key={page}
              onClick={() => handleChangePage(page)}
              className={cn(styles.Button, {
                [styles.Active]: currentPage === page,
              })}
            >
              {page}
            </button>
          ),
        )}
      </div>
      <button onClick={handleNextPage} className={styles.ButtonPrimary}>
        <IconRight fill="white" />
      </button>
    </div>
  );
};
