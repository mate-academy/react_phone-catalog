import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { Icon } from '../../../components/Icon';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSearchWith } from '../../../utils/searchHelper';

type Props = {
  pagesCount: number;
};

export const Pagination: React.FC<Props> = ({ pagesCount }) => {
  const pageList = Array.from({ length: pagesCount }, (_, i) => i + 1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number | null>(0);

  const onActive = (newPage: number) => {
    setPage(newPage);
    setSearchParams(
      getSearchWith(searchParams, {
        page: '' + newPage || null,
      }),
    );
  };

  useEffect(() => {
    const p = searchParams.get('page');

    if (p && +p > pagesCount - 1) {
      setPage(0);
      setSearchParams(
        getSearchWith(searchParams, {
          page: '0',
        }),
      );
    }
  }, [pagesCount]);

  if (page === null) {
    return <></>;
  }

  return (
    <div className={classNames(styles.pagination)}>
      <button
        name="left"
        disabled={page === 0}
        className={classNames(
          styles.pagination__button,
          styles['pagination__button--right'],
          {
            [styles['pagination__button--disable']]: page === 0,
          },
        )}
        onClick={() => onActive(page - 1)}
      >
        <Icon path={'/img/icons/arrow-left-black.svg'} name={'left'} />
      </button>
      <div className={classNames(styles.pagination__pages)}>
        {pageList.map((p, i) => (
          <button
            key={i}
            className={classNames(styles.pagination__number, {
              [styles['pagination__number--active']]: i === page,
            })}
            onClick={() => onActive(i)}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        name="right"
        disabled={page + 1 === pagesCount}
        className={classNames(
          styles.pagination__button,
          styles['pagination__button--right'],
          {
            [styles['pagination__button--disable']]: page + 1 === pagesCount,
          },
        )}
        onClick={() => onActive(page + 1)}
      >
        <Icon path={'/img/icons/arrow-right-black.svg'} name={'right'} />
      </button>
    </div>
  );
};
