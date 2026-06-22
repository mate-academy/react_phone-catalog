'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useCartStore } from '@/entities/Cart';
import { useFavoritesStore } from '@/entities/Favorite';
import { Product } from '@/entities/Product';
import { BASE_URL } from '@/shared/constants/constant';
import { useTranslation } from '@/shared/hooks';
import { formatPrice } from '@/shared/lib';
import { useSettingsStore } from '@/shared/store';
import { Button } from '@/shared/ui/Button';
import { HeartIcon, HeartIconSelected } from '@/shared/ui/Icons';
import { BodyText, H3, SmallText, UppercaseText } from '@/shared/ui/Typography';

interface ProductCardProps {
  product: Product;
}

const cardClassname =
  'relative box-border w-full min-h-126.5 flex flex-col justify-between p-8 bg-brand-surface-1 gap-1 transition-transform duration-300 ease-in-out hover:scale-102 h-full min-[508px]:h-126.5 min-[1200px]:w-68';
const nameClassname =
  'text-brand-white line-clamp-2 pt-4 h-14 group-hover:text-brand-accent transition-colors duration-300 ease-in-out';

export const ProductCard = ({ product }: ProductCardProps) => {
  const {
    itemId,
    name,
    category,
    image,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  const currency = useSettingsStore((state) => state.currency);
  const currencyRates = useSettingsStore((state) => state.currencyRates);
  const language = useSettingsStore((state) => state.language);
  const { t } = useTranslation();

  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const isInCart = items.some((elem) => elem.item.itemId === product.itemId);

  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const favorites = useFavoritesStore((state) => state.items);
  const isFavorite = favorites.some(
    (elem) => elem.item.itemId === product.itemId,
  );

  return (
    <div className={cardClassname}>
      <Link
        className="group"
        href={`/${category}/${itemId}`}
        aria-label={`View details for ${name}`}
      >
        <div className="w-full h-50 flex items-center justify-center m-0 overflow-hidden">
          <Image
            className="h-50 object-contain w-full"
            src={`${BASE_URL}/${image}`}
            alt={name}
            width={200}
            height={200}
          />
        </div>
        <BodyText className={nameClassname}>{name}</BodyText>
      </Link>

      <div className="flex items-center gap-2 mt-1">
        <H3 className="text-brand-white">
          {formatPrice(price, currency, currencyRates, language)}
        </H3>

        {fullPrice > price && (
          <H3 className="text-brand-secondary line-through">
            {formatPrice(fullPrice, currency, currencyRates, language)}
          </H3>
        )}
      </div>
      <div className="w-full h-px bg-brand-elements" />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <SmallText className="text-brand-secondary">{t('screen')}</SmallText>
          <UppercaseText className="text-brand-white">{screen}</UppercaseText>
        </div>
        <div className="flex justify-between">
          <SmallText className="text-brand-secondary">
            {t('capacity')}
          </SmallText>
          <UppercaseText className="text-brand-white">{capacity}</UppercaseText>
        </div>
        <div className="flex justify-between">
          <SmallText className="text-brand-secondary">{t('ram')}</SmallText>
          <UppercaseText className="text-brand-white">{ram}</UppercaseText>
        </div>
      </div>

      <div className="flex gap-2 h-12">
        <Button
          variant="primary"
          className="h-10 grow cursor-pointer"
          aria-pressed={isInCart}
          onClick={() =>
            isInCart ? removeItem(product.itemId) : addItem(product)
          }
        >
          {isInCart ? t('added') : t('addToCart')}
        </Button>
        <Button
          variant="favorite"
          className="cursor-pointer"
          aria-pressed={isFavorite}
          onClick={() =>
            isFavorite ? removeFavorite(product.itemId) : addFavorite(product)
          }
        >
          {isFavorite ? <HeartIconSelected /> : <HeartIcon />}
        </Button>
      </div>
    </div>
  );
};
