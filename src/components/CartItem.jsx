import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { modifyQuantityAnItem, removeItemFromCart } from '../features/CartSlice';

const CartItem = ({ item }) => {
    const [itemQuantity,setItemQuantity]=useState(item.quantity)
    const dispatch=useDispatch()
    return (
        <tr className="border-b hover:bg-gray-50 transition-colors">
           
            <td className="py-4">
                <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-16 h-16 object-cover rounded-md border" 
                />
            </td>

         
            <td className="py-4 px-2">
                <h2 className="font-medium text-gray-800 line-clamp-2 max-w-50">
                    {item.title}
                </h2>
            </td>

            
            <td className="py-4 text-gray-600">
                ${item.price}
            </td>

            
            <td className="py-4">
                <div className="flex items-center justify-center border rounded-lg w-fit mx-auto overflow-hidden">
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors" onClick={()=>{
                        if(itemQuantity>1){
                            dispatch(modifyQuantityAnItem({id:item.id,quantity:item.quantity-1}))
                            setItemQuantity(itemQuantity-1)
                        }
                        else{
                        return alert(`item quantity should not be less then 1`)
                        }
                    }}>
                        -
                    </button>
                    <input 
    type="number" 
    min={1} 
    value={item.quantity} 
    className="w-12 text-center border-none focus:ring-0 text-sm"
    onChange={(e) => {
        const val = Number(e.target.value);
        
        dispatch(modifyQuantityAnItem({ id: item.id, quantity: val }));
        
        setItemQuantity(val);
    }}
/>
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors" onClick={()=>{
                        dispatch(modifyQuantityAnItem({id:item.id,quantity:item.quantity+1}))
                            setItemQuantity(itemQuantity+1)
                    }}>
                        +
                    </button>
                </div>
            </td>

           
            <td className="py-4 text-right font-semibold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
            </td>

           
            <td className="py-4 text-right">
                <button className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-all" onClick={()=>dispatch(removeItemFromCart(item.id))}>
                    ✕
                </button>
            </td>
        </tr>
    );
};

export default CartItem;