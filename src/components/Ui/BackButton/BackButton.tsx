import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './BackButton.module.scss';

const cx = classNames.bind(styles);

type Props = {
  fallbackTo?: string;
  children?: string;
};

export const BackButton = ({ fallbackTo = '/', children = 'Back' }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.key === 'default') {
      navigate(fallbackTo, { replace: true });

      return;
    }

    navigate(-1);
  };

  return (
    <button type="button" className={cx('back-button')} onClick={handleClick}>
      <svg
        className={cx('back-button__icon')}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 3.5L5.5 8L10 12.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{children}</span>
    </button>
  );
};
