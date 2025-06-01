import { TitlePages } from '../HomePage/components/title/TitlePages';
import styles from './PhonePage.module.scss';
import { FiHome } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
export const PhonePage = () => {

  return (<>
  <div className={styles.phone__link}>
      <FiHome className={styles.phone__icon } /> <IoIosArrowForward className={styles.phone__icon }/> <p className={styles.phone__link}>Phones</p>
  </div>
    <TitlePages type={'phones'} /></>)
};
