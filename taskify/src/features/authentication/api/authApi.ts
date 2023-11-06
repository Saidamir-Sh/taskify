import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { ErrorResponse, ResponseLogin, User } from '../types';

const BASE_URL = 'http://127.0.0.1:8000/api/auth/';

export const signUp = createAsyncThunk('auth/signup', async (userCredentials: User) => {
    try {
        const response = await axios.post<User>(`${BASE_URL}signup/`, userCredentials);
        return response.data;   
    } catch (error) {
        return error.response;
    }
})

export const loginUser = createAsyncThunk('auth/login', async(userCredentials: User) => {
    try {
        const response = await axios.post<ResponseLogin>(`${BASE_URL}login/`, userCredentials);
        return response.data;   
    } catch (error) {
        return error.response
    }
})