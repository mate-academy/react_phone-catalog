import React, { memo } from 'react';
import SquareSelectButton from '../..';
import { SquareSelectButtonProps } from '../../SquareSelectButton';

type Props = Omit<SquareSelectButtonProps, 'icon' | 'iconSelected'>;

export const SquareSelectLikeButton: React.FC<Props> = memo((otherProps) => (
  <SquareSelectButton
    icon="./img/icons/hearth-empty-icon.svg"
    iconSelected="./img/icons/hearth-fill-icon.svg"
    {...otherProps}
  />
));
