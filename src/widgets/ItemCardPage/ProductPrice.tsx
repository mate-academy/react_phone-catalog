'use client';

import { formatPrice } from '@/shared/lib';
import { useSettingsStore } from '@/shared/store';
import { H2, H3 } from '@/shared/ui/Typography';

type ProductPriceProps = {
  priceDiscount: number;
  priceRegular: number;
};

export const ProductPrice = ({
  priceDiscount,
  priceRegular,
}: ProductPriceProps) => {
  const currency = useSettingsStore((state) => state.currency);
  const currencyRates = useSettingsStore((state) => state.currencyRates);
  const language = useSettingsStore((state) => state.language);

  return (
    <div className="flex items-baseline gap-3">
      <H2 className="text-brand-white">
        {formatPrice(priceDiscount, currency, currencyRates, language)}
      </H2>

      {priceRegular !== priceDiscount && (
        <H3 className="text-brand-secondary line-through">
          {formatPrice(priceRegular, currency, currencyRates, language)}
        </H3>
      )}
    </div>
  );
};
