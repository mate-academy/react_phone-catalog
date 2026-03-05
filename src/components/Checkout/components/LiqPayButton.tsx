import { Loader2 } from 'lucide-react';
import { useLiqPayPayment } from '../hooks/useLiqPayPayment';
import { LiqPayForm } from './LiqPayForm';
import { TYPOGRAPHY } from '@/constants/typography';

interface LiqPayButtonProps {
  orderId: string;
  amount: number;
  onError: (message: string) => void;
}

export const LiqPayButton = ({
  orderId,
  amount,
  onError,
}: LiqPayButtonProps) => {
  const { isLoading, payload, handleInitiatePayment } = useLiqPayPayment({
    orderId,
    amount,
    onError,
  });

  return (
    <>
      {payload && (
        <LiqPayForm
          data={payload.data}
          signature={payload.signature}
        />
      )}

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 p-4 bg-[#00AAFF]/10 border border-[#00AAFF]/20 rounded-md">
          <svg
            width="48"
            height="20"
            viewBox="0 0 48 20"
            fill="none"
          >
            <rect
              width="48"
              height="20"
              rx="3"
              fill="#00AAFF"
            />
            <text
              x="7"
              y="14"
              fontFamily="Arial"
              fontWeight="bold"
              fontSize="9"
              fill="white"
            >
              LiqPay
            </text>
          </svg>
          <p className={`${TYPOGRAPHY.small} text-foreground`}>
            Visa, Mastercard, Приват24, monobank — захищена оплата через LiqPay
          </p>
        </div>

        <button
          type="button"
          onClick={handleInitiatePayment}
          disabled={isLoading}
          className={`h-14 bg-[#00AAFF] hover:bg-[#0095e0] disabled:opacity-60 disabled:cursor-not-allowed text-white ${TYPOGRAPHY.uppercase} rounded-md transition-colors flex items-center justify-center`}
        >
          {isLoading ?
            <Loader2 className="w-5 h-5 animate-spin" />
          : 'Pay with LiqPay'}
        </button>

        <p className={`${TYPOGRAPHY.small} text-muted-foreground text-center`}>
          You will be redirected to LiqPay&#39;s secure payment page
        </p>
      </div>
    </>
  );
};
