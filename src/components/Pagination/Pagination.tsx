import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './Pagination.scss';

type Props = {
  totalGadgets: number;
};

const Pagination: React.FC<Props> = ({ totalGadgets }) => {
  const location = useLocation();
  const history = useHistory();
  const urlSearchParam = new URLSearchParams(location.search);

  const itemPerPage = () => {
    if (
      urlSearchParam.get('paginationQuery') === 'All'
    || urlSearchParam.get('paginationQuery') === null
    ) {
      return totalGadgets;
    }

    return Number(urlSearchParam.get('paginationQuery'));
  };

  const paginationItems = Math.ceil(totalGadgets / itemPerPage());
  const paginationItemsArr: number[] = [];

  for (let i = 1; i <= paginationItems; i++) {
    paginationItemsArr.push(i);
  }

  const prevPage = () => {
    if (Number(urlSearchParam.get('page')) !== paginationItemsArr[0]) {
      urlSearchParam.set('page', `${Number(urlSearchParam.get('page')) - 1}`);
      history.push({
        search: urlSearchParam.toString(),
      });
    }
  };

  const nextPage = () => {
    if (Number(urlSearchParam.get('page')) !== paginationItemsArr[paginationItemsArr.length - 1]) {
      urlSearchParam.set('page', `${Number(urlSearchParam.get('page')) + 1}`);
      history.push({
        search: urlSearchParam.toString(),
      });
    }
  };

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination__button"
        onClick={prevPage}
        disabled={paginationItemsArr[0]
        === Number(urlSearchParam.get('page'))}
      >
        <img
          src="./img/icons/Pagination/arrow-left.png"
          alt="arrow left"
          className="pagination__button-img-left"
        />
      </button>
      <div className="pagination__page-button-wrapper">
        {paginationItemsArr.map(item => (
          <button
            key={item}
            type="button"
            className="pagination__button pagination__page-button"
            onClick={() => {
              urlSearchParam.set('page', `${item}`);
              history.push({
                search: urlSearchParam.toString(),
              });
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="pagination__button"
        onClick={nextPage}
        disabled={
          paginationItemsArr[paginationItemsArr.length - 1]
          === Number(urlSearchParam.get('page'))
        }
      >
        <img
          src="./img/icons/Pagination/arrow-right.png"
          alt="arrow right"
          className="pagination__button-img-right"
        />
      </button>
    </div>
  );
};

export default Pagination;
