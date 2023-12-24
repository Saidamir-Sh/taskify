/* eslint-disable @typescript-eslint/no-unused-vars */ // TODO configure this rule globally
import clsx from "clsx";
import * as React from "react";
import { ButtonProps, sizes, variants } from "./types";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        type = 'button',
        className = '',
        variant = 'primary',
        size = 'md',
        isLoading = false,
        startIcon,
        endIcon,
        ...props
    }, ref) => {
        return (
            <button
                ref={ref}
                type={type}
                className={clsx(
                    'flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {/* {isLoading && <></>} */}
                {!isLoading && startIcon}
                <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
            </button>
        )
    }
);

Button.displayName = 'Button';