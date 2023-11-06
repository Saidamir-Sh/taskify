export interface User {
    email: string,
    password: string
}

export interface ResponseLogin {
    refresh: string,
    access: string
}

export interface AuthState { 
    user: User | null
    loading: boolean,
    error: ErrorResponse | null
}

export type ErrorResponse<T = {reason: 'string'}> = T;