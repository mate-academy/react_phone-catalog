import styles from './DetailsChange.module.scss';
import classNames from 'classnames';
import { FaRegCircle } from 'react-icons/fa';

type Props = {
  title: string;
  option: string[];
  selected: string;
  onSelect: (value: string) => void;
  type: 'color' | 'capacity';
};
export const DetailsChange = ({
  title,
  option,
  selected,
  onSelect,
  type,
}: Props) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.colors}>
          <div className={styles.colors__title}>
            <span className={styles.colors__text}>{title}</span>
            {type === 'color' && (
              <span className={styles.colors__text}>{`ID:`}</span>
            )}
          </div>
          <ul className={styles.colors__list}>
            {option.map(opt =>
              type === 'color' ? (
                <li
                  key={opt}
                  onClick={() => onSelect(opt)}
                  className={classNames(styles.colors__link, {
                    [styles['colors__link--active']]: opt === selected,
                  })}
                  style={{ backgroundColor: opt }}
                >
                  <FaRegCircle className={styles.colors__rectangle} />
                </li>
              ) : (
                <li
                  key={opt}
                  onClick={() => onSelect(opt)}
                  className={classNames(styles.storage__link, {
                    [styles['storage__link--active']]: opt === selected,
                  })}
                >
                  {opt}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
