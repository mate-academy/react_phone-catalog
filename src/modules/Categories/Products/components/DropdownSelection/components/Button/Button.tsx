import classNames from 'classnames';
import React from 'react';

import SCSSVariables from '../../../../../../../utils/Variables.module.scss';
import linkStyles from '../../DropdownSelection.module.scss';
import buttonSCSSStyles from './Button.module.scss';
import { Chevron } from './components/Chevron';

interface Props {
  isFocused: boolean;
  setFocusHandler: () => void;
  buttonValue: string;
}

export const Button: React.FC<Props> = ({
  isFocused,
  setFocusHandler,
  buttonValue,
}) => {
  const buttonStyles: React.CSSProperties = {
    border: SCSSVariables.focusBorderValue,
    color: SCSSVariables.greenColor,
  };

  return (
    <button
      className={classNames(linkStyles.link, buttonSCSSStyles.button)}
      style={isFocused ? buttonStyles : {}}
      onClick={setFocusHandler}
    >
      {buttonValue}
      <Chevron isFocused={isFocused} />
    </button>
  );
};
