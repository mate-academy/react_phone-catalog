import React from 'react'
import PropTypes from 'prop-types';
import classNames from "classnames";

const PaginationButtons = ({
  choosePage,
  page,
  pages,
  arrOfPages,
}) => {
  const buttonDisabledStart = classNames({
    'button--pagination_disabled': page === 1,
  });
  const buttonDisabledEnd = classNames({
    'button--pagination_disabled': page === pages,
  });

  return (
    <nav>
      <ul className="pagination__buttons">
        <li>
          <button
            type="button"
            className={`button button--pagination ${buttonDisabledStart}`}
            onClick={() => choosePage(page - 1)}
          > &#60;
          </button>
        </li>

        {
          arrOfPages.map((button, index) => (
            <li key={index}>
              <button
                type="button"
                className={`button button--pagination ${button === page ? 'button--pagination_active' : ''}`}
                onClick={() => choosePage(button)}
              >{button}</button>
            </li>
          ))
        }

        <li>
          <button
            type="button"
            className={`button button--pagination ${buttonDisabledEnd}`}
            onClick={() => choosePage(page + 1)}
          > &#62;
          </button>
        </li>
      </ul>
    </nav>
  );
}

PaginationButtons.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  choosePage: PropTypes.func.isRequired,
  arrOfPages: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default PaginationButtons;
