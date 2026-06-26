export const ArrowDirection = {
  Left: 'Left',
  Right: 'Right',
  Up: 'Up',
  Down: 'Down',
} as const;

export type ArrowDirectionType =
  (typeof ArrowDirection)[keyof typeof ArrowDirection];
