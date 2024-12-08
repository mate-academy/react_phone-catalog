import React, { useMemo } from 'react';

import { createElement, TextProps } from './Text.helpers';

export const Text: React.FC<TextProps> = ({
  variant = 'buttons',
  ...props
}) => {
  const Element = useMemo(
    () => createElement(variant, props),
    [variant, props],
  );

  return Element;
};
