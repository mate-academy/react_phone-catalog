export type NavSnapshot = {
  pathname: string;
  search?: string;
};

export type NavigationState = {
  from: NavSnapshot;
  prev?: NavSnapshot;
};
