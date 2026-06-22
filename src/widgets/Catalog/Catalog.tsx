'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  paginateProducts,
  type Product,
  sortProducts,
} from '@/entities/Product';
import { TranslationKey } from '@/shared/constants/translations';
import { useTranslation } from '@/shared/hooks';
import { AppSelect } from '@/shared/ui/AppSelect';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Pagination } from '@/shared/ui/Pagination';
import { Reveal } from '@/shared/ui/Reveal';
import { BodyText, H1 } from '@/shared/ui/Typography';
import { ProductCard } from '@/widgets/ProductCard';

const paginationOptions = [
  { label: '20', value: '20' },
  { label: '30', value: '30' },
  { label: '40', value: '40' },
  { label: '50', value: '50' },
  { label: '60', value: '60' },
];

interface CatalogProps {
  products: Product[];
  categoryName: string;
  withSort?: boolean;
}

export const Catalog = ({
  products,
  categoryName,
  withSort = true,
}: CatalogProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  const categoryKey = categoryName.toLowerCase() as TranslationKey;
  const translatedCategoryName = t(categoryKey);

  const sortOptions = [
    { label: t('name'), value: 'Name' },
    { label: t('priceAsc'), value: 'Price_asc' },
    { label: t('priceDesc'), value: 'Price_desc' },
    { label: t('newest'), value: 'Newest' },
  ];

  const productsByCategory =
    categoryName.toLowerCase() === 'favorites'
      ? products
      : products.filter((item) => item.category === categoryName.toLowerCase());

  const sortBy = searchParams?.get('sort') || 'Name';
  const currentPage = Number(searchParams?.get('page')) || 1;
  const itemsPerPage = Number(searchParams?.get('limit')) || 20;

  const updateParams = (key: string, value: string | null) => {
    if (value === null) {
      return;
    }

    const params = new URLSearchParams(searchParams?.toString());

    params.set(key, value);

    if (key !== 'page') {
      params.set('page', '1');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const sortedProducts = sortProducts(productsByCategory, sortBy);
  const paginatedProducts = paginateProducts(
    sortedProducts,
    currentPage,
    itemsPerPage,
  );

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const isShowPagination = totalPages > 1;

  return (
    <main className="mx-auto max-w-300 bg-brand-black px-6 pb-20 min-[508px]:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: translatedCategoryName }]} />

      <div className="flex items-center pt-6">
        <H1>{translatedCategoryName}</H1>
      </div>

      <div className="flex items-center pt-2">
        <BodyText className="text-brand-secondary">
          {productsByCategory.length} {t('models')}
        </BodyText>
      </div>

      {withSort && (
        <div className="flex gap-4 pt-8">
          <AppSelect
            label={t('sortBy')}
            options={sortOptions}
            value={sortBy}
            onChange={(newValue) => updateParams('sort', newValue)}
            className="min-w-34 max-w-47 flex-1"
          />

          <AppSelect
            label={t('itemsOnPage')}
            options={paginationOptions}
            value={String(itemsPerPage)}
            onChange={(newValue) => updateParams('limit', newValue)}
            className="min-w-34"
          />
        </div>
      )}

      <div className="grid grid-cols-1 pb-10 pt-6 min-[508px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-4">
        {paginatedProducts.map((item, index) => {
          const columnDelay = (index % 4) * 0.08;

          return (
            <Reveal key={item.itemId} delay={columnDelay}>
              <ProductCard product={item} />
            </Reveal>
          );
        })}
      </div>

      {isShowPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => updateParams('page', String(page))}
        />
      )}
    </main>
  );
};
