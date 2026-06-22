import Link from 'next/link';
import { Fragment, ReactNode } from 'react';

import { cn } from '@/shared/lib';
import { ChevronRightIcon, HomeIcon } from '@/shared/ui/Icons';

interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav
      aria-label="Breadcrumbs"
      className={cn('flex min-w-0 items-center py-6', className)}
    >
      <ol className="flex min-w-0 items-center gap-2">
        <li className="flex shrink-0 items-center">
          <Link
            href="/"
            aria-label="Go to home page"
            className="flex size-4 items-center justify-center text-brand-white transition-colors hover:text-brand-accent"
          >
            <HomeIcon />
          </Link>
        </li>

        {items.map(({ label, href }, index) => {
          const isLastItem = index === items.length - 1;
          const isClickable = href && !isLastItem;

          return (
            <Fragment key={`${href ?? index}`}>
              <li
                aria-hidden="true"
                className="flex shrink-0 items-center text-brand-icons"
              >
                <ChevronRightIcon className="size-4" />
              </li>

              <li className="min-w-0">
                {isClickable ? (
                  <Link
                    href={href}
                    className="block truncate text-[14px] leading-5.25 font-semibold text-brand-white transition-colors hover:text-brand-accent"
                  >
                    {label}
                  </Link>
                ) : (
                  <span
                    aria-current="page"
                    className="block truncate text-[14px] leading-5.25 font-semibold text-brand-secondary"
                  >
                    {label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
