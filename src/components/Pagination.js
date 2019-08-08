import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
  state = {
    phones: this.props.phones,
    pages: [],
    perPage: 20,
    page: 1,
  }

  contentPerPage = [
    { label: 3 },
    { label: 6 },
    { label: 10 },
    { label: this.state.phones.length },
  ];

  componentWillMount() {
    const { phones, perPage } = this.state;
    const pagesNum = Math.ceil(phones.length / perPage);

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
    const { phones } = this.state;
    const { value } = event.target;
    const pagesNum = Math.ceil(phones.length / +value);

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
          <ul className="pagination-panel">
            <li>
              <button
                className="btn btn-pgn prev-next"
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
                className="btn btn-pgn prev-next"
                type="button"
                onClick={this.handleNext}
                disabled={page > pages.length - 1}
              >
                {'>>'}
              </button>
            </li>
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
          </ul>
        </div>
      </>
    );
  }
}

Pagination.propTypes = {
  togglePagination: PropTypes.func.isRequired,
  phones: PropTypes.arrayOf(PropTypes.object).isRequired,
};
