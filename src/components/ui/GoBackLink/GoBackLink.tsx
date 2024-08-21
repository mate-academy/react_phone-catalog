import classNames from 'classnames';
import { Icon } from '../../ui/Icon';
import styles from './GoBackLink.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const GoBackLink = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  const isSpecialRoute = pathname === '/cart' || pathname === '/favorites';

  const handleGoBack = (event: React.MouseEvent) => {
    event.preventDefault();
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('..');
    }
  };

  return (
    <div className={styles.goBack}>
      <span className={styles.goBack__link}>
        <Icon iconName="left" />
        {isSpecialRoute ? (
          <Link
            to="#"
            onClick={handleGoBack}
            className={classNames('small-text', styles.goBack__text)}
          >
            Back
          </Link>
        ) : (
          <Link
            to={{ pathname: '..', search: state?.search }}
            className={classNames('small-text', styles.goBack__text)}
          >
            Back
          </Link>
        )}
      </span>
    </div>
  );
};
