import { createBrowserRouter } from "react-router";
import Rootlayout from "../pages/Rootlayout";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
export const rootRouter=createBrowserRouter([
    {path:"/",element:<Rootlayout/>,children:[
        {path:"/",index:true,element:<Shop/>},
        {path:"/cart",index:true,element:<Cart/>}
    ]}
])