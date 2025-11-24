import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../modules/shared/components/Header';
import Footer from '../../modules/shared/components/Footer';

export const NotFoundPage: React.FC = () => {
  return (
    <div>
      <Header />
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Page not found</h1>
      <p>
        Go back to <Link to="/">Home</Link>
      </p>
    </main>
    <Footer />
    </div>
  );
};
