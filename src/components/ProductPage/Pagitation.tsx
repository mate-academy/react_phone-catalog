import React from 'react';
import CN from 'classnames';
import { useLocation, useHistory } from 'react-router-dom';
import './Pagination.scss';

type Props = {
  pageCount: number;
};

export const Pagination: React.FC<Props> = ({ pageCount }) => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const page = Number(searchParams.get('page')) || 1;
  const paginationButtonsArr = [...Array(pageCount)];

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;

    searchParams.set('page', target.value);
    history.push({
      search: searchParams.toString(),
    });
  };

  const handlePageNext = () => {
    searchParams.set('page', `${page + 1}`);
    history.push({
      search: searchParams.toString(),
    });
  };

  const handlePagePrev = () => {
    searchParams.set('page', `${page - 1}`);
    history.push({
      search: searchParams.toString(),
    });
  };

  return (
    <section className="pagination pagination__button button">
      <button
        className={CN('lift__button lift__button--left',
          { disabledBtn: page === 1 })}
        type="button"
        onClick={handlePagePrev}
        disabled={page === 1}
      >
        <img className="slide__buttonImg" src="./img/Icons/arrows/left.svg" alt="up arrow" />
      </button>
      {paginationButtonsArr.map((_, i) => (
        <button
          className={CN('button__count lift__button', { 'button__count--active': (i + 1) === page })}
          onClick={handleChangePage}
          type="button"
          value={i + 1}
        >
          {i + 1}
        </button>
      ))}
      <button
        className={CN('lift__button lift__button--right',
          { disabledBtn: page > (pageCount - 1) })}
        type="button"
        onClick={handlePageNext}
        disabled={page > (pageCount - 1)}
      >
        <img className="slide__buttonImg" src="./img/Icons/arrows/right.svg" alt="up arrow" />
      </button>
    </section>
  );
};
