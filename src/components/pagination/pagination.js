import React from 'react';
import shortid from 'shortid';

import './styles.css';
import PropTypes from 'prop-types';

const Pagination = ({
  withInfo, currentPage, buttons, onPageChange,
}) => {
  const renderDotsButton = () => (
    <li className="page-item disabled">
      <button
        className="page-link custom-page-link"
        type="button"
      >
        ...
      </button>
    </li>
  );
  const renderPrevOrNextButton = (buttonName) => {
    const buttonNum = buttonName.toLowerCase().trim().includes('prev')
      ? buttons[0]
      : buttons.length;

    return (
      <li
        className={`page-item ${currentPage === buttonNum
          ? 'disabled'
          : ''
        }`}
      >
        <button
          className="page-link custom-page-link"
          type="button"
          id={buttonNum}
          name={buttonName}
          onClick={onPageChange}
        >
          {buttonName}
        </button>
      </li>
    );
  };

  const renderSingleButton = (buttonNum, buttonName) => (
    <li
      key={shortid.generate()}
      className={`page-item ${currentPage === buttonNum
        ? 'active'
        : ''
      }`}
    >
      <button
        className="page-link custom-page-link"
        type="button"
        id={buttonNum}
        name={buttonName}
        onClick={onPageChange}
      >
        {buttonNum}
      </button>
    </li>
  );

  return (
    // eslint-disable-next-line max-len
    <div className="d-flex flex-wrap justify-content-between align-items-center">
      <div className="mb-2 pagination-info">
        <span>
          {withInfo}
        </span>
      </div>
      <nav aria-label="Page navigation" className="">
        <ul className="pagination justify-content-center">
          { renderPrevOrNextButton('Previous') }
          { buttons.length === 1
            ? ('')
            : (renderSingleButton(1, 'numbers'))
          }
          { currentPage < 4 ? ('') : (renderDotsButton()) }
          { buttons.filter(buttonNumber => (
            buttonNumber !== 1
              && buttonNumber !== buttons.length
              && (buttonNumber === currentPage - 1
                || buttonNumber === currentPage
                || buttonNumber === currentPage + 1
              )))
            .map(number => (
              renderSingleButton(number, 'numbers')
            ))
          }
          { currentPage > buttons.length - 3 ? ('') : (renderDotsButton()) }
          { buttons.length === 0
            ? ('')
            : (renderSingleButton(buttons.length, 'numbers'))
          }
          { renderPrevOrNextButton('Next') }
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  withInfo: PropTypes.string.isRequired,
  currentPage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  buttons: PropTypes.instanceOf(Array).isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default React.memo(Pagination);
