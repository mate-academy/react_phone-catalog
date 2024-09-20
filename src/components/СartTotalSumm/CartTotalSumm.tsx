import { useContext, useEffect, useState } from "react"
import { CatalogContext } from "../../CatalogContext"
import { getProductForShow } from "../../pages/CartPage/CartPage";

export const CartTotalSumm = () => {
  const { cart } = useContext(CatalogContext)
  const [totalSumm, setTotalSumm] = useState(0);

  useEffect(() => {
    if (cart) {
      let allPrices = cart.map(item => item.priceDiscount)
      setTotalSumm(allPrices.reduce((accumulator: number, currentValue: number) => {
          return accumulator + currentValue
      }, 0))
    }
  }, [cart])

  return (
    <div className="cart-total-summ">
      <p className="cart-total-summ__value">${totalSumm}</p>
      <p className="cart-total-summ__subtitle">{`Total for ${getProductForShow(cart).length} item${getProductForShow(cart).length > 1 ? 's' : ''}`}</p>
      <button className="cart-total-summ__checkout-btn button">Checkout</button>
    </div>
  )
}
