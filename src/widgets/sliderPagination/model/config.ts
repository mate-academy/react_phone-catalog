import block from '../styles/blockPagination.module.scss';
import pic from '../styles/imagePagination.module.scss';

type PaginationConfig = {
  container: string;
  button: string;
  inner: string;
  active: string;
};

const blockPaginationConfig: PaginationConfig = {
  container: block.pagination,
  button: block['pagination-button'],
  inner: block['pagination-block'],
  active: block['pagination-block-is-active'],
};

const imagePaginationConfig: PaginationConfig = {
  container: pic['img-pagination'],
  button: pic['image-button'],
  inner: pic['product-image'],
  active: pic['image-button-is-active'],
};

const sliderPaginationConfig: Record<number, PaginationConfig> = {
  0: blockPaginationConfig,
  1: imagePaginationConfig,
};

export { sliderPaginationConfig };
