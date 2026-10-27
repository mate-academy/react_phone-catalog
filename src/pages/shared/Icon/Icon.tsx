import { FC, memo } from 'react';

type Props = {
  icon: { title: string; path: string };
};

export const Icon: FC<Props> = memo(({ icon }) => (
  <img src={icon.path} alt={icon.title} className="icon" />
));

Icon.displayName = 'icon';
