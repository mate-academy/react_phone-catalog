import React from 'react';

export const Pangination: React.FC = () => {
  return (
    <>
      <nav
        className="pagination is-rounded"
        role="navigation"
        aria-label="pagination"
      >
        <a href="#" className="pagination-previous">
          Previous
        </a>
        <a href="#" className="pagination-next">
          Next page
        </a>
        <ul className="pagination-list">
          <li>
            <a href="#" className="pagination-link" aria-label="Goto page 1">
              1
            </a>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a href="#" className="pagination-link" aria-label="Goto page 45">
              45
            </a>
          </li>
          <li>
            <a
              className="pagination-link is-current"
              aria-label="Page 46"
              aria-current="page"
            >
              46
            </a>
          </li>
          <li>
            <a href="#" className="pagination-link" aria-label="Goto page 47">
              47
            </a>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a href="#" className="pagination-link" aria-label="Goto page 86">
              86
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
