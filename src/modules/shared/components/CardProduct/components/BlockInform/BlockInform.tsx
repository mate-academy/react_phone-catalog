import React from 'react';
import styles from './BlockInform.module.scss';
import { Product } from '../../../../../../ProductsContext/TabsContext';
import { useProductActions } from '../../../../hooks/useProductActions';
import { InformMode } from '../../../../types/types';

interface BlockInformProps {
  element: Product;
  activeCapacity?: string;
  mode?: InformMode;
}
export const BlockInform: React.FC<BlockInformProps> = ({
  element,
  activeCapacity,
  mode = InformMode.Card,
}) => {
  const { informCard, informList, techSpecsList } = useProductActions(element);

  const selectedInform =
    mode === InformMode.Product
      ? informList
      : mode === InformMode.TechSpecs
        ? techSpecsList
        : informCard;

  const filtredInformation = selectedInform.map(el => {
    let value = el.value;

    if (Array.isArray(value)) {
      value = value.filter(v => v).join(', ');
    }

    if (el.name === 'Built in memory') {
      value = activeCapacity;
    }

    return { ...el, value: value };
  });

  return (
    <div className={styles.blockInform}>
      {filtredInformation.map((inf, index) => (
        <div key={index} className={styles.information}>
          <div className={styles.name}>{inf.name}</div>
          <div className={styles.value}>{inf.value}</div>
        </div>
      ))}
    </div>
  );
};
