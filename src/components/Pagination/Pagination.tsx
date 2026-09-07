/* eslint-disable react-hooks/exhaustive-deps */
import './Pagination.scss';
import { useSearchParams } from 'react-router-dom';
import { getNumbers } from '../../utils/getNumbers';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import sliderArrow from '../../images/logo/sliderArrow.svg';

type Props = {
  itemsCount: number;
};

export const Pagination: React.FC<Props> = ({ itemsCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [transformValue, setTransformValue] = useState(
    searchParams.get('transform') || 0,
  );

  const translateX = +transformValue > 0 ? 40 : 0;

  const currentPage = searchParams.get('page') || 1;
  const itemsPerPage = searchParams.get('perPage') || 'All';

  const totalPages = Math.ceil(itemsCount / +itemsPerPage);
  const pagesCount = getNumbers(1, totalPages);

  const canContinue = +currentPage < pagesCount.length;
  const canComeBack = +currentPage > 1;

  const groupOfPages = (totPages: number) => {
    const groups = [];

    for (let i = 0; i <= totPages; i += 4) {
      groups.push(i);
    }

    return groups;
  };

  const totalGroups = useMemo(() => groupOfPages(totalPages), [totalPages]);

  const nextPage = () => {
    const params = new URLSearchParams(searchParams);

    if (totalGroups.includes(+currentPage)) {
      setTransformValue(+currentPage);
      params.set('transform', `${+currentPage}`);
    }

    if (canContinue) {
      params.set('page', `${+currentPage + 1}`);
    } else {
      params.get('page');
    }

    setSearchParams(params);
  };

  const previusPage = () => {
    const params = new URLSearchParams(searchParams);

    if (totalGroups.includes(+currentPage - 1)) {
      setTransformValue(+currentPage - 5);
      params.set('transform', `${+currentPage - 5}`);
    }

    if (canComeBack) {
      params.set('page', `${+currentPage - 1}`);
    } else {
      params.get('page');
    }

    setSearchParams(params);
  };

  const handleChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', page.toString());

    setSearchParams(params);
  };

  useEffect(() => {
    setTransformValue(0);
  }, [itemsPerPage]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  return (
    <div className="pagination">
      <button
        className={classNames('pagination__button pagination__button-previus', {
          'pagination__button-previus--disabled': !canComeBack,
        })}
        onClick={previusPage}
        disabled={!canComeBack}
      >
        <img
          src={sliderArrow}
          alt="ArrowLeft"
          className="pagination__button_img"
        />
      </button>

      <div className="pagination__section">
        <ul
          className="pagination__list"
          style={{
            transform: `translateX(-${+transformValue * translateX}px)`,
          }}
        >
          {pagesCount.map(page => (
            <li
              key={page}
              className={classNames('pagination__item', {
                'pagination__item--active': page === +currentPage,
              })}
              onClick={() => handleChange(page)}
            >
              {page}
            </li>
          ))}
        </ul>
      </div>

      <button
        className={classNames('pagination__button pagination__button-next', {
          'pagination__button-next--disabled': +currentPage === totalPages,
        })}
        onClick={nextPage}
        disabled={!canContinue}
      >
        <img
          src={sliderArrow}
          alt="ArrowRight"
          className="pagination__button_img"
        />
      </button>
    </div>
  );
};

Pagination.displayName = 'Pagination';
