import React from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

import { resetSearchParams } from '../../../helpers/resetSearchParams';

import '../Button.scss';

type Props = {
  text: string,
  where?: string,
  className: string,
  button?: boolean,
  onClick?: () => void,
};

export const SecondaryButton: React.FC<Props> = React.memo(({
  text,
  where = '',
  className,
  button = false,
  onClick = () => {},
}) => {
  const [searchParams] = useSearchParams();

  return (
    (button ? (
      <button
        className={classNames(
          'button button--secondary',
          className,
        )}
        type="button"
        onClick={onClick}
      >
        <p className="button--secondary__text">
          {text}
        </p>
      </button>
    ) : (
      <Link
        to={{
          pathname: where,
          search: resetSearchParams(searchParams),
        }}
        className={
          classNames(
            'button button--secondary',
            className,
          )
        }
      >
        <p className="button--secondary__text">
          {text}
        </p>
      </Link>
    ))
  );
});
