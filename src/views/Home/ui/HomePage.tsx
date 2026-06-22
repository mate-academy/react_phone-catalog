import { getStaticProducts } from '@/entities/Product/api';
import { BASE_URL } from '@/shared/constants/constant';
import { TranslationKey } from '@/shared/constants/translations';
import { LocalizedText } from '@/shared/ui/LocalizedText';
import { PromoSlider } from '@/shared/ui/PromoSlider';
import { Reveal } from '@/shared/ui/Reveal';
import { H1 } from '@/shared/ui/Typography';
import { ProductsSlider } from '@/widgets/ProductsSlider';
import { RecentlyViewedSlider } from '@/widgets/RecentlyViewedSlider';
import { ShopByCategory } from '@/widgets/ShopByCategory';

const promoSlides = [
  {
    src: `${BASE_URL}/img/BannerMain.png`,
    srcLight: `${BASE_URL}/img/BannerMainL.png`,
    alt: 'Apple iPhone 14 Pro 1TB',
    href: '/phones/apple-iphone-14-pro-1tb-spaceblack',
  },
  {
    src: `${BASE_URL}/img/BannerTablet.png`,
    srcLight: `${BASE_URL}/img/BannerTablet-light.png`,
    alt: 'Apple Watch Series 5 44mm',
    href: '/tablets/apple-ipad-pro-11-2021-2tb-spacegray',
  },
  {
    src: `${BASE_URL}/img/BannerAccessory.png`,
    srcLight: `${BASE_URL}/img/BannerAccessory-light.png`,
    alt: 'Apple Watch Series 5 44mm',
    href: '/accessories/apple-watch-series-5-44mm-space-gray',
  },
];

type CategoryItem = {
  titleKey: TranslationKey;
  href: string;
  imageSrc: string;
  modelsCount: number;
};

export const HomePage = async () => {
  const products = await getStaticProducts();

  const phonesCount = products.filter(
    (product) => product.category === 'phones',
  ).length;
  const tabletsCount = products.filter(
    (product) => product.category === 'tablets',
  ).length;
  const accessoriesCount = products.filter(
    (product) => product.category === 'accessories',
  ).length;

  const categories: CategoryItem[] = [
    {
      titleKey: 'mobilePhones',
      href: '/phones',
      imageSrc: `/img/category-phones.png`,
      modelsCount: phonesCount,
    },
    {
      titleKey: 'tablets',
      href: '/tablets',
      imageSrc: `/img/category-tablets.png`,
      modelsCount: tabletsCount,
    },
    {
      titleKey: 'accessories',
      href: '/accessories',
      imageSrc: `/img/category-accessories.png`,
      modelsCount: accessoriesCount,
    },
  ];

  const brandNewProducts = [...products]
    .sort((a, b) => b.year - a.year)
    .slice(0, 20);

  const hotPriceProducts = [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 20);

  return (
    <main className="bg-brand-black py-6 transition-colors duration-300 overflow-x-hidden">
      <div className="flex flex-col gap-14">
        <section className="mx-auto w-full max-w-300 px-4 md:px-8">
          <H1 className="mb-6">
            <LocalizedText translationKey="welcomeTitle" />
          </H1>
          <Reveal delay={0.15}>
            <div className="flex justify-center">
              <PromoSlider slides={promoSlides} />
            </div>
          </Reveal>
        </section>

        <Reveal>
          <ProductsSlider
            titleKey="brandNewModels"
            products={brandNewProducts}
          />
        </Reveal>

        <div className="mx-auto w-full max-w-300 px-4 md:px-8">
          <Reveal>
            <ShopByCategory categories={categories} />
          </Reveal>
        </div>

        <Reveal>
          <ProductsSlider titleKey="hotPrices" products={hotPriceProducts} />
        </Reveal>

        <Reveal>
          <RecentlyViewedSlider />
        </Reveal>
      </div>
    </main>
  );
};
