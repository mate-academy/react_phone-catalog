import { TYPOGRAPHY } from '@/constants/typography';

interface OrderTotalsProps {
  subtotal: string;
  discount?: number;
  total: string;
  symbol: string;
  paymentMethod: string;
}

export const OrderTotals = ({
  subtotal,
  discount,
  total,
  symbol,
  paymentMethod,
}: OrderTotalsProps) => {
  const sub = parseFloat(subtotal);
  const discountAmount = discount ? sub * (discount / 100) : 0;
  const adjustedTotal = discount ? (sub - discountAmount).toFixed(2) : total;

  return (
    <div className="px-6 py-4 border-t border-border bg-card flex flex-col gap-2">
      <div className="flex justify-between">
        <span className={`${TYPOGRAPHY.body} text-muted-foreground`}>
          Subtotal
        </span>
        <span className={`${TYPOGRAPHY.body} text-muted-foreground`}>
          {symbol}
          {subtotal}
        </span>
      </div>
      {discount != null && discount > 0 && (
        <div className="flex justify-between">
          <span className={`${TYPOGRAPHY.body} text-green-600`}>
            Discount ({discount}%)
          </span>
          <span className={`${TYPOGRAPHY.body} text-green-600 font-medium`}>
            -{symbol}
            {discountAmount.toFixed(2)}
          </span>
        </div>
      )}
      <div className="flex justify-between">
        <span className={`${TYPOGRAPHY.body} text-muted-foreground`}>
          Payment
        </span>
        <span className={`${TYPOGRAPHY.body} text-muted-foreground capitalize`}>
          {paymentMethod}
        </span>
      </div>
      <div className="flex justify-between pt-2 border-t border-border">
        <span className={`${TYPOGRAPHY.buttons} font-bold text-foreground`}>
          Total
        </span>
        <span className={`${TYPOGRAPHY.h2} text-foreground tracking-tight`}>
          {symbol}
          {adjustedTotal}
        </span>
      </div>
    </div>
  );
};
