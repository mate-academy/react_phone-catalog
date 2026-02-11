type Description = {
  title: string;
  text: string[];
};

type Link = {
  title: string;
  link: string;
};

type Banner = {
  id: number;
  name: keyof UltimateProducts;
  banner: string;
  title: string;
  link: string;
};
