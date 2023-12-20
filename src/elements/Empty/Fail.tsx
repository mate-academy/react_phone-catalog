import React from 'react';
import './Fail.scss';

type Props = {
  // page?: string;
  title:
 `${string} not found`
  | `${string} empty`
  | 'We are sorry, but this feature is not implemented yet';
};

export const Fail: React.FC<Props> = ({ title }) => (
  <div className="fail">
    <h1 className="fail__title">{title}</h1>
  </div>
);
