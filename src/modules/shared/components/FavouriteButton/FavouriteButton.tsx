import classNames from 'classnames';
import { FullHeartSVG } from '../SVGs/FullHeartSVG';
import { HeartSVG } from '../SVGs/HeartSVG';
import styles from './FavouriteButton.module.scss';
import { useId } from 'react';
import { useLanguage } from '../Contexts/LanguageContext';

type Props = {
  active?: boolean;
  className?: string;
};

export const FavouriteButton: React.FC<Props> = ({ active, className }) => {
  const id = useId();
  const { accessAddToFavourites, accessRemoveFromFavourites } =
    useLanguage().localeTexts;

  return (
    <div
      className={classNames(
        styles.FavouriteButton,
        active && styles.FavouriteButton_active,
        className,
      )}
    >
      <label htmlFor={id} className={styles.Label}>
        {active ? accessRemoveFromFavourites : accessAddToFavourites}
      </label>

      <button id={id} type="button" className={styles.Button}>
        {active ? <FullHeartSVG /> : <HeartSVG className={styles.Icon} />}
      </button>
    </div>
  );
};
