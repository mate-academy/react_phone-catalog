import classNames from 'classnames';

type Props = {
  specs: { [key: string]: string | undefined };
  keys: string[];
  type?: string;
};

export const DetailsSpecs: React.FC<Props> = ({
  specs,
  keys,
  type,
}) => {
  return (
    <div className="details__specs">
      {keys.map(spec => (
        <div key={spec} className="details__specs-row">
          <span
            className={classNames(
              'details__specs-title',
              { [type as string]: !!type },
            )}
          >
            {spec}
          </span>
          <span className={classNames(
            'details__specs-value',
            { [type as string]: !!type },
          )}
          >
            {specs[spec]}
          </span>
        </div>
      ))}
    </div>
  );
};
