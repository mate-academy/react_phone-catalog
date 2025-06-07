
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './Pagination.module.scss';
import { setStatus } from '../../features/PaginationSlice';


export const Pagination = () => {
  const dispach = useAppDispatch();
  const  paginationStatus= useAppSelector(state=>state.pagination.status)
  const handleStatusChange = (event) => {
  dispach(setStatus(event.target.value as '4'| '8'| '16'|'all' ))
  }

  return (<>
    <select

            className={styles.pagination}
onChange={handleStatusChange}
         value={paginationStatus}  >
            <option value="all">all</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>

          </select></>)
}
