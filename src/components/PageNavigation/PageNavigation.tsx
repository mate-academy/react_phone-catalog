import styles from './PageNavigation.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const iconSrc = (iconName: string) =>
  `${import.meta.env.BASE_URL}img/icons/${iconName}`;

export const PageNavigation = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const goToPreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  const goToNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className={styles.pageNavigation}>
      <button
        type="button"
        className={styles.button}
        disabled={currentPage === 1}
        aria-label="Previous page"
        onClick={goToPreviousPage}
      >
        <img
          src={iconSrc('chevron-right.svg')}
          alt=""
          className={styles.prevIcon}
        />
      </button>

      <div className={styles.pages}>
        {pages.map(page => (
          <button
            key={page}
            type="button"
            className={
              page === currentPage
                ? `${styles.button} ${styles.buttonActive}`
                : styles.button
            }
            aria-current={page === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.button}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        onClick={goToNextPage}
      >
        <img
          src={iconSrc('chevron-right.svg')}
          alt=""
          className={styles.nextIcon}
        />
      </button>
    </div>
  );
};
