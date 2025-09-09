import classNames from 'classnames';
import styles from '../styles/pagination.module.scss';
import { ArrowIcon } from '@shared/icons';

type Props = {
  pages: number;
  currentPage: number;
  setPage: (page: number) => void;
};

export const CataloguePagination = ({ pages, currentPage, setPage }: Props) => {
  const amount = Array.from({ length: pages }, (_, i) => i);

  const getClassName = (dg: number) =>
    classNames(styles.button, { [styles.button__active]: dg === currentPage });

  return (
    <nav className={styles.container}>
      <button
        className={styles.button}
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
        aria-label="Go to previous page"
      >
        <ArrowIcon direction={'left'} />
      </button>
      {amount.map(dg => (
        <button
          key={dg}
          className={getClassName(dg + 1)}
          onClick={() => setPage(dg + 1)}
          aria-label={`Go to page #${dg + 1}`}
          aria-current={dg + 1 === currentPage}
        >
          {dg + 1}
        </button>
      ))}
      <button
        className={styles.button}
        disabled={currentPage === pages}
        onClick={() => setPage(currentPage + 1)}
        aria-label="Go to next page"
      >
        <ArrowIcon direction={'right'} />
      </button>
    </nav>
  );
};
