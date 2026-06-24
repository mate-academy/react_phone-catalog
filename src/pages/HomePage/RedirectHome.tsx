import React from 'react';
import { Navigate } from 'react-router-dom';

export const RedirectHome = () => {
  return <Navigate to="/" replace={true} />;
};
