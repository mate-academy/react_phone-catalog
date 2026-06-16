import classNames from 'classnames';
import styles from './RightsPage.module.scss';

export const RightsPage = () => (
  <main className={classNames('container', styles.rightsPage)}>
    <h1 className={classNames('font-h1', styles.title)}>Rights</h1>

    <section className={styles.content}>
      <p className="font-body">
        This project was created for educational purposes.
      </p>

      <p className="font-body">
        Product names, logos, images, and brands are used for demonstration
        only. All rights belong to their respective owners.
      </p>
    </section>
  </main>
);
