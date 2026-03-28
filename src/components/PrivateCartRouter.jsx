import React from 'react';
import { useAuth } from '../contexts/Auth';
import { Navigate } from 'react-router';
const PrivateCartRouter = ({children}) => {
    const {isLogin,role}=useAuth()
  
    
    return isLogin?children:<Navigate to="/login"/>

};

export default PrivateCartRouter;