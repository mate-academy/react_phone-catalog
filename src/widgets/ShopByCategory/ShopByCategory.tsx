'use client';

import Image from 'next/image';
import Link from 'next/link';

import { BASE_URL } from '@/shared/constants/constant';
import { TranslationKey } from '@/shared/constants/translations';
import { useTranslation } from '@/shared/hooks';
import { BodyText, H2, H4 } from '@/shared/ui/Typography';

interface CategoryItem {
  titleKey: TranslationKey;
  href: string;
  imageSrc: string;
  modelsCount: number;
}

interface ShopByCategoryProps {
  categories: CategoryItem[];
}

export const ShopByCategory = ({ categories }: ShopByCategoryProps) => {
  const { t } = useTranslation();

  return (
    <section className="w-full">
      <H2 className="mb-6">{t('shopByCategory')}</H2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4">
        {categories.map(({ titleKey, href, imageSrc, modelsCount }) => (
          <Link key={href} href={href} className="group block">
            <div className="mb-6 flex aspect-square items-center justify-center overflow-hidden bg-brand-surface-2">
              <Image
                src={`${BASE_URL}${imageSrc}`}
                alt={t(titleKey)}
                width={368}
                height={368}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <H4 className="mb-1 text-brand-white transition-colors group-hover:text-brand-accent">
              {t(titleKey)}
            </H4>

            <BodyText className="text-brand-secondary">
              {modelsCount} {t('models')}
            </BodyText>
          </Link>
        ))}
      </div>
    </section>
  );
};
