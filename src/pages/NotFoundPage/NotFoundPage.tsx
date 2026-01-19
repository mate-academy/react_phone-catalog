import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Plug } from '../../components/Plug';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.NotFoundPage}>
      <Plug
        label={t('pageNotFound.title')}
        image="img/page-not-found.png"
        description={t('pageNotFound.description')}
        size="lg"
      >
        <Link
          to="/"
          className={classNames(
            'button button--filled button--big button--width100',
          )}
        >
          Go to home
        </Link>
      </Plug>
    </div>
  );
};
