import { Link } from 'react-router-dom';
import styles from './DetailsChange.module.scss';
import { BiCircle } from "react-icons/bi";
export const DetailsChange = ({colors}) => {
  return (<>
    <div className={styles.container}>
      <div className={styles.colors}>
        <div className={styles.colors__title}>
          <span className={styles.colors__text}>Available colors</span>
          <span className={styles.colors__text}>{`ID:` }</span>
        </div>
       <ul className={styles.colors__list}>
  {colors.map(color => (
    <li key={color} className={styles.colors__link}  style={{ backgroundColor: color }}>
      <Link ></Link>
    </li>
  ))}
</ul>
      </div>
    </div></>)
}
