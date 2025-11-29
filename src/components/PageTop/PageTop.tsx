import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './PageTop.module.scss';
import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { Title } from '../Title';
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M7.59087 0.807088C7.83161 0.619846 8.16872 0.619846 8.40946 0.807088L14.4095 5.47375C14.5718 5.60006 14.6668 5.79426 14.6668 5.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V5.99999C1.3335 5.79426 1.42848 5.60006 1.59087 5.47375L7.59087 0.807088ZM2.66683 6.32605V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V6.32605L8.00016 2.1779L2.66683 6.32605Z"
                  fill="#313237"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M5.3335 8.00001C5.3335 7.63182 5.63197 7.33334 6.00016 7.33334H10.0002C10.3684 7.33334 10.6668 7.63182 10.6668 8.00001V14.6667C10.6668 15.0349 10.3684 15.3333 10.0002 15.3333C9.63197 15.3333 9.3335 15.0349 9.3335 14.6667V8.66668H6.66683V14.6667C6.66683 15.0349 6.36835 15.3333 6.00016 15.3333C5.63197 15.3333 5.3335 15.0349 5.3335 14.6667V8.00001Z"
                  fill="#313237"
                />
              </svg>
            </Link>
            <ul className={styles['top-content__list']}>
              {paths.map((path, idx) => {
                const fullPath = '/' + paths.slice(0, idx + 1).join('/');
                const isLast = idx === paths.length - 1;

                return (
                  <li key={fullPath} className={styles['top-content__item']}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        // eslint-disable-next-line max-len
                        d="M5.52827 3.52861C5.78862 3.26826 6.21073 3.26826 6.47108 3.52861L10.4711 7.52861C10.7314 7.78896 10.7314 8.21107 10.4711 8.47141L6.47108 12.4714C6.21073 12.7318 5.78862 12.7318 5.52827 12.4714C5.26792 12.2111 5.26792 11.789 5.52827 11.5286L9.05687 8.00001L5.52827 4.47141C5.26792 4.21107 5.26792 3.78896 5.52827 3.52861Z"
                        fill="#B4BDC4"
                      />
                    </svg>

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
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M10.4717 3.52861C10.2114 3.26826 9.78927 3.26826 9.52892 3.52861L5.52892 7.52861C5.26857 7.78896 5.26857 8.21107 5.52892 8.47141L9.52892 12.4714C9.78927 12.7318 10.2114 12.7318 10.4717 12.4714C10.7321 12.2111 10.7321 11.789 10.4717 11.5286L6.94313 8.00001L10.4717 4.47141C10.7321 4.21107 10.7321 3.78896 10.4717 3.52861Z"
                fill="#313237"
              />
            </svg>

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
