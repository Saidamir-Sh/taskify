import { ChangeEvent, InputHTMLAttributes } from "react";

export type InputTypes = "text" | "number" | "email" | "password";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    type: InputTypes;
    inputName: string;
    label?: string;
    errors?: boolean;
    placeholder?: string;
    disabled?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    variant?: keyof typeof variants;
}

export const variants = {
    outlined: 'border bg-grey',
    filled: 'bg-gray-300 placeholder:text-white text-white',
    standard: 'border-b'
};