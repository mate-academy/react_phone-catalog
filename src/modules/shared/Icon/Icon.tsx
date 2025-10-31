import { Link } from 'react-router-dom';
import styles from './Icon.module.scss';
import { IconStyles } from '../../../types/IconStyles';

interface IconProps {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  iconStyles?: IconStyles;
}

const getImgClassName = (modifier: string) =>
  styles[('icon__img_' + modifier) as keyof typeof styles] || '';

const getIconClassName = (modifier: undefined | string) =>
  modifier ? styles[('icon_' + modifier) as keyof typeof styles] || '' : '';

const Icon: React.FC<IconProps> = ({ href, onClick, iconStyles }) => {
  const isLink = !!href;
  const isButton = !!onClick;

  const imageStyles = Array.isArray(iconStyles?.image)
    ? iconStyles.image.map(getImgClassName).join(' ').trim()
    : typeof iconStyles?.image === 'string'
      ? getImgClassName(iconStyles.image)
      : '';

  const iconClasses = [
    styles.icon,
    iconStyles?.border ? styles.icon_border : '',
    getIconClassName(iconStyles?.type),
    getIconClassName(iconStyles?.width),
    getIconClassName(iconStyles?.borderType),
  ].join(' ');

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
