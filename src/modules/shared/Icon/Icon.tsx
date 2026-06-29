import styles from './Icon.module.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { IconStyles } from '../../../types/IconStyles';
import { getClassNames } from '../../../utils/classNames';

interface IconProps {
  className?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  iconStyles?: IconStyles;
  disabled?: boolean;
}

const Icon: React.FC<IconProps> = ({
  className,
  href,
  onClick,
  iconStyles,
  disabled,
}) => {
  const isLink = !!href;
  const isButton = !!onClick;

  const imageStyles = getClassNames('icon__img_', iconStyles?.image, styles);

  const iconClasses = cn(
    styles.icon,
    getClassNames('icon_', iconStyles?.icon, styles),
    className ?? '',
  );

  const imgElement = (
    <span className={`${styles.icon__img} ${imageStyles}`}></span>
  );

  if (isLink) {
    return (
      <Link to={href} className={cn(iconClasses, styles.icon__link)}>
        {imgElement}
      </Link>
    );
  }

  if (isButton) {
    return (
      <button
        className={iconClasses}
        onClick={onClick}
        disabled={disabled === undefined ? false : disabled}
      >
        {imgElement}
      </button>
    );
  }

  return <span className={iconClasses}>{imgElement}</span>;
};

export default Icon;
