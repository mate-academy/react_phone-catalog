import React from 'react';
import '@/styles/main.scss';
import { NotFound } from '../components/NotFound';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="container">
      <NotFound
        imageUrl="/img/page-not-found.png"
        message="Oops, the page doesn't exist"
      ></NotFound>
    </main>
  );
};
