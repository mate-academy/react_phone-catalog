import classNames from "classnames";
import styles from "./PageNav.module.scss"
import { FiHome } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const PageNav = () => {
  const location = useLocation();
  const currentLocation = location.pathname.split('/')[1];
  const locationName =  currentLocation.slice(0 ,1).toUpperCase() + currentLocation.slice(1);
  console.log(locationName)
  return (<div className={styles.page}>
    <NavLink to='/' className={styles.page__link}>
      <FiHome className={classNames(styles.page__icon,styles['page__icon--home'])}  />
    </NavLink>

    <IoIosArrowForward className={styles.page__icon} />
    <NavLink to={`/${currentLocation}`} className=
      {({ isActive }) => classNames(styles.page__text, { [styles['page__text--disabled']]: isActive })}>{ locationName}</NavLink>
    </div>)
}
