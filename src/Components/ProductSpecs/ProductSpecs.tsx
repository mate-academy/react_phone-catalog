import React, { useMemo } from 'react';
import './ProductSpecs.scss';
import classNames from 'classnames';

type Props = {
  specs: { [key: string]: string | string[] };
  slimText?: boolean;
};

export const ProductSpecs: React.FC<Props> = ({ specs, slimText }) => {
  const classnamesSlim = useMemo(() => {
    return {
      'slim-text': slimText,
    };
  }, [slimText]);

  return (
    <div className="product-specs">
      {Object.entries(specs).map(([name, value], index) => (
        <div className="product-specs__entry" key={index}>
          <p
            className={classNames(
              'product-specs__entry-name small-text',
              classnamesSlim,
            )}
          >
            {name}
          </p>

          <p
            className={classNames(
              'product-specs__entry-value small-text',
              classnamesSlim,
            )}
          >
            {Array.isArray(value) ? value.join(', ') : value}
          </p>
        </div>
      ))}
    </div>
  );
};
