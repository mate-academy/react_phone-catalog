import styles from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom';
import { Category } from '../../../../_types/products';
import { ArrowIcon } from '../../_constants/icons';
import { capitalizeFirstLetter } from '../../../../_services/services';
import classNames from 'classnames';

type Props = {
  category: Category;
  productName?: string | null;
};

export const Breadcrumbs: React.FC<Props> = ({
  category,
  productName = null,
}) => {
  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__home}></Link>
      <ArrowIcon />
      <Link
        to={`${category}`}
        className={classNames(styles.breadcrumbs__text, {
          [styles['breadcrumbs__text--primary']]: !!productName,
        })}
      >
        {capitalizeFirstLetter(category)}
      </Link>

      {!!productName && (
        <>
          <ArrowIcon />
          <div className={styles.breadcrumbs__text}>
            {capitalizeFirstLetter(productName)}
          </div>
        </>
      )}
    </div>
  );
};
