export type CategoryDescription = {
  title: string;
  subtitle: string;
};

export type Category = {
  name: string;
  banner: string;
  image: string;
  modelsCount: number;
  description: CategoryDescription;
};
