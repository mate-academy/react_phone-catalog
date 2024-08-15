import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { getSequence } from '../../utils/getSequence';
import styles from './Pagination.module.scss';

interface Props {
  totalProducts: number;
  currPage: number;
  perPage: number;
  updateCurrPage: (page: number) => void;
}

const BTNS_COUNT = 4;
const BTN_WIDTH = 32;
const GAP = 8;

const visibleLength = BTNS_COUNT * BTN_WIDTH + (BTNS_COUNT - 1) * GAP;

export const Pagination: React.FC<Props> = ({
  totalProducts,
  currPage,
  perPage,
  updateCurrPage,
}) => {
  const [shift, setShift] = useState<number>(0);
  const preventUseEffect = useRef<boolean>(false);

  const normalizedPerPage = perPage ? perPage : 1;
  const pagesTotal = Math.ceil(totalProducts / normalizedPerPage);
  const pages = getSequence(1, pagesTotal);

  const totalLength = pagesTotal * BTN_WIDTH + (pagesTotal - 1) * GAP;
  const currLength = currPage * BTN_WIDTH + (currPage - 1) * GAP;
  const maxShift = totalLength - visibleLength;

  useEffect(() => {
    if (pagesTotal <= 4) {
      setShift(0);

      return;
    }

    if (preventUseEffect.current) {
      preventUseEffect.current = false;

      return;
    }

    const nextShift = currLength - 2 * BTN_WIDTH - GAP;
    const normalizedNextShift = nextShift < 0 ? 0 : nextShift;
    const appliedNextShift =
      normalizedNextShift > maxShift ? maxShift : normalizedNextShift;

    setShift(appliedNextShift);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesTotal, perPage, currPage]);

  const toPrevPage = useCallback(() => {
    if (currPage === 1) {
      return;
    }

    updateCurrPage(currPage - 1);

    if (pagesTotal <= 4) {
      return;
    }

    preventUseEffect.current = true;

    if (currLength === shift + 2 * BTN_WIDTH + GAP) {
      const nextShift = shift - BTN_WIDTH - GAP;
      const appliedNextShift = nextShift < 0 ? 0 : nextShift;

      setShift(appliedNextShift);
    }
  }, [currLength, currPage, pagesTotal, shift, updateCurrPage]);

  const handlePageChange = useCallback(
    (nextPage: number): void => {
      updateCurrPage(nextPage);

      if (pagesTotal <= 4) {
        return;
      }

      preventUseEffect.current = true;

      const nextLength = nextPage * BTN_WIDTH + (nextPage - 1) * GAP;

      if (nextLength === shift + BTN_WIDTH) {
        const nextShift = shift - BTN_WIDTH - GAP;
        const appliedNextShift = nextShift < 0 ? 0 : nextShift;

        setShift(appliedNextShift);
      }

      if (nextLength === shift + visibleLength) {
        const nextShift = shift + BTN_WIDTH + GAP;
        const appliedNextShift = nextShift > maxShift ? maxShift : nextShift;

        setShift(appliedNextShift);
      }
    },
    [maxShift, pagesTotal, shift, updateCurrPage],
  );

  const toNextPage = useCallback(() => {
    if (currPage === pagesTotal) {
      return;
    }

    updateCurrPage(currPage + 1);

    if (pagesTotal <= 4) {
      return;
    }

    preventUseEffect.current = true;

    if (currLength === shift + 3 * BTN_WIDTH + 2 * GAP) {
      const nextShift = shift + BTN_WIDTH + GAP;
      const appliedNextShift = nextShift > maxShift ? maxShift : nextShift;

      setShift(appliedNextShift);
    }
  }, [currLength, currPage, maxShift, pagesTotal, shift, updateCurrPage]);

  return (
    <div
      className={classNames(styles.pagination, {
        [styles.hidden]: pagesTotal <= 1,
      })}
    >
      <button
        type="button"
        className={classNames(styles.btn, styles.btnPrev)}
        onClick={toPrevPage}
        disabled={currPage === 1}
      />

      <div className={styles.pagesContainer}>
        <ol
          className={styles.pagesList}
          style={{ transform: `translateX(-${shift}px)` }}
        >
          {pages.map(page => (
            <li key={page} className={styles.pageItem}>
              <label htmlFor={`page-${page}`} className={styles.pageRadioLabel}>
                {page}
              </label>
              <input
                id={`page-${page}`}
                type="radio"
                name="page"
                value={page}
                checked={currPage === page}
                className={styles.pageRadio}
                onChange={() => handlePageChange(page)}
              />
            </li>
          ))}
        </ol>
      </div>

      <button
        type="button"
        className={classNames(styles.btn, styles.btnNext)}
        onClick={toNextPage}
        disabled={currPage === pagesTotal}
      />
    </div>
  );
};
