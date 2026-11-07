export type CatalogFilters = {
  model: string;
  capacity: string;
};

export type FilterOptions = {
  models: { value: string; label: string }[];
  capacities: string[];
};
