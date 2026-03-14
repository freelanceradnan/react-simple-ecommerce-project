import { createSlice } from "@reduxjs/toolkit";

export const CartSlice=createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addToCart(state,action){
        const product=state.find((c)=>c.id===action.payload.id)
        product ?product.quantity++:state.push({...action.payload,quantity:1})
        
        },
        removeItemFromCart(state,action){
       
       return state.filter((item) => item.id !== action.payload);
        
        },
        modifyQuantityAnItem(state,action){
            const productIndex=state.findIndex(c=>c.id===action.payload.id)
            state[productIndex].quantity=action.payload.quantity
        },
        clearCart(){
            return []
        }
    }
})
export const {addToCart,removeItemFromCart,modifyQuantityAnItem,clearCart}=CartSlice.actions;
export default CartSlice.reducer