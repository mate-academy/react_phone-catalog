import React from 'react';
import styles from './TechList.module.scss';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { ProductType } from '../../types/ProductType';

type Props = {
  parameters: string[];
  product: ProductType | Product;
  isBig?: boolean;
};

function addSpace(item: string, parameter: string) {
  const availableParams = ['screen', 'ram', 'capacity'];

  if (availableParams.includes(parameter)) {
    const value = parseFloat(item);
    const size = item.replace(`${value}`, '');

    return `${value} ${size}`;
  }

  return item;
}

export const TechList: React.FC<Props> = ({
  parameters,
  product,
  isBig = false,
}) => {
  return (
    <ul
      className={cn(styles['tech-list'], {
        [styles['tech-list--big']]: isBig,
      })}
    >
      {parameters.map(parameter => {
        const normalizedParam = parameter.toLowerCase() as keyof (
          | Product
          | ProductType
        );
        const option = product[normalizedParam];
        const isArray = Array.isArray(option);

        if (option) {
          return (
            <li className={styles['tech-list__item']} key={parameter}>
              <p className={styles['tech-list__parameter']}>
                <span className={styles['tech-list__parameter-name']}>
                  {parameter}
                </span>{' '}
                <span className={styles['tech-list__parameter-value']}>
                  {isArray
                    ? option.join(', ')
                    : addSpace(`${option}`, normalizedParam)}
                </span>
              </p>
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
};
