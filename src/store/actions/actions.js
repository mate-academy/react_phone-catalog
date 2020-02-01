
export const SET_PHONES = 'SET_PHONES'
export const SET_PHONES_TO_CART = 'SET_PHONES_TO_CART'
export const SET_PHONES_DETAILS = 'SET_PHONES_DETAILS'

export const setPhones = (data) => ({
  type: SET_PHONES,
  payload: data
})

export const setPhoneToCart = (phone) => ({
  type: SET_PHONES_TO_CART,
  payload: phone
})
export const setPhoneDetails = (phoneDetails) => ({
  type: SET_PHONES_DETAILS,
  payload: phoneDetails
})
