import {ReactNode, useContext} from 'react'
import AuthContext from '../context/AuthContext.ts'
import {Navigate, Outlet} from 'react-router-dom';
export interface RequireAuthProps {
    children: ReactNode
}

export const RequireAuth = () => {
    const {isAuthenticated} = useContext(AuthContext);

    return (
        isAuthenticated() ? <Outlet /> : <Navigate
            to='/warehouses'
            state={{ from: location }}
            replace
        />
    )
}