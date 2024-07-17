export type CategotyCard = {
  title: string;
  link: string;
  ariaLabelLink: string;
  imageUrl: string;
  imageAlt: string;
  quantity: number;
};

export type CategoriesList = {
  phones: CategotyCard;
  tablets: CategotyCard;
  accessories: CategotyCard;
};
