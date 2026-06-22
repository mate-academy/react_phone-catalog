import Link from 'next/link';

import { FullProduct, fullProductToProduct } from '@/entities/Product';
import { getStaticProducts } from '@/entities/Product/api';
import { TranslationKey } from '@/shared/constants/translations';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { ButtonColorPicker } from '@/shared/ui/ButtonColorPicker';
import { CapacityButton } from '@/shared/ui/CapacityButton';
import { ContentLanguageNotice } from '@/shared/ui/ContentLanguageNotice';
import { ChevronLeftIcon } from '@/shared/ui/Icons';
import { LocalizedText } from '@/shared/ui/LocalizedText';
import { ProductGallery } from '@/shared/ui/ProductGallery';
import { BodyText, H1, H3, H4, SmallText } from '@/shared/ui/Typography';
import { ProductActions } from '@/widgets/ItemCardPage/ProductActions';
import { ProductPrice } from '@/widgets/ItemCardPage/ProductPrice';
import { ProductsSlider } from '@/widgets/ProductsSlider';

import { RecentlyViewedSlider } from '../RecentlyViewedSlider';

const buildProductUrl = (
  category: string,
  namespaceId: string,
  capacity: string,
  color: string,
): string => {
  const cap = capacity.toLowerCase().replace(/\s+/g, '');
  const col = color.toLowerCase().replace(/\s+/g, '-');

  return `/${category}/${namespaceId}-${cap}-${col}`;
};

interface ItemCardPageProps {
  product: FullProduct;
}

export const ItemCardPage = async ({ product }: ItemCardPageProps) => {
  const rawProducts = await getStaticProducts();

  const products = rawProducts.filter((p) => p.category === product.category);

  const quickSpecs: { labelKey: TranslationKey; value: string }[] = [
    { labelKey: 'screen', value: product.screen },
    { labelKey: 'resolution', value: product.resolution },
    { labelKey: 'processor', value: product.processor },
    { labelKey: 'ram', value: product.ram },
  ];

  const allSpecs: { labelKey: TranslationKey; value: string }[] = [
    { labelKey: 'screen', value: product.screen },
    { labelKey: 'resolution', value: product.resolution },
    { labelKey: 'processor', value: product.processor },
    { labelKey: 'ram', value: product.ram },
    ...(product.camera
      ? [{ labelKey: 'camera' as TranslationKey, value: product.camera }]
      : []),
    ...(product.zoom
      ? [{ labelKey: 'zoom' as TranslationKey, value: product.zoom }]
      : []),
    { labelKey: 'cell', value: product.cell.join(', ') },
  ];

  const data = fullProductToProduct(product, products);

  if (!data) {
    return null;
  }

  return (
    <main className="w-full pt-6">
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            {
              label: (
                <LocalizedText
                  translationKey={product.category as TranslationKey}
                />
              ),
              href: `/${product.category}`,
            },
            { label: product.name },
          ]}
          className="mb-10 py-0"
        />

        <Link
          href={`/${product.category}`}
          className="group mb-4 inline-flex items-center gap-1 text-sm text-brand-white transition-colors hover:text-brand-accent"
        >
          <ChevronLeftIcon className="transition-transform" />
          <LocalizedText translationKey="back" />
        </Link>

        <H1 className="text-brand-white mb-8">{product.name}</H1>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />

          <div className="flex max-w-sm flex-col gap-6">
            <div>
              <div className="flex justify-between">
                <SmallText className="mb-3 text-brand-secondary">
                  <LocalizedText translationKey="availableColors" />
                </SmallText>

                <SmallText className="text-right text-brand-icons">
                  ID: {product.id.split('-').slice(-3).join('-').toUpperCase()}
                </SmallText>
              </div>

              <div className="flex items-center gap-3">
                {product.colorsAvailable.map((c) => (
                  <ButtonColorPicker
                    key={c}
                    color={c}
                    isSelected={c === product.color}
                    href={buildProductUrl(
                      product.category,
                      product.namespaceId,
                      product.capacity,
                      c,
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="h-px bg-brand-elements" />

            <div>
              <SmallText className="mb-3 block text-brand-secondary">
                <LocalizedText translationKey="selectCapacity" />
              </SmallText>

              <div className="flex flex-wrap gap-2">
                {product.capacityAvailable.map((cap) => (
                  <CapacityButton
                    key={cap}
                    capacity={cap}
                    isSelected={cap === product.capacity}
                    href={buildProductUrl(
                      product.category,
                      product.namespaceId,
                      cap,
                      product.color,
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="h-px bg-brand-elements" />

            <ProductPrice
              priceDiscount={product.priceDiscount}
              priceRegular={product.priceRegular}
            />

            <ProductActions product={data} />

            <div className="space-y-2">
              {quickSpecs.map(({ labelKey, value }) => (
                <div
                  key={labelKey}
                  className="flex items-baseline justify-between gap-4"
                >
                  <SmallText className="text-brand-secondary">
                    <LocalizedText translationKey={labelKey} />
                  </SmallText>

                  <SmallText className="text-right text-brand-white">
                    {value}
                  </SmallText>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <section aria-label="About this product">
            <H3 className="mb-4 text-brand-white">
              <LocalizedText translationKey="about" />
            </H3>

            <div className="mb-8 h-px bg-brand-elements" />

            <ContentLanguageNotice />

            <div className="space-y-8">
              {product.description.map((section) => (
                <div key={section.title}>
                  <H4 className="mb-4 text-brand-white">{section.title}</H4>

                  <div className="space-y-3">
                    {section.text.map((paragraph, i) => (
                      <BodyText key={i} className="text-brand-secondary">
                        {paragraph}
                      </BodyText>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section aria-label="Technical specifications">
            <H3 className="mb-4 text-brand-white">
              <LocalizedText translationKey="techSpecs" />
            </H3>

            <div className="mb-8 h-px bg-brand-elements" />

            <div className="space-y-3">
              {allSpecs.map(({ labelKey, value }) => (
                <div
                  key={labelKey}
                  className="flex items-baseline justify-between gap-4"
                >
                  <BodyText className="text-brand-secondary">
                    <LocalizedText translationKey={labelKey} />
                  </BodyText>

                  <BodyText className="text-right text-brand-white">
                    {value}
                  </BodyText>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="my-20 w-full overflow-hidden">
        <div className="mb-8">
          <ProductsSlider products={products} titleKey="youMayAlsoLike" />
        </div>
        <RecentlyViewedSlider currentItemId={product.id} />
      </div>
    </main>
  );
};
