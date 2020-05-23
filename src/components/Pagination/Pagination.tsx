import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const Pagination = ({ pagesCount }: { pagesCount: number }) => {


  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  console.log('pagination',searchParams.toString())

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
  },[page])

  return (
    <div>
      <button
        type='button'
        name="<"
        disabled={isLeftButtonDisabled}
        onClick={handleButtonClick}
        >{"<"}
      </button>
      {buttons.map((_, index) => (
        <button
          name={index.toString()}
          onClick={handleButtonClick}
          type='button'
        >
          {index + 1}
        </button>
      ))}
      <button
        type='button'
        name=">"
        disabled={isRightButtonDisabled}
        onClick={handleButtonClick}
        >{">"}
      </button>
    </div>

  )

}


