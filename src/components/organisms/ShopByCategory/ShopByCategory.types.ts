type CategoryCard = {
  id: string;
  background: string;
  image: string;
  title: string;
  count: number;
  link: string;
};

export type ShopByCategoryData = {
  sectionTitle: string;
  sectionSubtitle?: string;
  categories: CategoryCard[];
};
