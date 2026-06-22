'use client';

import Link from 'next/link';

import { Button } from '@/shared/ui/Button';
import { BodyText, H1, H3 } from '@/shared/ui/Typography';

export const UnauthorizedAdminPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-black p-4 font-sans text-(--color-brand-white)">
      <div className="w-full max-w-md border border-brand-elements bg-brand-surface-1 p-8 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <H1 className="tracking-tight text-brand-red">403</H1>
        <H3 className="uppercase tracking-wide">Доступ обмежено</H3>

        <BodyText className="mt-4 text-brand-secondary leading-relaxed">
          У вас немає прав для перегляду цієї сторінки. Ця зона призначена
          виключно для адміністраторів магазину.
        </BodyText>

        <div className="mt-8">
          <Link href="/" passHref>
            <Button
              variant="primary"
              className="w-full h-10 bg-brand-accent py-2.5 text-sm font-bold tracking-wide text-brand-white transition-all hover:bg-brand-accent-600 active:scale-[0.99]"
            >
              Повернутися на головну
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedAdminPage;
