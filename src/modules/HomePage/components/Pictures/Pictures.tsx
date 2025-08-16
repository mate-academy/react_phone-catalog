import scss from './Pictures.module.scss';
import { slides } from '../../../../assets/slider/slider';
import classNames from 'classnames';

interface Props {
  activeSlide: number;
}

export const Pictures: React.FC<Props> = ({ activeSlide }) => {
  const createAlt = () => {
    const oryginalString = slides[activeSlide];

    const withoutPrefix = oryginalString.replace('apple-', '');
    const words = withoutPrefix.split('-');

    const formattedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    const finalString = formattedWords.join(' ');

    return finalString;
  };

  return (
    <div className={scss.picture}>
      {slides.map((_, i) => {
        return (
          <picture key={i}>
            <source srcSet={slides[activeSlide]} type="image/webp" />
            <img
              src={slides[activeSlide]}
              alt={createAlt()}
              className={classNames(scss.picture__img, {
                [scss.picture__img_active]: activeSlide === i,
              })}
              loading="lazy"
              decoding="async"
            />
          </picture>
        );
      })}
    </div>
  );
};
