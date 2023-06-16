import { FC } from 'react';
import './loader.scss';

export const Loader: FC = () => {
  return (
    <div className="dot-spinner">
      <div className="dot-spinner__dot" />
      <div className="dot-spinner__dot" />
      <div className="dot-spinner__dot" />
      <div className="dot-spinner__dot" />
      <div className="dot-spinner__dot" />
      <div className="dot-spinner__dot" />
      <div className="dot-spinner__dot" />
      <div className="dot-spinner__dot" />
    </div>
  );
};
