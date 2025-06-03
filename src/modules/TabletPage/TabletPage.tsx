import { useAppSelector } from "../../app/hooks"
import { ProductCart } from "../../components/cardItem/ProductCart"
import { Container } from "../../components/container/Container"
import { ProductList } from "../../components/ProductsList/ProductsList"
import { TitlePages } from "../HomePage/components/title/TitlePages"
import { PageNav } from "../PhonePage/components/pageNav/PageNav"

export const TabletPage = () => {
  const products =useAppSelector(state=>state.products.products)
  return (<>
    <Container>
      <PageNav />
      <TitlePages type={'tablets'} />
      <ProductList/>
    </Container></>)
}
