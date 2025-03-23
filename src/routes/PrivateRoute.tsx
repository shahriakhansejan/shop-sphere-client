import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useIsUserQuery } from "../redux/feature/users/usersApi";
import { removeUser } from "../redux/feature/users/userSlice";
import { Navigate } from "react-router";
import { ReactNode } from 'react';

interface PrivateRoute {
    children : ReactNode
}

const PrivateRoute = ({children }: PrivateRoute ) => {
    const {email} = useSelector((state: RootState)=> state.user)
    const {data, isLoading} = useIsUserQuery(email);
    const dispatch = useDispatch();

    if(isLoading){
        return <progress className="progress w-full px-4"></progress>
    }

    if(email && data?.user){
        return children;
    }
    else{
        dispatch(removeUser());
        return <Navigate to='/sign-in'></Navigate>
    }
};

export default PrivateRoute;