import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="px-6 xl:px-[152px] min-h-screen flex flex-col justify-center py-16">
      <div className="max-w-[360px] mb-6">
        <img
          src="/img/page-not-found.png"
          alt="Product not found"
          className="w-full h-auto"
        />
      </div>
      <h1 className="text-2xl sm:text-4xl font-bold text-[#0F0F11] mb-4">
        Page was not found
      </h1>
      <Link
        to="/"
        className="inline-flex items-center justify-center h-10 px-4 rounded-full border border-gray-300 text-[#0F0F11] hover:border-gray-400"
      >
        Go to Home
      </Link>
    </div>
  );
}
