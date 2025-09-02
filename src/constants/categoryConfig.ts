interface Config {
  title: string;
}

interface CategoryConfig {
  phones: Config;
  tablets: Config;
  accessories: Config;
}

export const CATEGORY_CONFIG: CategoryConfig = {
  phones: { title: 'Mobile phones' },
  tablets: { title: 'Tablets' },
  accessories: { title: 'Accessories' },
};
