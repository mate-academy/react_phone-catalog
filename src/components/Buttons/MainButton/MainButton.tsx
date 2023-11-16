/* eslint-disable react/require-default-props */
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
  disabled?: boolean,
};

export const MainButton: React.FC<Props> = ({
  text,
  where = '',
  className,
  button = false,
  onClick = () => {},
  disabled = false,
}) => {
  const [searchParams] = useSearchParams();

  return (
    (button ? (
      <button
        className={classNames(
          'button button--main',
          className,
        )}
        type="button"
        onClick={onClick}
        disabled={disabled}
      >
        <p className="button--main__text">
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
            'button button--main',
            className,
          )
        }
      >
        <p className="button--main__text">
          {text}
        </p>
      </Link>
    ))
  );
};
