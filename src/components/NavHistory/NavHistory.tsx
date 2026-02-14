import styles from './NavHistory.module.scss';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import cn from 'classnames';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useCheckMediaQuery from 'hooks/useCheckMediaQuery';

type NavHistoryProps = {
  productName?: string;
};

export const NavHistory = ({ productName }: NavHistoryProps) => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isMobile } = useCheckMediaQuery();

  return (
    <div className={styles.container}>
      <button
        className={styles.container__button}
        onClick={() => navigate('/')}
      >
        <FiHome color={'#313237'} />
      </button>
      <FiChevronRight color={'#89939A'} />
      <span>{type || pathname.slice(1)}</span>

      {!!id && productName && (
        <>
          <FiChevronRight color={'#89939A'} />
          <span
            className={cn({
              [styles.active]: true,
              [styles.container__truncate]: isMobile,
            })}
          >
            {productName}
          </span>
        </>
      )}
    </div>
  );
};
