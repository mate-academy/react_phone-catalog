import classNames from 'classnames';
import styles from './Capacity.module.scss';
import { getSelectedItem } from '../../../../api';
import { useContext } from 'react';
import { DispatchContext } from '../../../../Store';
import { Details } from '../../../../types/Details';

type Props = {
  selectedProduct: Details;
};

export const Capacity: React.FC<Props> = ({ selectedProduct }) => {
  const { color, category, capacityAvailable, capacity, namespaceId } =
    selectedProduct;

  const dispatch = useContext(DispatchContext);

  const handleOnCapacityChange = (itemCapacity: string) => {
    const idForDispatch =
      `${namespaceId}-${itemCapacity}-${color}`.toLowerCase();

    getSelectedItem(category, idForDispatch).then(payload => {
      if (payload) {
        dispatch({ type: 'addSelectedProduct', payload });
      }
    });
  };

  return (
    <section className={classNames(styles.capacity)}>
      <span className={styles.capacity__header}>Available capacity</span>

      <div className={styles.capacity__list}>
        {capacityAvailable.map(cap => (
          <span
            key={cap}
            className={classNames(styles.capacity__item, {
              [styles['capacity__item-selected']]: cap === capacity,
            })}
            onClick={() => handleOnCapacityChange(cap)}
          >
            {cap}
          </span>
        ))}
      </div>
    </section>
  );
};
