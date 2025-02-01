import styles from './Category.module.scss';
import mobileImg from '/img/category-mobile.svg';
import tabletsImg from '/img/category-tablets.svg';
import accessoriesImg from '/img/category-accessories.svg';

export const Category: React.FC = () => {
  return (
    <div className="container">
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.category_container}>
        <div className={styles.mobile_wrapper}>
          <a href='#' className={styles.mobile_link}>
            <img src={mobileImg} className={styles.mobile_img}></img>
          </a>
          <h3 className={styles.mobile_name}>Mobile phones</h3>
          <p className={styles.mobile_description}>models</p>
        </div>
        <div className={styles.tablets_wrapper}>
          <a href='#' className={styles.tablets_link}>
            <img src={tabletsImg} className={styles.tablets_img}></img>
          </a>
          <h3 className={styles.tablets_name}>Tablets</h3>
          <p className={styles.tablets_description}>models</p>
        </div>
        <div className={styles.accessories_wrapper}>
          <a href='#' className={styles.accessories_link}>
            <img src={accessoriesImg} className={styles.accessories_img}></img>
          </a>
          <h3 className={styles.accessories_name}>Accessories</h3>
          <p className={styles.accessories_description}>models</p>

        </div>
      </div>
    </div>
  )
}