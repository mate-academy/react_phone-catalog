import classNames from 'classnames';
import styles from './styles/pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  setPage: (value: number) => void;
};

export const CataloguePagination = ({
  currentPage,
  totalPages,
  setPage,
}: Props) => {
  const amount = Array.from({ length: totalPages }, (_, i) => i);

  const getClassName = (dg: number) =>
    classNames('pagination-button', { 'is-active': dg === currentPage });

  return (
    <nav className={styles.container}>
      {amount.map(dg => (
        <button
          key={dg}
          className={getClassName(dg + 1)}
          onClick={() => setPage(dg + 1)}
        >
          {dg + 1}
        </button>
      ))}
    </nav>
  );
};
