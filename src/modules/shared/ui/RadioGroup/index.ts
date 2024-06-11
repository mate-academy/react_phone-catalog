import { RadioButton as Button } from './RadioButton';
import { RadioButtonWithText as ButtonWithText } from './RadioButtonWithText';
import { RadioProvider } from './RadioContext';

export const RadioGroup = Object.assign(RadioProvider, {
  Button,
  ButtonWithText,
});
