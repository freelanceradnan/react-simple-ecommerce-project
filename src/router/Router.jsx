import { createBrowserRouter } from "react-router";
import Rootlayout from "../pages/Rootlayout";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
export const rootRouter=createBrowserRouter([
    {path:"/",element:<Rootlayout/>,children:[
        {path:"/",index:true,element:<Shop/>},
        {path:"/cart",index:true,element:<Cart/>},
        {path:"/signup",index:true,element:<Signup/>},
        {path:"/login",index:true,element:<Login/>},
    ]}
])