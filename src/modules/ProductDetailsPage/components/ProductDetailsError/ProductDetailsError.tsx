import { Link } from 'react-router-dom';
import { BackButton } from '../../../shared/components/BackButton';
import styles from './ProductDetailsError.module.scss';

export function ProductDetailsError(): JSX.Element {
  return (
    <div className={styles.container}>
      <BackButton />
      <h1 className={styles.title}>Product was not found</h1>
      <p className={styles.text}>
        The product you are looking for does not exist.
      </p>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
