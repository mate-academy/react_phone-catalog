import styles from './Pagination.module.scss';

type Props = {
  total: number | undefined;
  perPage: number;
  // currentPage: number;
};

export const Pagination = ({ total, perPage }: Props) => {
  const getPages = (totalPages: number | undefined) => {
    return [...Array(totalPages)].map((_, i) => i + 1);
  };

  let totalPages = 0;

  if (total === undefined) {
    totalPages = 0;
  } else {
    totalPages = Math.ceil(total / perPage);
  }

  const pages = getPages(totalPages);

  return (
    <>
      <div>
        <ul className={styles.paggination}>
          <li className={styles.paggination__item} key={'back'}>
            <button className={styles.paggination__button}>
              <img
                className={styles.paggination__arrows}
                src="public/icons/ArrowLeft.svg"
                alt="arrow back"
              />
            </button>
          </li>
          {pages.map(elem => {
            return (
              <li className={styles.paggination__item} key={elem}>
                <button className={styles.paggination__button}>{elem}</button>
              </li>
            );
          })}
          <li className={styles.paggination__item} key={'forward'}>
            <button className={styles.paggination__button}>
              <img
                className={styles.paggination__arrows}
                src="public/icons/ArrowRight.svg"
                alt="arrow forward"
              />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
