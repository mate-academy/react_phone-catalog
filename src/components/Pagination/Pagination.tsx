import { useSearchParams } from 'react-router-dom';
import s from './Pagination.module.scss';

type Props = {
  currentPage: number,
  totalPages: number
};

export const Pagination: React.FC<Props> = ({ currentPage, totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const maxVisible = 7;

  const getPaginationRange = ()=> {
    if (totalPages <= maxVisible) {return Array.from({ length: totalPages }, (_, i) => i + 1);}

    const pages : (number | string)[] = [1];
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    if (left > 2) {pages.push('...');}
    for (let i = left; i <= right; i++) {pages.push(i);}

    if (right < totalPages - 1) {pages.push('...');}
    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPaginationRange();

  const handlePage =(pageNumber : number) =>{
    const newParams = new URLSearchParams(searchParams);
    pageNumber === 1 ? newParams.delete('page') : newParams.set('page', String(pageNumber));
    setSearchParams(newParams);
  };

  return (
    <nav className={s.pagination}>
      
      <button 
        className={s['pagination__button-prev']}
        
        onClick={() => currentPage !== 1 && handlePage(currentPage - 1)}
        disabled={currentPage === 1} 
      >
        <img src="img/icons/Arrow_left.png" alt="prev" />
      </button>

      <ul className={s.pagination__list}>
        {pageNumbers.map((number, index) => {
          const isPageNumber = typeof number === 'number';
          
          const buttonClasses = isPageNumber 
            ? `${s.pagination__button} ${currentPage === number ? s['pagination__button-active'] : ''}`
            : ''; 

          return (
            <li key={index} className={s.pagination__item}>
              {isPageNumber ? (
                <button
                  className={buttonClasses} 
                  onClick={() => handlePage(number)}
                >
                  {number}
                </button> 
              ) : (
                <span>{number}</span> 
              )}
            </li>
          );
        })}
      </ul>

      <button 
        className={s['pagination__button-next']}
        onClick={() => currentPage !== totalPages && handlePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src="img/icons/Arrow_right.png" alt="next" />
      </button>
    </nav>
  )
};

//   return(
//     <nav className={s.pagination}>
//       <button 
//         className={s['pagination__button-prev']}
//         onClick={()=>{
// currentPage === 1 ? null : handlePage(currentPage - 1)
// }}
//       >
//         <img src="img/icons/Arrow_left.png" alt="prev" />
//       </button>

//       <ul className={s.pagination__list}>
//         {pageNumbers.map((number, index) => {
//           return (
//             <li key={index} className={s.pagination__item}>
//               {typeof number === 'number' ? (
//                 className={`${s.pagination__button} ${currentPage === number? s['pagination__button-active']: null}`}
//                 onClick={()=> handlePage(number)}
//                 >
//                   {number}
//               </button> 
//                 : <span> {number}</span> }
//               )}
//             </li>
//           );
//         })}
//       </ul>

//       <button 
//         className={s['pagination__button-next']}
//         onClick={()=>{
// currentPage === totalPages ? null :handlePage(currentPage + 1)
// }}
//       >
//         <img src="img/icons/Arrow_right.png" alt="next" />
//       </button>
//     </nav>
//   );
// };
