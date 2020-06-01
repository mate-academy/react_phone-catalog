import React from 'react';

type PaginationProps = {
  pageNumbers: any;
};

const Pagination: React.FC<PaginationProps> = ({ pageNumbers }) => {

  console.log([...Array(pageNumbers)].map((_, i) => i + 1));

  return (
    <section className="pagination">
      <button
        type="button"
        className="pagination__button"
        aria-label="Previous"
      >
        <img src="img/arrow_left.svg" alt="arrow" />
      </button>
      <ul className="pagination__list">

            {[...Array(pageNumbers)].map((_, i: number) => (
              <li
                key={i}
                className="pagination__item"
              >
                <button
                  type="button"
                  className="pagination__button"
                >
                  {i + 1}
                </button>
              </li>
            ))}


      </ul>
      <button
        type="button"
        className="pagination__button"
        aria-label="Next"
      >
        <img src="img/arrow_right.svg" alt="arrow" />
      </button>
    </section>
  );
};

export default Pagination;
