import React from 'react';
import { useAuth } from '../contexts/Auth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {isLogin,role}=useAuth()
    return isLogin && role=='admin'?children:<Navigate to="/login"/>
};

export default PrivateRoute;