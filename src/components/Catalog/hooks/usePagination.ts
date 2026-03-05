import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type UsePaginationProps = {
  totalItems: number;
  itemsPerPage: number | 'all';
  maxVisible?: number;
};

const MAX_VISIBLE = 5;
const PAGE_TRANSITION_MS = 400;

export const usePagination = ({
  totalItems,
  itemsPerPage,
}: UsePaginationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page') || 1);

  const totalPages =
    itemsPerPage === 'all' ? 1 : Math.ceil(totalItems / itemsPerPage);

  const safePage = Math.min(Math.max(pageFromUrl, 1), totalPages || 1);

  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => clearTimeout(transitionTimeoutRef.current);
  }, []);

  let startPage = Math.max(safePage - Math.floor(MAX_VISIBLE / 2), 1);
  let endPage = startPage + MAX_VISIBLE - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - MAX_VISIBLE + 1, 1);
  }

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  const navigateToPage = useCallback(
    (targetPage: number) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('page', targetPage.toString());

      navigate({
        pathname: location.pathname,
        search: `?${newSearchParams.toString()}`,
      });
    },
    [searchParams, navigate, location.pathname],
  );

  const handleChangeNumber = useCallback(
    (targetPage: number) => {
      setIsPageTransitioning(true);
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = setTimeout(
        () => setIsPageTransitioning(false),
        PAGE_TRANSITION_MS,
      );

      navigateToPage(targetPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigateToPage],
  );

  const handleChangeArrow = useCallback(
    (order: 'prev' | 'next') => {
      const targetPage = order === 'prev' ? safePage - 1 : safePage + 1;
      handleChangeNumber(targetPage);
    },
    [safePage, handleChangeNumber],
  );

  useEffect(() => {
    if (totalPages === 0) return;

    if (pageFromUrl < 1) {
      navigateToPage(1);
    } else if (pageFromUrl > totalPages) {
      navigateToPage(totalPages);
    }
  }, [pageFromUrl, totalPages, navigateToPage]);

  return {
    safePage,
    totalPages,
    visiblePages,
    handleChangeNumber,
    handleChangeArrow,
    isPageTransitioning,
  };
};
