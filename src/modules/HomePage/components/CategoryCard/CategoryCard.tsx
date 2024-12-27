import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { LoadingStatus } from '../../../shared/types/enums';

type Props = {
  title: string;
  amountOfModels: number;
  to: string;
  src: string;
  imageScalePercentage: number;
  imageTopPositionPercentage: number;
  imageLeftPositionPercentage: number;
  backgroundColor: string;
  loadingStatus: LoadingStatus;
};

export const CategoryCard: React.FC<Props> = ({
  title,
  amountOfModels,
  to,
  src,
  imageScalePercentage,
  imageTopPositionPercentage,
  imageLeftPositionPercentage,
  backgroundColor,
  loadingStatus,
}) => {
  const { preModels, models } = useLanguage().localeTexts;

  const imageStyles = {
    width: `${imageScalePercentage}%`,
    top: `${imageTopPositionPercentage}%`,
    left: `${imageLeftPositionPercentage}%`,
  };

  return (
    <Link to={to} className={styles.CategoryCard}>
      <div
        className={styles.ImageWrapper}
        style={{ backgroundColor: backgroundColor }}
      >
        <img
          src={src}
          alt={title}
          className={styles.Image}
          style={imageStyles}
        />
      </div>

      <h4 className={styles.Title}>{title}</h4>

      <p className={styles.AmountOfModels}>
        {(loadingStatus === LoadingStatus.Success ||
          loadingStatus == LoadingStatus.NoData) &&
          `${preModels} ${amountOfModels} ${models}`}
      </p>
    </Link>
  );
};
