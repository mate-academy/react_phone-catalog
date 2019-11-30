import React from 'react'

const PaginationButtons = ({ choosePage, page, arrOfPages }) => (
  <nav>
    <ul className="ulForArrOfPages">
      <li>
        <button
          onClick={() => choosePage(page - 1)}
        >Prev</button>
      </li>

      {
        arrOfPages.map((button, index) => (
          <li key={index}>
            <button
              onClick={() => choosePage(button)}
            >{button}</button>
          </li>
        ))
      }

      <li>
        <button
          onClick={() => choosePage(page + 1)}
        >Next</button>
      </li>
    </ul>
  </nav>
)

export default PaginationButtons