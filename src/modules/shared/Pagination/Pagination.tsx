// import React from 'react';
// import './Pagination.scss';

// interface Props {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// export const Pagination: React.FC<Props> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   return (
//     <div className="pagination">
//       <button
//         className={`pagination__button-prevPage ${currentPage === 1 ? 'pagination__button-disabled pagination__button-disabled--prevPage' : ''}`}
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       />
//       <div className="pagination__button-container">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index + 1}
//             className={`pagination__button-page ${currentPage === index + 1 ? 'pagination__button-page--active' : ''}`}
//             onClick={() => onPageChange(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//       <button
//         className={`pagination__button-nextPage ${currentPage === totalPages ? 'pagination__button-disabled pagination__button-disabled--nextPage' : ''}`}
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       />
//     </div>
//   );
// };

import React from 'react';
import './Pagination.scss';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Количество отображаемых страниц (3 страницы вокруг текущей)
  const pageLimit = 4; // 3 страницы вокруг, включая текущую

  // Вычисление начальной и конечной страницы
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 2);

  // Если не хватает страниц с одной из сторон, сдвигаем диапазон
  if (endPage - startPage < pageLimit) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + pageLimit - 1);
    } else {
      startPage = Math.max(1, endPage - pageLimit + 1);
    }
  }

  return (
    <div className="pagination">
      <button
        className={`pagination__button-prevPage ${currentPage === 1 ? 'pagination__button-disabled pagination__button-disabled--prevPage' : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <div className="pagination__button-container">
        {/* Отображение кнопок для страниц */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            className={`pagination__button-page ${currentPage === startPage + index ? 'pagination__button-page--active' : ''}`}
            onClick={() => onPageChange(startPage + index)}
          >
            {startPage + index}
          </button>
        ))}
      </div>
      <button
        className={`pagination__button-nextPage ${currentPage === totalPages ? 'pagination__button-disabled pagination__button-disabled--nextPage' : ''}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};
