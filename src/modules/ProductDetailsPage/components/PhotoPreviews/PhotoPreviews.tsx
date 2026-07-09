import classNames from 'classnames';
import s from './PhotoPreviews.module.scss';

type Props = {
  images: string[];
  activeImg: string;
  onActiveImg: (img: string, index: number) => void;
};

export const PhotoPreviews = ({ images, activeImg, onActiveImg }: Props) => {
  return (
    <div className={s.images}>
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          className={classNames([
            s.images__item,
            {
              [s['images__item--active']]: img === activeImg,
            },
          ])}
          alt={img}
          onClick={() => onActiveImg(img, index)}
        />
      ))}
    </div>
  );
};
