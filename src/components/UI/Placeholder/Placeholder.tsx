import React, { memo } from 'react';

import './Placeholder.scss';

interface Props {
  width?: string,
  height?: string,
}

export const Placeholder: React.FC<Props> = memo(({
  width,
  height,
}) => (
  <div className="placeholder" style={{ width, height }}>
    <div className="placeholder__activity"></div>
  </div>
));
