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
  const [page, setPage] = useState<number>(+(searchParams.get('page') || '1'));

  const onActive = (newPage: number) => {
    setPage(newPage);
    setSearchParams(
      getSearchWith(searchParams, {
        page: newPage > 1 ? '' + newPage : null,
      }),
    );
  };

  useEffect(() => {
    const p = searchParams.get('page');

    setPage(+(p || 1));

    if (p && +p > pagesCount) {
      setPage(1);
      setSearchParams(
        getSearchWith(searchParams, {
          page: null,
        }),
      );
    }
  }, [pagesCount, searchParams, setSearchParams]);

  return (
    <div className={classNames(styles.pagination)}>
      <button
        name="left"
        disabled={+page === 1}
        className={classNames(
          styles.pagination__button,
          styles['pagination__button--right'],
          {
            [styles['pagination__button--disable']]: +page === 1,
          },
        )}
        onClick={() => onActive(+page - 1)}
      >
        <Icon
          path={`${import.meta.env.BASE_URL}/img/icons/arrow-left-black.svg`}
          name={'left'}
        />
      </button>
      <div className={classNames(styles.pagination__pages)}>
        {pageList.map((p, i) => (
          <button
            key={i}
            className={classNames(styles.pagination__number, {
              [styles['pagination__number--active']]: i === +page - 1,
            })}
            onClick={() => onActive(i + 1)}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        name="right"
        disabled={+page === pagesCount}
        className={classNames(
          styles.pagination__button,
          styles['pagination__button--right'],
          {
            [styles['pagination__button--disable']]: +page === pagesCount,
          },
        )}
        onClick={() => onActive(+page + 1)}
      >
        <Icon
          path={`${import.meta.env.BASE_URL}/img/icons/arrow-right-black.svg`}
          name={'right'}
        />
      </button>
    </div>
  );
};
