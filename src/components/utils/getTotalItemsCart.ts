export const getTotalItemsCart = (products) =>
  products.reduce((sum,item)=>sum+item.quantity,0)

