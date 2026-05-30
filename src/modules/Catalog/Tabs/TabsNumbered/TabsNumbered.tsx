import classNames from 'classnames';
import styles from './TabsNumbered.module.scss';

interface TabsNumberedProps {
  maxButtons: number;
  currentPage: number;
  totalPages: number;
  onClick: (page: number) => void;
}

export const TabsNumbered: React.FC<TabsNumberedProps> = ({
  maxButtons,
  currentPage,
  totalPages,
  onClick,
}) => {
  const windowSize = maxButtons;

  let startPage = Math.max(currentPage - Math.floor(windowSize / 2), 1);

  let endPage = startPage + windowSize - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - windowSize + 1, 1);
  }

  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (page: number) => {
    const newPage = page;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    onClick(newPage);
  };

  return (
    <div className={styles.tabsNumbered__Container}>
      {pageNumbers.map(page => (
        <div
          key={page}
          className={classNames(styles.page, {
            [styles.pageActive]: currentPage === page,
          })}
          onClick={() => handleClick(page)}
        >
          {page}
        </div>
      ))}
    </div>
  );
};
