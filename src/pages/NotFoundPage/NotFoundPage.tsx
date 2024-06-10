import React from 'react';
import './NotFoundPage.scss';
import { NoResults } from '../../components/NoResults';

type Props = {};

export const NotFoundPage: React.FC<Props> = () => {
  return (
    <main className="page-not-find">
      <div className="container">
        <div className="page-not-find__content">
          <NoResults categoryName="Page" />
        </div>
      </div>
    </main>
  );
};
