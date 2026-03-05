import { Link } from 'react-router-dom';
import { TYPOGRAPHY } from '@/constants/typography';
import { Button } from '@/components/ui/button';

export const EmptyOrdersState = () => (
  <div className="flex flex-col items-center gap-6 py-20 text-center">
    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="3"
          y1="6"
          x2="21"
          y2="6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M16 10a4 4 0 01-8 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <div>
      <p className={`${TYPOGRAPHY.h5} text-foreground mb-1`}>No orders yet</p>
      <p className={`${TYPOGRAPHY.body} text-muted-foreground`}>
        Your orders will appear here after checkout
      </p>
    </div>
    <Button
      asChild
      className={`h-12 px-8 ${TYPOGRAPHY.uppercase}`}
    >
      <Link to="/">Start shopping</Link>
    </Button>
  </div>
);
