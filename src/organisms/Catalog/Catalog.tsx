import { Section } from '@/atoms';
import s from './Catalog.module.scss';
import List from './ui/List';
import type { ComponentProps, FC, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type CatalogProps = Omit<ComponentProps<typeof Section>, 'children'> & {
  title: ReactNode;
  children?: ReactNode;
};

type CatalogComponent = FC<CatalogProps> & {
  List: typeof List;
};

const CatalogBase: FC<CatalogProps> = ({
  title,
  children,
  className = '',
  ...props
}) => {
  return (
    <Section className={cn(s.catalog, className)} {...props}>
      <Section.Title>{title}</Section.Title>
      {children}
    </Section>
  );
};

export const Catalog = Object.assign(CatalogBase, { List }) as CatalogComponent;
export default Catalog;
