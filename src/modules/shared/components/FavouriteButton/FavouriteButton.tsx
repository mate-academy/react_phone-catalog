import classNames from 'classnames';
import { FullHeartSVG } from '../SVGs/FullHeartSVG';
import { HeartSVG } from '../SVGs/HeartSVG';
import styles from './FavouriteButton.module.scss';
import { useLanguage } from '../Contexts/LanguageContext';

type Props = {
  active?: boolean;
  className?: string;
};

export const FavouriteButton: React.FC<Props> = ({ active, className }) => {
  const { accessAddToFavourites, accessRemoveFromFavourites } =
    useLanguage().localeTexts;

  return (
    <button
      type="button"
      className={classNames(
        styles.FavouriteButton,
        active && styles.FavouriteButton_active,
        className,
      )}
    >
      {active ? <FullHeartSVG /> : <HeartSVG className={styles.Icon} />}

      <span className={styles.Label}>
        {active ? accessRemoveFromFavourites : accessAddToFavourites}
      </span>
    </button>
  );
};
