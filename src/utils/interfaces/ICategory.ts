export interface ICategory {
  id: number;
  name: string;
  image: string;
  counts: number | undefined;
  link: string;
  isLoading: boolean;
}
