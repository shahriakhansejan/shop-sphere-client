import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    name: string | null;
    email: string | null;
}

const initialState: UserState = {
    name: localStorage.getItem("userName"),
    email: localStorage.getItem("userEmail"),
}

  
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser : (state, {payload} : PayloadAction<{name:string; email:string}>) => {
            state.name = payload.name;
            state.email = payload.email;

            localStorage.setItem("userName", payload.name);
            localStorage.setItem("userEmail", payload.email);
        },
        removeUser : (state) =>{
            state.name = '';
            state.email = '';

            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("access-token");
        }
    }
})

export const { setUser, removeUser } = userSlice.actions; 

export default userSlice.reducer;