/* eslint-disable max-len */
import { RadioButton as Button } from './RadioButton';
import { RadioButtonSquareWithText as ButtonSquareWithText } from './RadioButtonSquareWithText';
import { RadioButtonWithText as ButtonWithText } from './RadioButtonWithText';
import { RadioProvider } from './RadioContext';

export const RadioGroup = Object.assign(RadioProvider, {
  Button,
  ButtonWithText,
  ButtonSquareWithText,
});
