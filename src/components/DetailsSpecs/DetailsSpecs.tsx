import classNames from 'classnames';
import React from 'react';

type Props = {
  specs: { [key: string]: string | undefined };
  keys: string[];
  extraClass?: string;
};

export const DetailsSpecs: React.FC<Props> = ({
  specs,
  keys,
  extraClass,
}) => {
  return (
    <div className="details__specs">
      {keys.map(spec => (
        <div className="details__specs-row">
          <span
            className={classNames(
              'details__specs-title',
              { [extraClass as string]: extraClass },
            )}
          >
            {spec}
          </span>
          <span className={classNames(
            'details__specs-value',
            { [extraClass as string]: extraClass },
          )}
          >
            {specs[spec]}
          </span>
        </div>
      ))}
    </div>
  );
};
