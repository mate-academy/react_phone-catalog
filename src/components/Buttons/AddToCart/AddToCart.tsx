import { useTranslate } from '../../../hooks/useTranslate';
import style from './AddToCart.module.scss';
import cn from 'classnames';

type Props = {
  isInCart: boolean;
  handleClick: () => void;
};

export const AddToCart: React.FC<Props> = ({ isInCart, handleClick }) => {
  const t = useTranslate();
  const title = isInCart ? 'button.remove' : 'button.add';

  return (
    <button
      type="button"
      className={cn(style.addToCart, { [style.isAdded]: isInCart })}
      onClick={handleClick}
    >
      {t(title)}
    </button>
  );
};
