import React from 'react';

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

export default PaginationInfo 