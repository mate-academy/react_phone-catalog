import { Link } from 'react-router-dom';
import { assetUrl } from '../../utils/assets';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <section className={`container empty-state ${styles.page}`}>
    <img src={assetUrl('img/page-not-found.png')} alt="" />
    <h1>Page not found</h1>
    <p>Let’s get you back to the catalog.</p>
    <Link className="primary-button" to="/">
      Go to home page
    </Link>
  </section>
);
