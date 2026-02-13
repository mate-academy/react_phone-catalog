import React from 'react';
import { FC, memo } from 'react';

type Props = {
  icon: { title: string; path: string };
  className?: string;
};

export const Icon: FC<Props> = memo(({ icon, className }) => (
  <img src={icon.path} alt={icon.title} className={className} />
));

Icon.displayName = 'icon';
