import { useId } from 'react';
import { LoadingStatus } from '../../../shared/types/enums';
import { HandleReloadClick } from '../../../shared/types/handlers';
import styles from './ProductDetailedInfoSkeleton.module.scss';
import { DecorativeLine } from '../../../shared/components/DecorativeLine';
// eslint-disable-next-line max-len
import { ErrorNotification } from '../../../shared/components/ErrorNotification';
import classNames from 'classnames';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';

type Props = {
  loadingStatus: LoadingStatus;
  onReloadClick: HandleReloadClick;
  responseStatus?: number;
};

export const ProductDetailedInfoSkeleton: React.FC<Props> = ({
  loadingStatus,
  onReloadClick,
  responseStatus,
}) => {
  const id = useId();
  const { accessLoadingProducts, accessLoadingProductsFailed } =
    useLanguage().localeTexts;

  const displayError =
    loadingStatus !== LoadingStatus.Loading &&
    loadingStatus !== LoadingStatus.Idle;

  const buttonInfo = displayError
    ? accessLoadingProductsFailed
    : accessLoadingProducts;

  return (
    <section
      className={classNames(
        styles.ProductDetailedInfoSkeleton,
        (loadingStatus === LoadingStatus.Loading ||
          loadingStatus === LoadingStatus.Idle) &&
          styles.ProductDetailedInfoSkeleton_loading,
      )}
    >
      <h1 className={styles.Title} />

      <section className={styles.PhotosSlider}>
        <div className={styles.Image} />

        <ul className={styles.PhotoPreviews}>
          <li className={styles.PhotoPreview}>
            <button type="button" disabled className={styles.PreviewButton}>
              <span className={styles.Label}>{buttonInfo}</span>
            </button>
          </li>

          <li className={styles.PhotoPreview}>
            <button type="button" disabled className={styles.PreviewButton}>
              <span className={styles.Label}>{buttonInfo}</span>
            </button>
          </li>

          <li className={styles.PhotoPreview}>
            <button type="button" disabled className={styles.PreviewButton}>
              <span className={styles.Label}>{buttonInfo}</span>
            </button>
          </li>

          <li className={styles.PhotoPreview}>
            <button type="button" disabled className={styles.PreviewButton}>
              <span className={styles.Label}>{buttonInfo}</span>
            </button>
          </li>

          <li className={styles.PhotoPreview}>
            <button type="button" disabled className={styles.PreviewButton}>
              <span className={styles.Label}>{buttonInfo}</span>
            </button>
          </li>
        </ul>
      </section>

      <section className={styles.ProductDetailsControls}>
        <fieldset>
          <legend className={styles.Legend} />

          <ul className={styles.Options}>
            <li>
              <label
                htmlFor={`${id}ColorRadio1Option`}
                className={styles.Label}
              >
                {buttonInfo}
              </label>

              <input
                type="radio"
                disabled
                id={`${id}ColorRadio1Option`}
                className={styles.ColorOption}
              />
            </li>

            <li>
              <label
                htmlFor={`${id}ColorRadio2Option`}
                className={styles.Label}
              >
                {buttonInfo}
              </label>

              <input
                type="radio"
                disabled
                id={`${id}ColorRadio2Option`}
                className={styles.ColorOption}
              />
            </li>

            <li>
              <label
                htmlFor={`${id}ColorRadio3Option`}
                className={styles.Label}
              >
                {buttonInfo}
              </label>

              <input
                type="radio"
                disabled
                id={`${id}ColorRadio3Option`}
                className={styles.ColorOption}
              />
            </li>
          </ul>
        </fieldset>

        <DecorativeLine />

        <fieldset>
          <legend className={styles.Legend} />

          <ul className={styles.Options}>
            <li>
              <label htmlFor={`${id}TextRadio1Option`} className={styles.Label}>
                {buttonInfo}
              </label>

              <input
                type="radio"
                disabled
                id={`${id}TextRadio1Option`}
                className={styles.TextOption}
              />
            </li>

            <li>
              <label htmlFor={`${id}TextRadio2Option`} className={styles.Label}>
                {buttonInfo}
              </label>

              <input
                type="radio"
                disabled
                id={`${id}TextRadio2Option`}
                className={styles.TextOption}
              />
            </li>

            <li>
              <label htmlFor={`${id}TextRadio3Option`} className={styles.Label}>
                {buttonInfo}
              </label>

              <input
                type="radio"
                disabled
                id={`${id}TextRadio3Option`}
                className={styles.TextOption}
              />
            </li>
          </ul>
        </fieldset>

        <DecorativeLine className={styles.SecondLine} />

        <div className={styles.MainControls}>
          <div className={styles.Prices} />

          <div className={styles.Buttons}>
            <button type="button" disabled className={styles.AddToCartButton}>
              <span className={styles.Label}>{buttonInfo}</span>
            </button>

            <button type="button" disabled className={styles.FavouriteButton}>
              <span className={styles.Label}>{buttonInfo}</span>
            </button>
          </div>
        </div>

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

          <li className={styles.Parameter}>
            <p className={styles.ParameterName} />
            <p className={styles.ParameterValue} />
          </li>
        </ul>
      </section>

      <section className={styles.About}>
        <h2 className={styles.AboutTitle} />
        <DecorativeLine />

        <article className={styles.DescriptionParagraph}>
          <h3 className={styles.ParagraphTitle} />
          <p className={styles.Text} />
        </article>

        <article className={styles.DescriptionParagraph}>
          <h3 className={styles.ParagraphTitle} />
          <p className={styles.Text} />
        </article>

        <article className={styles.DescriptionParagraph}>
          <h3 className={styles.ParagraphTitle} />
          <p className={styles.Text} />
        </article>
      </section>

      <section className={styles.TechSpecs}>
        <h3 className={styles.TechSpecsTitle} />
        <DecorativeLine />

        <ul className={styles.TechSpecsParameters}>
          <li className={styles.Parameter}>
            <p className={styles.TechSpecsParameterName} />
            <p className={styles.TechSpecsParameterValue} />
          </li>

          <li className={styles.Parameter}>
            <p className={styles.TechSpecsParameterName} />
            <p className={styles.TechSpecsParameterValue} />
          </li>

          <li className={styles.Parameter}>
            <p className={styles.TechSpecsParameterName} />
            <p className={styles.TechSpecsParameterValue} />
          </li>

          <li className={styles.Parameter}>
            <p className={styles.TechSpecsParameterName} />
            <p className={styles.TechSpecsParameterValue} />
          </li>

          <li className={styles.Parameter}>
            <p className={styles.TechSpecsParameterName} />
            <p className={styles.TechSpecsParameterValue} />
          </li>

          <li className={styles.Parameter}>
            <p className={styles.TechSpecsParameterName} />
            <p className={styles.TechSpecsParameterValue} />
          </li>

          <li className={styles.Parameter}>
            <p className={styles.TechSpecsParameterName} />
            <p className={styles.TechSpecsParameterValue} />
          </li>

          <li className={styles.Parameter}>
            <p className={styles.TechSpecsParameterName} />
            <p className={styles.TechSpecsParameterValue} />
          </li>
        </ul>
      </section>

      {displayError && (
        <div className={styles.ErrorWrapper}>
          <ErrorNotification
            onReloadClick={onReloadClick}
            responseStatus={responseStatus}
          />
        </div>
      )}
    </section>
  );
};
