export enum RoutePath {
  Home = '/',
  Phones = '/phones',
  Tablets = '/tablets',
  Accessories = '/accessories',
}

export type NavigationItem = {
  name: string;
  path: RoutePath;
  labelProp: string;
};
