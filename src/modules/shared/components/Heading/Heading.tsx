import { ElementType } from 'react';
import { HeadingLevel } from '../../types/types';

type Props = {
  level: HeadingLevel;
} & React.HTMLAttributes<HeadingLevel>;

export const Heading: React.FC<Props> = ({ level, children, ...props }) => {
  const Tag = level as ElementType;

  return <Tag {...props}>{children}</Tag>;
};
