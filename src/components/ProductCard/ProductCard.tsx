import { Link, NavLink } from 'react-router-dom';
import type { Product } from '../../types/Product';
import { ButtonMain } from '../ButtonMain';
import { FavoriteButton } from '../FavoriteButton';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { motion } from 'motion/react';
interface Props {
  product?: Product;
  isLoading?: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, isLoading }) => {
  const hasDiscount = product?.year !== undefined ? product.year < 2020 : false;

  if (!product && !isLoading) return <NotFoundPage />;

  const getImageScale = () => {
    const productName = product!.name.toLowerCase();
    const category = product!.category.toLowerCase();

    switch (category) {
      case 'phones':
        if (productName.includes('pro') && productName.includes('14')) {
          return 'scale-75 tablet:scale-75 desktop:scale-75';
        }
        if (productName.includes('8')) {
          return 'scale-45 tablet:scale-45 desktop:scale-45';
        }
        if (productName.includes('7')) {
          return 'scale-50 tablet:scale-50 desktop:scale-50';
        }
        return 'scale-45 tablet:scale-45 desktop:scale-45';

      case 'tablets':
        if (
          productName.includes('mini') &&
          productName.includes('6th') &&
          product!.color.includes('starlight')
        ) {
          return 'scale-90 tablet:scale-90 desktop:scale-90';
        }
        if (productName.includes('mini') && productName.includes('6th')) {
          return 'scale-125 tablet:scale-125 desktop:scale-125';
        }
        if (productName.includes('mini') && productName.includes('5th')) {
          return 'scale-110 tablet:scale-110 desktop:scale-110';
        }
        return 'scale-75 tablet:scale-75 desktop:scale-75';

      case 'accessories':
        return 'scale-78 tablet:scale-78 desktop:scale-78';

      default:
        return 'scale-90 tablet:scale-90 desktop:scale-90';
    }
  };

  return isLoading ? (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.1 }}
    >
      <article
        className="
        min-w-[229px] min-h-[440px] max-h-[530px] w-full
          flex flex-col
          p-4 tablet:p-6 desktop:p-8
          border border-elements dark:border-dark-elements
          bg-card-background dark:bg-dark-card-background
          relative z-0
        "
      >
        <div className="flex items-center justify-center mb-4 tablet:mb-6 h-[200px]">
          <Skeleton className="w-full h-full" />
        </div>

        <div className="mb-4">
          <Skeleton
            height={20}
            width="80%"
          />
        </div>

        <div className="py-3 border-b border-elements dark:border-dark-elements flex items-center gap-x-2 mb-4">
          <Skeleton
            height={24}
            width={60}
          />
          <Skeleton
            height={20}
            width={40}
          />
        </div>

        <div className="flex-grow space-y-2 mb-4">
          <div className="flex flex-row justify-between">
            <Skeleton
              height={16}
              width={70}
            />
            <Skeleton
              height={16}
              width={70}
            />
          </div>
          <div className="flex flex-row justify-between">
            <Skeleton
              height={16}
              width={70}
            />
            <Skeleton
              height={16}
              width={70}
            />
          </div>
          <div className="flex flex-row justify-between">
            <Skeleton
              height={16}
              width={70}
            />
            <Skeleton
              height={16}
              width={70}
            />
          </div>
        </div>

        <div className="flex gap-[8px] w-[100%] h-[40px] mb-8">
          <Skeleton height={40} />
          <Skeleton height={40} />
        </div>
      </article>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 0.1, delay: 0.1 }}
      className={`relative z-0 ${isLoading ? 'pointer-events-none' : 'pointer-events-auto'}`}
    >
      <article
        className="
      min-w-[229px] min-h-[440px] max-h-[530px] w-full
      flex flex-col
      p-4 tablet:p-6 desktop:p-8
      border border-elements dark:border-dark-elements
      bg-card-background dark:bg-dark-card-background
      relative z-0 hover:z-50
      transition-transform duration-300 ease-in-out
      hover:scale-105 transform-gpu will-change-transform
    "
      >
        <div className="flex items-center justify-center mb-4 tablet:mb-6 h-full overflow-hidden">
          <Link
            to={`/${product!.category}/${product!.itemId}`}
            state={{ fromSlider: true }}
            className="flex items-center justify-center w-full h-full"
          >
            <img
              className={`object-contain transform ${getImageScale()}`}
              src={`${import.meta.env.BASE_URL}${product!.image}`}
              alt={product!.name}
            />
          </Link>
        </div>

        <NavLink
          to={`/${product!.category}/${product!.itemId}`}
          className={({ isActive }) =>
            isActive
              ? 'body-text text-button-active dark:text-dark-button-active'
              : 'body-text text-primary dark:text-dark-primary'
          }
        >
          <div className="body-text min-h-[42px] text-primary dark:text-dark-primary">
            {product!.name}
          </div>
        </NavLink>

        <div className="py-3 border-b border-elements dark:border-dark-elements flex items-center gap-x-2 mb-4">
          <div className="font-mont text-primary dark:text-dark-primary text-price font-bold">
            ${product!.price}
          </div>
          {hasDiscount && (
            <div className="font-mont text-secondary dark:text-dark-secondary text-price font-light line-through">
              ${product!.fullPrice}
            </div>
          )}
        </div>

        <div className="flex-grow space-y-2 mb-4">
          <div className="flex justify-between">
            <p className="small-text text-secondary dark:text-dark-secondary">
              Screen
            </p>
            <p className="text-[12px] text-primary dark:text-dark-primary font-bold">
              {product!.screen}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="small-text text-secondary dark:text-dark-secondary">
              Capacity
            </p>
            <p className="text-[12px] text-primary dark:text-dark-primary font-bold">
              {product!.capacity}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="small-text text-secondary dark:text-dark-secondary">
              RAM
            </p>
            <p className="text-[12px] text-primary dark:text-dark-primary font-bold">
              {product!.ram}
            </p>
          </div>
        </div>

        <div className="flex gap-[8px] w-[100%] h-[40px] mb-8">
          <ButtonMain product={product!} />
          <FavoriteButton product={product!} />
        </div>
      </article>
    </motion.div>
  );
};
