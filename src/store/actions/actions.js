
export const SET_PHONES = 'SET_PHONES'
export const SET_LOADING = 'SET_LOADING'
export const SET_PHONES_TO_CART = 'SET_PHONES_TO_CART'

export const setPhones = (data) => ({
  type: SET_PHONES,
  payload: data
})

export const setPhoneToCart = (phone) => ({
  type: SET_PHONES_TO_CART,
  payload: phone
})
