import { RadioButton as Button } from './RadioButton';
import { RadioButtonWithText as ButtonWithText } from './RadioButtonWithText';
import { RadioProvider } from './context';

export const RadioGroup = Object.assign(RadioProvider, {
  Button,
  ButtonWithText,
});
