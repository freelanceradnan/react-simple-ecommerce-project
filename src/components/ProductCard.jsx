import React from 'react';

const ProductCard = ({product}) => {
    return (
       <div className='max-w-sm'>
        <div>
            <img src={product.image} alt="" />
        </div>
        <div>
            <h2>{product.title}</h2>
        </div>
        <div>
            <h2>{product.price}</h2>
        </div>
        <div>
            <button>Add To Cart</button>
        </div>
       </div>
    );
};

export default ProductCard;