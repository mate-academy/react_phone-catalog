import React from 'react';
import { Link } from 'react-router-dom';
import { TYPOGRAPHY } from '@/constants/typography';
import { Icon } from '@/components/ui/icons';
import {
  BOOK_TYPE_ROUTE,
  BOOK_TYPE_DISPLAY_NAME,
} from '../constants/itemCard.constants';
import type { BookType } from '../types/itemCard.types';

interface BreadcrumbsProps {
  type: BookType;
  category?: string;
  bookName: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  type,
  category,
  bookName,
}) => {
  const typeRoute = BOOK_TYPE_ROUTE[type];
  const typeDisplayName = BOOK_TYPE_DISPLAY_NAME[type];

  return (
    <nav className="flex items-center gap-2 text-muted-foreground mb-6 flex-wrap">
      <Link
        to="/"
        className="hover:text-foreground transition-colors"
      >
        <Icon
          name="home"
          size="sm"
        />
      </Link>

      <Icon
        name="chevronRight"
        size="sm"
        className="text-muted-foreground"
      />

      <Link
        to={`/${typeRoute}`}
        className={`${TYPOGRAPHY.body} capitalize hover:text-foreground transition-colors`}
      >
        {typeDisplayName}
      </Link>

      {category && (
        <>
          <Icon
            name="chevronRight"
            size="sm"
            className="text-muted-foreground"
          />
          <span className={`${TYPOGRAPHY.body} text-foreground`}>
            {category}
          </span>
        </>
      )}

      <Icon
        name="chevronRight"
        size="sm"
        className="text-muted-foreground"
      />

      <span
        className={`${TYPOGRAPHY.body} font-medium text-foreground truncate max-w-50 sm:max-w-none`}
      >
        {bookName}
      </span>
    </nav>
  );
};
