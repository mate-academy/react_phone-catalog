import type { ComponentProps } from 'react';

import { placeholder } from '@/shared/constants';

type Props = ComponentProps<'img'> & {
  fallback?: string;
};

export const ImageWithFallback = ({
  fallback = placeholder['500x600'],
  onError,
  ...props
}: Props) => {
  return (
    <img
      {...props}
      onError={(event) => {
        if (event.currentTarget.getAttribute('src') !== fallback) {
          event.currentTarget.src = fallback;
        }

        onError?.(event);
      }}
    />
  );
};
