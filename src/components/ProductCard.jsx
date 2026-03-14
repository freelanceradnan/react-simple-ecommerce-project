import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/CartSlice';

const ProductCard = ({ product }) => {
    const dispatch=useDispatch()
  return (
    <div className="max-w-80 rounded-lg overflow-hidden shadow-lg bg-white transform transition duration-500 hover:scale-105">
      
      <div className="relative overflow-hidden">
        <img
          className="w-full h-48 object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>

    
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">{product.name}</div>
      </div>

      
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300" onClick={()=>dispatch(addToCart(product))}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
