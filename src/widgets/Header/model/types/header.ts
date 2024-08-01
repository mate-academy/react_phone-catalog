export const TitlePagesEnum: { [key: string]: string } = {
  home: 'Welcome to Nice Gadgets store!',
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  // HOME = 'Welcome to Nice Gadgets store!',
  // PHONES = 'Mobile phones',
  // TABLETS = 'Tablets',
  // ACCESSORIES = 'asseccories',
  // fav
  // cart
};

export interface HeaderItemType {
  path: string;
  text?: string;
  Icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  // page: TitlePagesEnum;
}
