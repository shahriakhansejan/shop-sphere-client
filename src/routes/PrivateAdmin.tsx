import { useIsAdminQuery } from '../redux/feature/users/usersApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate } from 'react-router';
import { ReactNode } from 'react';
import { removeUser } from '../redux/feature/users/userSlice';

interface PrivateAdmin {
    children : ReactNode
}

const PrivateAdmin = ({children}: PrivateAdmin) => {
    const {email} = useSelector((state: RootState)=> state.user)
    const {data, isLoading} = useIsAdminQuery(email);
    const dispatch = useDispatch();

    
    if(isLoading){
        return <progress className="progress w-full px-4"></progress>
    }
    
    if(email && data.admin){
        return children
    }
    else{
        dispatch(removeUser());
        return <Navigate to='/sign-in'></Navigate>
    }
}

export default PrivateAdmin;