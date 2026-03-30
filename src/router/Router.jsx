import { createBrowserRouter } from "react-router";
import Rootlayout from "../pages/Rootlayout";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import AddProduct from "../pages/AddProduct";
import PrivateRoute from "../components/PrivateRoute";
import PrivateCartRouter from "../components/PrivateCartRouter";
import AdminProduct from "../pages/AdminProduct";

export const rootRouter=createBrowserRouter([
    {path:"/",element:<Rootlayout/>,children:[
        {path:"/",index:true,element:<Shop/>},
        {path:"/cart",index:true,element:(
            <PrivateCartRouter>
                <Cart/>
            </PrivateCartRouter>
        )},
        {path:"/addProduct",index:true,element:(
            <PrivateRoute>
                <AddProduct/>
            </PrivateRoute>
        )},
        {path:"/signup",index:true,element:<Signup/>},
        {path:"/login",index:true,element:<Login/>},
        {path:"/admin-product",index:true,element:<AdminProduct/>},
    ]}
])