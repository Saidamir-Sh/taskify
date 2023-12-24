export const variants = {
    primary: 'bg-sky-600 text-white',
    danger: 'bg-red-600 text-white',
};

export const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-2 px-6 text-md',
    lg: 'py-4 px-8 text-lg'
};

export type IconProps = 
    | {startIcon: React.ReactElement; endIcon?: never}
    | {endIcon: React.ReactElement; startIcon?: never}
    | {endIcon?: undefined; startIcon?: undefined};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    isLoading?: boolean;
} & IconProps;