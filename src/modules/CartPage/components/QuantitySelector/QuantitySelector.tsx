import { useCart } from '../../../shared/components/Contexts/CartContext';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { IconButton } from '../../../shared/components/IconButton';
import { IconButtonSVGOption } from '../../../shared/types/enums';
import { ProductInCart } from '../../../shared/types/types';
import styles from './QuantitySelector.module.scss';

type Props = {
  productInCart: ProductInCart;
};

export const QuantitySelector: React.FC<Props> = ({ productInCart }) => {
  const { id, quantity } = productInCart;

  const { handleQuantityIncrement, handleQuantityDecrement } = useCart();
  const {
    accessIncrementQuantity,
    accessDecrementQuantity,
    accessDecrementQuantityDisabled,
  } = useLanguage().localeTexts;

  const handleIncrementButtonClick = () => {
    handleQuantityIncrement(id);
  };

  const handleDecrementButtonClick = () => {
    handleQuantityDecrement(id);
  };

  return (
    <div className={styles.QuantitySelector}>
      <IconButton
        svgOption={IconButtonSVGOption.Minus}
        disabled={quantity <= 1}
        label={
          quantity <= 1
            ? accessDecrementQuantityDisabled
            : accessDecrementQuantity
        }
        onClick={handleDecrementButtonClick}
      />

      <output className={styles.Quantity}>{quantity}</output>

      <IconButton
        svgOption={IconButtonSVGOption.Plus}
        label={accessIncrementQuantity}
        onClick={handleIncrementButtonClick}
      />
    </div>
  );
};
