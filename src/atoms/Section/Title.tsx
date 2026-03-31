import type { FC, HTMLAttributes, ReactNode } from 'react';
import s from './Section.module.scss';
import { cn } from '@/utils/cn';

type SectionTitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type SectionTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: SectionTitleTag;
  children: ReactNode;
};

export const SectionTitle: FC<SectionTitleProps> = ({
  as: Component = 'h2',
  className = '',
  children,
  ...props
}) => {
  const classes = cn(s.title, className);

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};
