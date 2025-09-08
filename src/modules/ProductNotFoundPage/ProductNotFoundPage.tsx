import styles from './ProductNotFoundPage.module.scss';
import { Link } from "react-router-dom";

export const ProductNotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <Link to={"/"} className={styles.notFoundLink}>
        <img
          className={styles.notFoundLinkArrow}
          src="/src/assets/icons/arrow-left.svg"
          alt="Arrow Left"
        />
        Back to home
      </Link>
      <h1>Product Not Found</h1>
      <div className={styles.notFoundImg}>
        <img
          src="/src/assets/img/product-not-found.png"
          alt="Page Not Found Image"
        />
      </div>
    </div>
  );
};
