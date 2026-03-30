import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAddProductMutation, useGetCategoriesQuery } from '../features/api/ApiSlice';

const AddProduct = () => {
    const {data:categories=[]}=useGetCategoriesQuery()
    const [addProduct]=useAddProductMutation()
    const navigate=useNavigate()
    const [product,setProduct]=useState({
        title:"",
        price:"",
        image:"",
        categoryId:""
    })
    const changeHandler=(e)=>{
     setProduct({
        ...product,
        [e.target.name]:e.target.name==='price'?Number(e.target.value):e.target.value
     })
    }
    const changeImagehandler=async(e)=>{
        const file=e.target.files[0]
        const data=new FormData()
        data.append('file',file)
        data.append('cloud_name',"doguuyqrp")
        data.append('upload_preset','my eco projects')
      const res = await fetch(`https://api.cloudinary.com/v1_1/doguuyqrp/image/upload`, {
  method: 'POST', 
  body: data     
});

const result = await res.json(); 
setProduct({...product,image:result.secure_url})
console.log(setProduct)
     
    }
    const submitHandler=(e)=>{
        e.preventDefault()
     if(!product.image){
        return alert('product isnot uploaded please upload!')
     }
     else{
        addProduct(product)
        navigate("/")
     }
    }
    return (
        <>
        <h2 className='text-center font-semibold uppercase py-4 text-2xl'>Product Adding Page</h2>
        <form className='mx-auto w-1/3 flex flex-col gap-2 mt-10' onSubmit={submitHandler}>
        <label htmlFor="" className='font-semibold'>Enter Your Product Title</label>
        <input type="text" name="title" id="" className='border rounded-sm' value={product.title} onChange={changeHandler}/>
        <label htmlFor="" className='font-semibold'>Enter Your Product Price</label>
        <input type="number" name="price" id="" className='border rounded-sm' value={product.price} onChange={changeHandler}/>
        <label htmlFor="" className='font-semibold'>Enter Your Product Image</label>
        <input type="file" name="image" id="" className='' accept='.jpg,.png,.jpeg' onChange={changeImagehandler}/>
        {product.image && (
            <img src={product.image} className='h-50 w-50' />
        )}
        <label htmlFor="" className='font-semibold'>Enter Your Product Category</label>
        <select name="categoryId" onChange={(e) => setProduct({...product, categoryId: e.target.value})}>
        <option value="" defaultChecked>Select Category Must</option>
      {categories.map((categroy)=>(
       <option value={categroy.id} key={categroy.id}>{categroy.name}</option>
      ))}
        </select>
        <button className='bg-blue-400 text-white py-2' type='submit'>Add Product Now</button>
        </form>
        </>
    );
};

export default AddProduct;