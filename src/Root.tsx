import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import { App } from "./App"
import { HomePage } from "./modules/HomePage"
import { HomePageCategory } from "./modules/HomePageCategory"


export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route index element={<HomePage />}/>
          <Route path="home" element={<Navigate to={'/'} replace/>} />
          <Route path="phones" element={<HomePageCategory />}/>
        </Route>
      </Routes>
    </HashRouter>
  )
}