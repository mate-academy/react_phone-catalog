import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './PageTop.module.scss';
import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { Title } from '../Title';
// eslint-disable-next-line max-len
import ArrowLeft from '../../Icons/ChevronArrowLeft.svg?react';
import Home from '../../Icons/Home.svg?react';
import ArrowRight from '../../Icons/ChevronArrowRight.svg?react';

type Props = {
  back?: boolean;
  titleText: string;
  titleLevel: '1' | '2' | '3' | '4' | '5' | '6';
  modelsAmount?: number;
  itemsContent?: string | boolean;
  isBeadCrumbs?: boolean;
};
export const PageTop: React.FC<Props> = ({
  back = false,
  titleText,
  titleLevel,
  modelsAmount,
  itemsContent = 'models',
  isBeadCrumbs = true,
}) => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);
  const navigate = useNavigate();
  const fromRef = useRef(location.state?.from || '/');

  useEffect(() => {
    if (location.state?.from) {
      fromRef.current = location.state.from;
    }
  }, [location.state?.from]);
  const from = fromRef.current;

  return (
    <section className={styles['top-content']}>
      <main
        className={cn(styles['top-content__main'], {
          [styles['top-content__main-margin']]: !isBeadCrumbs,
        })}
      >
        {isBeadCrumbs && (
          <div className={styles['top-content__breadcrums']}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Home />
            </Link>
            <ul className={styles['top-content__list']}>
              {paths.map((path, idx) => {
                const fullPath = '/' + paths.slice(0, idx + 1).join('/');
                const isLast = idx === paths.length - 1;

                return (
                  <li key={fullPath} className={styles['top-content__item']}>
                    <ArrowRight className={styles['top-content__arrow']} />
                    {isLast ? (
                      <span className={styles['top-content__current']}>
                        {path.charAt(0).toUpperCase() + path.slice(1)}
                      </span>
                    ) : (
                      <Link
                        to={fullPath}
                        className={styles['top-content__link']}
                      >
                        {path.charAt(0).toUpperCase() + path.slice(1)}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {back && (
          <button
            onClick={() => navigate(from, { replace: true })}
            className={styles['top-content__back']}
          >
            <ArrowLeft className={styles['top-content__back-svg']} />
            <span className={styles['top-content__back-text']}>Back</span>
          </button>
        )}
        <Title text={titleText} titleLevel={titleLevel} />
        {itemsContent && (
          <p style={{ paddingTop: '8px' }}>
            {modelsAmount} {itemsContent}
          </p>
        )}
      </main>
    </section>
  );
};
