import { Link } from 'react-router-dom';
import { Picture } from '../../types/types';
import classNames from 'classnames';
import styles from './PictureSlide.module.scss';

type Props = {
  picture: Picture;
  tabbable: boolean;
  isClicked: boolean;
  className?: string;
};

export const PictureSlide: React.FC<Props> = ({
  picture,
  tabbable,
  isClicked,
  className,
}) => {
  const { src, to, label, alt } = picture;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isClicked) {
      event.preventDefault();
    }
  };

  return (
    <li className={classNames(styles.PictureSlide, className)}>
      <Link
        to={to}
        draggable="false"
        aria-label={label}
        className={styles.Link}
        tabIndex={tabbable ? 0 : -1}
        onClick={handleClick}
      >
        <img src={src} alt={alt} draggable="false" className={styles.Image} />
      </Link>
    </li>
  );
};
