import styles from './Filter.module.scss';
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { setStatus } from "../../features/FilterSlice";
import { setStatusPagin } from '../../features/PaginationSlice';

import { DropDownMenu } from '../dropDownMenu/DropDownMenu';
import { useSearchParams } from 'react-router-dom';

export const Filter = () => {
  const [filterParams, setFilterParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const  status  = useAppSelector(state => state.filter.status);
const paginationStatus = useAppSelector(state=>state.pagination.status)
  const handleStatusChange = (value) => {
    dispatch(setStatus(value));

    const params = new URLSearchParams(filterParams);

    params.set('sort', value)
     setFilterParams(params)

  };
  const handleStatusPagination = (value) => {
    dispatch(setStatusPagin(value));
      const params = new URLSearchParams(filterParams);
    params.set('perPage', value)
     setFilterParams(params)
  }

  return (<>
  <form
      className={styles.filter}
      onSubmit={event => event.preventDefault()}>


 <div  className={styles.filter__drop}>

          <DropDownMenu value={status} onChange={handleStatusChange} type={'filter'} />
        </div>
      <div className={styles.filter__pagination}>
        <DropDownMenu value={paginationStatus} onChange={handleStatusPagination } type={'pagination'} /></div>



    </form>
   </>)
}


