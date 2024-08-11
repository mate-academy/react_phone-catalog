import { ReactNode } from 'react';

export const hasCrumb = (obj: unknown): obj is { crumb: () => ReactNode } => {
  return (
    typeof obj == 'object' &&
    obj !== null &&
    'crumb' in obj &&
    typeof obj.crumb === 'function'
  );
};
