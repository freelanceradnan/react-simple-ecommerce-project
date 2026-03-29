import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import {  collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useSearchParams } from 'react-router';
import { useGetCategoriesQuery, useGetPostsQuery, useGetProductsByCategoryQuery } from '../features/api/ApiSlice';

const Shop = () => {
 const [searchParams,setSearchParams]=useSearchParams()
 const activeSlug=searchParams.get('category')
 //get category 
 const {data:categories=[]}=useGetCategoriesQuery()
 
 const activeCategory=categories.find(cat=>cat.slug===activeSlug)

const activeCategoryId=activeCategory?.id
const isCategoryActive=Boolean(activeCategoryId)

//fetch Product conditionally
const {data:allProducts=[],isLoading:allLoading}=useGetPostsQuery(undefined,{
    skip:isCategoryActive
})
console.log(allProducts)
const {data:categoryProducts=[],isLoading:categoryLoading}=useGetProductsByCategoryQuery(activeCategoryId,{
skip:!isCategoryActive
})
const products=isCategoryActive?categoryProducts:allProducts

const isLoading=allLoading||categoryLoading
const handler=(category)=>{
setSearchParams({category:category.slug})
}
const clearCategory=()=>{
searchParams.delete('category')
setSearchParams(searchParams)
}

    return (
        <div className='w-full h-screen'>
        <div>
        <h2 className="text-center text-2xl font-semibold py-2">All Available Products</h2>
       {/* category--filter */}
       <div className="flex gap-2 justify-center">
        <button onClick={clearCategory} className='bg-blue-500 p-2 px-6'>All</button>
        {categories.map((category=>(
            <button key={category.id} className='bg-blue-500 p-2 px-6' onClick={()=>handler(category)}>{category.name}</button>
        )))}
       </div>
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