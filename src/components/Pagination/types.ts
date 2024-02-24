export interface PaginationProps {
  itemsPerPage: number,
  totalItems: number
  currentPage: number,
  onClick: (pageNumber: number) => void,
}