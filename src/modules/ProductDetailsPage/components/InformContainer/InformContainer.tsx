import {
  BlockButtons,
  BlockInform,
  ContainerPrice,
} from '../../../shared/components/CardProduct/components';
import { InformMode } from '../../../shared/types/types';
import { useProduct } from '../../hooks/ProductContext';
import { AvailableColors } from '../AvailableColors';
import { SelectCapacity } from '../SelectCapacity';
import styles from './InformContainer.module.scss';

export const InformContainer = () => {
  const { product, sale } = useProduct();

  return (
    <div className={styles.informContainer}>
      <AvailableColors />

      <SelectCapacity />

      <div className={styles.goBuy}>
        <ContainerPrice element={product} sale={sale} />

        <BlockButtons element={product} />
      </div>

      <BlockInform element={product} mode={InformMode.Product} />
    </div>
  );
};
