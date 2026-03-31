import type { FC, HTMLAttributes, ReactNode } from 'react';
import s from './Section.module.scss';
import { SectionTitle } from './Title';
import { cn } from '@/utils/cn';

type SectionTag = 'section' | 'article' | 'div' | 'header' | 'footer' | 'main';

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: SectionTag;
  unstyled?: boolean;
  children: ReactNode;
};

type SectionComponent = FC<SectionProps> & {
  Title: typeof SectionTitle;
};

const SectionBase: FC<SectionProps> = ({
  as: Component = 'section',
  className = '',
  unstyled = false,
  children,
  ...props
}) => {
  const classes = cn(!unstyled && s.section, className);

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export const Section = Object.assign(SectionBase, { Title: SectionTitle }) as SectionComponent;

export default Section;
