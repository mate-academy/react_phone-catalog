import { Link } from 'react-router-dom';
import styles from './Icon.module.scss';
import { IconStyles } from '../../../types/IconStyles';
import { getClassNames } from '../../../utils/classNames';

interface IconProps {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  iconStyles?: IconStyles;
}

const Icon: React.FC<IconProps> = ({ href, onClick, iconStyles }) => {
  const isLink = !!href;
  const isButton = !!onClick;

  const imageStyles = getClassNames('icon__img_', iconStyles?.image, styles);

  const iconClasses =
    styles.icon + ' ' + getClassNames('icon_', iconStyles?.icon, styles);

  const imgElement = (
    <span className={`${styles.icon__img} ${imageStyles}`}></span>
  );

  if (isLink) {
    return (
      <Link to={href} className={iconClasses}>
        {imgElement}
      </Link>
    );
  }

  if (isButton) {
    return (
      <button className={iconClasses} onClick={onClick}>
        {imgElement}
      </button>
    );
  }

  return <span className={iconClasses}>{imgElement}</span>;
};

export default Icon;
