export const saveToLocalStorage = (cartItems) => {
localStorage.setItem('cart',JSON.stringify(cartItems))
}
