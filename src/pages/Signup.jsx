import { LogIn } from 'lucide-react';
import { useState } from 'react';
import {auth} from  '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';
const Signup = () => {
    const initUser={
        email:"",
        password:""
    }
    const navigate=useNavigate()
    const [user,setUser]=useState(initUser)
    const [loading,SetLoading]=useState(false)
    const [errorMessage,setErrorMessage]=useState("")
    const changehandler=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
    }
    const submitHandler=async(e)=>{
        e.preventDefault()
        SetLoading(true)
       try {
       await createUserWithEmailAndPassword(auth,user.email,user.password)
       SetLoading(false)
       setErrorMessage("")
       navigate("/login")
       } catch (error) {
        SetLoading(false)
        setErrorMessage(error.message)
        setUser(initUser)
       }
    }
    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-[#A5D8FF] via-[#E1EFFF] to-white flex items-center justify-center">
        <div className='min-w-sm min-h-70 bg-gradient-to-b from-[#BEE3F8] to-white rounded-sm shadow-md'>
        <div className='flex justify-center flex-col p-10 gap-4'>
            {/* //signup-logo */}
        <LogIn size={40} className='bg-white p-2 mt-2 mx-auto rounded-sm'/>
        {/* //signup title */}
        <div>
            <h2 className='text-center text-2xl font-semibold'>Sign in with email</h2>
             <p className='text-center text-slate-600'>Make a new Account to access our Services</p>
        </div>
       
        {/* //signup-form */}
        <form className='flex gap-3 flex-col' onSubmit={submitHandler}>
        <div>
             <input type="email" className='w-full h-8 bg-[#c9e9fc] focus:outline-none' placeholder='Enter your email ...' name='email' value={user.email} onChange={changehandler} required/>
        </div>
        <div>
            <input type="password" className='w-full h-8 bg-[#c9e9fc] focus:outline-none' placeholder='Enter your Password ...' name='password' value={user.password} onChange={changehandler} required/>
        </div>
        
        <div>
            {loading && <h2 className='w-full bg-blue-400 text-white rounded-sm text-sm text-center py-1'>Creating new User ...</h2>}
            {!loading && <button className='w-full bg-blue-400 h-7 text-white rounded-sm text-sm' type="submit">Register New User</button>}
            {errorMessage && <h2 className='text-center font-semibold text-red-600'>{errorMessage}</h2>}
        </div>
        </form>
        </div>
        </div>
        </div>
    );
};

export default Signup;