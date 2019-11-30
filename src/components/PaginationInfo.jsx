import React from 'react';
import PropTypes from 'prop-types';

const PaginationInfo = ({ page, pages, phonesPerPage, phonesForShowing }) => {
  const firstPhoneOnCurrentPage = page === 1
    ? 1
    : (page - 1) * phonesPerPage + 1;
  const lastPhoneOnCurrentPage = page === pages
    ? phonesForShowing.length
    : page * phonesPerPage;
  
  return (
    <div>
      Shown {firstPhoneOnCurrentPage} - {lastPhoneOnCurrentPage} of {phonesForShowing.length}
    </div>
  )
}

PaginationInfo.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  phonesPerPage: PropTypes.number.isRequired,
  phonesForShowing: PropTypes.arrayOf(
    PropTypes.shape({
     age: PropTypes.number,
     carrier: PropTypes.string,
     id: PropTypes.id,
     imageUrl: PropTypes.string,
     name: PropTypes.string,
     snippet: PropTypes.string,
    })
  ),
};

export default PaginationInfo 