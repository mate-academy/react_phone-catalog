import React, { memo } from 'react';

import './Placeholder.scss';

interface Props {
  className?: string,
  width?: string,
  height?: string,
}

export const Placeholder: React.FC<Props> = memo(({
  width,
  height,
  className,
}) => (
  <div className={`placeholder ${className || ''}`} style={{ width, height }}>
    <div className="placeholder__activity" />
  </div>
));
