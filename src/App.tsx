import { Outlet } from "react-router-dom";
import { useAppDispatch } from "./modules/shared/hooks/hooks";
import { useEffect } from "react";
import * as productAction from './features/ProductSlice';


export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(productAction.fetchProduct())
  },[]);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}
