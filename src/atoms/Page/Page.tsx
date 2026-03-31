import type { FC, HTMLAttributes, ReactNode } from 'react';
import s from './Page.module.scss';
import { cn } from '@/utils/cn';
import { Breadcrumps } from '@/molecules';

type PageTag = 'main' | 'div' | 'section';

type PageProps = HTMLAttributes<HTMLElement> & {
  as?: PageTag;
  children: ReactNode;
  breadcrumps?: boolean;
};

type PageComponent = FC<PageProps> & {
  Breadcrumps: typeof Breadcrumps;
};

const PageBase: FC<PageProps> = ({
  as: Component = 'main',
  className = '',
  children,
  breadcrumps = false,
  ...props
}) => {
  return (
    <Component className={cn(s.page, className)} {...props}>
      {breadcrumps && <Breadcrumps />}
      {children}
    </Component>
  );
};

const Page = Object.assign(PageBase, { Breadcrumps }) as PageComponent;

export default Page;
