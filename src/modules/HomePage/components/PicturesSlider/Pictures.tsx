import scss from './Pictures.module.scss';
import { slides } from '../../../../assets/slider/slider';
import classNames from 'classnames';
import { useMemo } from 'react';

interface Props {
  activeSlide: number;
}

const formatAlt = (fileName: string) =>
  fileName
    .replace('apple-', '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export const Pictures: React.FC<Props> = ({ activeSlide }) => {
  const alt = useMemo(() => formatAlt(slides[activeSlide]), [activeSlide]);

  return (
    <div className={scss.picture}>
      {slides.map((_, i) => {
        const shouldLoad = Math.abs(i - activeSlide) <= 1;

        return (
          <picture key={i}>
            <source srcSet={shouldLoad ? slides[i] : ''} type="image/webp" />
            <img
              srcSet={shouldLoad ? slides[i] : ''}
              alt={alt}
              className={classNames(scss.picture__img, {
                [scss.picture__img_active]: activeSlide === i,
              })}
              loading={shouldLoad ? 'eager' : 'lazy'}
              decoding="async"
            />
          </picture>
        );
      })}
    </div>
  );
};
