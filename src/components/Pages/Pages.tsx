import { useSearchParams } from 'react-router-dom';
import { Button } from '../Button';
import styles from './Pages.module.scss';
import { useEffect } from 'react';
import { Card } from '../../types/card';

type Props = {
  pageAmount: number;
  products: Card[];
};

export const Pages: React.FC<Props> = ({ pageAmount, products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || '');

  useEffect(() => {
    if (page !== 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
      });
    }
  }, [products.length]);

  const nextPage = () => {
    const params = new URLSearchParams(searchParams);

    if (page + 1 <= pageAmount) {
      params.set('page', String(page + 1));
      setSearchParams(params);
    }
  };

  const prevPage = () => {
    const params = new URLSearchParams(searchParams);

    if (page > 1) {
      params.set('page', String(page - 1));
      setSearchParams(params);
    }
  };

  const choosePage = (selectedPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(selectedPage));
    setSearchParams(params);
  };

  const pagesTransform =
    page === pageAmount
      ? page * 40 - 4 * 40
      : page > 2 && page === pageAmount - 1
        ? page * 40 - 3 * 40
        : page * 40 - 2 * 40;

  return (
    <div className={styles.pages}>
      <Button direction="prev" onClick={prevPage} disabled={page === 1} />
      <div className={styles.pages__wrap}>
        <div
          className={styles.pages__list}
          style={{
            transform: `translateX(-${page === 1 ? 0 : pagesTransform}px)`,
          }}
        >
          {Array.from({ length: pageAmount }, (_, i) => i + 1).map(item => {
            return (
              <div
                onClick={() => choosePage(item)}
                key={item}
                className={`${styles.pages__page} ${page === item ? styles.pages__page_selected : ''}`}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <Button
        direction="next"
        onClick={nextPage}
        disabled={page === pageAmount}
      />
    </div>
  );
};
