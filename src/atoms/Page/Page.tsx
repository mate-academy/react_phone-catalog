import type { FC, HTMLAttributes, ReactNode } from 'react';
import styles from './Page.module.scss';
import { cn } from '@/utils/cn';

type PageTag = 'main' | 'div' | 'section';

type PageProps = HTMLAttributes<HTMLElement> & {
  as?: PageTag;
  children: ReactNode;
};

const Page: FC<PageProps> = ({
  as: Component = 'main',
  className = '',
  children,
  ...props
}) => {
  return (
    <Component className={cn(styles.page, className)} {...props}>
      {children}
    </Component>
  );
};

export default Page;
