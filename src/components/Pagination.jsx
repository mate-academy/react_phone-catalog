import React from 'react'

const Pagination = ({ choosePage, page, pages, arrOfPages  }) => (
  <nav>
    <ul>
      <li>
        <a 
          // href=""
          onClick={() => choosePage(page - 1)}
        >
          Prev
        </a>
      </li>

      {
        arrOfPages.map((button, index) => (
          <li key={index}>
            <a
              onClick={() => choosePage(button)}
              // href="#"
            >{button}</a>
          </li>
        ))
      }

      <li>
        <a 
          // href=""
          onClick={() => choosePage(page + 1)}
        >
          Next
        </a>
      </li>
    </ul>
  </nav>
)

export default Pagination