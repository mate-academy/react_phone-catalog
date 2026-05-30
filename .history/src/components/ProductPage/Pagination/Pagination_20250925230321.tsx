/* eslint-disable max-len */
import React, { useEffect } from 'react';
import styles from './Pagination.module.scss';

type Props = {
  pages: number[];
  selectedPage: number;
  pagesCount: number;
  setSelectedPage: (selectedPage: number) => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
};

export const Pagination: React.FC<Props> = ({
  pages,
  selectedPage,
  pagesCount,
  setSelectedPage,
  handlePrevPage,
  handleNextPage,
}) => {
  const { theme } = useContext(ThemeContext);

  const imglink =
    theme === 'dark'
      ? 'images/Favourites (Heart Like) Dark.svg'
      : 'images/Favourites (Heart Like).svg';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPage]);

  return (
    <div className={styles.container}>
      <div className={styles.switchers}>
        <button
          className={styles.prevbutton}
          onClick={() => {
            handlePrevPage();
          }}
          disabled={selectedPage === 1}
        >
          <img className={styles.prev} src="images/Vector Left.svg" />
        </button>
        <div className={styles.buttons}>
          {pages.map(page => (
            <button
              key={page}
              className={`${styles.button} ${page === selectedPage ? styles.active : ''}`}
              onClick={() => setSelectedPage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className={styles.nextbutton}
          onClick={() => {
            handleNextPage();
          }}
          disabled={selectedPage === pagesCount}
        >
          <img className={styles.next} src="images/Vector Right.svg" />
        </button>
      </div>
    </div>
  );
};
