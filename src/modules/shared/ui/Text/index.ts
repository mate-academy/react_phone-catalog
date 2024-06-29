import { TextButton as Button } from './TextButton';
import { TextH1 as H1 } from './TextH1';
import { TextH2 as H2 } from './TextH2';
import { TextH3 as H3 } from './TextH3';
import { TextH4 as H4 } from './TextH4';
import { TextRegular as Regular } from './TextRegular';
import { TextSmall as Small } from './TextSmall';
import { TextUppercase as Uppercase } from './TextUppercase';

export const Text = Object.assign(Regular, {
  Small,
  Uppercase,
  Button,
  H1,
  H2,
  H3,
  H4,
});
