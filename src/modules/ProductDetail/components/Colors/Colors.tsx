import classNames from 'classnames';
import styles from './Colors.module.scss';
import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../../../Store';
import { Details } from '../../../../types/Details';
import { getSelectedItem } from '../../../../api';
import { getId } from '../../../../utils/getId';
import { removeSpaces } from '../../../../utils/removeSpaces';
import { Link } from 'react-router-dom';

type Props = {
  selectedProduct: Details;
};

export const Colors: React.FC<Props> = ({ selectedProduct }) => {
  const { products } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const { colorsAvailable, color, id, category, capacity, namespaceId } =
    selectedProduct;

  const handleOnColorChange = (itemColor: string) => {
    const idForDispatch =
      `${namespaceId}-${capacity}-${itemColor}`.toLowerCase();

    getSelectedItem(category, idForDispatch).then(payload => {
      if (payload) {
        dispatch({ type: 'addSelectedProduct', payload });
      }
    });
  };

  return (
    <section className={classNames(styles.colors)}>
      <div className={styles.colors__top}>
        <span className={styles.colors__header}>Available colors</span>
        <span
          className={styles.colors__id}
        >{`ID: ${getId(category, products, id)}`}</span>
      </div>

      <div className={styles.colors__bottom}>
        {colorsAvailable.map(item => {
          const correctedItem = removeSpaces(item);

          return (
            <Link
              key={item}
              to={`../${namespaceId}-${capacity.toLowerCase()}-${correctedItem}`}
              className={classNames(styles.colors__color, {
                [styles['colors__color-selected']]: correctedItem === color,
              })}
              onClick={() => handleOnColorChange(correctedItem)}
            >
              <span
                style={{ backgroundColor: `$colors_${correctedItem}` }}
                className={classNames(
                  styles['colors__color-bg'],
                  styles[`colors__color-${correctedItem}`],
                )}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
