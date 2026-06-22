'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import type { Product } from '@/entities/Product';
import { useTranslation } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { ChevronRightIcon } from '@/shared/ui/Icons';
import { BodyText, H1 } from '@/shared/ui/Typography';
import { Catalog } from '@/widgets/Catalog';

interface SearchResultsProps {
  products: Product[];
}

export const SearchResults = ({ products }: SearchResultsProps) => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') || '';
  const category = searchParams?.get('category');
  const { t } = useTranslation();

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );

  if (category) {
    const categoryProducts = filtered.filter((p) => p.category === category);
    return (
      <Catalog
        products={categoryProducts}
        categoryName={category}
        withSort={false}
      />
    );
  }

  const categories = ['phones', 'tablets', 'accessories'] as const;

  const counts = categories
    .map((cat) => ({
      name: cat,
      count: filtered.filter((p) => p.category === cat).length,
    }))
    .filter((c) => c.count > 0);

  if (counts.length === 0) {
    return (
      <main className="mx-auto max-w-300 px-6 pt-20 text-center">
        <H1>
          {t('noResultsFor')} &quot;{query}&quot;
        </H1>

        <BodyText className="mt-4 text-brand-secondary">
          {t('trySearchAgain')}
        </BodyText>

        <Link href="/" className="mt-8 inline-block">
          <Button variant="primary" className="h-12 min-w-50">
            {t('backToHome')}
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-300 px-6 pt-20">
      <H1>
        {t('searchResultsFor')} &quot;{query}&quot;
      </H1>

      <div className="mt-8 flex flex-col gap-4">
        {counts.map((cat) => (
          <Link
            key={cat.name}
            href={`/search?query=${encodeURIComponent(query)}&category=${cat.name}`}
            className="group flex max-w-200 justify-between bg-brand-surface-1 p-4 transition-colors hover:bg-brand-elements"
            title={t('clickToViewAll')}
          >
            <BodyText>{t(cat.name)}</BodyText>

            <div className="flex items-center gap-2">
              <BodyText className="text-brand-secondary">
                {cat.count} {t('items')}
              </BodyText>

              <ChevronRightIcon className="size-4 text-brand-secondary transition-colors group-hover:text-brand-white" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};
