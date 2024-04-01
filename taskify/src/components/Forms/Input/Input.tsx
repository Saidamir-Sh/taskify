import React, { ChangeEvent, InputHTMLAttributes } from "react";

type InputTypes = "text" | "number" | "email" | "password";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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
    outlined: 'block w-full outline-none rounded-md border py-1.5 px-2 bg-grey',
    filled: 'bg-red-600 text-white',
    standard: 'block w-full outline-none rounded-md border py-1.5 px-2'
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input({ id, type, inputName, label, errors, placeholder, variant='standard', disabled, onChange, ...rest }, ref) {
    return (
        <div>
            {label && 
                <label 
                    htmlFor={id}
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {label}
                </label>
            }
            <input
                type={type}
                name={inputName}
                ref={ref}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                className={variants[variant]}
                {...rest}
            />
            {errors && <span className="text-sm text-red-600">Input has error.</span>}
        </div>
    )
})