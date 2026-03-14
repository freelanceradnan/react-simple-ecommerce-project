import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/CartSlice";
import CartItem from "../components/CartItem";


const Cart = () => {
const cart=useSelector(state=>state.cart)

const dispatch=useDispatch()
let totalValue=cart.reduce((sum,item)=>sum+(item.price*item.quantity),0)
    return (
        <div className="p-4">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Products in your cart</h2>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="border-b">
                        <tr>
                            <th className="text-left py-4">Image</th>
                            <th className="text-left py-4">Product Title</th>
                            <th className="text-left py-4">Price</th>
                            <th className="text-center py-4">Quantity</th>
                            <th className="text-right py-4">Subtotal</th>
                            <th className="text-right py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart?.length > 0 ? (
                            cart?.map((item) => (
                                <CartItem item={item} key={item.id} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500">
                                    Your cart is empty.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 flex justify-between items-center border-t pt-4">
                <h2 className="text-xl font-semibold">Total price:{totalValue}</h2>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition" onClick={()=>dispatch(clearCart())}>
                    Clear Cart
                </button>
            </div>
        </div>
    );
};

export default Cart;