import classNames from 'classnames';
import { Accessory, Phone, Tablet } from '../../../../types/data';
import { TechSpecs } from '../../../../types/Descriprion';
import styles from './TechSpec.module.scss';

type Props = {
  item: Accessory | Phone | Tablet;
  category: string;
};

function convertObject(it: Accessory | Phone | Tablet) {
  const keys = Object.keys(it);
  const values = Object.values(it);
  const result: string[][] = [];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const isFind = TechSpecs.find(k => k === key);

    if (isFind) {
      const value = values[i].toString().split(',').join(', ');

      result.push([keys[i], value]);
    }
  }

  return result;
}

export const TechSpec: React.FC<Props> = ({ item }) => {
  const specs: string[][] = convertObject(item);

  return (
    <div className={classNames(styles.specs)}>
      <h3 className={classNames(styles.specs__title)}>Tech specs</h3>
      <div className={classNames(styles.specs__list)}>
        {specs.map((s, i) => (
          <div key={i} className={classNames(styles.specs__item)}>
            <span
              className={classNames(styles['specs__item--key'], {
                [styles['specs__item--key-upper']]: s[0] === 'ram',
              })}
            >
              {s[0]}
            </span>
            <span className={classNames(styles['specs__item--value'])}>
              {s[1]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
