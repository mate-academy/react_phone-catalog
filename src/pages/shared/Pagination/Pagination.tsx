import { Button } from '../../../components/Button/Button';
import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import { useState } from 'react';

type Props = {
  quantity: number;
  itemsPerPage: number;
  page: string;
  listRef: React.RefObject<HTMLDivElement>;
};

const VISIBLE_COUNT = 4;

export const Pagination: React.FC<Props> = ({
  quantity,
  itemsPerPage,
  page,
  listRef,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(quantity / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const perPage = searchParams.get('perPage') || '';
  const visiblePages = pages.slice(startIndex, startIndex + 4);

  const setPage = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', value);
    setSearchParams(params);

    listRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLeftClick = () => {
    if (+page === 1) {
      return;
    }

    const newPage = +page - 1;

    setStartIndex(prev => (newPage < prev + 1 ? newPage - 1 : prev));
    setPage(newPage.toString());
  };

  const handleRightClick = () => {
    if (+page === totalPages) {
      return;
    }

    const newPage = +page + 1;

    setStartIndex(prev => (newPage > prev + VISIBLE_COUNT ? prev + 1 : prev));
    setPage(newPage.toString());
  };

  return (
    <div className={styles.pagination}>
      {perPage === 'all' || (
        <Button
          textContent=""
          className={
            ['arrow', +page === 1 && 'arrow--disabled'].filter(
              Boolean,
            ) as string[]
          }
          onClick={() => handleLeftClick()}
        />
      )}

      <div className={styles.pagination__slider}>
        <ul className={styles.pagination__list}>
          {visiblePages.map(p => (
            <li key={p} className={styles.pagination__item}>
              <Button
                textContent={p.toString()}
                className={
                  ['pagination', p === +page && 'pagination--active'].filter(
                    Boolean,
                  ) as string[]
                }
                onClick={() => setPage(p.toString())}
              />
            </li>
          ))}
        </ul>
      </div>

      {perPage === 'all' || (
        <Button
          textContent=""
          className={
            [
              'arrow',
              'arrow--right',
              +page === totalPages && 'arrow--disabled',
            ].filter(Boolean) as string[]
          }
          onClick={() => handleRightClick()}
        />
      )}
    </div>
  );
};
