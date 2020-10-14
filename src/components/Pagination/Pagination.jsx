import React, { useCallback, useEffect, useState } from 'react';
import './Pagination.scss';
import classNames from 'class-names';
import { useHistory, useLocation } from 'react-router-dom';

export const Pagination = ({
  setStartIndex,
  itemsOnPage,
  buttons,
  startIndex,
  lastIndex,
  searchParams,
  total
}) => {
  const [active, setActive] = useState(1);
  const history = useHistory();

  useEffect(() => setActive(1), [itemsOnPage]);

  const updateSearchParam = useCallback(() => {
    searchParams.set('page', active);
    history.push({
      search: searchParams.toString()
    })
  })
  return (
    <div className="pagination store__pagination">
      <button className="pagination__button pagination__button_prev"
        disabled={startIndex === 0}
        onClick={() => {
          setStartIndex(+startIndex - +itemsOnPage);
          setActive(active - 1)
          updateSearchParam()
        }}
      >
      </button>
      {buttons.length && buttons.map(button => (
        <button
          name={button}
          key={button}
          className={classNames({
            pagination__button: true,
            pagination__button_active: active === button,
          })}
          onClick={event => {
            setStartIndex((+event.target.name - 1) * itemsOnPage);
            setActive(+event.target.name)
            updateSearchParam()
          }}
        >
          {button}
        </button>
      ))}
      <button
        className="pagination__button pagination__button_next"
        disabled={lastIndex === total}
        onClick={() => {
          setStartIndex(+startIndex + +itemsOnPage);
          setActive(active + 1)
          updateSearchParam()
        }}
      >
      </button>
    </div>
  )
} 