const menuItems = ['4', '8', '16', 'all'] as const;

export type ItemsOnPageType = (typeof menuItems)[number];
export const typedMenuItems = Array.from(menuItems);
