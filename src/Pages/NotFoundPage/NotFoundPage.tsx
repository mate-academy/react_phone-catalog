import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';
import ArrowLeft from '../../../public/img/Icons/arrow-left-Icon.svg';

type Props = {
  type: 'product' | 'page';
};

export const NotFoundPage: React.FC<Props> = ({ type }) => {
  let title;
  let imgSrc;

  if (type === 'product') {
    title = 'Product not found';
    imgSrc = 'img/product-not-found.png';
  } else {
    title = 'Page not found';
    imgSrc = 'img/page-not-found.png';
  }

  return (
    <div className={styles.productNotFound}>
      <img className={styles.productNotFoundImg} src={imgSrc} alt={title} />

      <div className={styles.productNotFoundBox}>
        <h2 className={styles.productNotFoundTitle}>{title}</h2>

        <div className={styles.linkBox}>
          <Link to="/" className={styles.backLink}>
            <img src={ArrowLeft} alt="Arrow Left" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
