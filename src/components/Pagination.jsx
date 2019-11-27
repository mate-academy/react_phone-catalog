import React from 'react'

const Pagination = ({ page, pages, arrOfPages  }) => (
  <nav>
    <ul>
      <li>
        <a href="">
          Prev
        </a>
      </li>

      {
        arrOfPages.map(button => (
          <li>
            <a href="#">
              {button}
            </a>
          </li>
        ))
      }

      <li>
        <a href="">
          Next
        </a>
      </li>
    </ul>
  </nav>
)

export default Pagination