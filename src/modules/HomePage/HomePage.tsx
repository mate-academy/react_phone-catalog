
import { BrandNewModel } from "./components/brandNewMode/brandNewMode"
import { SliderHomePage } from "./components/slider"
import { TitleHomePage } from "./components/title/TitleHomePage"

export const HomePage = () => {
  return (<>
    <TitleHomePage />
    <SliderHomePage/>
    <BrandNewModel/></>
  )
}
