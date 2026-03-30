import { collection, deleteDoc, getDocs,doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { X,Pencil} from 'lucide-react';
import { Navigate } from 'react-router';
import { Link } from 'react-router';

const AdminProduct = () => {
    const [product,setProduct]=useState([])
    const [category,setCategory]=useState([])
  
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
    const fetchProduct=async()=>{
        setLoading(true)
    try {
    const docRef=collection(db,'products')
    const dataproduct=await getDocs(docRef)
    const filteredProduct=dataproduct.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
    }))
    setProduct(filteredProduct)
    const cateRef=collection(db,'categories')
    const productCate=await getDocs(cateRef)
    const filteredCategory=productCate.docs.map((cat)=>({
        id:cat.id,
        ...cat.data()
    }))
    setCategory(filteredCategory)

   
    } catch (error) {
        return{error}
    }
    setLoading(false)
    }
    fetchProduct()
    },[])
    const categoryType = (categoryId) => {
    const getCate = category.find(cat => cat.id === categoryId);
    return getCate ? getCate.name : "Uncategorized";
}
//del product
const deleteProduct=async(productid)=>{
try {
    const productRef=doc(db,'products',productid)
    await deleteDoc(productRef)
    setProduct(prev => prev.filter(item => item.id !== productid));
    alert('delete successed!')
} catch (error) {
    return alert('failed to delete')
}
}
    return (
        <div>
         <table className='w-full border-collapse'>
    <thead className='bg-gray-50'>
        <tr>
          
            <th className=' p-2 text-center uppercase text-sm font-bold'>Image</th>
            <th className=' p-2 text-center uppercase text-sm font-bold'>Title</th>
            <th className=' p-2 text-center uppercase text-sm font-bold'>Price</th>
            <th className=' p-2 text-center uppercase text-sm font-bold'>Category</th>
            <th className=' p-2 text-center uppercase text-sm font-bold'>Edit</th>
            <th className=' p-2 text-center uppercase text-sm font-bold'>Delete</th>
        </tr>
    </thead>
    <tbody>
        {product.map((prod) => (
            <tr key={prod.id} className="hover:bg-red-100 transition-colors border-b-1">
               
                <td className=' p-2 text-center'>
                    <img src={prod.image} className='w-10 h-10 object-cover mx-auto rounded' alt={prod.title} />
                </td>
                <td className=' p-2 text-center capitalize'>{prod.title}</td>
                <td className=' p-2 text-center'>${prod.price}</td>
                <td className=' p-2 text-center'>{categoryType(prod.categoryId)}</td>
                
                {/* Action Buttons */}
                <td className=' p-2 text-center'>
                    <Link to={`/edit-product/${prod.id}`}className="text-blue-500 hover:text-blue-700">
                        <Pencil size={18} className="mx-auto" />
                    </Link>
                </td>
                <td className=' p-2 text-center'>
                    <button className="text-red-500 hover:text-red-700" onClick={()=>deleteProduct(prod.id)}>
                        <X size={20} className="mx-auto" />
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
        </div>
    );
};

export default AdminProduct;