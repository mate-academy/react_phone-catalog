import { App } from './src/App';
import { Route, BrowserRouter, Routes } from "react-router-dom"
import { HomePage } from './src/pages/HomePage';


export const Root = () => (
   <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} >
            <Route index element={<HomePage/>}/>
        </Route>
    </Routes>
   </BrowserRouter>
);