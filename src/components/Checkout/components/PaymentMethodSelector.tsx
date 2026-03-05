import type { PaymentMethod } from '@/types/Order';
import { PAYMENT_METHODS } from '../constants/paymentMethods';
import { TYPOGRAPHY } from '@/constants/typography';
import { useTranslation } from 'react-i18next';

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector = ({
  value,
  onChange,
}: PaymentMethodSelectorProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3">
      <p className={`${TYPOGRAPHY.uppercase} text-muted-foreground`}>
        {t('login.paymentMethod')}
      </p>

      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = value === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onChange(method.id)}
              className={[
                'flex items-center gap-4 p-4 rounded border-2 text-left transition-all duration-150 cursor-pointer',
                isSelected ?
                  'border-primary bg-muted'
                : 'border-border bg-background hover:border-ring',
              ].join(' ')}
            >
              <span
                className={[
                  'w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors',
                  isSelected ? 'border-primary' : 'border-border',
                ].join(' ')}
              >
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
              </span>

              {method.icon}

              <div className="flex flex-col min-w-0">
                <span className={`${TYPOGRAPHY.buttons} text-foreground`}>
                  {method.label}
                </span>
                <span
                  className={`${TYPOGRAPHY.small} text-muted-foreground truncate`}
                >
                  {method.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
