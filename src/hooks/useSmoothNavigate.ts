import React from 'react';
import { useNavigate } from 'react-router-dom';

export const useSmoothNavigate = () => {
  const navigate = useNavigate();
  const handleSmoothNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    way: string,
  ) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setTimeout(() => {
      navigate(way);
    }, 350);
  };

  return handleSmoothNavigate;
};
