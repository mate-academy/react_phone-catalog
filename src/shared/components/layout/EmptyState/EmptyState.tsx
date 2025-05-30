import { Link } from 'react-router-dom';

import notFoundImg from 'assets/img/ui/product-not-found.png';

import { Icon } from 'shared/components/ui/Icon/Icon';
import { IconNames } from 'shared/components/ui/Icon/IconNames';

import styles from './EmptyState.module.scss';

type Props = {
  category: string;
};

export const EmptyState: React.FC<Props> = ({ category }) => {
  return (
    <div className={styles.notFoundProducts}>
      <div className={styles.back}>
        <Icon className={styles.arrowIcon} name={IconNames.Arrow} />
        <Link to="/">Back to home</Link>
      </div>
      <h1 className={styles.notFoundMessage}>There are no {category} yet.</h1>
      <img
        alt="No products found"
        className={styles.notFoundProductsImage}
        src={notFoundImg}
      />
    </div>
  );
};
