//react-router
import { Link, useLocation, useNavigate } from 'react-router-dom';

//styles
import styles from './Breadcrumbs.module.scss';

//services
import classNames from 'classnames';

//assets
import homeIcon from './assets/icons/Home.svg';
import arrowRight from './assets/icons/Chevron (Arrow Right).svg';
import arrowLeft from './assets/icons/Chevron (Arrow Left).svg';

type Props = {
  backType?: true;
  mainLoc?: string;
  currentLoc?: string;
  className?: string;
};

export const Breadcrumbs: React.FC<Props> = ({
  mainLoc,
  currentLoc,
  className,
  backType,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const goUp = () => {
    const pathParts = location.pathname.split('/');

    pathParts.pop();

    const newPath = pathParts.join('/') || '/';

    navigate(newPath);
  };

  return (
    <div className={classNames(styles.breadcrumps, className)}>
      <ul className={styles.list}>
        {!backType && (
          <li>
            <Link to="/">
              <img src={homeIcon} alt="home" />
            </Link>
          </li>
        )}

        {mainLoc && (
          <li className={styles.listItem}>
            {backType ? (
              <img src={arrowLeft} alt="arrowLeft" />
            ) : (
              <img src={arrowRight} alt="arrowRight" />
            )}

            <a
              onClick={goUp}
              className={classNames(styles.link, {
                [styles['link--current']]: backType,
              })}
            >
              {backType ? 'back' : mainLoc}
            </a>
          </li>
        )}

        {currentLoc && (
          <li
            className={classNames(styles.listItem, styles['listItem--current'])}
          >
            <img src={arrowRight} alt="arrowRight" />
            <a className={classNames(styles.link, styles['link--current'])}>
              {currentLoc}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};
