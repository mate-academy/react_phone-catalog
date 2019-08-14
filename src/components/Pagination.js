import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
  contentPerPage = [
    { label: 3 },
    { label: 6 },
    { label: 10 },
    { label: 20 },
  ];

  handlePrev = () => {
    const { page, perPage, togglePagination } = this.props;

    togglePagination(page - 1, perPage);
  }

  handleNext = () => {
    const { page, perPage, togglePagination } = this.props;

    togglePagination(page + 1, perPage);
  }

  handleNum = (event) => {
    const { perPage, togglePagination } = this.props;
    const val = event.target.id;

    togglePagination(+val, perPage);
  }

  toggleContentPerPage = (event) => {
    const { togglePagination } = this.props;
    const { value } = event.target;

    togglePagination(1, +value);
  }

  render() {
    const { total, page, perPage } = this.props;

    const pages = Array.from(
      { length: Math.ceil(total / perPage) },
      (a, b) => b + 1
    );

    return (
      <>
        <div className="pagination-box">
          <ul className="pagination-panel">
            <li>
              <button
                className={
                  perPage === 20
                    ? 'btn btn-pgn prev-next hidden'
                    : 'btn btn-pgn prev-next'
                }
                type="button"
                disabled={page <= 1}
                onClick={() => this.handlePrev()}
              >
                {'<<'}
              </button>
            </li>

            {pages.map((pageItem, index) => (
              <li
                className={perPage === 20 ? 'hidden' : ''}
                key={pageItem}
              >
                {
                  <button
                    type="button"
                    className={
                      index + 1 === page
                        ? 'btn btn-pgn selected'
                        : 'btn btn-pgn'
                    }
                    id={index + 1}
                    onClick={this.handleNum}
                  >
                    {pageItem}
                  </button>
                }
              </li>
            ))}

            <li>
              <button
                className={
                  perPage === 20
                    ? 'btn btn-pgn prev-next hidden'
                    : 'btn btn-pgn prev-next'
                }
                type="button"
                onClick={this.handleNext}
                disabled={page > pages.length - 1}
              >
                {'>>'}
              </button>
            </li>
          </ul>
          <select
            className="per-page-select"
            defaultValue={perPage}
            onChange={this.toggleContentPerPage}
            title="perPage"
          >
            {this.contentPerPage.map(item => (
              <option key={item.label} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
}

Pagination.propTypes = {
  togglePagination: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};
