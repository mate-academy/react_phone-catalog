import React, { memo } from 'react';

import './ProgressLoader.scss';

interface Props {
  id: string
  progress: number
}

export const ProgressLoader: React.FC<Props> = memo(({
  id,
  progress,
}) => (
  <div className="progress-loader">
    <progress
      id={`progress-loader-${id}`}
      max="100"
      value={progress}
    />
    <label htmlFor={`progress-loader-${id}`}>
      {progress}
      %
    </label>
  </div>
));
