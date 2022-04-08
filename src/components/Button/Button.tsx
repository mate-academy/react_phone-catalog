import { FunctionComponent } from 'react';

// Styles
import './Button.scss';

// Types
import { ButtonCallback } from '../../types/ButtonCallback';

type Props = {
  disablet: boolean;
  classModificator: string;
  callback: ButtonCallback;
};

export const Button: FunctionComponent<Props> = ({
  children,
  classModificator = '',
  disablet = false,
  callback,
}) => (
  <button
    type="button"
    className={`Button ${classModificator}`}
    disabled={disablet}
    onClick={() => callback()}
  >
    { children }
  </button>
);
