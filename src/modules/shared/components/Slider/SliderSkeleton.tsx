//#region imports
import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import baseStyles from './base.module.scss';
//#endregion

type Props = {
  containerClass: string;
  sliderClass?: string;
  slidesCount: number;
  gap: number;
  renderSlide: () => ReactNode;
};

export const SliderSkeleton: FC<Props> = ({
  containerClass,
  sliderClass,
  slidesCount,
  gap,
  renderSlide,
}) => {
  const { t } = useTranslation('shared');

  return (
    <div className={sliderClass}>
      <div className={containerClass}>
        <ul
          className={baseStyles.slideList}
          style={{
            gap: `${gap}px`,
          }}
          aria-busy="true"
          aria-label={t('productSlides')}
        >
          {Array.from({ length: slidesCount }).map((_, i) => (
            <li key={i} className={baseStyles.slide}>
              {renderSlide()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
