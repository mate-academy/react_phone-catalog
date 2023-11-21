import React from 'react';
import ReactTyped from 'react-typed';

type Props = {
  title: string
};

export const ProductNotFoundPage: React.FC<Props> = ({ title }) => {
  return (
    <div className="pageEmpty">
      <ReactTyped
        strings={[title]}
        typeSpeed={75}
        className="title"
        showCursor={false}
      />
    </div>
  );
};
