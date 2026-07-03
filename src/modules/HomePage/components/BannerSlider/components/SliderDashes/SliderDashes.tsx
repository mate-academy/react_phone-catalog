//#region imports
import cn from 'classnames';
import { FC } from 'react';
import styles from './SliderDashes.module.scss';
import { useTranslation } from 'react-i18next';
//#endregion

type Props = {
  count: number;
  onClick: (step: number) => void;
  currentStep: number;
};

export const SliderDashes: FC<Props> = ({ count, onClick, currentStep }) => {
  const { t } = useTranslation('homePage');

  const realStep =
    currentStep === 0 ? count - 2 : currentStep === count - 1 ? 1 : currentStep;

  return (
    <ul className={styles.sliderDashes}>
      {Array.from({ length: count - 2 }).map((_, i) => {
        const isActive = realStep === i + 1;

        return (
          <li key={i}>
            <button
              className={styles.dashButton}
              onClick={() => onClick(i + 1)}
              aria-label={t('slide', { number: i + 1 })}
              aria-current={isActive ? 'true' : undefined}
            >
              <div
                className={cn(styles.dash, {
                  [styles.active]: isActive,
                })}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
};
