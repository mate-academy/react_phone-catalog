/* eslint-disable react/require-default-props */
import classNames from 'classnames';
import React from 'react';
import { typographyStyle } from '../CustomStyles/Typography';

type Props = {
  children?: React.ReactNode;
  active?: boolean;
};

export const StylishTextButton: React.FC<Props> = ({ children, active }) => {
  return (
    <button
      type="button"
      className={classNames(
        `h-8 w-8 border border-Elements transition-all hover:border-Primary ${typographyStyle.button}`,
        {
          'border-Primary bg-Primary text-white': active,
        },
      )}
    >
      {children}
    </button>
  );
};
