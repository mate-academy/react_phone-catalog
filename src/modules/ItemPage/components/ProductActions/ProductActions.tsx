import { ProductDetails } from '../../../shared/types/ProductDetails';
import { CapacitySelector } from '../CapacitySelector';
import { ColorSelector } from '../ColorSelector';
import { PurchaseBlock } from '../PurchaseBlock';
import styles from './ProductActions.module.scss';
import classNames from 'classnames';

interface Props {
  product: ProductDetails;
  className?: string;
  currentCapacity: string;
  handleCapacityChange: (capacity: string) => void;
  currentColor: string;
  handleColorChange: (color: string) => void;
}

export const ProductActions: React.FC<Props> = ({
  product,
  className,
  currentCapacity,
  handleCapacityChange,
  currentColor,
  handleColorChange,
}) => {
  return (
    <div className={classNames(styles['product-actions'], className)}>
      <ColorSelector
        productId={product.id}
        colors={product.colorsAvailable}
        currentColor={currentColor}
        handleColorChange={handleColorChange}
      />

      <CapacitySelector
        capacities={product.capacityAvailable}
        currentCapacity={currentCapacity}
        handleCapacityChange={handleCapacityChange}
      />

      <PurchaseBlock
        priceRegular={product.priceRegular}
        priceDiscount={product.priceDiscount}
        product={product}
      />
    </div>
  );
};
