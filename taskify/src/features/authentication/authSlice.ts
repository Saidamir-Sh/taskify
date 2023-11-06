import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, ErrorResponse, User } from './types';
import { signUp } from './api/authApi';

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.error = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload;
            })
    }
});

// export default authSlice
// export const {}