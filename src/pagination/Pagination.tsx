// eslint-disable
/* eslint-disable */
import classNames from "classnames";
import "./pagination.scss";
import { useSearchParams } from "react-router-dom";
import { ArrowForward, ArrowBack } from "./ArrowButtons";
import { useSetCurrentPage } from "../helpers/utils";

type Props = {
  pages: number,
}

export const Pagination: React.FC<Props> = ({ pages }) => {
  const [searchParams] = useSearchParams();
  const itemsPerPage = searchParams.get('itemsPerPage') || '4'
  const amountOfPages = Math.ceil(pages / +itemsPerPage);
  const page = searchParams.get('page') || '1';
  const pageArray: number[] = [];

  for (let i = 1; i <= amountOfPages; i++) {
    pageArray.push(i);
  }

  const setPage22 = useSetCurrentPage();

  function displayPageButton() {
    return pageArray.map(page2 => {
      return (
        <div
          className={classNames("button-square page mr-8",{
            "selected-page": page2 === +(searchParams.get('page') || '1')}
          )}
          onClick={() => setPage22(+page2, 'page')}
          key={page2}
        >
          {page2}
        </div>
      )
    })
  }

  return (
    <div className="pagination-total">

      <ArrowBack action={() => setPage22(+page > 1 ? +page - 1 : +page, 'page')} />

      <div className="page-block ">
        {displayPageButton()}
      </div>

      <ArrowForward action={() => setPage22(+page < pageArray.length ? +page + 1 : +page, 'page')} />

    </div>
  )
}
