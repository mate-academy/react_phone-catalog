import classNames from 'classnames';
import styles from './ShortSpec.module.scss';
import { SpecItem } from './types';

interface Props {
  specList: SpecItem[];
  className?: string;
}

export const ShortSpec: React.FC<Props> = ({ specList, className }) => {
  return (
    <ul className={classNames(styles['short-spec__list'], className)}>
      {specList.map(({ key, value }) => (
        <li className={styles['short-spec__item']} key={key}>
          <span className={styles['short-spec__key']}>{key}</span>
          <span className={styles['short-spec__value']}>{value}</span>
        </li>
      ))}
    </ul>
  );
};
