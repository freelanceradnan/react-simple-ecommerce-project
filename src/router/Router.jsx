import { createBrowserRouter } from "react-router";
import Rootlayout from "../pages/Rootlayout";
import Shop from "../pages/Shop";
export const rootRouter=createBrowserRouter([
    {path:"/",element:<Rootlayout/>,children:[
        {path:"/",index:true,element:<Shop/>}
    ]}
])