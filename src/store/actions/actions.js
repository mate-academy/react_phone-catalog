export const SET_PHONES = 'SET_PHONES'
export const SET_PHONES_TO_CART = 'SET_PHONES_TO_CART'
export const SET_SEARCH_PHONES = 'SET_SEARCH_PHONES'

export const setPhones = (data) => ({
  type: SET_PHONES,
  payload: data
})

export const setPhoneToCart = (phone) => ({
  type: SET_PHONES_TO_CART,
  payload: phone
})
export const setPhoneSearch = (phones, query="") => {
    const found = phones.filter(phone => phone.name.toLowerCase().includes(query.toLowerCase()))
    return {
      type: SET_SEARCH_PHONES,
      payload: found
    }


}
