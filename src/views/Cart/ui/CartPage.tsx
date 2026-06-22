'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useCartStore } from '@/entities/Cart';
import { BASE_URL } from '@/shared/constants/constant';
import { useTranslation } from '@/shared/hooks';
import { formatPrice } from '@/shared/lib';
import { useSettingsStore } from '@/shared/store';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Button } from '@/shared/ui/Button';
import { BodyText, H1, SmallText } from '@/shared/ui/Typography';
import { CartItem } from '@/widgets/CartItem';

export const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const { t } = useTranslation();
  const currency = useSettingsStore((state) => state.currency);
  const currencyRates = useSettingsStore((state) => state.currencyRates);
  const language = useSettingsStore((state) => state.language);

  const totalPrice = items.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0,
  );

  const totalItems = items.reduce(
    (acc, cartItem) => acc + cartItem.quantity,
    0,
  );

  return (
    <main className="px-4 pt-6 pb-14 sm:px-6 sm:pt-10 sm:pb-16 lg:px-8 lg:pb-20">
      <div className="xl:mx-auto xl:max-w-300">
        <Breadcrumbs items={[{ label: t('cart') }]} className="mb-10 py-0" />

        <H1 className="mb-8 font-extrabold">{t('cart')}</H1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 text-center">
            <Image
              src={`${BASE_URL}/img/cart-is-empty.png`}
              alt={t('yourCartIsEmpty')}
              width={300}
              height={200}
              priority
              sizes="(max-width: 640px) 100vw, 400px"
              className="w-full h-auto object-contain max-w-100 mb-8"
            />
            <H1 className="text-brand-white mb-4">{t('yourCartIsEmpty')}</H1>
            <BodyText className="text-brand-secondary max-w-100 mb-8">
              {t('emptyCartText')}
            </BodyText>
            <Link href="/phones">
              <Button variant="primary" className="h-12 min-w-50">
                {t('goToShop')}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-4">
            <div className="flex flex-col gap-4 lg:flex-1">
              {items.map((cartItem) => (
                <CartItem
                  key={cartItem.item.itemId}
                  item={cartItem.item}
                  quantity={cartItem.quantity}
                />
              ))}
            </div>

            <div className="flex flex-col gap-4 border border-brand-elements p-6 lg:w-92 lg:shrink-0 lg:self-start lg:gap-6">
              <div className="flex flex-col items-center gap-2">
                <H1 className="font-extrabold">
                  {formatPrice(totalPrice, currency, currencyRates, language)}
                </H1>

                <SmallText className="text-brand-secondary">
                  {t('totalForItems')} {totalItems} {t('items')}
                </SmallText>
              </div>

              <div className="h-px bg-brand-elements" />

              <Button variant="primary" className="h-12">
                {t('checkout')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
