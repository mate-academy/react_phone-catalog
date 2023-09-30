/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useSearchParams } from 'react-router-dom';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { ArrowButton } from './ArrowButton';
import { useDiviceSize } from '../utils/useDeviceSize/useDiviceSize';

type Props = {
  paginationLength: number
};

export const Pagination:React.FC<Props> = ({ paginationLength }) => {
  const { paginationLimit, device } = useDiviceSize();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage') || 15;
  const isLimit = paginationLimit < paginationLength;
  const [showLast, setShowLast] = useState(isLimit);
  const [last, setLast] = useState(isLimit
    ? paginationLimit : paginationLength);
  const [first, setFirst] = useState(1);
  const showFirstItem = +page - paginationLimit > 1 || first > 1;

  const handleChangePage = (num: number) => {
    setShowLast(isLimit && +page !== paginationLength - 1);
    searchParams.set('page', `${num}`);
    setSearchParams(searchParams);

    if (isLimit) {
      if (num === 1) {
        setLast(paginationLimit);
        setFirst(num);
        setShowLast(true);

        return;
      }

      if (num === paginationLength) {
        setLast(paginationLength);
        setFirst(paginationLength - paginationLimit);
        setShowLast(false);

        return;
      }

      if (num < +page && paginationLength - +page + 1 < paginationLimit) {
        setShowLast(false);
      }

      if (+page === last && +page < paginationLength) {
        setLast(prev => prev + 1);
        setFirst(prev => prev + 1);
      }

      if (+page === first && +page > 1) {
        setFirst(prev => prev - 1);
        setLast(prev => prev - 1);
      }
    }
  };

  useEffect(() => {
    setLast(isLimit ? paginationLimit : paginationLength);
    setShowLast(isLimit);
  }, [perPage, device]);

  const createPagination = () => {
    const result = [];

    for (let i = first || 1; i <= last; i += 1) {
      result.push(
        <li
          key={i}
          className={classnames(
            'pagination__item',
            { 'is-active': +page === i },
          )}
          onClick={() => handleChangePage(i)}
        >
          {i}
        </li>,
      );
    }

    return result;
  };

  const paginationList = createPagination();

  return (
    <section className="pagination">
      <ArrowButton
        type="left"
        stop={+page === 1}
        onChangePosition={() => handleChangePage(+page - 1)}
      />
      {showFirstItem && (
        <li
          key={1}
          className={classnames(
            'pagination__item',
            { 'is-active': +page === 1 },
          )}
          onClick={() => handleChangePage(1)}
        >
          ...1
        </li>
      )}
      <ul className="pagination__list">
        {paginationList}
      </ul>

      {showLast && (
        <li
          key={paginationLength}
          className={classnames(
            'pagination__item',
            { 'is-active': +page === paginationLength },
          )}
          onClick={() => handleChangePage(paginationLength)}
        >
          ...
          {paginationLength}
        </li>
      )}
      <div className="right-button">
        <ArrowButton
          type="right"
          stop={+page === paginationLength}
          onChangePosition={() => handleChangePage(+page + 1)}
        />
      </div>
    </section>

  );
};
