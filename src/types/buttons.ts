import { Directions, IconId, IconStyles } from './icons';

export type ButtonType = 'like' | 'large' | 'circle';

export type ButtonProps = {
  iconId?: IconId;
  directions?: Directions;
  onClick?: () => void;
  filled?: IconStyles;
  type?: ButtonType;
  className?: string;
  to?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  title?: string;
};
