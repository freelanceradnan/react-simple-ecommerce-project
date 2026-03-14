import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import {  collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Shop = () => {
    const productReference=collection(db,'products')
    useEffect(()=>{
    const fetchProduct=async()=>{
        const data=await getDocs(productReference)
        console.log('data is',data)
    }
    fetchProduct()
    },[])
    const products=[]
    return (
        <div className='w-full h-screen'>
        <div>
        <h2>All Available Products</h2>
        <div>
            {products?.length>0 && (
            <div className="grid grid-cols-3">
           {products?.map(product=><ProductCard key={product.id} product={product}/>)}
            </div>
            )}
        </div>
        </div>
        </div>
    );
};

export default Shop;