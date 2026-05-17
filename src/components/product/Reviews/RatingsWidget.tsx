import { useState, useEffect, useRef } from 'react';
import './RatingsWidget.scss';
import { Stars } from './Stars/Stars';
import { DropDown } from './DropDown/DropDown';
import { useReviews } from '@hooks/useReviews';

export const RatingsWidget = ({
  productId,
  onSeeAll,
}: {
  productId: string;
  onSeeAll: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { avgScore, ratings, reviews } = useReviews(productId);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="ratings-widget"
      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
    >
      <span className="ratings-widget__score">{avgScore}</span>
      <button
        className="ratings-widget__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{ verticalAlign: 'middle' }}
      >
        <Stars score={avgScore} />
        <svg
          className={`ratings-widget__chevron${open ? ' ratings-widget__chevron--open' : ''}`}
          width={14}
          height={14}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <span className="ratings-widget__count">{reviews.length}</span>
      <DropDown
        open={open}
        ratings={ratings}
        onSeeAll={() => {
          setOpen(false);
          onSeeAll();
        }}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};
