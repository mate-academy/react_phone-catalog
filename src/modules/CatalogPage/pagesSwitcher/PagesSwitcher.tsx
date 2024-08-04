import { useEffect, useState } from 'react';
import styles from './PagesSwitcher.module.scss';
import { updateURLParams } from './../services/updateUrl';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';

interface PagesSwitcherProps {
  sortBy: string;
  perPage: string;
  pagesWithProducts: number[];
  showFrom: number;
  setShownFrom: React.Dispatch<React.SetStateAction<number>>;
}

export const PagesSwitcher: React.FC<PagesSwitcherProps> = ({
  sortBy,
  perPage,
  pagesWithProducts,
  showFrom,
  setShownFrom,
}) => {
  const [disablePagesArrow, setDisablePagesArrow] = useState('disableLeft');

  const root = document.documentElement;
  const navigate = useNavigate();
  const location = useLocation();

  const models = useAppSelector(state => state.pagesDetails.models);

  useEffect(() => {
    root.style.setProperty('--page-starts-from', '0');
  }, [location.pathname]);

  const handlePageButton = (currentPage: number) => {
    navigate(updateURLParams(sortBy, perPage, currentPage));

    if (perPage !== 'all') {
      setShownFrom(+perPage * (currentPage - 1));
    } else {
      setShownFrom(0);
    }
  };

  const handlePagesLeft = (): string | void => {
    const currentPosition = parseInt(
      getComputedStyle(root).getPropertyValue('--page-starts-from'),
    );

    const DISABLE_BUTTON_POSITION = 0;

    if (currentPosition === DISABLE_BUTTON_POSITION) {
      return;
    }

    setDisablePagesArrow('');

    const newPosition = currentPosition - 40;

    if (newPosition === DISABLE_BUTTON_POSITION) {
      setDisablePagesArrow('disableLeft');
    }

    root.style.setProperty('--page-starts-from', `${newPosition}px`);
  };

  const handlePagesRight = (): string | void => {
    const currentPosition = parseInt(
      getComputedStyle(root).getPropertyValue('--page-starts-from'),
    );

    let DISABLE_BUTTON_POSITION;

    if (perPage !== 'all') {
      DISABLE_BUTTON_POSITION =
        Math.ceil(models / +perPage) * 32 +
        (Math.ceil(models / +perPage) - 1) * 8 -
        (4 * 32 + 3 * 8);
    } else {
      DISABLE_BUTTON_POSITION =
        Math.ceil(models) * 32 + (Math.ceil(models) - 1) * 8 - (4 * 32 + 3 * 8);
    }

    if (currentPosition >= DISABLE_BUTTON_POSITION) {
      return;
    }

    setDisablePagesArrow('');

    const newPosition = currentPosition + 40;

    if (newPosition >= DISABLE_BUTTON_POSITION) {
      setDisablePagesArrow('disableRight');
    }

    root.style.setProperty('--page-starts-from', `${newPosition}px`);
  };

  return (
    <>
      {perPage !== 'all' && Math.ceil(models / +perPage) > 1 && (
        <div className={styles.pages}>
          {perPage !== 'all' && Math.ceil(models / +perPage) > 4 && (
            <button
              onClick={handlePagesLeft}
              className={`${styles.pages__arrowButton} ${disablePagesArrow === 'disableLeft' ? styles.disabledArrow : styles.activeArrow}`}
            >
              {disablePagesArrow === 'disableLeft' ? (
                <img src="icons/arrow-left-light-ico.svg" alt="arrow-left" />
              ) : (
                <img src="icons/arrow-left-ico.svg" alt="arrow-left" />
              )}
            </button>
          )}

          <div className={styles.pages__numbersWindow}>
            <div className={styles.pages__numbers}>
              {pagesWithProducts?.map(currentPage => (
                <button
                  onClick={() => handlePageButton(currentPage)}
                  key={currentPage}
                  className={`${styles.pages__number} ${currentPage - 1 === showFrom / +perPage ? styles.numberOn : styles.numberOff}`}
                >
                  {currentPage}
                </button>
              ))}
            </div>
          </div>

          {perPage !== 'all' && Math.ceil(models / +perPage) > 4 && (
            <button
              onClick={handlePagesRight}
              className={`${styles.pages__arrowButton} ${disablePagesArrow === 'disableRight' ? styles.disabledArrow : styles.activeArrow}`}
            >
              {disablePagesArrow === 'disableRight' ? (
                <img src="icons/arrow-right-light-ico.svg" alt="arrow-right" />
              ) : (
                <img src="icons/aroow-right-ico.svg" alt="arrow-right" />
              )}
            </button>
          )}
        </div>
      )}
    </>
  );
};
