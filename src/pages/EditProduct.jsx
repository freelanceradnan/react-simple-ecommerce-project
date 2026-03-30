import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { Navigate } from 'react-router';
import { useUpdateProductMutation } from '../features/api/ApiSlice';
import { uploadToCloudinary } from '../utils/coudinary';

const EditProduct = () => {
    const navigate=useNavigate()
    const {id}=useParams()
    const [updateProduct]=useUpdateProductMutation()
    //form state
    const [loading,setLoading]=useState(true)
    const [product,setProduct]=useState([])
    const [category,setCategory]=useState([])
    //product and category
    const [title,setTitle]=useState("")
    const [price,setPrice]=useState("")
    const [categoryId,setCategoryId]=useState("")
   
    const [keepExistingImage,setKeepExistingImage]=useState(true)
    const [newImageFile,setNewImageFile]=useState(null)
    const [newImagePreview,setImagePreview]=useState(null)
    const [submitting,setSubmitting]=useState(false)

    useEffect(()=>{
    const fetchProduct=async()=>{
    setLoading(true)
    try {
   //get product
    const productRef=doc(db,'products',id)
    const snapsort=await getDoc(productRef)
    if(!snapsort.exists()){
        alert('product not found');
        Navigate("/")
    }
    const data=snapsort.data()
    setProduct(data)
    setTitle(data.title)
    setPrice(data.price)
    setCategoryId(data.categoryId)
    //get categories
    const cateRef=collection(db,'categories')
    const cateSnap=await getDocs(cateRef)
    const filteredData=cateSnap.docs.map((cate)=>({
        id:cate.id,
        ...cate.data()
    }))
    setCategory(filteredData)
    } catch (error) {
        return alert('failed to fatech')
    }
    finally{
        setLoading(false)
    }
    }
    fetchProduct()
    },[id])
    //new image upload
    const handlerNewImage=(file)=>{
    if(!file) return ;
    setNewImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setKeepExistingImage(false)
    }
    //new remove Image
    const removeNewImage=()=>{
        setNewImageFile(null)
        setImagePreview(null)
        setKeepExistingImage(true)
    }
    //submit handler
   const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
        let imageUrl = product.image; 


        if (newImageFile && !keepExistingImage) {
            const uploaded = await uploadToCloudinary(newImageFile);
            imageUrl = uploaded.url; 
        }

        
        await updateProduct({
            id: id, 
            title: title, 
            price: price, 
            image: imageUrl, 
            categoryId: categoryId
        }).unwrap();

        alert('success updated');
        navigate("/");
    } catch (error) {
        console.error(error);
        alert('Failed to update।');
    } finally {
        setSubmitting(false);
    }
};
    if(loading) return <p>loading product....</p>
    return (
        <div>
           <h1>Edit product pages</h1>
        <form  onSubmit={submitHandler} className='mx-auto max-w-md mt-10 border'>
        {/* title */}
        <label htmlFor="" className='block text-xl font-semibold'>Title</label>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} disabled={submitting}/>
        {/* price */}
        <label htmlFor="" className='block text-xl font-semibold'>Price</label>
        <input type="number" value={price} onChange={(e)=>setPrice(Number(e.target.value))} disabled={submitting}/>
        {/* category */}
        <label htmlFor="" className='block text-xl font-semibold'>Select Category</label>
        <select value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
            {category.map((cate)=><option key={cate.id} value={cate.id}>{cate.name}</option>)}
        </select>

        {/* existing--image */}
        <div>
        <label htmlFor="" className='block text-xl font-semibold'>current image</label>
        <img src={product.image} alt="" className='w-10'/>
        <label htmlFor="">
            <input type="checkbox" checked={keepExistingImage} onChange={()=>setKeepExistingImage((p)=>!p)} disabled={submitting||newImageFile}/>
            keep existing image
        </label>
        <div>
        {/* new image  */}
        <label htmlFor="" className='block text-xl font-semibold'>Upload New Image</label>
        <input type="file" accept='image/*' onChange={(e)=>handlerNewImage(e.target.files[0])} className='border'/>
        {newImagePreview &&(
       <>
       <div>
        <img src={newImagePreview} className='w-10'/>
       <button onClick={removeNewImage} className='text-white bg-red-500'>clear new image</button>
       </div>
       </>
        
        )}
        
        </div>
        <button type="submit" className='bg-blue-500 w-1/3 text-white py-2 mx-auto'>{submitting?"updating...":"update product"}</button>
        </div>
        </form>
        </div>
    );
};

export default EditProduct;