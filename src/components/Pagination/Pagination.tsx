//react-router
import { useNavigate, useSearchParams } from 'react-router-dom';

//styles
import styles from './Pagination.module.scss';

//components
import { SearchLink } from '../SearchLink';

//services
import { getSearchWith } from '../../utils/searchHelper';
import classNames from 'classnames';

type Props = {
  totalItems: number;
  numberOfButtons: number;
  page: number;
  perPage: number;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  numberOfButtons,
  page,
  perPage,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const totalPages = Math.ceil(totalItems / perPage);

  if (totalPages <= 1) {
    return null;
  }

  const pagesBar = Array.from({ length: totalPages }, (_, i) => i + 1);

  const start = Math.max(0, Math.min(page - 1, totalPages - numberOfButtons));

  const visiblePages = pagesBar.slice(start, start + numberOfButtons);

  const moveToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }

    navigate({
      search: getSearchWith(searchParams, {
        page: nextPage.toString(),
      }),
    });
  };

  return (
    <div className={styles.pagesBar}>
      <button
        disabled={page === 1}
        onClick={() => moveToPage(page - 1)}
        className={styles.moveButton}
      >
        {'<'}
      </button>

      <div className={styles.visiblePagesList}>
        {visiblePages.map(el => (
          <SearchLink
            params={{ page: el.toString() }}
            key={el}
            className={classNames({
              [styles.selectedPage]: el === page,
            })}
          >
            {el}
          </SearchLink>
        ))}
      </div>

      <button
        disabled={page === totalPages}
        onClick={() => moveToPage(page + 1)}
        className={styles.moveButton}
      >
        {'>'}
      </button>
    </div>
  );
};
