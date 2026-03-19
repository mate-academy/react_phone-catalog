import { FC } from 'react';
import cn from 'clsx';
import { Skeleton } from './Skeleton';
import { BackButton } from '../Button/BackButton';
import { Button } from '../Button/Button';
import Favourites from '/src/images/icons/favourites.svg?react';
import Home from '/src/images/icons/home.svg?react';
import ArrowRight from '/src/images/icons/arrow-right.svg?react';

interface Props {
  className?: string;
}

export const ProductDetailsSkeleton: FC<Props> = ({ className }) => {
  return (
    <div className={cn('pb-14 sm:pb-16 xl:pb-20', className)}>
      {/* Breadcrumbs Fake */}
      <div className="mt-6 flex items-center">
        <Home className="fill-primary dark:fill-d-white size-4" />
        <ArrowRight
          aria-hidden
          className="fill-secondary dark:fill-d-icons mx-2 size-4"
        />
        <Skeleton className="bg-elements dark:bg-d-elements h-4 w-11" />
        <ArrowRight
          aria-hidden
          className="fill-secondary dark:fill-d-icons mx-2 size-4"
        />
        <Skeleton className="bg-elements dark:bg-d-elements h-4 w-16" />
      </div>

      <BackButton className="pointer-events-none mt-10 opacity-50" />

      {/* Title */}
      <Skeleton className="bg-elements dark:bg-d-elements mt-4 h-10.25 w-3/4 sm:h-14 lg:w-1/2" />

      <div className="sm:pageGrid mt-8 sm:mt-10">
        {/* Images Area */}
        <div className="sm:col-span-6 sm:col-start-2 xl:col-span-10 xl:col-start-3">
          <Skeleton className="bg-elements dark:bg-d-elements aspect-square w-full" />
        </div>
        <div className="-order-1 mt-4 overflow-hidden sm:col-span-1 sm:col-start-1 sm:mt-0 xl:col-span-2">
          <div className="flex gap-2 sm:flex-col">
            {[1, 2, 3, 4, 5].map(i => (
              <Skeleton
                key={i}
                className="bg-elements dark:bg-d-elements aspect-square w-full flex-[0_0_25%]"
              />
            ))}
          </div>
        </div>

        {/* Info Area */}
        <div className="mt-8 sm:col-span-5 sm:col-start-8 sm:mt-0 xl:col-span-7 xl:col-start-14">
          <div className="shadow-bottom shadow-elements dark:shadow-d-elements flex flex-col pb-6">
            <div className="text-small text-secondary dark:text-d-secondary">
              Available colors
            </div>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4].map(i => (
                <Skeleton
                  key={i}
                  className="bg-elements dark:bg-d-elements size-8 rounded-full"
                />
              ))}
            </div>
          </div>
          <div className="shadow-bottom shadow-elements dark:shadow-d-elements mt-6 flex flex-col pb-6">
            <div className="text-small text-secondary dark:text-d-secondary">
              Select capacity
            </div>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3].map(i => (
                <Skeleton
                  key={i}
                  className="bg-elements dark:bg-d-elements h-8 w-14"
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <Skeleton className="bg-elements dark:bg-d-elements h-10.25 w-19" />
            <Skeleton className="bg-elements dark:bg-d-elements h-5.5 w-12" />
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              as="div"
              className="text-buttons bg-primary dark:bg-d-accent hover:shadow-hover-bs dark:hover:bg-d-hover-bs dark:text-d-white flex h-12 w-full flex-[1_1_auto] items-center justify-center text-white transition hover:shadow-[0_3px_13px_0]"
            >
              Add to cart
            </Button>

            <Button
              as="div"
              className="hover:shadow-primary shadow-icons dark:bg-d-surface2 dark:hover:bg-d-icons flex aspect-square size-12 flex-[0_0_auto] items-center justify-center p-4 shadow-inner transition dark:shadow-none"
            >
              <Favourites className="fill-primary dark:fill-d-white" />
            </Button>
          </div>

          <table className="mt-8 block">
            <tbody className="flex flex-col gap-2">
              {['Screen', 'Resolution', 'Processor', 'RAM'].map(title => (
                <tr key={title} className="flex justify-between">
                  <td className="text-body text-secondary dark:text-d-secondary">
                    {title}
                  </td>
                  <td>
                    <Skeleton className="bg-elements dark:bg-d-elements h-5.25 w-20" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-14 sm:col-span-12 sm:mt-16 xl:mt-20">
          <h3 className="text-h3 text-primary dark:text-d-white shadow-bottom shadow-elements dark:shadow-d-elements pb-4">
            About
          </h3>

          {[1, 2, 3].map(i => (
            <div key={i}>
              <Skeleton className="bg-elements dark:bg-d-elements mt-8 h-5 w-3/4 sm:h-6.5" />
              <Skeleton className="bg-elements dark:bg-d-elements mt-4 h-21 w-full" />
            </div>
          ))}
        </section>

        <section className="mt-14 sm:col-span-12 sm:mt-16 xl:col-span-11 xl:col-start-14 xl:mt-20">
          <h3 className="text-h3 text-primary dark:text-d-white shadow-bottom shadow-elements dark:shadow-d-elements pb-4">
            Tech specs
          </h3>

          <div className="shadow-bottom shadow-elements mt-4 w-full content-['']"></div>

          <table className="mt-6 block">
            <tbody className="flex flex-col gap-2">
              {[
                'Screen',
                'Resolution',
                'Processor',
                'RAM',
                'Built in memory',
                'Cell',
              ].map(title => (
                <tr key={title} className="flex justify-between">
                  <td className="text-body text-secondary dark:text-d-secondary">
                    {title}
                  </td>
                  <td>
                    <Skeleton className="bg-elements dark:bg-d-elements h-5.25 w-20" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};
