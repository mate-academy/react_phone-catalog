export type CategoryKey = 'phones' | 'tablets' | 'accessories';

export type CategoryConfig = {
  key: CategoryKey;
  title: string;
  link: string;
  image: string;
  color: string;
  height: string;
  transform: string;
};
