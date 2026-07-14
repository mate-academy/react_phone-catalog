import classNames from 'classnames';
import { getImageUrl } from '../../../../../shared/utils/getImageUrl';
import styles from './ImageSelector.module.scss';

interface Props {
  images: string[];
  currentIndex: number;
  scrollTo: (index: number) => void;
  className: string;
}

export const ImageSelector: React.FC<Props> = ({
  images,
  currentIndex,
  scrollTo,
  className,
}) => (
  <ul className={classNames(styles['image-selector'], className)}>
    {images.map((image, index) => (
      <li className={styles['image-selector__item']} key={index}>
        <button
          className={classNames(styles['image-selector__button'], {
            [styles['image-selector__button--active']]: currentIndex === index,
          })}
          onClick={() => scrollTo(index)}
        >
          <img
            src={getImageUrl(image)}
            alt=""
            className={styles['image-selector__image']}
          />
        </button>
      </li>
    ))}
  </ul>
);
