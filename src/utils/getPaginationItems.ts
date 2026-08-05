// getPaginationItems.ts

export const getPaginationItems = (
  currentPage: number,
  totalPages: number,
  isMobile: boolean,
): (number | string)[] => {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // --- ЛОГІКА ДЛЯ МОБІЛКИ (< 640px) ---
  if (isMobile) {
    // На початку: [<] [1] [2] [...] [16] [>]
    if (currentPage <= 2) {
      return [1, 2, '...', totalPages];
    }

    // В кінці: [<] [1] [...] [15] [16] [>]
    if (currentPage >= totalPages - 1) {
      return [1, '...', totalPages - 1, totalPages];
    }

    // Посередині: [<] [1] [...] [8] [16] [>] (активна сторінка і краї)
    return [1, '...', currentPage, totalPages];
  }

  // --- ЛОГІКА ДЛЯ ДЕСКТОПА (>= 640px) ---
  if (currentPage <= 2) {
    return [1, 2, '...', totalPages];
  }

  if (currentPage >= totalPages - 1) {
    return [1, '...', totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
