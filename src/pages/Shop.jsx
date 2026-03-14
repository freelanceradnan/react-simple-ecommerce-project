import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import {  collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Shop = () => {
    const [products,setProducts]=useState([])
    
    const productReference=collection(db,'products')

    //fitered data fetch from firebase store
    useEffect(()=>{
    const fetchProduct=async()=>{
        const data=await getDocs(productReference)
        //data filter with maps
        const filteredData=data.docs.map((doc)=>({
            id:doc.id,
            ...doc.data() //spread data
        }))
        setProducts(filteredData)
    }
    fetchProduct()
    },[])
    
    return (
        <div className='w-full h-screen'>
        <div>
        <h2 className="text-center text-2xl font-semibold py-2">All Available Products</h2>
        <div>
            {products?.length>0 && (
            <div className="grid grid-cols-3 px-8">
           {products?.map(product=><ProductCard key={product.id} product={product}/>)}
            </div>
            )}
        </div>
        </div>
        </div>
    );
};

export default Shop;