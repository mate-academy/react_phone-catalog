import React from 'react';
import ReactTyped from 'react-typed';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="pageEmpty">
      <ReactTyped
        strings={['Page is not found']}
        typeSpeed={75}
        className="title"
        showCursor={false}
      />
    </div>
  );
};
