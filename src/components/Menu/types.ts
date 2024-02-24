export interface MenuProps {
  isOpen: boolean,
  favoritesItemsCount?: number,
  cartItemsCount?: number,
  onClick: () => void,
}