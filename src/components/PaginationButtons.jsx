import React from 'react'

const PaginationButtons = ({ choosePage, page, pages, arrOfPages }) => (
  <nav>
    <ul className="pagination__buttons">
      <li>
        <button
          className={
            page === 1
              ? "button button--pagination button--pagination_disabled"
              : "button button--pagination"
          }
          onClick={() => choosePage(page - 1)}
        > &#60; </button>
      </li>

      {
        arrOfPages.map((button, index) => (
          <li key={index}>
            <button
              className={
                (index + 1) === page
                  ? "button button--pagination button--pagination_active"
                  : "button button--pagination"
              }
              onClick={() => choosePage(button)}
            >{button}</button>
          </li>
        ))
      }

      <li>
        <button
          className={
            page === pages
              ? "button button--pagination button--pagination_disabled"
              : "button button--pagination"
          }
          onClick={() => choosePage(page + 1)}
        > &#62; </button>
      </li>
    </ul>
  </nav>
)

export default PaginationButtons