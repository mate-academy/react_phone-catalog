import type { FC, HTMLAttributes, ReactNode } from 'react';
import styles from './Section.module.scss';
import { SectionTitle } from './SectionTitle';
import { cn } from '@/utils/cn';

type SectionTag = 'section' | 'article' | 'div' | 'header' | 'footer' | 'main';

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: SectionTag;
  unstyled?: boolean;
  children: ReactNode;
};

const SectionBase: FC<SectionProps> = ({
  as: Component = 'section',
  className = '',
  unstyled = false,
  children,
  ...props
}) => {
  const classes = cn(!unstyled && styles.section, className);

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export const Section = Object.assign(SectionBase, { Title: SectionTitle });

export default Section;
