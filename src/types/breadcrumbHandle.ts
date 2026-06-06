export interface BreadcrumbHandle {
  crumb: string | ((data: unknown) => string);
}
