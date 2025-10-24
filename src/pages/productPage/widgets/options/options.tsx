import { Capacity, Colors } from '@shared/types';
import styles from './options.module.scss';
import { CapacityButton, ColorButton } from '../../ui';
import { OptionsProps } from '../../model';
import { LoadStatus } from '@shared/api';

type Props = {
  data: OptionsProps | LoadStatus;
};

const BACKUP_AMOUNT = 3;
const BACKUP_COLOR_ARRAY = Array(BACKUP_AMOUNT).fill(Colors.WHITE);
const BACKUP_CAPACITY_ARRAY = Array(BACKUP_AMOUNT).fill(Capacity.g32);

export const Options = ({ data }: Props) => {
  const colorsArray =
    typeof data === 'string' ? BACKUP_COLOR_ARRAY : data.arrays[0].options;
  const capacityArray =
    typeof data === 'string' ? BACKUP_CAPACITY_ARRAY : data.arrays[1].options;

  type OptionProps<T> = {
    to: string;
    value: T;
    active: boolean;
  };

  const getProps = <T extends Colors | Capacity>(
    item: T,
  ): OptionProps<T> | LoadStatus => {
    if (typeof data === 'string') {
      return data;
    }

    const isColor = Object.values(Colors).includes(item as Colors);
    const linkClone = [...data.link];

    if (isColor) {
      linkClone[2] = item;

      return {
        to: `/product/${linkClone.join('-')}`,
        value: item as Colors as T,
        active: item === data.arrays[0].active,
      };
    }

    linkClone[1] = item.toLowerCase();

    return {
      to: `/product/${linkClone.join('-')}`,
      value: item as Capacity as T,
      active: item === data.arrays[1].active,
    };
  };

  return (
    <>
      <section
        className={styles['options-list']}
        aria-labelledby={'color selector'}
      >
        <h3 className={styles['options-list--heading']} id={'color selector'}>
          Available colors
        </h3>
        <ul className={styles['options-list--buttons']}>
          {colorsArray.map((el, index) => (
            <li key={index} className={styles['options-list--item']}>
              <ColorButton data={getProps(el)} />
            </li>
          ))}
        </ul>
      </section>
      <section
        className={styles['options-list']}
        aria-labelledby={'capacity selector'}
      >
        <h3
          className={styles['options-list--heading']}
          id={'capacity selector'}
        >
          Select capacity
        </h3>
        <ul className={styles['options-list--buttons']}>
          {capacityArray.map((el, index) => (
            <li key={index} className={styles['options-list--item']}>
              <CapacityButton data={getProps(el)} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
