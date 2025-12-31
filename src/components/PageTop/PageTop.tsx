import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Title } from '../Title';
import styles from './PageTop.module.scss';
import HomeIcon from '../../modules/shared/icons/iconHome.svg?react';
import ArrowIcon from '../../modules/shared/icons/iconArrow.svg?react';

type Props = {
  back?: boolean;
  titleText: string;
  titleLevel: number;
  modelsAmount?: number;
  itemsContent?: string | boolean;
  crums?: boolean;
};

export const PageTop: React.FC<Props> = ({
  back = false,
  titleText,
  titleLevel,
  modelsAmount,
  itemsContent = 'models',
  crums = true,
}) => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);
  const navigate = useNavigate();

  return (
    <section className={styles['top-content']}>
      {crums && (
        <div className={styles['top-content__breadcrums']}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon style={{ minWidth: '16px' }} />
          </Link>

          <ul className={styles['top-content__list']}>
            {paths.map((path, idx) => {
              const fullPath = '/' + paths.slice(0, idx + 1).join('/');
              const isLast = idx === paths.length - 1;

              return (
                <li key={fullPath} className={styles['top-content__item']}>
                  <ArrowIcon />

                  {isLast ? (
                    <span className={styles['top-content__current']}>
                      {path.charAt(0).toUpperCase() + path.slice(1)}
                    </span>
                  ) : (
                    <Link to={fullPath} className={styles['top-content__link']}>
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
          onClick={() => navigate(-1)}
          className={styles['top-content__back']}
          style={{ paddingTop: crums ? '0' : '24px' }}
        >
          <ArrowIcon
            style={{
              transform: 'rotate(180deg)',
              color: '#313237',
              minWidth: '16px',
            }}
          />
          <span className={styles['top-content__back-text']}>Back</span>
        </button>
      )}
      <Title text={titleText} level={titleLevel} />
      {(modelsAmount || itemsContent) && (
        <p style={{ paddingTop: '8px' }}>{`${modelsAmount} ${itemsContent}`}</p>
      )}
    </section>
  );
};
