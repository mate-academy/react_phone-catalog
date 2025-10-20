import React from 'react';
import styles from './BlockInform.module.scss';
import { Product } from '../../../../../../ProductsContext/TabsContext';
import { useProductActions } from '../../../../hooks/useProductActions';
import { InformMode } from '../../../../types/types';

interface BlockInformProps {
  element: Product;
  mode?: InformMode;
}
export const BlockInform: React.FC<BlockInformProps> = ({
  element,
  mode = InformMode.Card,
}) => {
  const { informCard, informList, techSpecsList } = useProductActions(element);

  const selectedInform =
    mode === InformMode.Product
      ? informList
      : mode === InformMode.TechSpecs
        ? techSpecsList
        : informCard;

  return (
    <div className={styles.blockInform}>
      {selectedInform.map((inf, index) => (
        <div key={index} className={styles.information}>
          <div className={styles.name}>{inf.name}</div>
          <div className={styles.value}>{inf.value}</div>
        </div>
      ))}
    </div>
  );
};
