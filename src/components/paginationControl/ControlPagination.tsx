import styles from './ControlPagination.module.scss';
import { NavLink } from "react-router-dom"
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {setCurrentPage} from '../../features/PaginationSlice'
export const ControlPagination = ({allGoods,perPages}) => {
  const dispatch = useAppDispatch();
const totalPages = Math.ceil(allGoods.length / perPages);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
const currentPage= useAppSelector(state=>state.pagination.currentPage)

  return (<>
    <ul className={styles.pagination}>
      <li className={styles.pagination__list} >
         <button
  onClick={() => dispatch(setCurrentPage(currentPage - 1))}
  disabled={currentPage === 1}
>
  <IoIosArrowBack />
</button>
      </li>
      {pages.map(page => {
        return<li className={styles.pagination__list} ><button
  onClick={() => dispatch(setCurrentPage(page))}
  className={page === currentPage ? styles.active : styles.pagination__link}
>
  {page}
        </button>
          </li>
      })
 }


       <li className={styles.pagination__list} >
          <button
 onClick={() => dispatch(setCurrentPage(currentPage + 1))}
  disabled={currentPage === totalPages}
>
  <IoIosArrowForward />
</button>
        </li>
      </ul>
      </>)
}
