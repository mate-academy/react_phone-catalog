import { TYPOGRAPHY } from '@/constants/typography';

export const OrderSuccessHeader = () => (
  <div className="flex flex-col items-center text-center mb-12">
    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path
          d="M6 14L11.5 19.5L22 9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary-foreground"
        />
      </svg>
    </div>
    <h1 className={`${TYPOGRAPHY.h1} text-foreground mb-2`}>Order placed!</h1>
    <p className={`${TYPOGRAPHY.body} text-muted-foreground`}>
      Thank you. We&#39;ve received your order.
    </p>
  </div>
);
