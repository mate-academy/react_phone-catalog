import classNames from 'classnames';
import styles from './PhotoPreviews.module.scss';
import { PhotoPreview } from '../PhotoPreview/PhotoPreview';
import { Category } from '../../../shared/types/enums';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';

type HandleClick = (newPosition: number) => void;

type Props = {
  photos: string[];
  position: number;
  productCategory: Category;
  onClick: HandleClick;
  className?: string;
};

export const PhotoPreviews: React.FC<Props> = ({
  photos,
  position,
  productCategory,
  onClick,
  className,
}) => {
  const {
    accessShowPhoto,
    accessPhonePhoto,
    accessTabletPhoto,
    accessAccessoryPhoto,
  } = useLanguage().localeTexts;

  let alt: string;

  switch (productCategory) {
    case Category.Phones:
      alt = accessPhonePhoto;
      break;
    case Category.Tablets:
      alt = accessTabletPhoto;
      break;
    case Category.Accessories:
      alt = accessAccessoryPhoto;
      break;
    default:
      throw new Error('Product category is not valid!!!');
  }

  return (
    <ul className={classNames(styles.PhotoPreviews, className)}>
      {photos.map((photo, index) => (
        <PhotoPreview
          key={photo}
          photo={photo}
          alt={`${alt} ${index + 1}`}
          label={`${accessShowPhoto} ${index + 1}`}
          active={index === position}
          onClick={() => onClick(index)}
          className={styles.PhotoPreview}
        />
      ))}
    </ul>
  );
};
