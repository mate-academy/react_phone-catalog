import { useEffect, useRef, useState } from 'react';
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

    const nextShift = currLength - BTN_WIDTH;
    const appliedNextShift = nextShift > maxShift ? maxShift : nextShift;

    setShift(appliedNextShift);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesTotal, perPage, currPage]);

  const toPrevPage = () => {
    if (currPage === 1) {
      return;
    }

    updateCurrPage(currPage - 1);

    if (pagesTotal <= 4) {
      return;
    }

    if (currLength - BTN_WIDTH === shift) {
      const nextShift = shift - 160;
      const appliedNextShift = nextShift < 0 ? 0 : nextShift;

      setShift(appliedNextShift);
    }

    preventUseEffect.current = true;
  };

  const toNextPage = () => {
    if (currPage === pagesTotal) {
      return;
    }

    updateCurrPage(currPage + 1);

    if (pagesTotal <= 4) {
      return;
    }

    if (currLength === shift + visibleLength) {
      const nextShift = shift + visibleLength + GAP;
      const appliedNextShift = nextShift > maxShift ? maxShift : nextShift;

      setShift(appliedNextShift);
    }

    preventUseEffect.current = true;
  };

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

      <div className={styles.buttonsWrapper}>
        <div
          className={styles.buttons}
          style={{ transform: `translateX(-${shift}px)` }}
        >
          {pages.map(page => (
            <button
              key={page}
              type="button"
              className={classNames(styles.btn, {
                [styles.btnSelected]: currPage === page,
              })}
              onClick={() => {
                updateCurrPage(page);
                preventUseEffect.current = true;
              }}
            >
              {page}
            </button>
          ))}
        </div>
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
