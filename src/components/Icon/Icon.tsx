import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Icon.module.scss';

type Props = {
  path?: string,
  icon: string,
  alt?: string
  stylesName?: string,
  onClick?: () => void,
  isCarousel?: boolean,
};

export const Icon: React.FC<Props> = ({
  path,
  icon,
  alt = 'Icon',
  stylesName = '',
  onClick,
  isCarousel,
}) => {
  if (path) {
    return (
      <Link to={path}>
        <img
          src={icon}
          alt={alt}
          className={stylesName}
        />
      </Link>
    );
  }

  return (
    <button onClick={onClick} type="button">
      <img
        src={icon}
        alt={alt}
        className={classNames([styles.baseIcon], [stylesName], {
          [styles.disabled]: isCarousel && !onClick?.name,
        })}
      />
    </button>
  );
};
