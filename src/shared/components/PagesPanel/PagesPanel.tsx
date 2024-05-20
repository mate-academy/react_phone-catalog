import styles from './PagesPanel.module.scss';
import arrowL from './icons/arrowLeft.svg';
import whiteLeft from './icons/whiteLeft.svg';
import arrowR from './icons/arrowRight.svg';
import whiteRight from './icons/whiteRight.svg';
import arrowLDisabled from './icons/arrowLeftDisabled.svg';
import arrowRDisabled from './icons/arrowRightDisabled.svg';
import dots from './icons/3dots.svg';
import { useSearchParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { AppContext } from '../../../utils/AppContext';

type Props = {
  pages: number;
};

export const PagesPanel: React.FC<Props> = ({ pages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDarkTheme } = useContext(AppContext);
  const currentPage = searchParams.get('page') || '';
  const arrayOfNumbers: number[] = [];

  for (let i = 1; i <= pages; i++) {
    arrayOfNumbers.push(i);
  }

  const setVisiblePages = () => {
    let startIndex = 1;
    let endIndex = 2;

    if (pages <= 4) {
      return arrayOfNumbers.slice(1);
    }

    if (+currentPage - 2 >= 1) {
      startIndex = +currentPage - 2;
    }

    if (+currentPage + 2 > pages - 1) {
      endIndex = pages - 1;
      startIndex = pages - 4;
    } else {
      endIndex = +currentPage + 2;
    }

    if (!currentPage) {
      startIndex = 1;
      endIndex = 4;
    }

    return arrayOfNumbers.slice(startIndex, endIndex);
  };

  const visiblePages = setVisiblePages();

  const handlePageChange = (v: number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', v.toString());

    setSearchParams(newParams);
  };

  const handleByArrowChange = (direction: string) => {
    switch (direction) {
      case 'left':
        if (!currentPage) {
          return;
        } else {
          handlePageChange(+currentPage - 1);
          window.scrollTo(0, 0);

          return;
        }

      case 'right':
        if (+currentPage === pages) {
          return;
        } else if (!currentPage) {
          handlePageChange(2);
          window.scrollTo(0, 0);
        } else {
          handlePageChange(+currentPage + 1);
          window.scrollTo(0, 0);

          return;
        }
    }
  };

  useEffect(() => {
    function setCurrentPage(n: string) {
      const newParams = new URLSearchParams(searchParams);

      newParams.set('page', n);

      setSearchParams(newParams);
    }

    if (+currentPage > pages) {
      setCurrentPage(pages.toString());
    }

    if (+currentPage < 1) {
      setCurrentPage('1');
    }

    if (!currentPage || currentPage === '1') {
      const newParams = new URLSearchParams(searchParams);

      newParams.delete('page');

      setSearchParams(newParams);
    }
  }, [currentPage, pages, searchParams, setSearchParams]);

  return (
    <div className={styles.pages}>
      <div
        className={classNames(
          styles.pages__button,
          isDarkTheme ? styles.pages__buttonDark : '',
          !currentPage ? styles.disabled : '',
          !currentPage && isDarkTheme ? styles.disabledDark : '',
        )}
        style={
          !currentPage
            ? { backgroundImage: `url(${arrowLDisabled})` }
            : isDarkTheme
              ? { backgroundImage: `url(${whiteLeft})` }
              : { backgroundImage: `url(${arrowL})` }
        }
        onClick={() => handleByArrowChange('left')}
      ></div>

      <ol className={styles.pages__list}>
        <li
          className={classNames(
            styles.pages__button,
            isDarkTheme ? styles.pages__buttonDark : '',
            !currentPage ? styles.currentPage : '',
          )}
          key={1}
          onClick={() => {
            handlePageChange(1);
            window.scrollTo(0, 0);
          }}
        >
          {1}
        </li>

        {visiblePages[0] !== 2 && pages > 4 && (
          <div
            className={styles.dots}
            style={{ backgroundImage: `url(${dots})` }}
          ></div>
        )}

        {visiblePages.map(num => (
          <li
            className={classNames(
              styles.pages__button,
              isDarkTheme ? styles.pages__buttonDark : '',
              +currentPage === num ? styles.currentPage : '',
            )}
            key={num}
            onClick={() => {
              handlePageChange(num);
              window.scrollTo(0, 0);
            }}
          >
            {num}
          </li>
        ))}

        {visiblePages[visiblePages.length - 1] !== pages - 1 && pages > 4 && (
          <div
            className={styles.dots}
            style={{ backgroundImage: `url(${dots})` }}
          ></div>
        )}

        {pages > 4 && (
          <li
            className={classNames(
              styles.pages__button,
              isDarkTheme ? styles.pages__buttonDark : '',
              +currentPage === pages ? styles.currentPage : '',
            )}
            key={pages}
            onClick={() => {
              handlePageChange(pages);
              window.scrollTo(0, 0);
            }}
          >
            {pages}
          </li>
        )}
      </ol>

      <div
        className={classNames(
          styles.pages__button,
          isDarkTheme ? styles.pages__buttonDark : '',
          +currentPage === pages ? styles.disabled : '',
          +currentPage === pages && isDarkTheme ? styles.disabledDark : '',
        )}
        style={
          currentPage === pages.toString()
            ? { backgroundImage: `url(${arrowRDisabled})` }
            : isDarkTheme
              ? { backgroundImage: `url(${whiteRight})` }
              : { backgroundImage: `url(${arrowR})` }
        }
        onClick={() => handleByArrowChange('right')}
      ></div>
    </div>
  );
};
