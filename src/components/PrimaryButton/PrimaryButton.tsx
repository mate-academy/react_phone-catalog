import { FunctionComponent } from 'react';
import classNames from 'classnames';

// Styles
import './PrimaryButton.scss';

// Types
import { ButtonCallback } from '../../types/ButtonCallback';

type Props = {
  selected: boolean;
  callback: ButtonCallback;
};

export const PrimaryButton: FunctionComponent<Props> = ({ children, selected, callback }) => (
  <button
    type="button"
    className={classNames('PrimaryButton', {
      'PrimaryButton--selected': selected,
    })}
    onClick={() => callback()}
  >
    {children}
  </button>
);
