/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useSearchParams } from 'react-router-dom';
import classnames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from './ArrowButton';
import { useDiviceSize } from '../utils/useDiviceSize';

type Props = {
  paginationLength: number
};

export const Pagination:React.FC<Props> = ({ paginationLength }) => {
  const { buttonWidth, paginationLimit } = useDiviceSize();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const [shift, setShift] = useState(0);
  const lastVisiblePage = useRef(+page);
  const firstVisiblePage
  = useRef(0);
  const paginationGap = 8;
  const step = buttonWidth + paginationGap;

  useEffect(() => {
    if (paginationLimit) {
      if (+page > paginationLimit && +page > lastVisiblePage.current) {
        setShift(prev => prev + step);
        lastVisiblePage.current = +page;
        firstVisiblePage.current
         = lastVisiblePage.current - paginationLimit + 1;
      }

      if (+page < firstVisiblePage.current) {
        setShift(prev => prev - step);
        lastVisiblePage.current -= 1;
        firstVisiblePage.current -= 1;
      }
    }
  }, [page]);

  const handleChangePage = (num: number) => {
    searchParams.set('page', `${num}`);
    setSearchParams(searchParams);
  };

  const createPagination = () => {
    if (!paginationLength) {
      return (<li className="pagination__item is-active">1</li>);
    }

    const result = [];

    for (let i = 0; i < paginationLength; i += 1) {
      result.push(
        <li
          key={i + 1}
          className={classnames(
            'pagination__item',
            { 'is-active': +page === i + 1 },
          )}
          onClick={() => handleChangePage(i + 1)}
          style={{ left: -shift }}
        >
          {i + 1}

        </li>,
      );
    }

    return result;
  };

  useEffect(() => setShift(0), [paginationLimit]);

  const paginationList = createPagination();

  return (
    <section className="pagination">
      <ArrowButton
        type="left"
        stop={+page === 1}
        onChangePosition={() => handleChangePage(+page - 1)}
      />
      <ul className="pagination__list">
        {paginationList}
      </ul>
      <ArrowButton
        type="right"
        stop={+page === paginationLength}
        onChangePosition={() => handleChangePage(+page + 1)}
      />
    </section>
  );
};
