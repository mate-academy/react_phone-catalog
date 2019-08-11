import React from 'react';
import { Link } from 'react-router-dom';

import './slyles/pagination.css';

const Paginator = (props) => {
  const { currPage, pagesQtty, perPage, articlesQtty, perPageChange } = props;

  return (
    <div className="pagination">
      <div className="noBtn">
        &nbsp;{(currPage - 1) * perPage + 1} - {currPage * perPage} of {articlesQtty}&nbsp;
      </div>

      {currPage > 1
        ? <Link
            to={`/phones/pag=${currPage - 1}by${perPage}`}
            className="pagButton"
          >
            &nbsp;&nbsp;&nbsp;&lsaquo; Prev&nbsp;&nbsp;&nbsp;
          </Link>
        : <div className="noBtn">
            &nbsp;&nbsp;&nbsp;&lsaquo; Prev&nbsp;&nbsp;&nbsp;
          </div>
      }

      {currPage > 1 && <Link to={`/phones/pag=1by${perPage}`} className="pagButton">1</Link>}

      {currPage >= 4 && <div>&nbsp;...&nbsp;</div>}

      {currPage >= 3 && <Link to={`/phones/pag=${currPage - 1}by${perPage}`} className="pagButton">{currPage - 1}</Link>}

      <Link to={`/phones/pag=${currPage}by${perPage}`} className="pagButton currPage">{currPage}</Link>

      {currPage < pagesQtty && <Link to={`/phones/pag=${currPage + 1}by${perPage}`} className="pagButton">{currPage + 1}</Link>}

      {currPage < (pagesQtty - 2) && <div>&nbsp;...&nbsp;</div>}

      {currPage < (pagesQtty - 1)  && <Link to={`/phones/pag=${pagesQtty}by${perPage}`} className="pagButton">{pagesQtty}</Link>}

      {currPage > (pagesQtty - 1)
        ? <div className="noBtn">
            &nbsp;&nbsp;&nbsp;Next &rsaquo;&nbsp;&nbsp;&nbsp;
          </div>
        : <Link
            to={`/phones/pag=${currPage + 1}by${perPage}`}
            className="pagButton"
          >
            &nbsp;&nbsp;&nbsp;Next &rsaquo;&nbsp;&nbsp;&nbsp;
          </Link>
      }

      <select value={perPage} className="dropDown" onChange={(event) => perPageChange(event.target.value)}>
        <option value="3">&nbsp;3&nbsp;</option>
        <option value="6">&nbsp;6&nbsp;</option>
        <option value="9">&nbsp;9&nbsp;</option>
        <option value="18">&nbsp;18&nbsp;</option>
      </select>
    </div>
  );
};

export default Paginator;
