import classNames from 'classnames';
import { IconButton } from '../../../shared/components/IconButton';
import {
  IconButtonSVGOption,
  LoadingStatus,
} from '../../../shared/types/enums';
import styles from './PicturesSliderSkeleton.module.scss';
// eslint-disable-next-line max-len
import { ErrorNotification } from '../../../shared/components/ErrorNotification';
import { HandleReloadClick } from '../../../shared/types/handlers';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';

type Props = {
  loadingStatus: LoadingStatus;
  onReloadClick: HandleReloadClick;
  responseStatus?: number;
  className?: string;
};

export const PicturesSliderSkeleton: React.FC<Props> = ({
  loadingStatus,
  onReloadClick,
  responseStatus,
  className,
}) => {
  const { accessLoadingPictures, accessLoadingPicturesFailed } =
    useLanguage().localeTexts;

  const buttonInfo =
    loadingStatus === LoadingStatus.Loading
      ? accessLoadingPictures
      : accessLoadingPicturesFailed;

  return (
    <article
      className={classNames(
        styles.PicturesSliderSkeleton,
        loadingStatus === LoadingStatus.Loading &&
          styles.PicturesSliderSkeleton_loading,
        className,
      )}
    >
      <IconButton
        svgOption={IconButtonSVGOption.LeftArrow}
        disabled
        label={buttonInfo}
        className={styles.SwipeButton}
      />

      <div className={styles.Wrapper}>
        <ul className={styles.List}>
          <li className={styles.PictureSlide} />
        </ul>
      </div>

      <IconButton
        svgOption={IconButtonSVGOption.RightArrow}
        disabled
        label={buttonInfo}
        className={styles.SwipeButton}
      />

      <ul className={styles.Dashes}>
        <li>
          <button disabled className={styles.Dash}>
            <span className={styles.DashLabel}>{buttonInfo}</span>
          </button>
        </li>

        <li>
          <button disabled className={styles.Dash}>
            <span className={styles.DashLabel}>{buttonInfo}</span>
          </button>
        </li>
      </ul>

      {loadingStatus !== LoadingStatus.Loading && (
        <ErrorNotification
          onReloadClick={onReloadClick}
          responseStatus={responseStatus}
        />
      )}
    </article>
  );
};
