import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
    return (
        <section className={styles.notFoundPage}>
            <h1 className={styles.notFoundPage__title}>Page not found</h1>
            <Link to="/" className={styles.notFoundPage__link}>
                Go to Home
            </Link>
        </section>
    );
};
