import classNames from 'classnames';
import styles from './ProductCardSkeleton.module.scss';
import { useLanguage } from '../Contexts/LanguageContext';
import { LoadingStatus } from '../../types/enums';

type Props = {
  loadingStatus: LoadingStatus;
  className?: string;
};

export const ProductCardSkeleton: React.FC<Props> = ({
  loadingStatus,
  className,
}) => {
  const { accessLoadingProducts, accessLoadingProductsFailed } =
    useLanguage().localeTexts;

  const buttonInfo =
    loadingStatus === LoadingStatus.Loading
      ? accessLoadingProducts
      : accessLoadingProductsFailed;

  return (
    <article
      className={classNames(
        styles.ProductCardSkeleton,
        loadingStatus === LoadingStatus.Loading &&
          styles.ProductCardSkeleton_loading,
        className,
      )}
    >
      <div className={styles.Image} />
      <span className={styles.TitleLink} />
      <div className={styles.Prices} />
      <div className={styles.Line} />

      <ul className={styles.Parameters}>
        <li className={styles.Parameter}>
          <p className={styles.ParameterName} />
          <p className={styles.ParameterValue} />
        </li>

        <li className={styles.Parameter}>
          <p className={styles.ParameterName} />
          <p className={styles.ParameterValue} />
        </li>

        <li className={styles.Parameter}>
          <p className={styles.ParameterName} />
          <p className={styles.ParameterValue} />
        </li>
      </ul>

      <div className={styles.Buttons}>
        <button type="button" disabled className={styles.AddToCartButton}>
          <span className={styles.ButtonLabel}>{buttonInfo}</span>
        </button>

        <button type="button" disabled className={styles.FavouriteButton}>
          <span className={styles.ButtonLabel}>{buttonInfo}</span>
        </button>
      </div>
    </article>
  );
};
