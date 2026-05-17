import React from 'react';
import './Stars.scss';

interface StarsProps {
  score: number;
}

export const Stars = ({ score }: StarsProps) => {
  const totalStars = 5;

  return (
    <div className="stars">
      {[...Array(totalStars)].map((_, i) => {
        const fillPercent = Math.min(1, Math.max(0, score - i)) * 100;
        return (
          <span
            key={i}
            className="stars__item"
            style={
              { '--fill-percent': `${fillPercent}%` } as React.CSSProperties
            }
          >
            ★
          </span>
        );
      })}
    </div>
  );
};
