import styles from './ControlPagination.module.scss';
import { NavLink } from "react-router-dom"
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { TbCircleNumber1Filled } from "react-icons/tb";
export const ControlPagination = () => {
  return (<>
    <ul className={styles.pagination}>
      <li className={styles.agination__list} >
          <NavLink className={styles.pagination__icon}
            to="/next">
<IoIosArrowBack/>
          </NavLink>
        </li>

            <li>
              <NavLink className={styles.pagination__icon}

       >
         <TbCircleNumber1Filled/>
          </NavLink>
            </li>
   <li>
              <NavLink className={styles.pagination__icon}

       >
         <TbCircleNumber1Filled/>
          </NavLink>
            </li>
          <li>
              <NavLink className={styles.pagination__icon}

       >
         <TbCircleNumber1Filled/>
          </NavLink>
            </li>

        <li
          className={'link'}
          data-cy="prevItem"
        >
          <NavLink
            className={styles.pagination__icon}
            to="/prev"

            onClick={() => {}}
          >
            <IoIosArrowForward/>
          </NavLink>
        </li>
      </ul>
      </>)
}
