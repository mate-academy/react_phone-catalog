import { ReactNode } from 'react';

export interface BreadcrumbUI {
  path: string | null;
  label: string | ReactNode;
}
