import { Link, useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import { getSearchWith } from '../../shared/utils/searchHelper';
import classNames from 'classnames';
import { ArrowButton } from '../../shared/components/Icons/ArrowButtons';

type Props = {
  numberOfPages: number;
  onPageChange?: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ numberOfPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activePage = +(searchParams.get('page') || 1);
  const paginationItems = [];

  for (let i = 1; i <= numberOfPages; i++) {
    paginationItems.push(
      <li
        key={i}
        className={classNames(styles.pagination__item, {
          [styles.item__active]: activePage === i,
        })}
      >
        <Link
          to={{
            search: getSearchWith(searchParams, {
              page: i === 1 ? null : String(i),
            }),
          }}
        >
          {i}
        </Link>
      </li>,
    );
  }

  const handlePrevButton = () => {
    if (activePage > 1) {
      setSearchParams(
        getSearchWith(searchParams, {
          page: activePage - 1 === 1 ? null : String(activePage - 1),
        }),
      );
    }
  };

  const handleNextButton = () => {
    if (activePage < numberOfPages) {
      setSearchParams(
        getSearchWith(searchParams, { page: String(activePage + 1) }),
      );
    }
  };

  return (
    <ul className={styles.pagination__list}>
      <li>
        <ArrowButton
          direction="left"
          className={styles.pagination__prev}
          disabled={activePage === 1}
          onClick={handlePrevButton}
        />
      </li>
      {paginationItems}
      <li>
        <ArrowButton
          direction="right"
          className={styles.pagination__next}
          disabled={activePage === numberOfPages}
          onClick={handleNextButton}
        />
      </li>
    </ul>
  );
};
