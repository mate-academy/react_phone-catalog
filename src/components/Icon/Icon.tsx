import { ReactNode } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Icon.module.scss';

type Props = {
  icon: string,
  path?: string,
  alt?: string
  stylesName?: string,
  onClick?: () => void,
  isCarousel?: boolean,
  isDisabled?: boolean,
  children?: ReactNode,
};

export const Icon: React.FC<Props> = ({
  icon,
  path,
  alt = 'Icon',
  stylesName = '',
  onClick,
  isCarousel,
  isDisabled,
  children,
}) => {
  if (path) {
    return (
      <Link to={path} className={stylesName}>
        <img
          src={icon}
          alt={alt}
        />
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      type="button"
    >
      <img
        src={icon}
        alt={alt}
        className={classNames([styles.baseIcon], [stylesName], {
          [styles.disabled]: (isCarousel && !onClick?.name) || isDisabled,
        })}
      />
      {children}
    </button>
  );
};
