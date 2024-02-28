// eslint-disable
/* eslint-disable */
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
  const page = searchParams.get('page') || 1;
  const pageArray: number[] = [];

  for (let i = 1; i <= amountOfPages; i++) {
    pageArray.push(i);
  }

  const setPage22 = useSetCurrentPage();

  function displayPageButton() {
    return pageArray.map(page => {
      return (
        <div
          className="button-square page mr-8"
          onClick={() => setPage22(+page, 'page')}
          key={page}
        >
          {page}
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
