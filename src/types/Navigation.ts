export interface NavigationItem {
  id: number;
  title: string;
  link: string;
}

export interface Categories {
  id: number;
  description: string;
  image: string;
  imageAlt: string;
  link: string;
  amount: number | undefined;
}
