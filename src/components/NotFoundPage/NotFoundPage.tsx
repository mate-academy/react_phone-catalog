import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-60">
      <h1 className="text-3xl text-center text-red-600 font-mont font-extrabold">
        Page not found
      </h1>
      <Link
        to={'/phones'}
        className="bg-red-600 text-center text-text-color-base-white w-24 rounded-md transition-all hover:scale-125"
      >
        Go Back!
      </Link>
    </div>
  );
};

export default NotFoundPage;
