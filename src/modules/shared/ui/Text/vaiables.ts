import classes from './text.module.scss';
import { Variant } from './types';

export const VARIANT: Record<Variant, string> = {
  regular: classes.text_body,
  small: classes.text_small,
  button: classes.text_button,
  uppercase: classes.text_uppercase,
  'heading-1': classes['text_heading-1'],
  'heading-2': classes['text_heading-2'],
  'heading-3': classes['text_heading-3'],
  'heading-4': classes['text_heading-4'],
};
