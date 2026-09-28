import { Link } from 'react-router-dom';

import { getAssetUrl } from '../shared/utils/assets';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <section className={styles.page}>
    <img src={getAssetUrl('img/page-not-found.png')} alt="" />
    <h1>Page not found</h1>
    <Link to="/">Go home</Link>
  </section>
);
