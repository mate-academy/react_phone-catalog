import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';

type Props = {
  total: number | undefined;
  getPages: (totalPages: number | undefined) => number[];
  // currentPage: number;
};

export const Pagination = ({ total, getPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = searchParams.get('perPage');

  let totalPages = 0;

  if (total === undefined || perPage === 'all' || !perPage) {
    totalPages = 0;
  } else {
    totalPages = Math.ceil(total / +perPage);
  }

  const pages = getPages(totalPages);

  // eslint-disable-next-line no-console

  return (
    <>
      <ul className={styles.paggination}>
        <li className={styles.paggination__item} key={'back'}>
          <button
            onClick={() => {
              setSearchParams(prev => {
                const currentPage = prev.get('page') ?? '1';
                let updatedPage = (+currentPage - 1).toString();

                if (updatedPage <= '0') {
                  updatedPage = '1';
                }

                prev.set('page', updatedPage);

                return prev;
              });
            }}
            className={styles.paggination__button}
          >
            <img
              className={styles.paggination__arrows}
              src="public/icons/ArrowLeft.svg"
              alt="arrow back"
            />
          </button>
        </li>
        {pages.map((elem, i) => {
          if (i === pages.length - 1) {
            return false;
          }

          return (
            <li className={styles.paggination__item} key={elem}>
              <button
                onClick={() => {
                  setSearchParams(prev => {
                    // const page = prev.get('page');

                    prev.set('page', (elem + 1).toString());

                    return prev;
                  });
                }}
                className={styles.paggination__button}
              >
                {elem + 1}
              </button>
            </li>
          );
        })}
        <li className={styles.paggination__item} key={'forward'}>
          <button
            // pageNumber > totalPages && pageNumber === totalPages
            onClick={() => {
              setSearchParams(prev => {
                const currentPage = prev.get('page');
                let updatedPage = currentPage && (+currentPage + 1).toString();

                if (updatedPage && +updatedPage > pages.length) {
                  updatedPage = pages.length.toString();
                }

                prev.set('page', updatedPage ?? '1');

                return prev;
              });
            }}
            className={styles.paggination__button}
          >
            <img
              className={styles.paggination__arrows}
              src="public/icons/ArrowRight.svg"
              alt="arrow forward"
            />
          </button>
        </li>
      </ul>
    </>
  );
};
