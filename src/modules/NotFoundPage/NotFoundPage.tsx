// 404 page adapted from:
// https://codepen.io/arcs/pen/vOwJBw

import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <section className={styles.page404}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.colSm12}>
            <div className={styles.colSm10}>
              <div className={styles.fourZeroFourBg}>
                <h1 className={styles.textCenter}>404</h1>
              </div>

              <div className={styles.contentBox404}>
                <h3 className={styles.h2}>You look lost!</h3>

                <p>The page you searched for does not exist.</p>

                <Link to="/" className={styles.link404}>
                  Back to HomePage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
