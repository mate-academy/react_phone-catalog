import React from 'react';
import './PlaceholderPage.scss';

interface Props {
  title: string;
}

export const PlaceholderPage: React.FC<Props> = ({ title }) => {
  return (
    <div className="placeholder-page">
      <h1>{title}</h1>
      <p>This page is not implemented yet.</p>
    </div>
  );
};
