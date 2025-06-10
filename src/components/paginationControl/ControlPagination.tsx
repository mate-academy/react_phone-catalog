import styles from './ControlPagination.module.scss';

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {setCurrentPage} from '../../features/PaginationSlice'
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';



export const ControlPagination = ({ allGoods, perPages }) => {
  const [searchParams, setSearhParams] = useSearchParams();
  const dispatch = useAppDispatch();
const totalPages = Math.ceil(allGoods.length / perPages);

const currentPage= useAppSelector(state=>state.pagination.currentPage)

const getVisiblePages = (totalPages: number, currentPage: number): number[] => {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 2) {
    return [1, 2, 3, 4];
  }

  if (currentPage >= totalPages - 1) {
    return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
};

  return (<><div className={styles.pagination}>
    <ul className={styles.pagination__flex}>
        <li className={classNames(styles.pagination__list,[styles['pagination__list--left']])} >
        <button className={classNames(styles.pagination__link, { [styles['pagination__link--disabled']]: currentPage === 1 })}
          onClick={() => {
            dispatch(setCurrentPage(currentPage - 1));
              const params = new URLSearchParams(searchParams)
            params.set('page', currentPage - 1)
            setSearhParams(params)

          }}

>
  <IoIosArrowBack />
</button>
      </li>
      {getVisiblePages(totalPages,currentPage).map(page => {
        return<li className={styles.pagination__list}  key = {page}><button
          onClick={() => {
            dispatch(setCurrentPage(page))
            const params = new URLSearchParams(searchParams)
            params.set('page', page)
            setSearhParams(params)
           }}
  className={classNames(styles.pagination__link,{[styles['pagination__link--active']]:page === currentPage})  }
>
  {page}
        </button>
          </li>
      })
 }


     <li className={classNames(styles.pagination__list,[styles['pagination__list--right']])} >
           <button className={classNames(styles.pagination__link,{[styles['pagination__link--disabled']]:currentPage === totalPages})}
          onClick={() => {
            dispatch(setCurrentPage(currentPage + 1))
              const params = new URLSearchParams(searchParams)
            params.set('page', currentPage + 1)
            setSearhParams(params)
          }}
  disabled={currentPage === totalPages}
>
  <IoIosArrowForward />
</button>
        </li>
      </ul></div>
      </>)
}
