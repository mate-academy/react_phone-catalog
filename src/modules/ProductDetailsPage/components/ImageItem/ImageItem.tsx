import styles from './ImageItem.module.scss';
import cn from 'classnames';

type ImageItemProps = {
  imageUrl: string;
  setSelectedImage: () => void;
  isSelected: boolean;
};

export const ImageItem = ({
  imageUrl,
  setSelectedImage,
  isSelected,
}: ImageItemProps) => {
  return (
    <div
      className={cn(styles.container, { [styles.selected]: isSelected })}
      onClick={setSelectedImage}
    >
      <img src={`/${imageUrl}`} alt="image-item" />
    </div>
  );
};
