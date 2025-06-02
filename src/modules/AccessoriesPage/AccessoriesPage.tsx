import { Container } from "../../components/container/Container"
import { TitlePages } from "../HomePage/components/title/TitlePages"
import { PageNav } from "../PhonePage/components/pageNav/PageNav"

export const AccessoriesPage = () => {

  return (<><Container>
  <PageNav/>
    <TitlePages type={'accessories'} />
  </Container></>)
}
