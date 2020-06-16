import React from 'react';
import './Loading.scss';

type Props = {
  isLoaded: boolean;
  errorMessage: string;
};

const Loading: React.FC<Props> = ({ isLoaded, errorMessage }) => (
  <div className={(isLoaded || errorMessage !== '') ? '' : 'lds-roller'}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Loading;
