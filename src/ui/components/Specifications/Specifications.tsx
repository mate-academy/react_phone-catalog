import { Typography } from '../../base';

import './Specifications.scss';

interface Props<T> {
  productInfo: T;
  keys: Array<keyof T>;
  type: 'full' | 'mini';
}

export const Specifications = <T,>({ productInfo, keys, type }: Props<T>) => {
  const specifications = keys.reduce(
    (acc, k) => {
      // eslint-disable-next-line no-param-reassign
      const valueByKey = productInfo[k] as unknown;
      let value = '';

      if (Array.isArray(valueByKey)) {
        const v = valueByKey as Array<string | number>;

        value = v.join(', ');
      } else {
        value = valueByKey as string;
      }

      // eslint-disable-next-line no-param-reassign
      acc[k] = value;

      return acc;
    },
    {} as Record<keyof T, string>,
  );

  return (
    <ul className="specifications">
      {keys.map(k => (
        <li key={k as string} className="specifications__row">
          {type === 'mini' ? (
            <>
              <Typography
                type="text"
                size="sm"
                weight="600"
                textAlign="left"
                textTransform="capitalize"
                className="specifications__item specifications__item--prop"
              >
                {k as string}
              </Typography>
              <Typography
                type="text"
                size="sm"
                weight="600"
                textAlign="right"
                textTransform="capitalize"
                className="specifications__item specifications__item--value"
              >
                {specifications[k] as string}
              </Typography>
            </>
          ) : (
            <>
              <Typography
                type="text"
                weight="500"
                textAlign="left"
                textTransform="capitalize"
                className="specifications__item specifications__item--prop"
              >
                {k as string}
              </Typography>
              <Typography
                type="text"
                weight="500"
                textAlign="right"
                textTransform="capitalize"
                className="specifications__item specifications__item--value"
              >
                {specifications[k] as string}
              </Typography>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
