import React from "react";
import clsx from "clsx";
import { InputProps, variants } from "./types";


export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input({ id, type, inputName, label, errors, placeholder, variant = 'outlined', disabled, onChange, ...rest }, ref) {
	return (
		<div className="w-full">
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
				className={clsx("flex justify-center items-center w-full outline-none rounded-s py-1.5 px-2",
					variants[variant])}
				{...rest}
			/>
			{errors && <span className="text-sm text-red-600">Input has error.</span>}
		</div>
	)
})