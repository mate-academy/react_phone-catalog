import styles from './AddToCart.module.scss';
import { useAppState } from '../../Context/AppContext';
import { getTranslation } from '../../modules/Base/utils/getTranslation';

type Props = {
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const AddToCart: React.FC<Props> = ({ onClick, isActive }) => {
  const { language } = useAppState();
  const t = getTranslation(language);

  return (
    <button
      className={`
      buttonText
      ${styles.button}
      ${isActive ? styles.isSelected : ''}
    `}
      onClick={onClick}
    >
      {isActive
        ? t.productDetailsPage.addedToCart
        : t.productDetailsPage.addToCart}
    </button>
  );
};
