import classNames from 'classnames';
import { imageUrl } from '../../../utils/imageUrl';
import styles from './Select.module.scss';

type Filter = {
  title: string;
  list: string[] | number[];
};

type Props = {
  filter: Filter;
};

export const Select = ({ filter }: Props) => {
  const isActive = false;

  return (
    <div className={styles.container}>
      <p className={styles.title}>{filter.title}</p>
      <div
        className={classNames(styles.select, {
          [styles.select__active]: isActive,
        })}
      >
        <p className={styles.select__header}>
          {filter.list[0]}
          <img
            src={imageUrl('icons/ArrowDown.svg')}
            alt=""
            className={styles.select__icon}
          />
        </p>
        <ul
          className={classNames(styles.list, {
            [styles.list__active]: isActive,
          })}
        >
          {filter.list.map((item, index) => {
            return (
              <li className={styles.list__item} key={index + '-' + item}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
