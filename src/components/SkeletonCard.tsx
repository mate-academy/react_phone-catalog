import React from 'react';
import './SkeletonCard.scss';

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-img" />
    <div className="skeleton-line" />
    <div className="skeleton-line short" />
    <div className="skeleton-price" />
  </div>
);
