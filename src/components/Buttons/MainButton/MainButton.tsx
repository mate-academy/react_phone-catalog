/* eslint-disable react/require-default-props */
import React from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

import '../Button.scss';

type Props = {
  text: string,
  where?: string,
  className: string,
  button?: boolean,
  onClick?: () => void,
};

export const MainButton: React.FC<Props> = ({
  text,
  where = '',
  className,
  button = false,
  onClick = () => {},
}) => (
  (button ? (
    <button
      className={classNames(
        'button button--main',
        className,
      )}
      type="button"
      onClick={onClick}
    >
      <p className="button--main__text">
        {text}
      </p>
    </button>
  ) : (
    <Link
      to={where}
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
