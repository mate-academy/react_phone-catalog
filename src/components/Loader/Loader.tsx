import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Rings } from 'react-loader-spinner';

export const Loader: React.FC = () => (
  <div className="loader">
    <Rings color="#89939A" height={50} width={50} />
    <div className="loader__message">Loading ...</div>
  </div>
);
