import { Heart } from 'lucide-react';
import './Heart.scss';

export default function AnimatedHeart() {
  return (
    <div className="heart-container">
      <Heart
        className="heart-base"
        fill="none"
        strokeWidth={1}
      />

      <Heart
        className="heart-animated"
        fill="none"
        strokeWidth={1}
      />
    </div>
  );
}
