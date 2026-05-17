import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAssetUrl } from '../../utils/asset';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
};

export const Pagination = ({ total }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isJumpOpen, setIsJumpOpen] = useState(false);
  const [jumpValue, setJumpValue] = useState('');
  const jumpRef = useRef<HTMLDivElement | null>(null);

  const page = Number(searchParams.get('page') || '1');
  const perPageRaw = searchParams.get('perPage') || 'all';
  const perPage = perPageRaw === 'all' ? total : Number(perPageRaw);
  const pagesCount =
    perPageRaw === 'all' ? 1 : Math.max(1, Math.ceil(total / perPage));

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (jumpRef.current && !jumpRef.current.contains(event.target as Node)) {
        setIsJumpOpen(false);
      }
    };

    if (isJumpOpen) {
      document.addEventListener('mousedown', onClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isJumpOpen]);

  if (pagesCount <= 1) {
    return null;
  }

  const setPage = (nextPage: number) => {
    const safePage = Math.min(Math.max(nextPage, 1), pagesCount);

    setSearchParams(prev => {
      const next = new URLSearchParams(prev);

      if (safePage <= 1) {
        next.delete('page');
      } else {
        next.set('page', String(safePage));
      }

      return next;
    });
  };

  const getPages = () => {
    if (pagesCount <= 7) {
      return Array.from({ length: pagesCount }, (_, i) => i + 1);
    }

    const groupSize = 4;
    const start = Math.floor((page - 1) / groupSize) * groupSize + 1;
    const end = Math.min(start + groupSize - 1, pagesCount);
    const pages: Array<number | 'dots'> = [];

    for (let p = start; p <= end; p += 1) {
      pages.push(p);
    }

    if (end < pagesCount - 1) {
      pages.push('dots');
    }

    if (end < pagesCount) {
      pages.push(pagesCount);
    }

    return pages;
  };

  const handleJumpSubmit = () => {
    const parsed = Number(jumpValue);

    if (!Number.isInteger(parsed) || parsed < 1 || parsed > pagesCount) {
      return;
    }

    setPage(parsed);
    setJumpValue('');
    setIsJumpOpen(false);
  };

  const pages = getPages();

  return (
    <div className={styles.wrap}>
      <div className={styles.pages}>
        <button
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={styles.arrowBtn}
          aria-label="Previous page"
        >
          <img
            src={getAssetUrl('img/Chevron%20(Arrow%20Right).png')}
            alt=""
            className={styles.arrowLeft}
          />
        </button>

        {pages.map((item, index) =>
          item === 'dots' ? (
            <div key={`dots-${index}`} className={styles.jump} ref={jumpRef}>
              <button
                type="button"
                className={styles.dots}
                onClick={() => setIsJumpOpen(open => !open)}
                aria-label="Open page jump"
              >
                ...
              </button>

              {isJumpOpen && (
                <div className={styles.jumpMenu}>
                  <input
                    type="number"
                    min={1}
                    max={pagesCount}
                    value={jumpValue}
                    onChange={event => setJumpValue(event.target.value)}
                    onKeyDown={event => {
                      if (event.key === 'Enter') {
                        handleJumpSubmit();
                      }
                    }}
                    placeholder={`1-${pagesCount}`}
                  />
                  <button type="button" onClick={handleJumpSubmit}>
                    Go
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              key={item}
              type="button"
              className={item === page ? styles.active : ''}
              onClick={() => setPage(item)}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => setPage(page + 1)}
          disabled={page === pagesCount}
          className={styles.arrowBtn}
          aria-label="Next page"
        >
          <img
            src={getAssetUrl('img/Chevron%20(Arrow%20Right).png')}
            alt=""
            className={styles.arrowRight}
          />
        </button>
      </div>
    </div>
  );
};
