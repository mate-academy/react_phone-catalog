// eslint-disable
/* eslint-disable */
import "./pagination.scss";
import { useSearchParams } from "react-router-dom";
// import { newPhoneArray } from '../assets/arrayOfPhones/phonesArray';
import { useContext,
  // useEffect,
  useState } from "react";
import { ArrowForward, ArrowBack } from "./ArrowButtons";
import { useSetCurrentPage } from "../helpers/utils";
import { StateContext } from '../AppContext';

export const Pagination: React.FC = () => {
  const { state } = useContext(StateContext);
  const [searchParams] = useSearchParams();
  const itemsPerPage = searchParams.get('itemsPerPage') || '4'
  const amountOfPages = Math.ceil(state.products.length / +itemsPerPage);
  const emptyArray: number[] = [];
  const [pages, _setPages] = useState(emptyArray);
  const page = searchParams.get('page') || 1;
  // const itemsPerPage = searchParams.get('itemsPerPage') || 16;
  const pageArray: number[] = [];

  for (let i = 1; i <= amountOfPages; i++) {
    pageArray.push(i);
  }
  console.log(amountOfPages, pageArray, pages, 'pages');

  // useEffect(() => {

  //   const pageArray: number[] = [];
  //   if (amountOfPages) {
  //     for (let i = 1; i <= amountOfPages; i++) {
  //       pageArray.push(i);
  //     }
  //     setPages(pageArray);

  //   }
  // }, [itemsPerPage])

  const setPage22 = useSetCurrentPage();

  function displayPageButton() {
    return pageArray.map(page => {
      return (
        <div
          className="button-square page mr-8"
          onClick={() => setPage22(page, 'page')}
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
