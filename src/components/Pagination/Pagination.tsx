import style from './Pagination.module.scss';

type Props = {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const showPages = pages.map(page => (
    <li
      key={page}
      className={`${style.item} ${page === currentPage ? style.active : ''}`}
      onClick={() => handlePageChange(page)}
    >
      {page}
    </li>
  ));

  return (
    <section className={style.pagination}>
      <ul className={style.items}>
        <li
          className={`${style.item} ${style.arrow} ${currentPage === 1 ? style.disabled : ''}`}
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        >
          <img src="./img/icons/arrow-left.svg" alt="Arrow left" />
        </li>

        {showPages}

        <li
          className={`${style.item} ${style.arrow} ${currentPage === totalPages ? style.disabled : ''}`}
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
        >
          <img src="./img/icons/arrow-right.svg" alt="Arrow right" />
        </li>
      </ul>
    </section>
  );
};

export default Pagination;
