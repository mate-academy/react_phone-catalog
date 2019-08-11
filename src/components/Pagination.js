import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
  state = {
    pages: [],
    perPage: 20,
    page: 1,
  }

  contentPerPage = [
    { label: 3 },
    { label: 6 },
    { label: 10 },
    { label: 20 },
  ];

  componentDidMount() {
    const { perPage } = this.state;
    const pagesNum = Math.ceil(this.props.total / perPage);

    this.setState({
      pages: Array.from({ length: pagesNum }, (a, b) => b + 1),
    });
  }

  handlePrev = () => {
    this.setState(state => ({ page: state.page - 1 }));
    this.props.togglePagination(this.state.page - 1, this.state.perPage);
  }

  handleNext = () => {
    this.setState(state => ({ page: state.page + 1 }));
    this.props.togglePagination(this.state.page + 1, this.state.perPage);
  }

  handleNum = (event) => {
    const val = event.target.id;

    this.props.togglePagination(val, this.state.perPage);
    this.setState({ page: +val });
  }

  toggleContentPerPage = (event) => {
    const { value } = event.target;
    const pagesNum = Math.ceil(this.props.total / +value);

    this.setState({
      perPage: +value,
      pages: Array.from({ length: pagesNum }, (a, b) => b + 1),
      page: 1,
    });

    this.props.togglePagination(1, +value);
  }

  render() {
    const {
      pages, page, perPage,
    } = this.state;

    return (
      <>
        <div className="pagination-box">
          <ul className={
            this.state.perPage === 20
              ? 'pagination-panel hidden'
              : 'pagination-panel'
          }
          >
            <li>
              <button
                className={
                  this.state.perPage === 20
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
              <li key={pageItem}>
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
                  this.state.perPage === 20
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
};
