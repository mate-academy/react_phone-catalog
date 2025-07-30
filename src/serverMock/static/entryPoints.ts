export const entryPoints = {
  catalogue: 'cat',
  phones: 'phone',
  tablets: 'tab',
  accessories: 'access',
  banners: 'banner',
} as const;

export type EntryPointValue = 'cat' | 'phone' | 'tab' | 'access' | 'banner';
