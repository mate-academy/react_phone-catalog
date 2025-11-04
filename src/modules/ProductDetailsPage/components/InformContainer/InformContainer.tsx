import {
  BlockButtons,
  BlockInform,
  ContainerPrice,
} from '../../../shared/components/CardProduct/components';
import { InformMode } from '../../../shared/types/types';
import { useProduct } from '../../../shared/hooks/ProductContext';
import { AvailableColors } from '../AvailableColors';
import { SelectCapacity } from '../SelectCapacity';
import styles from './InformContainer.module.scss';

export const InformContainer = () => {
  const { product, sale, activeProduct } = useProduct();

  return (
    <div className={styles.informContainer}>
      <AvailableColors />

      <SelectCapacity />

      <div className={styles.goBuy}>
        <ContainerPrice
          element={product}
          sale={sale}
          activeProduct={activeProduct}
        />

        <BlockButtons element={product} />
      </div>

      <BlockInform element={product} mode={InformMode.Product} />
    </div>
  );
};
