import classNames from 'classnames';

import styles from './NotFoundPage.module.scss';
import { Button } from '../shared/components/Button';
import { ROUTES } from '@/constants/routes';

export const NotFoundPage = () => {
  return (
    <div className={classNames('container', styles.wrapper)}>
      <h1 className="hidden">Page not found</h1>
      <section className={styles.content}>
        <h2 className={styles.message}>
          So sorry, <br />
          we coudn&apos;t find what you were looking for...
        </h2>
        <Button
          to={ROUTES.HOME}
          variant="primary"
          size="medium"
          className={styles.btn}
        >
          Go to home
        </Button>
      </section>
    </div>
  );
};
