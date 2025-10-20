import { Product } from '../../../../ProductsContext/TabsContext';
import styles from './CardProduct.module.scss';
import { ContainerPrice } from './components/ContainerPrice';
import { BlockButtons } from './components/BlockButtons';
import { BlockInform } from './components/BlockInform';
import { Title } from './components/Title';
import { useProductActions } from '../../hooks/useProductActions';

interface CardProductProps {
  element: Product;
  sale: boolean;
}

export const CardProduct: React.FC<CardProductProps> = ({ element, sale }) => {
  const { openProduct } = useProductActions(element);

  return (
    <div className={styles.container}>
      <div className={styles.above} onClick={openProduct}>
        <img src={element.image} alt={element.name} />
      </div>

      <div className={styles.bottom}>
        <Title element={element} />

        <ContainerPrice element={element} sale={sale} />

        <div className={styles.line}></div>

        <BlockInform element={element} />

        <BlockButtons element={element} />
      </div>
    </div>
  );
};
