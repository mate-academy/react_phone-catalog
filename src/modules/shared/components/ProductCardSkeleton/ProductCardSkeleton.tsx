import classNames from 'classnames';
import styles from './ProductCardSkeleton.module.scss';
import { useId } from 'react';
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
  const id = useId();
  const { accessLoadingProducts, accessLoadingProductsFailed } =
    useLanguage().localeTexts;

  const buttonInfo =
    loadingStatus === LoadingStatus.Loading
      ? accessLoadingProducts
      : accessLoadingProductsFailed;

  return (
    <article
      className={classNames(
        loadingStatus === LoadingStatus.Loading &&
          styles.ProductCardSkeleton_loading,
        className,
      )}
    >
      <div className={styles.Card}>
        <div className={styles.Image} />
        <h4 className={styles.Title} />
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
      </div>

      <div className={styles.Buttons}>
        <div className={styles.AddToCart}>
          <label htmlFor={`cartButton${id}`} className={styles.ButtonLabel}>
            {buttonInfo}
          </label>

          <button
            id={`cartButton${id}`}
            type="button"
            disabled
            className={styles.Button}
          />
        </div>

        <div className={styles.AddToFavourite}>
          <label
            htmlFor={`favouriteButton${id}`}
            className={styles.ButtonLabel}
          >
            {buttonInfo}
          </label>

          <button
            id={`favouriteButton${id}`}
            type="button"
            disabled
            className={styles.Button}
          />
        </div>
      </div>
    </article>
  );
};
