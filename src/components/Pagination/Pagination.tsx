import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Pagination.scss';

export const Pagination = ({ pagesCount }: { pagesCount: number }) => {


  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page") || "1");
  const buttons = new Array(Math.ceil(pagesCount)).fill(0);
  const isRightButtonDisabled = (page === buttons.length);
  const isLeftButtonDisabled = (page === 1);

  const handleButtonClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLButtonElement).name === ">") {
      searchParams.set("page", (page + 1).toString());
      history.push({
        search: searchParams.toString()
      });
      return;
    }
    if ((event.target as HTMLButtonElement).name === "<") {
      searchParams.set("page", (page - 1).toString());
      history.push({
        search: searchParams.toString()
      });
      return;
    }
    searchParams.set("page", (+(event.target as HTMLButtonElement).name + 1).toString());
    history.push({
      search: searchParams.toString()
    });
  }

  useEffect(() => {
    searchParams.set("page", page.toString());
    history.push({
      search: searchParams.toString()
    });
  }, [page])

  return (
    <div className="Pagination">
      <button
        className="Pagination__button Pagination__button--arrow"
        type='button'
        name="<"
        disabled={isLeftButtonDisabled}
        onClick={handleButtonClick}
      >{"<"}
      </button>
      {buttons.map((_, index) => (
        <button
        key={index}
        className={index + 1 === page
        ? "Pagination__button Pagination__button--active"
        : "Pagination__button"}

          name={index.toString()}
          onClick={handleButtonClick}
          type='button'
        >
          {index + 1}
        </button>
      ))}
      <button
        className="Pagination__button Pagination__button--arrow"
        type='button'
        name=">"
        disabled={isRightButtonDisabled}
        onClick={handleButtonClick}
      >{">"}
      </button>
    </div>

  )

}


