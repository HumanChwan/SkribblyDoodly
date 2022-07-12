import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';

const UserRoute = () => {
    const { username } = useUser()!;
    return username === '' ? <Navigate to='/' replace /> : <Outlet />;
};

export default UserRoute;
