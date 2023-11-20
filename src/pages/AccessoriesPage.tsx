import React from 'react';
import { Loader } from '../components/Loader/Loader';

type Props = {
  isLoading: boolean;
};

export const AccessoriesPage: React.FC<Props> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div>
      <div className="container">
        <h2 className="title title--notYet">
          We are sorry, but this page is not implemented yet
        </h2>
      </div>
    </div>
  );
};
